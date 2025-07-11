"use server"

interface ApplicationData {
  pricingType: string
  discountType: string
  attendeeName: string
  partnerName?: string
  selectedDate: string
  price: number
  timestamp: string
}

export async function sendApplicationEmail(data: ApplicationData) {
  try {
    // メール送信のロジック（実際の実装では適切なメール送信サービスを使用）
    const emailContent = `
新しい申し込みがありました。

【申し込み情報】
料金タイプ: ${data.pricingType === "early" ? "早割価格" : "通常価格"}
割引オプション: ${
      data.discountType === "single"
        ? "通常申し込み"
        : data.discountType === "pair"
          ? "ペア割"
          : data.discountType === "set"
            ? "2日間セット割"
            : data.discountType === "pair-set"
              ? "2日間セット割 + ペア割"
              : ""
    }
受講者名: ${data.attendeeName}
${data.partnerName ? `ペア受講者名: ${data.partnerName}` : ""}
受講希望日: ${data.selectedDate}
料金: ¥${data.price.toLocaleString()}
申し込み日時: ${new Date(data.timestamp).toLocaleString("ja-JP")}

---
TOWA 申し込みシステム
    `

    // 実際のメール送信処理をここに実装
    // 例: Resend, SendGrid, Nodemailer等を使用
    console.log("Email content:", emailContent)

    return { success: true, message: "メールを送信しました" }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, message: "メール送信に失敗しました" }
  }
}
