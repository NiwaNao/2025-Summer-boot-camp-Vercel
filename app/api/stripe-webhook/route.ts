import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import nodemailer from "nodemailer"

// Stripe設定（環境変数が未設定の場合のデフォルト値）
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_build"
const stripe = require("stripe")(stripeSecretKey)

// Nodemailerの設定
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  })
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

      // 管理者向け決済完了通知メール
      const adminNotificationContent = `
Stripe決済が完了しました。

【決済情報】
お名前: ${customerName || "未取得"}
メールアドレス: ${customerEmail || "未取得"}
決済金額: ¥${paymentAmount.toLocaleString()}
決済日時: ${new Date().toLocaleString("ja-JP")}
セッションID: ${session.id}

※ 詳細な申込み情報は、決済完了ページから送信されます。

---
TOWA Stripe Webhook通知
      `

      // 管理者向けメール送信
      const adminResult = await sendEmail(
        process.env.GMAIL_USER || "info@towa-ai.com",
        `【TOWA】Stripe決済完了 - ${customerName || "申込者"}様`,
        adminNotificationContent
      )

      console.log("管理者向け決済通知メール送信結果:", adminResult)

      return NextResponse.json({
        success: true,
        message: "Webhook processed successfully",
        emailResult: adminResult,
      })
    }

    // その他のイベントは無視
    return NextResponse.json({ success: true, message: "Event ignored" })
  } catch (error) {
    console.error("Webhook processing failed:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
