import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import nodemailer from "nodemailer"

// Stripe設定（環境変数が未設定の場合のデフォルト値）
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "sk_test_dummy_key_for_build"
const stripe = require("stripe")(stripeSecretKey)

// デバッグログ制御
const isDevelopment = process.env.NODE_ENV === "development"
const debugLog = (message: string, data?: any) => {
  if (isDevelopment) {
    if (data) {
      console.log(message, data)
    } else {
      console.log(message)
    }
  }
}

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
    debugLog('メール送信成功:', { messageId: info.messageId, to })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('メール送信エラー:', error)
    return { success: false, error: String(error) }
  }
}

export async function POST(request: NextRequest) {
  try {
    debugLog("=== Stripe Webhook受信 ===")

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

    debugLog("Stripe Event Type:", event.type)
    debugLog("Event Data:", JSON.stringify(event.data, null, 2))

    // checkout.session.completedイベントを処理
    if (event.type === "checkout.session.completed") {
      const session = event.data.object
      debugLog("Checkout Session:", session)

      // セッションから決済情報を取得
      const paymentAmount = session.amount_total // 日本円はセント単位ではない
      const customerEmail = session.customer_details?.email
      const customerName = session.customer_details?.name

      debugLog(`決済完了: ${customerName} (${customerEmail}) - ¥${paymentAmount}`)

      // 決済完了ログ出力（開発環境のみ）
      debugLog("=== Stripe決済完了 ===")
      debugLog(`お名前: ${customerName || "未取得"}`)
      debugLog(`メールアドレス: ${customerEmail || "未取得"}`)
      debugLog(`決済金額: ¥${paymentAmount.toLocaleString()}`)
      debugLog(`決済日時: ${new Date().toLocaleString("ja-JP")}`)
      debugLog(`セッションID: ${session.id}`)

      // metadataから申込み情報を取得
      const metadata = session.metadata || {}
      debugLog("Metadata:", metadata)

      // 申込み情報を再構築
      const applicationData = {
        pricingType: metadata.pricingType,
        discountType: metadata.discountType,
        attendeeName: metadata.attendeeName,
        email: metadata.email,
        phone: metadata.phone,
        company: metadata.company,
        aiExperience: metadata.aiExperience,
        motivation: metadata.motivation,
        partnerName: metadata.partnerName,
        partnerEmail: metadata.partnerEmail,
        partnerPhone: metadata.partnerPhone,
        selectedDate: metadata.selectedDate,
        price: parseInt(metadata.price),
        timestamp: metadata.timestamp,
        privacyAgreed: true,
        termsAgreed: true,
      }

      debugLog("再構築した申込み情報:", applicationData)

      // 申込み情報を含むメール送信
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "https://summer-bootcamp.towa-ai.com"}/api/webhook/application`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applicationData),
        })

        const emailResult = await response.json()
        debugLog("メール送信結果:", emailResult)

      return NextResponse.json({
        success: true,
          message: "Webhook processed successfully with email sent",
          paymentAmount: paymentAmount,
          customerName: customerName,
          customerEmail: customerEmail,
          emailResult: emailResult,
      })
      } catch (error) {
        console.error("メール送信エラー:", error)
        return NextResponse.json({
          success: false,
          message: "メール送信に失敗しました",
          error: String(error),
        })
      }
    }

    // その他のイベントは無視
    return NextResponse.json({ success: true, message: "Event ignored" })
  } catch (error) {
    console.error("Webhook processing failed:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
