import { NextRequest } from "next/server"
import { randomBytes } from "crypto"

// CSRFトークンの生成
export function generateCSRFToken(): string {
  return randomBytes(32).toString('hex')
}

// CSRFトークンの検証
export function validateCSRFToken(request: NextRequest, token: string): boolean {
  const storedToken = request.cookies.get('csrf-token')?.value
  
  if (!storedToken || !token) {
    return false
  }
  
  return storedToken === token
}

// CSRFトークンをレスポンスヘッダーに設定
export function setCSRFToken(response: Response): void {
  const token = generateCSRFToken()
  response.headers.set('X-CSRF-Token', token)
} 