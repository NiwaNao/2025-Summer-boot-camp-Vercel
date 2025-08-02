import { NextRequest } from "next/server"

// シンプルなメモリベースのレート制限
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  request: NextRequest,
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 1分
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const key = `${identifier}:${request.ip || 'unknown'}`
  
  const current = rateLimitMap.get(key)
  
  if (!current || now > current.resetTime) {
    // 新しいウィンドウを開始
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs }
  }
  
  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime }
  }
  
  // カウントを増加
  current.count++
  rateLimitMap.set(key, current)
  
  return { 
    allowed: true, 
    remaining: maxRequests - current.count, 
    resetTime: current.resetTime 
  }
}

// 古いエントリをクリーンアップ（メモリリーク防止）
export function cleanupRateLimit(): void {
  const now = Date.now()
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key)
    }
  }
}

// 定期的にクリーンアップを実行
setInterval(cleanupRateLimit, 60000) // 1分ごと 