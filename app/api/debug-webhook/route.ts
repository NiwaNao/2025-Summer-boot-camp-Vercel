import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("=== デバッグWebhook処理開始 ===")
    const applicationData = await request.json()
    console.log("受信したデータ:", JSON.stringify(applicationData, null, 2))

    // デバッグ用のログ出力
    console.log("--- デバッグ用メール内容 ---")
    console.log(`宛先: info@towa-ai.com`)
    console.log(`件名: 【デバッグ】申し込みテスト - ${applicationData.attendeeName}様`)
    console.log(`内容: デバッグ用メール送信テスト`)
    console.log(`申込者: ${applicationData.attendeeName}`)
    console.log(`メール: ${applicationData.email}`)
    console.log(`料金: ¥${applicationData.price}`)

    return NextResponse.json({
      success: true,
      message: "デバッグWebhook処理完了（ログ出力のみ）",
      receivedData: applicationData,
    })
  } catch (error) {
    console.error("デバッグWebhookエラー:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
