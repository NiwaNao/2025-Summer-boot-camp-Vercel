import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("=== デバッグWebhook処理開始 ===")
    const applicationData = await request.json()
    console.log("受信したデータ:", JSON.stringify(applicationData, null, 2))

    // 簡単なテスト用メール送信
    const RESEND_API_KEY = "re_EnppcCwL_N6fuktQnJRxmEk2aPa235gat"

    const emailPayload = {
      from: "TOWA <onboarding@resend.dev>",
      to: ["info@towa-ai.com"],
      subject: `【デバッグ】申し込みテスト - ${applicationData.attendeeName}様`,
      text: `デバッグ用メール送信テスト\n\n申込者: ${applicationData.attendeeName}\nメール: ${applicationData.email}\n料金: ¥${applicationData.price}`,
      html: `<p>デバッグ用メール送信テスト</p><p>申込者: ${applicationData.attendeeName}<br>メール: ${applicationData.email}<br>料金: ¥${applicationData.price}</p>`,
    }

    console.log("メール送信開始...")
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    const result = await response.json()
    console.log("メール送信結果:", result)

    return NextResponse.json({
      success: true,
      message: "デバッグWebhook処理完了",
      emailResult: result,
      receivedData: applicationData,
    })
  } catch (error) {
    console.error("デバッグWebhookエラー:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
