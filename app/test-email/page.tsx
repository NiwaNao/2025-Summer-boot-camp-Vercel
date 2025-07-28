"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TestEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const sendTestEmail = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: String(error),
        message: "リクエスト送信中にエラーが発生しました",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => {
              try {
                if (document.referrer && document.referrer !== window.location.href) {
                  window.history.back()
                } else {
                  window.location.href = '/'
                }
              } catch (error) {
                window.location.href = '/'
              }
            }} 
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-2xl font-bold">TOWA</span>
          </button>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-5 h-5" />
            <span>メール送信テスト</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📧 <span className="text-blue-900">メール送信テスト</span>
          </h1>
          <p className="text-gray-600">Resend APIの動作確認用ページです</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-blue-600" />
              テストメール送信
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">テスト内容</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 送信先: info@towa-ai.com</li>
                <li>• 件名: 【テスト】TOWA メール送信テスト</li>
                <li>• APIキー: re_Uxq9jsrp_EB6Vx2CR6pLhQ9X6MuJ6ypg4</li>
                <li>• 送信元: TOWA &lt;onboarding@resend.dev&gt;</li>
              </ul>
            </div>

            <div className="text-center">
              <Button
                onClick={sendTestEmail}
                disabled={isLoading}
                size="lg"
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    送信中...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    テストメール送信
                  </>
                )}
              </Button>
            </div>

            {result && (
              <Card
                className={`border-2 ${result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {result.success ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h3 className={`font-bold ${result.success ? "text-green-900" : "text-red-900"}`}>
                      {result.success ? "送信成功" : "送信失敗"}
                    </h3>
                  </div>

                  <p className={`mb-3 ${result.success ? "text-green-800" : "text-red-800"}`}>{result.message}</p>

                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-semibold text-gray-700 hover:text-gray-900">
                      詳細情報を表示
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </details>
                </CardContent>
              </Card>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-semibold text-yellow-800 mb-2">確認ポイント</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>1. このテストが成功した場合 → Resend APIは正常に動作</li>
                <li>2. このテストが失敗した場合 → APIキーまたは設定に問題</li>
                <li>3. 成功後はResendダッシュボードの「メール」タブで送信履歴を確認</li>
                <li>4. info@towa-ai.comでメール受信を確認</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/apply">
            <Button variant="outline" size="lg" className="px-8 py-4 bg-transparent">
              申し込みページに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
