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
・最低開催人数：3名
・講師2名による手厚いサポート
・実践的なカリキュラムで即戦力スキルを習得

【キャンセル・変更について】
お支払い後のキャンセルは、以下の通り返金対応いたします。

・開催10日前まで：全額返金
・開催9日前〜3日前：受講料の50％を返金
・開催2日前以降：返金不可

※返金はStripeを通じてクレジットカードへ行います。
※返金時、Stripe決済手数料（約3.6%）はご返金対象外となります。
※ご不明な点はお気軽にご連絡ください。

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
}

export async function POST(request: NextRequest) {
  try {
    console.log("=== Webhook処理開始 ===")
    const applicationData = await request.json()
    console.log("受信したデータ:", JSON.stringify(applicationData, null, 2))

    // 運営側への通知メール内容
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

    // メール送信処理（ログ出力のみ）
    const emailResults = []

    console.log("=== メール内容をログに出力 ===")

    // 1. 運営側への通知メール内容をログ出力
    console.log("--- 運営側メール内容 ---")
    console.log(`宛先: info@towa-ai.com`)
    console.log(`件名: 【TOWA】新しい申し込み - ${applicationData.attendeeName}様`)
    console.log(`内容:\n${adminEmailContent}`)
    emailResults.push({ type: "admin", success: true, message: "ログ出力完了" })

    // 2. 申込者へのお礼メール内容をログ出力
    console.log("--- 申込者向けメール内容 ---")
    console.log(`宛先: ${applicationData.email}`)
    console.log(`件名: 【TOWA】お申し込みありがとうございます - ${applicationData.attendeeName}様`)
    console.log(`内容:\n${thankYouEmailContent}`)
    emailResults.push({ type: "applicant", success: true, message: "ログ出力完了" })

    // 3. ペア受講者へのお礼メール内容をログ出力（該当する場合）
    if (applicationData.partnerName && applicationData.partnerEmail) {
      console.log("--- ペア受講者向けメール内容 ---")
      const partnerThankYouContent = createThankYouEmailContent({
        ...applicationData,
        attendeeName: applicationData.partnerName,
        email: applicationData.partnerEmail,
      })
      console.log(`宛先: ${applicationData.partnerEmail}`)
      console.log(`件名: 【TOWA】お申し込みありがとうございます - ${applicationData.partnerName}様`)
      console.log(`内容:\n${partnerThankYouContent}`)
      emailResults.push({ type: "partner", success: true, message: "ログ出力完了" })
    }

    // 4. Zapierのwebhookに送信（無効化：Stripe決済完了後のみ送信するため）
    // await sendToZapier(applicationData, adminEmailContent, thankYouEmailContent)

    console.log("=== 全メール処理結果 ===")
    console.log("Email results:", emailResults)

    const successCount = emailResults.filter((r) => r.success).length
    const totalCount = emailResults.length

    return NextResponse.json({
      success: true,
      message: `申し込み情報を受信しました。メール処理: ${successCount}/${totalCount}件完了（ログ出力のみ）`,
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

// Zapierのwebhookに送信する関数
async function sendToZapier(applicationData: any, adminEmailContent: string, thankYouEmailContent: string) {
  try {
    // ZapierのWebhook URLを環境変数から取得（設定後に使用）
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (!zapierWebhookUrl) {
      console.log("ZapierのWebhook URLが設定されていません")
      return
    }

    const zapierData = {
      // 基本情報
      attendeeName: applicationData.attendeeName,
      attendeeEmail: applicationData.email,
      attendeePhone: applicationData.phone,
      company: applicationData.company || "",
      
      // 受講情報
      selectedDate: applicationData.selectedDate,
      price: applicationData.price,
      pricingType: applicationData.pricingType,
      discountType: applicationData.discountType,
      aiExperience: applicationData.aiExperience,
      motivation: applicationData.motivation,
      
      // ペア情報（該当する場合）
      partnerName: applicationData.partnerName || "",
      partnerEmail: applicationData.partnerEmail || "",
      partnerPhone: applicationData.partnerPhone || "",
      
      // メール内容
      adminEmailContent: adminEmailContent,
      applicantEmailContent: thankYouEmailContent,
      
      // その他
      timestamp: applicationData.timestamp,
      privacyAgreed: applicationData.privacyAgreed,
      termsAgreed: applicationData.termsAgreed,
    }

    console.log("=== Zapierにデータ送信 ===")
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
      console.log("✅ Zapierへの送信成功")
    } else {
      console.error("❌ Zapierへの送信失敗:", response.status, response.statusText)
    }
  } catch (error) {
    console.error("❌ Zapier送信エラー:", error)
  }
}
