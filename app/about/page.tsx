"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Heart, Users, Target, Sparkles, Globe, Shield } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function AboutPage() {
  // ページロード時にスクロール位置を上部にリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-blue-900 hover:text-blue-700"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-2xl font-bold">TOWA</span>
          </button>
          <div className="flex items-center gap-2 text-gray-600">
            <Heart className="w-5 h-5" />
            <span>TOWAについて</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Philosophy Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4 flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-blue-600" />
              Philosophy
            </h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  <strong className="text-blue-900">TOWA</strong>
                  （トーワ）という名前には、「永遠＝普遍的な価値や長く続く信頼」、そして"人と人・企業と社会のつながり"を大切にしたいという想いが込められています。
                </p>

                <p>
                  AI や最新テクノロジーを活用しながらも、私たちが目指すのは単なる効率化や一時的な成果ではありません。
                </p>

                <p>
                  「お客様と共に歩み続ける」「成長を変化を支え続ける」——そんな「変わらない価値ある姿勢」を何より大切にしています。
                </p>

                <p>
                  時代や環境がどれだけ変化しても、私たちは、
                  <strong className="text-blue-900">変わらない価値や信頼</strong>を届けていきたい。
                </p>

                <p>お客様や地域社会と、長く・深くつながり続ける存在でありたい。</p>

                <p>
                  そして、日本の<strong className="text-blue-900">"和"</strong>
                  の心を大切に、温かさと安心感のあるパートナーとして歩んでいきたいと願っています。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">私たちの価値観</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">つながり</h3>
                <p className="text-gray-600 leading-relaxed">
                  人と人、企業と社会のつながりを大切にし、長期的な関係性を築いていきます。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">成長支援</h3>
                <p className="text-gray-600 leading-relaxed">
                  お客様の成長と変化を継続的にサポートし、共に歩み続けるパートナーを目指します。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">和の心</h3>
                <p className="text-gray-600 leading-relaxed">
                  日本の"和"の精神を大切にし、温かさと安心感のあるサービスを提供します。
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="text-gray-900 shadow-xl" style={{ backgroundColor: '#f7f4ef' }}>
            <CardContent className="p-8 md:p-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-gray-900" />
                <h2 className="text-3xl font-bold">私たちのミッション</h2>
              </div>
              <p className="text-xl leading-relaxed mb-8 text-gray-700">
                AI技術を活用しながら、変わらない価値と信頼を届け、
                <br />
                お客様と地域社会の持続的な成長を支援する
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/apply">
                  <Button
                    size="lg"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg font-semibold flex items-center gap-2"
                  >
                    <Target className="w-5 h-5" />
                    講座に申し込む
                  </Button>
                </Link>
                <Link href="/line-consultation">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent flex items-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    LINEで相談する
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">お問い合わせ</h3>
              </div>
              <div className="mb-6 text-left max-w-md mx-auto">
                <div className="space-y-2 text-gray-700 text-sm">
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
              </div>
              <p className="text-gray-600 mb-6">
                TOWAについてのご質問やご相談がございましたら、
                <br />
                お気軽にお問い合わせください。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/line-consultation">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    LINEでお問い合わせ
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    トップページに戻る
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
