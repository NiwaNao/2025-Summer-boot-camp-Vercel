import { type NextRequest, NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("メール送信テスト開始（ログ出力のみ）")

    const emailContent = {
      from: "TOWA <info@towa-ai.com>",
      to: ["info@towa-ai.com"],
      subject: "【テスト】メール送信テスト",
      text: "これはメール送信のテストです。",
      html: "<p>これはメール送信のテストです。</p>",
    }

    console.log("--- テスト用メール内容 ---")
    console.log(`送信元: ${emailContent.from}`)
    console.log(`宛先: ${emailContent.to.join(", ")}`)
    console.log(`件名: ${emailContent.subject}`)
    console.log(`内容: ${emailContent.text}`)

    return NextResponse.json({
      success: true,
      message: "メール送信テスト完了（ログ出力のみ）",
      emailContent,
    })
  } catch (error) {
    console.error("メール送信テストエラー:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "メール送信テスト用エンドポイント",
    usage: "POST /api/test-email でテストメールを送信できます",
  })
}
