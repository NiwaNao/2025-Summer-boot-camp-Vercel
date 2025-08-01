# TOWA Summer Boot camp V0

札幌限定サマーブートキャンプのランディングページです。

## セキュリティ機能

このプロジェクトには以下のセキュリティ機能が実装されています：

### 🔒 実装済みセキュリティ機能

1. **環境変数の適切な管理**
   - 機密情報は環境変数で管理
   - `env.example`ファイルで必要な環境変数を明示

2. **入力値検証とサニタイズ**
   - Zodを使用した型安全な入力値検証
   - XSS攻撃対策のためのサニタイズ機能
   - 電話番号とメールアドレスの正規化

3. **Webhook署名検証**
   - Stripe Webhookの署名検証を強化
   - 開発環境でも署名検証を実行

4. **レート制限**
   - APIエンドポイントへの過度なアクセスを防止
   - 1分間に5回までのリクエスト制限

5. **セキュリティヘッダー**
   - CSP（Content Security Policy）
   - XSS Protection
   - Clickjacking対策
   - HSTS（HTTPS強制）

6. **エラーハンドリング**
   - 本番環境では詳細エラーを隠す
   - 適切なエラーメッセージの提供

### 📋 環境変数の設定

`env.example`ファイルを参考に、以下の環境変数を設定してください：

```bash
# Stripe設定
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Gmail設定（アプリパスワードを使用）
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password_here
GMAIL_FROM_NAME=TOWA運営

# アプリケーション設定
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NODE_ENV=production
```

### 🚀 開発環境の起動

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### 🔧 本番環境へのデプロイ

1. 環境変数を適切に設定
2. Gmailアプリパスワードの設定
3. Stripe Webhook URLの設定
4. HTTPS証明書の設定

### 📊 トラッキング

- Google Analytics
- Microsoft Clarity

### 🔍 セキュリティ監査

定期的に以下の項目を確認してください：

- [ ] 依存関係の脆弱性チェック
- [ ] 環境変数の漏洩確認
- [ ] ログの監視
- [ ] アクセス制御の確認

## 技術スタック

- Next.js 15
- TypeScript
- Tailwind CSS
- Stripe（決済）
- Nodemailer（メール送信）
- Zod（バリデーション）
