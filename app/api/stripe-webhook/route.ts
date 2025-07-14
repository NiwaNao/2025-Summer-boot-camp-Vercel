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

      // メール処理（ログ出力）
      const emailResult = logApplicationEmails(applicationData)
      console.log("メール処理結果:", emailResult)

      // Zapierに送信
      await sendToZapier(applicationData)

      return NextResponse.json({
        success: true,
        message: "Webhook processed successfully",
        emailResult,
      })
    }

    // その他のイベントは無視
    return NextResponse.json({ success: true, message: "Event ignored" })
  } catch (error) {
    console.error("Webhook processing failed:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}

// Zapierのwebhookに送信する関数
async function sendToZapier(applicationData: any) {
  try {
    // ZapierのWebhook URLを環境変数から取得
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (!zapierWebhookUrl) {
      console.log("ZapierのWebhook URLが設定されていません")
      return
    }

    // 運営側メール内容
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

    // 申込者向けお礼メール内容
    const applicantEmailContent = `
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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOWA（トーワ）- 札幌限定サマーブートキャンプ
運営：株式会社アクロス
Email：info@towa-ai.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `

    const zapierData = {
      // 基本情報
      attendeeName: applicationData.attendeeName,
      attendeeEmail: applicationData.email,
      attendeePhone: applicationData.phone || "未取得",
      company: applicationData.company || "",
      
      // 受講情報
      selectedDate: applicationData.selectedDate,
      price: applicationData.price,
      pricingType: applicationData.pricingType,
      discountType: applicationData.discountType,
      
      // メール内容
      adminEmailContent: adminEmailContent,
      applicantEmailContent: applicantEmailContent,
      
      // その他
      timestamp: applicationData.timestamp,
      source: "stripe_payment_completed"
    }

    console.log("=== Zapierにデータ送信（Stripe決済完了） ===")
    console.log("送信先:", zapierWebhookUrl)
    console.log("送信データ:", JSON.stringify(zapierData, null, 2))

    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zapierData),
    })

    if (response.ok) {
      console.log("✅ Zapierへの送信成功（Stripe決済完了）")
    } else {
      console.error("❌ Zapierへの送信失敗:", response.status, response.statusText)
    }
  } catch (error) {
    console.error("❌ Zapier送信エラー:", error)
  }
}

// メール内容をログに出力する関数
function logApplicationEmails(applicationData: any) {
  try {
    // 運営側への通知メール内容
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

    // 申込者向けお礼メール内容
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

    console.log("=== メール内容をログに出力 ===")

    // 1. 運営側への通知メール内容をログ出力
    console.log("--- 運営側メール内容 ---")
    console.log(`宛先: info@towa-ai.com`)
    console.log(`件名: 【TOWA】Stripe決済完了 - ${applicationData.attendeeName}様`)
    console.log(`内容:\n${adminEmailContent}`)
    emailResults.push({ type: "admin", success: true, message: "ログ出力完了" })

    // 2. 申込者へのお礼メール内容をログ出力
    console.log("--- 申込者向けメール内容 ---")
    console.log(`宛先: ${applicationData.email}`)
    console.log(`件名: 【TOWA】決済完了のお知らせ - ${applicationData.attendeeName}様`)
    console.log(`内容:\n${thankYouEmailContent}`)
    emailResults.push({ type: "applicant", success: true, message: "ログ出力完了" })

    return {
      success: true,
      emailResults: emailResults,
      message: `メール処理完了: ${emailResults.filter((r) => r.success).length}/${emailResults.length}件（ログ出力のみ）`,
    }
  } catch (error) {
    console.error("メール処理エラー:", error)
    return { success: false, error: String(error) }
  }
}
