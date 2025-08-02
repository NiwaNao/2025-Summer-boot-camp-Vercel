// 環境変数の検証
export function validateEnvironmentVariables(): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  const required = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'GMAIL_USER',
    'GMAIL_APP_PASSWORD',
    'GMAIL_FROM_NAME'
  ]
  
  for (const envVar of required) {
    if (!process.env[envVar]) {
      errors.push(`Missing required environment variable: ${envVar}`)
    }
  }
  
  // Stripeキーの形式チェック
  if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    errors.push('STRIPE_SECRET_KEY format is invalid')
  }
  
  // Gmailアドレスの形式チェック
  if (process.env.GMAIL_USER && !process.env.GMAIL_USER.includes('@gmail.com')) {
    errors.push('GMAIL_USER must be a valid Gmail address')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

// アプリケーション起動時の環境変数チェック
export function checkEnvironmentOnStartup(): void {
  const validation = validateEnvironmentVariables()
  
  if (!validation.valid) {
    console.error('Environment validation failed:')
    validation.errors.forEach(error => console.error(`  - ${error}`))
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Critical environment variables are missing')
    }
  }
} 