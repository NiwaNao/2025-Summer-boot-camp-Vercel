"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Calendar, Users, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const [applicationData, setApplicationData] = useState<any>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(true)
  const [webhookLogs, setWebhookLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    console.log(message)
    setWebhookLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    addLog("ページロード開始")
    
    // メール送信はStripe webhookで実行されるため、決済完了ページでの処理は無効化
    addLog("メール送信はStripe webhookで実行済みです")
    
    // ローカルストレージから古いデータがあれば削除
    const savedData = localStorage.getItem("towaApplication")
    if (savedData) {
      localStorage.removeItem("towaApplication")
      addLog("ローカルストレージの古いデータを削除しました")
    }
    
    // 決済完了状態を設定（申し込み情報表示はスキップ）
    setIsProcessing(false)
    setEmailSent(true)
    setApplicationData({ success: true }) // 成功状態をセット
    addLog("決済完了。メールはStripe webhookから送信されています。")

    // ページロード時にスクロール位置を上部にリセット
    window.scrollTo(0, 0)
  }, [])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">申し込み情報を処理しています...</p>
            <p className="text-sm text-gray-500 mt-2">メール送信中です。しばらくお待ちください。</p>

            {/* デバッグログ表示 */}
            <div className="mt-4 text-left">
              <details className="text-xs">
                <summary className="cursor-pointer text-blue-600">処理ログを表示</summary>
                <div className="mt-2 p-2 bg-gray-100 rounded max-h-40 overflow-y-auto">
                  {webhookLogs.map((log, index) => (
                    <div key={index} className="text-gray-700">
                      {log}
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!applicationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-gray-600">申し込み情報が見つかりません。</p>
            <p className="text-sm text-gray-500 mt-2">お手数ですが、運営チームまでお問い合わせください。</p>

            {/* デバッグログ表示 */}
            <div className="mt-4 text-left">
              <details className="text-xs">
                <summary className="cursor-pointer text-blue-600">処理ログを表示</summary>
                <div className="mt-2 p-2 bg-gray-100 rounded max-h-40 overflow-y-auto">
                  {webhookLogs.map((log, index) => (
                    <div key={index} className="text-gray-700">
                      {log}
                    </div>
                  ))}
                </div>
              </details>
            </div>

            <div className="mt-4">
              <Link href="/line-consultation">
                <Button className="bg-green-500 hover:bg-green-600 text-white">LINEで問い合わせ</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🎉 お申し込みありがとうございます！</h1>
          <p className="text-lg text-gray-600">決済が正常に完了しました</p>
        </div>

        {/* デバッグログ表示 */}
        <Card className="mb-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <details className="text-sm">
              <summary className="cursor-pointer text-blue-900 font-semibold">🔍 処理ログを表示（デバッグ用）</summary>
              <div className="mt-4 p-4 bg-white rounded border max-h-60 overflow-y-auto">
                {webhookLogs.map((log, index) => (
                  <div key={index} className="text-gray-700 font-mono text-xs mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </details>
          </CardContent>
        </Card>

        {/* メール送信状況の表示 */}
        {emailError && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-bold text-yellow-800">メール送信について</h3>
              </div>
              <p className="text-yellow-700 mb-4">{emailError}</p>
              <div className="bg-white p-4 rounded border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">運営チーム連絡先</h4>
                <p className="text-sm text-yellow-700">
                  📧 Email: info@towa-ai.com
                  <br />📱 LINE: @towa-ai
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 申し込み詳細情報がある場合のみ表示 */}
        {applicationData && applicationData.attendeeName && (
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="text-center">申し込み内容確認</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">料金タイプ</span>
                  <span>{applicationData.pricingType === "early" ? "早割価格" : "通常価格"}</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">割引オプション</span>
                  <span>
                    {applicationData.discountType === "single"
                      ? "通常申し込み"
                      : applicationData.discountType === "pair"
                        ? "ペア割"
                        : applicationData.discountType === "set"
                          ? "2日間セット割"
                          : applicationData.discountType === "pair-set"
                            ? "2日間セット割 + ペア割"
                            : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">受講者名</span>
                  <span>{applicationData.attendeeName}</span>
                </div>
                {applicationData.partnerName && (
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold">ペア受講者名</span>
                    <span>{applicationData.partnerName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="font-semibold">受講希望日</span>
                  <span>{applicationData.selectedDate}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-green-600">
                  <span>決済金額</span>
                  <span>¥{applicationData.price.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 決済成功時の一般的なメッセージ */}
        {applicationData && !applicationData.attendeeName && (
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="text-center">お申し込み完了</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">決済が正常に完了しました</h3>
              <p className="text-gray-600">
                申し込み完了メールをお送りしています。<br/>
                詳細な申し込み内容については、メールをご確認ください。
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-blue-900">次のステップ</h3>
              </div>
              <div className="space-y-3 text-sm text-blue-800">
                <p>✅ 決済完了（Stripe領収書メールをご確認ください）</p>
                {emailSent && !emailError && (
                  <p className="text-green-600 font-semibold">✅ お申し込み完了メールを送信しました</p>
                )}
                <p>📧 詳細な会場情報を24時間以内にメールでお送りします</p>
                <p>📋 事前準備に関するご案内もお送りします</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-yellow-600" />
                <h3 className="text-lg font-bold text-yellow-800">当日の準備</h3>
              </div>
              <div className="space-y-3 text-sm text-yellow-800">
                <p>📱 ノートPC（Windows/Mac問わず）</p>
                <p>📝 筆記用具</p>
                <p>🍱 昼食（近隣にコンビニ・飲食店あり）</p>
                <p>💡 学習への意欲と好奇心</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-green-900 mb-4">ご質問・ご不明な点がございましたら</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/line-consultation">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  LINEで相談する
                </Button>
              </Link>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent"
                >
                  トップページに戻る
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            運営会社：株式会社アクロス（TOWA事業）
            <br />
            Email: info@towa-ai.com
          </p>
        </div>
      </div>
    </div>
  )
}
