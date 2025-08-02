import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// Stripe設定（環境変数チェック強化）
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY not configured")
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
})

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

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()
    debugLog("受信した申込み情報:", applicationData)

    // 価格の設定
    const priceData = {
      currency: "jpy",
      unit_amount: applicationData.price,
      product_data: {
        name: `TOWA夏期ブートキャンプ ${applicationData.selectedDate}`,
        description: `${applicationData.discountType === "pair" ? "ペア割" : 
                     applicationData.discountType === "set" ? "2日間セット割" : 
                     applicationData.discountType === "pair-set" ? "ペア割+2日間セット割" : "通常申込み"}`,
      },
    }

    // 申込み情報をmetadataに含める（Stripe制限: 各値500文字以内）
    const metadata = {
      // 基本情報
      attendeeName: applicationData.attendeeName,
      email: applicationData.email,
      phone: applicationData.phone,
      company: applicationData.company || "",
      // 受講情報
      selectedDate: applicationData.selectedDate,
      pricingType: applicationData.pricingType,
      discountType: applicationData.discountType,
      price: applicationData.price.toString(),
      // 経験・動機
      aiExperience: applicationData.aiExperience,
      motivation: applicationData.motivation.substring(0, 500), // 500文字制限
      // ペア情報
      partnerName: applicationData.partnerName || "",
      partnerEmail: applicationData.partnerEmail || "",
      partnerPhone: applicationData.partnerPhone || "",
      // その他
      timestamp: applicationData.timestamp,
    }

    // Checkout Session作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${applicationData.baseUrl}/payment-success`,
      cancel_url: `${applicationData.baseUrl}/apply`,
      metadata: metadata,
      customer_email: applicationData.email,
    })

    debugLog("Checkout Session作成成功:", session.id)
    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error("Checkout Session作成エラー:", error)
    return NextResponse.json(
      { error: "Checkout Session作成に失敗しました" },
      { status: 500 }
    )
  }
} 