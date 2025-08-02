import { z } from "zod"

// 申し込みデータの検証スキーマ
export const applicationSchema = z.object({
  pricingType: z.enum(["early", "regular"]),
  discountType: z.enum(["single", "pair", "set", "pair-set"]),
  selectedDate: z.string().min(1, "受講日を選択してください"),
  attendeeName: z.string().min(1, "お名前を入力してください").max(100, "お名前は100文字以内で入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  phone: z.string().min(10, "電話番号を正しく入力してください").max(15, "電話番号は15文字以内で入力してください"),
  company: z.string().max(100, "会社名は100文字以内で入力してください").optional(),
  aiExperience: z.enum(["beginner", "basic", "intermediate", "advanced"]),
  motivation: z.string().min(10, "受講動機は10文字以上で入力してください").max(500, "受講動機は500文字以内で入力してください"),
  partnerName: z.string().max(100, "ペア受講者名は100文字以内で入力してください").optional(),
  partnerEmail: z.string().email("有効なメールアドレスを入力してください").optional(),
  partnerPhone: z.string().min(10, "電話番号を正しく入力してください").max(15, "電話番号は15文字以内で入力してください").optional(),
  privacyAgreed: z.boolean().refine(val => val === true, "プライバシーポリシーに同意してください"),
  termsAgreed: z.boolean().refine(val => val === true, "利用規約に同意してください"),
  price: z.number().min(0, "料金は0以上である必要があります"),
  timestamp: z.string().optional(),
})

// 入力値のサニタイズ関数
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // HTMLタグの除去
    .replace(/javascript:/gi, '') // JavaScriptプロトコルの除去
    .trim()
}

// XSS対策のためのエスケープ関数
export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// 電話番号の正規化
export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '')
}

// メールアドレスの正規化
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim()
} 