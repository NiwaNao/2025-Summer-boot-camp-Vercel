"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MessageCircle, Clock, CheckCircle, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"

export default function LineConsultationPage() {
  // ページロード時にスクロール位置を上部にリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleLineRedirect = () => {
    // 正しいLINE公式アカウントのURLに更新
    window.open("https://lin.ee/tjGDXcN", "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
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
          <Badge className="bg-green-100 text-green-800 px-3 py-1">💬 LINE相談</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            💬 <span className="text-green-600">LINEで気軽に相談</span>
          </h1>
          <p className="text-gray-600 text-lg">講座に関するご質問やお悩みを、LINEで気軽にご相談ください</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* LINE相談の特徴 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <MessageCircle className="w-6 h-6" />
                  LINE相談の特徴
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">24時間いつでも相談可能</h3>
                    <p className="text-sm text-gray-600">お忙しい方でも、空いた時間にご相談いただけます</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">専門スタッフが対応</h3>
                    <p className="text-sm text-gray-600">AI・IT分野の専門知識を持つスタッフがお答えします</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">個別カウンセリング</h3>
                    <p className="text-sm text-gray-600">あなたの状況に合わせた最適な講座をご提案</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold">無料相談</h3>
                    <p className="text-sm text-gray-600">相談は完全無料。お気軽にお声がけください</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Clock className="w-6 h-6" />
                  対応時間
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">平日</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">土日祝</span>
                    <span>10:00 - 17:00</span>
                  </div>
                  <hr />
                  <p className="text-sm text-gray-600">
                    ※ 上記時間外でもメッセージをお送りいただけます。翌営業日にご返信いたします。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* LINE友だち追加 */}
          <div className="space-y-6">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-green-700">🎯 今すぐLINEで相談する</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                    <Image
                      src="/images/line-qr-code.png"
                      alt="TOWA LINE公式アカウント QRコード"
                      width={192}
                      height={192}
                      className="rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">上のQRコードを読み取るか、下のボタンをクリック</p>
                </div>

                <Button
                  onClick={handleLineRedirect}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-bold w-full"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  LINE友だち追加
                </Button>

                <div className="text-sm text-gray-600">
                  <p>
                    LINE ID: <strong>@towa-ai</strong>
                  </p>
                  <p>※ 上記IDで検索してもご利用いただけます</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">よくある相談内容</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>どちらの講座が自分に合っているか分からない</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>AI初心者でも大丈夫か心配</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>具体的にどんなスキルが身につくのか知りたい</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>受講後のサポートについて</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>支払い方法や割引について</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500">•</span>
                    <span>会場へのアクセス方法</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 講座概要 */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-center text-blue-900">📚 講座概要（再確認）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center">
                <Badge className="bg-blue-600 text-white px-4 py-2 text-lg font-bold mb-4">① AI × SNS運用講座</Badge>
                <ul className="text-sm text-left space-y-2">
                  <li>• ChatGPT活用術</li>
                  <li>• Canva AI画像作成</li>
                  <li>• 投稿テンプレート作成</li>
                  <li>• 継続の仕組み構築</li>
                </ul>
              </div>
              <div className="text-center">
                <Badge className="bg-green-600 text-white px-4 py-2 text-lg font-bold mb-4">② AI × GAS自動化講座</Badge>
                <ul className="text-sm text-left space-y-2">
                  <li>• Google Apps Script基礎</li>
                  <li>• 在庫管理システム構築</li>
                  <li>• 予約システム自動化</li>
                  <li>• LINE連携実装</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-6">
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>各回8名限定</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>講師2名体制</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>1日集中講座</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 申し込みへの誘導 */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">相談後、納得いただけましたら正式なお申し込みへお進みください</p>
          <Link href="/apply">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold">
              📝 正式申し込みはこちら
            </Button>
          </Link>
        </div>

        {/* 運営会社情報 */}
        <Card className="mt-8 bg-gray-50 border-gray-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-4">運営会社情報</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <strong>運営会社：</strong>株式会社アクロス
              </p>
              <p>
                <strong>事業名：</strong>TOWA
              </p>
              <p>
                <strong>所在地：</strong>〒107-0061 東京都港区北青山1-3-1 アールキューブ青山 3F
              </p>
              <p>
                <strong>運営拠点：</strong>東京・札幌
              </p>
              <p>
                <strong>Email：</strong>info@towa-ai.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
