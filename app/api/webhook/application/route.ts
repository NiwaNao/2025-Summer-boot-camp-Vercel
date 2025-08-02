import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { applicationSchema, sanitizeInput, normalizeEmail, normalizePhoneNumber } from "@/lib/validation"
import { checkRateLimit } from "@/lib/rate-limit"
import { logSecurityEvent, SecurityEvent } from "@/lib/logger"

// Nodemailerの設定（アプリパスワードを使用）
const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error("Gmail credentials not configured")
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD  // アプリパスワードを使用
    }
  })
}

// 申込者向けお礼メールテンプレート
function createThankYouEmailContent(applicationData: any) {
  return `
${applicationData.attendeeName} 様

この度は、TOWA札幌限定サマーブートキャンプにお申し込みいただき、誠にありがとうございます。
決済が完了しましたので、お申し込み内容をご確認ください。

【お申し込み内容確認】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 受講者名：${applicationData.attendeeName} 様
■ メールアドレス：${applicationData.email}
■ 電話番号：${applicationData.phone}
${applicationData.company ? `■ 会社名・屋号：${applicationData.company}` : ""}

■ 受講日程：${applicationData.selectedDate}
■ 料金：¥${applicationData.price.toLocaleString()}（決済完了）
■ 割引タイプ：${
    applicationData.discountType === "single"
      ? "通常申し込み"
      : applicationData.discountType === "pair"
        ? "ペア割"
        : applicationData.discountType === "set"
          ? "2日間セット割"
          : applicationData.discountType === "pair-set"
            ? "2日間セット割 + ペア割"
            : ""
  }

${applicationData.partnerName ? `■ ペア受講者：${applicationData.partnerName} 様` : ""}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【今後の流れ】
1. 詳細な会場情報を24時間以内にメールでお送りします
2. 講座開始1週間前に、事前準備に関するご案内をお送りします
3. 講座前日に最終確認のご連絡をいたします

【当日の持ち物】
✓ ノートパソコン（Windows/Mac問わず）
✓ 筆記用具
✓ 昼食（近隣にコンビニ・飲食店もございます）
✓ 学習への意欲と好奇心！

【会場について】
札幌駅近郊のセミナールーム（主にEZOHUB SAPPORO）
※詳細な住所・アクセス方法は別途ご連絡いたします

【講座について】
・各回8名の超少人数制
・最低開催人数：3名
・講師2名による手厚いサポート
・実践的なカリキュラムで即戦力スキルを習得

【キャンセル・変更について】
お支払い後のキャンセルは、以下の通り返金対応いたします。

・開催10日前まで：全額返金
・開催9日前〜3日前：受講料の50％を返金
・開催2日前以降：返金不可

※返金はStripeを通じてクレジットカードへ行います。
※返金時、Stripe決済手数料（約3.6%）はご返金対象外となります。
※ご不明な点はお気軽にご連絡ください。

【ご質問・お問い合わせ】
何かご不明な点がございましたら、お気軽にお問い合わせください。

📧 Email：info@towa-ai.com
📱 LINE：@towa-ai（https://lin.ee/tjGDXcN）

講座当日、${applicationData.attendeeName}様にお会いできることを楽しみにしております。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOWA（トーワ）- 札幌限定サマーブートキャンプ
運営：株式会社アクロス
Email：info@towa-ai.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`
}

// Nodemailerでメール送信
async function sendEmail(to: string, subject: string, text: string) {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: `${process.env.GMAIL_FROM_NAME} <${process.env.GMAIL_USER}>`,
      to: to,
      subject: subject,
      text: text
    }

    const info = await transporter.sendMail(mailOptions)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('メール送信エラー:', error)
    return { success: false, error: String(error) }
  }
}

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const rateLimit = checkRateLimit(request, "webhook-application", 5, 60000) // 1分間に5回まで
    if (!rateLimit.allowed) {
      logSecurityEvent(
        SecurityEvent.RATE_LIMIT_EXCEEDED,
        `Rate limit exceeded for IP: ${request.headers.get('x-forwarded-for') || 'unknown'}`,
        request,
        { remaining: rateLimit.remaining, resetTime: rateLimit.resetTime }
      )
      
      return NextResponse.json(
        { 
          success: false, 
          message: "リクエストが多すぎます。しばらく待ってから再試行してください。" 
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString(),
          }
        }
      )
    }
    
    console.log("=== Webhook処理開始 ===")
    const rawData = await request.json()
    
    // 入力値のサニタイズ
    const sanitizedData = {
      ...rawData,
      attendeeName: sanitizeInput(rawData.attendeeName || ''),
      email: normalizeEmail(rawData.email || ''),
      phone: normalizePhoneNumber(rawData.phone || ''),
      company: rawData.company ? sanitizeInput(rawData.company) : undefined,
      motivation: sanitizeInput(rawData.motivation || ''),
      partnerName: rawData.partnerName ? sanitizeInput(rawData.partnerName) : undefined,
      partnerEmail: rawData.partnerEmail ? normalizeEmail(rawData.partnerEmail) : undefined,
      partnerPhone: rawData.partnerPhone ? normalizePhoneNumber(rawData.partnerPhone) : undefined,
    }
    
    // 入力値検証
    const validationResult = applicationSchema.safeParse(sanitizedData)
    if (!validationResult.success) {
      logSecurityEvent(
        SecurityEvent.INVALID_INPUT,
        "Invalid input validation failed",
        request,
        { errors: validationResult.error.errors }
      )
      
      return NextResponse.json(
        { success: false, message: "入力値が無効です", errors: validationResult.error.errors },
        { status: 400 }
      )
    }
    
    const applicationData = validationResult.data
    console.log("受信したデータ:", JSON.stringify(applicationData, null, 2))

    // 運営側への通知メール内容
    const adminEmailContent = `
新しい申し込みがありました。（決済完了）

【申し込み情報】
料金タイプ: ${applicationData.pricingType === "early" ? "早割価格" : "通常価格"}
割引オプション: ${
      applicationData.discountType === "single"
        ? "通常申し込み"
        : applicationData.discountType === "pair"
          ? "ペア割"
          : applicationData.discountType === "set"
            ? "2日間セット割"
            : applicationData.discountType === "pair-set"
              ? "2日間セット割 + ペア割"
              : ""
    }

【受講者情報】
お名前: ${applicationData.attendeeName}
メールアドレス: ${applicationData.email}
電話番号: ${applicationData.phone}
会社名・屋号: ${applicationData.company || "未記入"}
AI・ITツール使用経験: ${
      applicationData.aiExperience === "beginner"
        ? "初心者（ほとんど使ったことがない）"
        : applicationData.aiExperience === "basic"
          ? "基本レベル（ChatGPTなどを時々使用）"
          : applicationData.aiExperience === "intermediate"
            ? "中級レベル（日常的にAIツールを活用）"
            : applicationData.aiExperience === "advanced"
              ? "上級レベル（業務で積極的に活用している）"
              : ""
    }
受講の動機・期待すること: ${applicationData.motivation}

${
  applicationData.partnerName
    ? `
【ペア受講者情報】
お名前: ${applicationData.partnerName}
メールアドレス: ${applicationData.partnerEmail}
電話番号: ${applicationData.partnerPhone}
`
    : ""
}

【受講日程】
受講希望日: ${applicationData.selectedDate}

【料金情報】
料金: ¥${applicationData.price.toLocaleString()}

【申し込み日時】
${new Date(applicationData.timestamp || new Date()).toLocaleString("ja-JP")}

【同意情報】
利用規約: 同意済み
プライバシーポリシー: 同意済み

---
TOWA 申し込みシステム
Webhook URL: ${request.url}
    `

    // 申込者向けお礼メールの内容
    const thankYouEmailContent = createThankYouEmailContent(applicationData)

    // メール送信処理
    const emailResults = []

    console.log("=== Nodemailerでメール送信開始 ===")

    // 1. 運営側への通知メール送信
    console.log("--- 運営側メール送信 ---")
    const adminResult = await sendEmail(
      process.env.GMAIL_USER || "info@towa-ai.com",
      `【TOWA】新しい申し込み - ${applicationData.attendeeName}様`,
      adminEmailContent
    )
    console.log("管理者メール送信結果:", adminResult)
    emailResults.push({ type: "admin", ...adminResult })

    // 2. 申込者へのお礼メール送信
    console.log("--- 申込者向けメール送信 ---")
    const applicantResult = await sendEmail(
      applicationData.email,
      `【TOWA】お申し込みありがとうございます - ${applicationData.attendeeName}様`,
      thankYouEmailContent
    )
    console.log("申込者メール送信結果:", applicantResult)
    emailResults.push({ type: "applicant", ...applicantResult })

    // 3. ペア受講者へのお礼メール送信（該当する場合）
    if (applicationData.partnerName && applicationData.partnerEmail) {
      console.log("--- ペア受講者向けメール送信 ---")
      const partnerThankYouContent = createThankYouEmailContent({
        ...applicationData,
        attendeeName: applicationData.partnerName,
        email: applicationData.partnerEmail,
      })
      
      const partnerResult = await sendEmail(
        applicationData.partnerEmail,
        `【TOWA】お申し込みありがとうございます - ${applicationData.partnerName}様`,
        partnerThankYouContent
      )
      console.log("ペア受講者メール送信結果:", partnerResult)
      emailResults.push({ type: "partner", ...partnerResult })
    }

    console.log("=== 全メール処理結果 ===")
    console.log("Email results:", emailResults)

    const successCount = emailResults.filter((r) => r.success).length
    const totalCount = emailResults.length

    return NextResponse.json({
      success: true,
      message: `申し込み情報を受信しました。メール送信: ${successCount}/${totalCount}件完了`,
      emailResults: emailResults,
    })
  } catch (error) {
    console.error("=== Webhook処理エラー ===")
    console.error("Error details:", error)
    
    // 本番環境では詳細エラーを隠す
    const errorMessage = process.env.NODE_ENV === "production" 
      ? "申し込み情報の処理に失敗しました" 
      : String(error)
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 },
    )
  }
}
