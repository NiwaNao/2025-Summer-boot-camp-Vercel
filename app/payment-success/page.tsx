"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function PaymentSuccessPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ローカルストレージから古いデータがあれば削除
    const savedData = localStorage.getItem("towaApplication")
    if (savedData) {
      localStorage.removeItem("towaApplication")
    }
    
    // 少し遅延を入れてローディング状態を解除
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    // ページロード時にスクロール位置を上部にリセット
    window.scrollTo(0, 0)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">決済情報を確認しています...</p>
            <p className="text-sm text-gray-500 mt-2">しばらくお待ちください。</p>
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

        {/* お申し込み完了カード */}
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

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-bold text-blue-900">次のステップ</h3>
              </div>
              <div className="space-y-3 text-sm text-blue-800">
                <p>✅ 決済完了（Stripe領収書メールをご確認ください）</p>
                <p className="text-green-600 font-semibold">✅ お申し込み完了メールを送信しました</p>
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

        {/* アクションボタン */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/line-consultation">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 w-full sm:w-auto">
                <Mail className="w-5 h-5" />
                LINEで質問する
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 text-lg font-semibold w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              トップページに戻る
            </Button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">📞 お問い合わせ</h3>
            <p className="text-sm text-blue-800">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
            <div className="mt-2 text-sm text-blue-700">
              <p>📧 Email: info@towa-ai.com</p>
              <p>📱 LINE: @towa-ai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
