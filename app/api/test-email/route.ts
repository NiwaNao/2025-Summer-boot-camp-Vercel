import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("メール送信テスト開始")
    const RESEND_API_KEY = "re_EnppcCwL_N6fuktQnJRxmEk2aPa235gat"

    console.log(`APIキー: ${RESEND_API_KEY.substring(0, 8)}...`)

    const emailPayload = {
      from: "TOWA <onboarding@resend.dev>",
      to: ["info@towa-ai.com"], // テスト用にinfo@towa-ai.comに送信
      subject: "【テスト】TOWA メール送信テスト",
      text: "これはメール送信のテストです。",
      html: "<p>これはメール送信のテストです。</p><p>このメールが届いていれば、Resend APIが正常に動作しています。</p>",
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
      return NextResponse.json({
        success: true,
        message: "テストメールを送信しました",
        data: result,
      })
    } else {
      console.error("❌ メール送信失敗")
      console.error("エラー詳細:", result)
      return NextResponse.json(
        {
          success: false,
          error: result,
          message: "メール送信に失敗しました",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    console.error("❌ メール送信例外エラー:", error)
    return NextResponse.json(
      {
        success: false,
        error: String(error),
        message: "メール送信中に例外エラーが発生しました",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "メール送信テスト用エンドポイント",
    usage: "POST /api/test-email でテストメールを送信できます",
  })
}
