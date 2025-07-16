"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Target, Award, Sparkles, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect } from "react"

export default function TeamPage() {
  // ページロード時にスクロール位置を上部にリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-blue-900 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-2xl font-bold">TOWA</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5" />
            <span>チーム紹介</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-6 flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-blue-600" />
            About Us
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Our Vision */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                  <Target className="w-8 h-8" />
                  私たちが目指す未来
                </h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  AIは、特別な人のための難しい技術ではありません。正しく、そして等身大で使えれば、企業にも個人にも、大きな変化のきっかけをもたらす力になります。
                </p>
                <p>
                  <strong className="text-blue-200">TOWA</strong>
                  では、単なる効率化や自動化にとどまらず、現場に根ざしたAIの使い方や、組織全体が少しずつ変わっていける"仕組み"の構築を大切にしています。
                </p>
                <p>
                  誰か一人のスキルに頼るのではなく、現場ごとの状況に合わせて、一緒に考え、前に進むための土台づくりを支援しています。
                </p>
                <p>
                  そして何より、AIというツールを"手段"として、人や企業の
                  <strong className="text-blue-200">「想い」や「可能性」</strong>
                  を、形にする存在でありたい。それが、私たち<strong className="text-blue-200">TOWA</strong>
                  の目指す姿です。
                </p>
                <p className="text-center text-xl font-semibold mt-8">
                  人生にも、事業にも、「もう一度やり直したい」「次のフェーズへ進みたい」と感じるタイミングがあります。そこには
                  <strong className="text-blue-200">もう一度輝ける力</strong>があると、私たちは信じています。
                </p>
                <p className="text-center text-lg">
                  <strong className="text-blue-200">TOWA</strong>
                  は、そんな再出発や変化の時期に寄り添いながら、AIの力と人の力をつなげて、次の一歩をともに見つけていく存在でありたいと願っています。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Member Profiles */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 flex items-center justify-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              運営メンバー紹介
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Nao Niwa Profile */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <div className="bg-green-600 text-white p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white/30">
                  <Image
                    src="/images/member-nao-photo.png"
                    alt="丹羽ナオ"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold">丹羽 ナオ</h3>
                <p className="text-green-100 text-lg">(Nao Niwa)</p>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-green-100 text-green-800 px-4 py-2 text-sm font-semibold mb-2">
                    株式会社アクロス 代表
                  </Badge>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>AIアドバイザー</p>
                    <p>my artkit. 創業者</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong>慶應義塾大学卒。</strong>
                    外資系企業での貿易業務・マーケティングを経て、国際プリスクールを創業・11年経営（後にM&A売却）。
                    現在は株式会社アクロス代表として、アート体験とAI活用支援の2軸で、企業・個人の
                    <strong className="text-green-700">"再起動"</strong>を支援中。
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-green-600" />
                    <span>AIパスポート取得 / 札幌在住</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Kenjiro Matsunaga Profile */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <div className="bg-blue-600 text-white p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-white/30">
                  <Image
                    src="/images/member_ken_photo1.png"
                    alt="松永健二郎"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold">松永健二郎</h3>
                <p className="text-blue-100 text-lg">(Kenjiro Matsunaga)</p>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>某大企業AIアンバサダー</p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    <strong>城西大学卒。</strong>
                    独立リーグや社会人野球で20年間にわたり野球一筋の道を歩み、26歳でキャリアを転換し、現在は北海道にて会社員としてビジネスの世界に挑戦中。
                  </p>
                  <p>
                    現在は、某大企業のAIアンバサダーとして、社内の
                    <strong className="text-blue-700">業務改善・変革推進</strong>にも力を注いでいます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gray-50 border-0">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Rocket className="w-8 h-8 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">私たちと一緒に学びませんか？</h3>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                AIを活用して、あなたのビジネスや人生を次のステージへ。
                <br />
                札幌限定サマーブートキャンプで、実践的なスキルを身につけましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/apply" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Target className="w-5 h-5" />
                    講座に申し込む
                  </Button>
                </Link>
                <Link href="/line-consultation" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
                  >
                    <Users className="w-5 h-5" />
                    LINEで相談する
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
