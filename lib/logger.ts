import { NextRequest } from "next/server"

// ログレベル
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  SECURITY = 'SECURITY'
}

// セキュリティイベントの種類
export enum SecurityEvent {
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_INPUT = 'INVALID_INPUT',
  WEBHOOK_VERIFICATION_FAILED = 'WEBHOOK_VERIFICATION_FAILED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY'
}

// ログエントリの型定義
interface LogEntry {
  timestamp: string
  level: LogLevel
  event?: SecurityEvent
  message: string
  ip?: string
  userAgent?: string
  requestId?: string
  metadata?: Record<string, any>
}

// セキュリティログの出力
export function logSecurityEvent(
  event: SecurityEvent,
  message: string,
  request?: NextRequest,
  metadata?: Record<string, any>
): void {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level: LogLevel.SECURITY,
    event,
    message,
    ip: request?.ip || 'unknown',
    userAgent: request?.headers.get('user-agent') || 'unknown',
    metadata
  }
  
  // 本番環境では外部ログサービスに送信
  if (process.env.NODE_ENV === 'production') {
    // TODO: 外部ログサービス（例：Sentry、LogRocket）への送信
    console.error('SECURITY EVENT:', JSON.stringify(logEntry, null, 2))
  } else {
    console.log('SECURITY EVENT:', JSON.stringify(logEntry, null, 2))
  }
}

// 一般的なログ出力
export function log(level: LogLevel, message: string, metadata?: Record<string, any>): void {
  const logEntry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    metadata
  }
  
  switch (level) {
    case LogLevel.ERROR:
      console.error(JSON.stringify(logEntry, null, 2))
      break
    case LogLevel.WARN:
      console.warn(JSON.stringify(logEntry, null, 2))
      break
    default:
      console.log(JSON.stringify(logEntry, null, 2))
  }
} 