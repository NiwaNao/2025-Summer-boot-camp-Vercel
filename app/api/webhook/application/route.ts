import { type NextRequest, NextResponse } from "next/server"

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
・講師2名による手厚いサポート
・実践的なカリキュラムで即戦力スキルを習得

【キャンセル・変更について】
お支払い後のキャンセルは、以下の通り返金対応いたします。

・開催7日前まで：全額返金
・開催6日前〜3日前：受講料の50％を返金
・開催2日前以降：返金不可

※返金はStripeを通じてクレジットカードへ行います。
※返金時、Stripe決済手数料（約3.6%）はご返金対象外となります。
※ご不明な点はお気軽にご連絡ください。

【ご質問・お問い合わせ】
何かご不明な点がございましたら、お気軽にお問い合わせください。

📧 Email：info@towa-ai.com
📱 LINE：@towa-ai（https://lin.ee/tjGDXcN）

講座当日、${applicationData.attendeeName}様にお会いできることを楽しみにしております。
AIを活用したスキルアップで、新しい可能性を一緒に見つけましょう！

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOWA（トーワ）- 札幌限定サマーブートキャンプ
運営：株式会社アクロス
〒107-0061 東京都港区北青山1-3-1 アールキューブ青山 3F
運営拠点：東京・札幌
Email：info@towa-ai.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Webhook処理開始 ===")
    const applicationData = await request.json()
    console.log("受信したデータ:", JSON.stringify(applicationData, null, 2))

    // 運営側への通知メール
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
${new Date(applicationData.timestamp).toLocaleString("ja-JP")}

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

    console.log("=== メール送信開始 ===")

    // 1. 運営側への通知メール
    console.log("運営側メール送信中...")
    const adminEmailResponse = await sendEmail({
      to: "info@towa-ai.com",
      subject: `【TOWA】新しい申し込み - ${applicationData.attendeeName}様`,
      text: adminEmailContent,
      html: adminEmailContent.replace(/\n/g, "<br>").replace(/\s{2,}/g, " "),
    })
    emailResults.push({ type: "admin", success: adminEmailResponse.success, error: adminEmailResponse.error })
    console.log("運営側メール結果:", adminEmailResponse)

    // 2. 申込者へのお礼メール
    console.log("申込者メール送信中...")
    const applicantEmailResponse = await sendEmail({
      to: applicationData.email,
      subject: `【TOWA】お申し込みありがとうございます - ${applicationData.attendeeName}様`,
      text: thankYouEmailContent,
      html: thankYouEmailContent.replace(/\n/g, "<br>").replace(/\s{2,}/g, " "),
    })
    emailResults.push({
      type: "applicant",
      success: applicantEmailResponse.success,
      error: applicantEmailResponse.error,
    })
    console.log("申込者メール結果:", applicantEmailResponse)

    // 3. ペア受講者へのお礼メール（該当する場合）
    if (applicationData.partnerName && applicationData.partnerEmail) {
      console.log("ペア受講者メール送信中...")
      const partnerThankYouContent = createThankYouEmailContent({
        ...applicationData,
        attendeeName: applicationData.partnerName,
        email: applicationData.partnerEmail,
      })

      const partnerEmailResponse = await sendEmail({
        to: applicationData.partnerEmail,
        subject: `【TOWA】お申し込みありがとうございます - ${applicationData.partnerName}様`,
        text: partnerThankYouContent,
        html: partnerThankYouContent.replace(/\n/g, "<br>").replace(/\s{2,}/g, " "),
      })
      emailResults.push({ type: "partner", success: partnerEmailResponse.success, error: partnerEmailResponse.error })
      console.log("ペア受講者メール結果:", partnerEmailResponse)
    }

    console.log("=== 全メール送信結果 ===")
    console.log("Email results:", emailResults)

    // メール送信が失敗してもWebhook自体は成功として扱う
    const successCount = emailResults.filter((r) => r.success).length
    const totalCount = emailResults.length

    return NextResponse.json({
      success: true,
      message: `申し込み情報を受信しました。メール送信: ${successCount}/${totalCount}件成功`,
      emailResults: emailResults,
    })
  } catch (error) {
    console.error("=== Webhook処理エラー ===")
    console.error("Error details:", error)
    return NextResponse.json(
      { success: false, message: "申し込み情報の処理に失敗しました", error: String(error) },
      { status: 500 },
    )
  }
}

// Resendを使用したメール送信関数（新しいAPIキーを使用）
async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string
  subject: string
  text: string
  html: string
}) {
  try {
    // 新しいAPIキーを使用
    const RESEND_API_KEY = process.env.RESEND_API_KEY || "re_EnppcCwL_N6fuktQnJRxmEk2aPa235gat"

    console.log(`--- メール送信試行 ---`)
    console.log(`宛先: ${to}`)
    console.log(`件名: ${subject}`)
    console.log(`APIキー: ${RESEND_API_KEY.substring(0, 8)}...`)

    const emailPayload = {
      from: "TOWA <onboarding@resend.dev>", // Resendのデフォルト送信元
      to: [to],
      subject: subject,
      text: text,
      html: html,
    }

    console.log("送信ペイロード:", JSON.stringify(emailPayload, null, 2))

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    console.log(`レスポンスステータス: ${response.status}`)

    const result = await response.json()
    console.log("レスポンス内容:", JSON.stringify(result, null, 2))

    if (response.ok) {
      console.log("✅ メール送信成功")
      return { success: true, data: result }
    } else {
      console.error("❌ メール送信失敗")
      console.error("エラー詳細:", result)
      return { success: false, error: result }
    }
  } catch (error) {
    console.error("❌ メール送信例外エラー:", error)
    return { success: false, error: String(error) }
  }
}
