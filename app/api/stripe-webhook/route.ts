import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

// Stripe設定（環境変数が未設定の場合のデフォルト値）
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_build"
const stripe = require("stripe")(stripeSecretKey)

export async function POST(request: NextRequest) {
  try {
    console.log("=== Stripe Webhook受信 ===")

    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    let event

    try {
      // Stripe Webhookの署名検証（本番環境では必須）
      // 開発環境では署名検証をスキップ
      if (process.env.STRIPE_WEBHOOK_SECRET) {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
      } else {
        event = JSON.parse(body)
      }
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
    }

    console.log("Stripe Event Type:", event.type)
    console.log("Event Data:", JSON.stringify(event.data, null, 2))

    // checkout.session.completedイベントを処理
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      console.log("Checkout Session:", session)

      // セッションから決済情報を取得
      const paymentAmount = session.amount_total / 100 // セントから円に変換
      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name

      console.log(`決済完了: ${customerName} (${customerEmail}) - ¥${paymentAmount}`)

      // ローカルストレージのデータは取得できないため、
      // セッションのメタデータまたは別の方法で申し込み情報を取得する必要がある

      // 仮の申し込み情報（実際の実装では、セッション作成時にメタデータを設定）
      const applicationData = {
        attendeeName: customerName || "申込者",
        email: customerEmail || "unknown@example.com",
        phone: "未取得",
        company: "",
        aiExperience: "未取得",
        motivation: "Stripe決済完了",
        partnerName: "",
        partnerEmail: "",
        partnerPhone: "",
        selectedDate: "未選択",
        price: paymentAmount,
        timestamp: new Date().toISOString(),
        pricingType: paymentAmount === 21800 ? "early" : "regular",
        discountType: "single", // 仮の値
        privacyAgreed: true,
        termsAgreed: true,
      }

      // メール送信処理を実行
      const emailResult = await sendApplicationEmails(applicationData)
      console.log("メール送信結果:", emailResult)

      return NextResponse.json({
        success: true,
        message: "Webhook processed successfully",
        emailResult,
      })
    }

    // その他のイベントは無視
    return NextResponse.json({ success: true, message: "Event ignored" })
  } catch (error) {
    console.error("Stripe Webhook処理エラー:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

// メール送信関数
async function sendApplicationEmails(applicationData: any) {
  try {
    const RESEND_API_KEY = "re_Uxq9jsrp_EB6Vx2CR6pLhQ9X6MuJ6ypg4"

    // 運営側への通知メール
    const adminEmailContent = `
新しい申し込みがありました。（Stripe決済完了）

【申し込み情報】
お名前: ${applicationData.attendeeName}
メールアドレス: ${applicationData.email}
料金: ¥${applicationData.price.toLocaleString()}
決済日時: ${new Date(applicationData.timestamp).toLocaleString("ja-JP")}

※ 詳細な申し込み情報は、通常の申し込みフォームからの情報が必要です。

---
TOWA Stripe Webhook通知
    `

    // 申込者向けお礼メール
    const thankYouEmailContent = `
${applicationData.attendeeName} 様

この度は、TOWA札幌限定サマーブートキャンプにお申し込みいただき、誠にありがとうございます。
決済が完了しましたので、ご確認ください。

【決済情報】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ お名前：${applicationData.attendeeName} 様
■ メールアドレス：${applicationData.email}
■ 決済金額：¥${applicationData.price.toLocaleString()}
■ 決済日時：${new Date(applicationData.timestamp).toLocaleString("ja-JP")}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【今後の流れ】
1. 詳細な会場情報を24時間以内にメールでお送りします
2. 講座開始1週間前に、事前準備に関するご案内をお送りします
3. 講座前日に最終確認のご連絡をいたします

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

    const emailResults = []

    // 1. 運営側への通知メール
    const adminEmailResponse = await sendEmail({
      to: "info@towa-ai.com",
      subject: `【TOWA】Stripe決済完了 - ${applicationData.attendeeName}様`,
      text: adminEmailContent,
      html: adminEmailContent.replace(/\n/g, "<br>"),
    })
    emailResults.push({ type: "admin", success: adminEmailResponse.success, error: adminEmailResponse.error })

    // 2. 申込者へのお礼メール
    const applicantEmailResponse = await sendEmail({
      to: applicationData.email,
      subject: `【TOWA】決済完了のお知らせ - ${applicationData.attendeeName}様`,
      text: thankYouEmailContent,
      html: thankYouEmailContent.replace(/\n/g, "<br>"),
    })
    emailResults.push({
      type: "applicant",
      success: applicantEmailResponse.success,
      error: applicantEmailResponse.error,
    })

    return {
      success: true,
      emailResults: emailResults,
      message: `メール送信完了: ${emailResults.filter((r) => r.success).length}/${emailResults.length}件成功`,
    }
  } catch (error) {
    console.error("メール送信エラー:", error)
    return { success: false, error: String(error) }
  }
}

// Resendを使用したメール送信関数
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
    const RESEND_API_KEY = "re_Uxq9jsrp_EB6Vx2CR6pLhQ9X6MuJ6ypg4"

    const emailPayload = {
      from: "TOWA <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      text: text,
      html: html,
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    const result = await response.json()

    if (response.ok) {
      console.log("✅ メール送信成功:", result)
      return { success: true, data: result }
    } else {
      console.error("❌ メール送信失敗:", result)
      return { success: false, error: result }
    }
  } catch (error) {
    console.error("❌ メール送信例外エラー:", error)
    return { success: false, error: String(error) }
  }
}
