"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  BookOpen,
  Calendar,
  MapPin,
  Flame,
  ClipboardList,
  HelpCircle,
  Target,
  MessageCircle,
  Rocket,
  X,
  Plus,
  Minus,
} from "lucide-react"
import Link from "next/link"

export default function HighConvertingLP() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      // 早割終了日時: 2025年7月31日 23:59:59
      // より確実な方法で日付を設定
      const endDate = new Date('July 31, 2025 23:59:59')
      const now = new Date()
      
      // デバッグ用ログ
      console.log('現在時刻:', now.toLocaleString('ja-JP'))
      console.log('終了日時:', endDate.toLocaleString('ja-JP'))
      
      const difference = endDate.getTime() - now.getTime()
      console.log('差分(ミリ秒):', difference)
      console.log('差分(日):', difference / (1000 * 60 * 60 * 24))

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        console.log('計算結果:', { days, hours, minutes, seconds })
        return { days, hours, minutes, seconds }
      } else {
        console.log('終了日を過ぎています')
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
    }

    // 初期値を設定
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToCTA = () => {
    document.getElementById("main-cta")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen mobile-safe">
      {/* Header */}
      <header className="bg-white shadow-sm border-b relative z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">TOWA</div>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/about">
              <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-4">
                TOWAについて
              </Button>
            </Link>
            <Link href="/team">
              <Button variant="outline" size="sm" className="text-xs md:text-sm px-2 md:px-4">
                About Us
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Urgency Banner */}
      <div className="bg-red-600 text-white py-2 text-center relative z-10">
        <div className="flex items-center justify-center gap-1 md:gap-2 text-xs md:text-sm font-medium px-2">
          <Clock className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          <span className="break-words-force">
            早割終了まで残り: {timeLeft.days}日 {timeLeft.hours}時間 {timeLeft.minutes}分 {timeLeft.seconds}秒
          </span>
        </div>
      </div>

      {/* Hero Section with Background Image */}
      <section
        className="py-16 px-4 relative min-h-[80vh] flex items-center bg-hero-mobile md:bg-hero-desktop"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%), url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1E03E4AD-FFFF-4FAE-8D9D-DBCAB7585ED2-Z4g4PqPnDXUGnycUu1qGlbK1f2DUXN.png')`,
          backgroundSize: "cover",
          backgroundPosition: isMobile ? "center 30%" : "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10"></div>

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <div className="flex justify-center mb-6 animate-bounce-gentle">
            <Badge className="bg-red-100/90 text-red-800 px-4 py-2 text-lg font-semibold backdrop-blur-sm flex items-center gap-2 shadow-lg">
              <Flame className="w-5 h-5 animate-pulse" />
              札幌限定 | 各回8名の超少人数制
            </Badge>
          </div>

          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight drop-shadow-2xl break-words-force animate-float">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-8 shadow-xl">
              SNSの発信、つづいてますか？
              <br />
              <span className="text-lg md:text-2xl lg:text-3xl">
                業務に追われて、本当にやりたいことができていますか？
              </span>
              <br />
              <span className="text-blue-100 text-base md:text-xl lg:text-2xl mt-4 block">
                札幌限定｜AIで「発信」も「業務」も効率化できる1日集中講座
              </span>
            </div>
          </h1>

          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 mb-8 animate-fade-in-up shadow-lg">
            <p className="text-base md:text-lg text-white leading-relaxed">
              選べる2講座（SNS運用／業務自動化）で、あなたの課題にピンポイントでアプローチ。
              <br />
              <span className="text-blue-100 text-sm md:text-base mt-2 block">
                「秋から変わる自分」をこの夏、手に入れましょう。
              </span>
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <Link href="/line-consultation">
              <Button
                size="lg"
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-110 transition-all flex items-center gap-2 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                LINEで相談する
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm text-white">
            <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 hover:bg-white/40 transition-all cursor-pointer shadow-lg">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200 flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">各回8名の超少人数制</span>
            </div>
            <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 hover:bg-white/40 transition-all cursor-pointer shadow-lg">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-200 flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">講師2名で手厚くサポート</span>
            </div>
            <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 hover:bg-white/40 transition-all cursor-pointer shadow-lg">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-200 flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">実践的なカリキュラム</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - 問題提起を先に */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-900">
            <span className="block mb-2">個人事業主、副業、店舗運営者…</span>
            <span className="text-red-600 whitespace-nowrap">こんなお悩みを抱えて、手が止まっていませんか？</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              "SNSを始めたけど、投稿が3日坊主で続かない...",
              "毎日の業務に追われて、マーケティングまで手が回らない",
              "競合他社がどんどん先に行ってしまう焦り",
              "AIツールは知ってるけど、使い方が分からない",
              "売上アップの方法が分からず、現状維持が精一杯",
              "時間をかけても成果が出ない作業ばかり",
            ].map((problem, index) => {
              // 左側のカードは左からスライドイン、右側のカードは右からスライドイン
              const isLeftColumn = index % 2 === 0
              const slideDirection = isLeftColumn ? 'animate-slide-in-left' : 'animate-slide-in-right'
              const delay = index * 0.2 // 0.2秒ずつ遅延
              
              return (
                <Card 
                  key={index} 
                  className={`border-l-4 border-l-blue-500 bg-white hover:shadow-lg transition-shadow ${slideDirection}`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{problem}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center">
            <p className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              <span className="block mb-2">でも、もう大丈夫です。</span>
              <span className="text-blue-900 block mb-2 whitespace-nowrap">講師2名が8名の受講生を手厚くサポート。</span>
              <span className="text-blue-900 whitespace-nowrap">AIの力で、これらの悩みを解決する方法を学べます！</span>
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2"
                onClick={scrollToCTA}
              >
                解決方法を今すぐ知る
                <Rocket className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Selection Guide - お悩みセクションの後に追加 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              <span className="text-blue-900 whitespace-nowrap">どちらの講座があなたにぴったり？</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-2">
              <span className="whitespace-nowrap">あなたの課題に合わせて、最適な講座をお選びください</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
            {/* SNS講座ガイド */}
            <Card className="bg-blue-50 border-2 border-blue-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-2">SNSで困っている方</h3>
                  <p className="text-sm sm:text-base text-blue-700">発信・マーケティングの課題を解決</p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">SNS投稿が続かない、ネタが思い浮かばない</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">投稿しても反応が少ない、集客につながらない</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">画像作成や文章作成に時間がかかりすぎる</span>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold w-full mb-3 sm:mb-4"
                    onClick={() => document.getElementById("sns-course")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    AI × SNS運用講座の詳細を見る
                  </Button>
                  <p className="text-xs sm:text-sm text-blue-600">→ 継続できるSNS運用の仕組みを構築</p>
                </div>
              </CardContent>
            </Card>

            {/* GAS講座ガイド */}
            <Card className="bg-green-50 border-2 border-green-200 hover:shadow-xl transition-shadow">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-2">業務で困っている方</h3>
                  <p className="text-sm sm:text-base text-green-700">日常業務の自動化で効率アップ</p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">毎日の繰り返し作業に時間を取られている</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">予約管理や在庫管理が手作業で大変</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">データ入力やメール送信を自動化したい</span>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold w-full mb-3 sm:mb-4"
                    onClick={() => document.getElementById("gas-course")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    AI × GAS自動化講座の詳細を見る
                  </Button>
                  <p className="text-xs sm:text-sm text-green-600">→ 自分専用の自動化システムを構築</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">どちらを選ぶか迷っている方は、LINEでお気軽にご相談ください</p>
            <div className="flex justify-center px-4">
              <Link href="/line-consultation" className="w-full sm:w-auto max-w-sm">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold bg-transparent flex items-center gap-2 w-full justify-center"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  LINEで講座選びを相談する
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Selection - 問題提起の後に解決策を提示 */}
      <section id="sns-course" className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white flex-shrink-0" />
              <span className="whitespace-nowrap">2つの実践講座から選べます</span>
            </div>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-blue-600 text-white px-4 py-2 text-lg font-bold mb-4 group-hover:bg-blue-500 transition-colors">
                    ① AI × SNS運用講座（1日）
                  </Badge>
                </div>
                <p className="text-white mb-6 leading-relaxed group-hover:text-blue-100 transition-colors">
                  ChatGPTとCanva
                  AIで投稿作成を劇的に効率化。継続できる仕組みを1日で構築し、成果の出るSNS運用を実現します。
                </p>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-2 group-hover:text-blue-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>SNS発信に迷わない「投稿テーマテンプレート」</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-blue-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>Canva AIによる画像・投稿文の一括作成</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-blue-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>反応が取れる投稿構成の習得</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-blue-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>継続できるAI活用の仕組み作り</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card id="gas-course" className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Badge className="bg-green-600 text-white px-4 py-2 text-lg font-bold mb-4 group-hover:bg-green-500 transition-colors">
                    ② AI × GAS自動化講座（1日）
                  </Badge>
                </div>
                <p className="text-white mb-6 leading-relaxed group-hover:text-green-100 transition-colors">
                  コーディング未経験でも大丈夫。生成AIとGASで予約・在庫管理などの業務を自動化し、自分専用システムを構築します。
                </p>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-2 group-hover:text-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>コピペで応用できる「自動化プロンプト集」</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>フォーム〜カレンダー連携の自動化技術</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>AIにコードを生成させる思考法を習得</span>
                  </li>
                  <li className="flex items-start gap-2 group-hover:text-green-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:text-green-300 transition-colors" />
                    <span>自分専用の自動化システムを構築できる</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* オフライン開催の価値セクション - Course Selectionの後に追加 */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              なぜ、あえて<span className="text-blue-900">「オフライン開催」</span>なのか？
            </h2>
            <p className="text-lg text-gray-600">
              オンライン講座が主流の今だからこそ、対面でしか得られない価値があります
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">講師が直接サポート</h3>
                <p className="text-gray-600 leading-relaxed">
                  画面越しでは分からない細かな操作も、講師が直接あなたのPCを見ながら指導。つまずいても即座に解決できます。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">リアルタイム質問解決</h3>
                <p className="text-gray-600 leading-relaxed">
                  「今、ここが分からない」をその場で解決。オンラインのような「後で質問します」がありません。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">集中できる環境</h3>
                <p className="text-gray-600 leading-relaxed">
                  自宅の誘惑（家事、TV、スマホ）から離れ、学習だけに集中。同じ目標を持つ仲間と一緒だからモチベーションも維持できます。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">札幌の仲間とのつながり</h3>
                <p className="text-gray-600 leading-relaxed">
                  同じ地域で頑張る仲間との出会い。講座後も続く人脈やビジネスパートナーとの出会いがあるかもしれません。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">確実な学習完了</h3>
                <p className="text-gray-600 leading-relaxed">
                  オンラインでありがちな「途中で離脱」「ながら受講」がありません。1日でしっかりとスキルを身につけて帰れます。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">札幌限定の特別感</h3>
                <p className="text-gray-600 leading-relaxed">
                  全国どこでも受けられるオンライン講座とは違う、札幌だけの貴重な機会。地域に根ざした実践的な内容も学べます。
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 w-full sm:w-auto"
                >
                  対面講座に申し込む
                  <Target className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/line-consultation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent flex items-center gap-2 w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  詳しく相談する
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 講師紹介セクション */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              👥 <span className="text-blue-900">経験豊富な講師2名がサポート</span>
            </h2>
            <p className="text-lg text-gray-600">実務経験豊富な専門家が、あなたの学びを手厚くサポートします</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">講師2名体制</h3>
                <p className="text-gray-600 leading-relaxed">
                  メイン講師とサポート講師の2名体制で、受講生一人ひとりに丁寧に対応します。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">実務経験豊富</h3>
                <p className="text-gray-600 leading-relaxed">
                  実際にAIを活用してビジネスを運営している専門家が、実践的なノウハウを直接指導します。
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">質問しやすい環境</h3>
                <p className="text-gray-600 leading-relaxed">
                  少人数制だから、分からないことはその場で気軽に質問できます。一人ひとりに寄り添います。
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">講師の詳しいプロフィールや経歴については、こちらをご覧ください</p>
            <div className="flex justify-center">
              <Link href="/team">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  講師紹介を見る
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center gap-3">
            <Calendar className="w-8 h-8 text-blue-900" />
            <span className="text-blue-900">開催日程</span>
          </h2>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-900 text-white p-4">
              <h3 className="text-xl font-bold text-center">8月開催スケジュール</h3>
            </div>

            <div className="divide-y divide-gray-200">
              {[
{ date: "8月11日（月・祝）", course: "AI×GAS自動化講座", time: "10:00〜17:50" },
{ date: "8月12日（火）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
{ date: "8月13日（水）", course: "AI×GAS自動化講座", time: "10:00〜17:50" },
{ date: "8月16日（土）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
{ date: "8月24日（土）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
{ date: "8月30日（土）", course: "AI×GAS自動化講座", time: "10:00〜17:50" },
{ date: "8月31日（日）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
              ].map((session, index) => (
                <div key={index} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                  <div className="grid md:grid-cols-3 gap-2 md:gap-4 items-center">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0" />
                      <span className="font-bold text-base md:text-lg text-gray-900 break-words-force">{session.date}</span>
                    </div>
                    <div className="text-sm md:text-base text-gray-700 break-words-force">{session.course}</div>
                    <div className="flex items-center gap-1 md:gap-2">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0" />
                      <Badge className="bg-blue-100 text-blue-800 font-mono text-xs md:text-sm">{session.time}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Card className="bg-yellow-50 border-yellow-200 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-yellow-800">会場情報</h3>
                </div>
                <div className="text-left space-y-2 text-yellow-700">
                  <p>
                    <strong>会場：</strong>札幌駅近郊セミナールーム（主にEZOHUB SAPPORO）
                  </p>
                  <p>
                    <strong>定員：</strong>各回8名（超少人数制）
                  </p>
                  <p>
                    <strong>講師：</strong>2名体制で手厚くサポート
                  </p>
                  <p>
                    <strong>持ち物：</strong>ノートPC、筆記用具
                  </p>
                  <p>
                    <strong>昼食：</strong>各自持参（近隣にコンビニ・飲食店あり）
                  </p>
                  <p className="text-sm">※ 申し込み後、詳細な場所をご連絡します</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Schedule Sections */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center gap-3">
            <ClipboardList className="w-8 h-8 text-blue-900" />
            <span className="text-blue-900">詳細スケジュール</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* SNS Course Schedule */}
            <Card className="bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="bg-blue-600 group-hover:bg-blue-500 text-white p-4 transition-colors duration-300">
                <h3 className="text-xl font-bold text-center group-hover:text-blue-100 transition-colors duration-300">① AI × SNS運用講座</h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-blue-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">基礎理解とマインドセット</h4>
                      <Badge className="bg-blue-100 text-blue-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">10:00-12:00</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      オリエンテーション、ChatGPTと生成AIの基本、SNS運用にAIが必要な理由と成功する思考法、発信が"続く人"になるマインドセットと仕組み化。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-blue-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">昼食休憩</h4>
                      <Badge className="bg-blue-100 text-blue-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">12:00-13:00</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-blue-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">投稿テーマ設計と文章生成</h4>
                      <Badge className="bg-blue-100 text-blue-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">13:00-14:30</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      ChatGPTを活用した投稿テーマの設計とテンプレート作成方法、X（旧Twitter）で『反応が取れる構成』の作り方、ABテストを見越したプロンプトの応用テクニック。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-blue-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">ビジュアルと一括作成</h4>
                      <Badge className="bg-blue-100 text-blue-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">14:30-15:30</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Canva Magic Studioを使った画像と投稿文の一括作成、主要SNS（X,
                      Instagram）に合わせたビジュアル設計の実践。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-blue-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">実践と継続プランニング</h4>
                      <Badge className="bg-blue-100 text-blue-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">15:30-16:50</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      作成した投稿の相互添削と改善ワーク、日々の運用を効率化する計画、まとめと『これからの継続プラン』の策定。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GAS Course Schedule */}
            <Card className="bg-white shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <div className="bg-green-600 group-hover:bg-green-500 text-white p-4 transition-colors duration-300">
                <h3 className="text-xl font-bold text-center group-hover:text-green-100 transition-colors duration-300">② AI × GAS自動化講座</h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-green-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">生成AIとGASの基礎</h4>
                      <Badge className="bg-green-100 text-green-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">10:00-12:00</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      オリエンテーション、GeminiとChatGPTの違い、Geminiを使ったスプレッドシート+GAS設計体験を学びます。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-green-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">昼食休憩</h4>
                      <Badge className="bg-green-100 text-green-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">12:00-13:00</Badge>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-green-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">実践①：在庫管理システムの構築</h4>
                      <Badge className="bg-green-100 text-green-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">13:00-14:30</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      GASで在庫管理システムを作成。自動入力、在庫アラート付きシート、トリガー設定による自動実行などを実装します。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-green-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">実践②：予約システムの自動化</h4>
                      <Badge className="bg-green-100 text-green-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">14:30-16:30</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      プロジェクト形式で『喫茶店の予約自動化』に挑戦。Googleフォームとカレンダーを連携し、Gemini×GASで予約受付からメールの自動送信までを実装します。
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <h4 className="font-bold text-green-900 text-sm sm:text-base whitespace-nowrap flex-shrink-0">応用と発展</h4>
                      <Badge className="bg-green-100 text-green-800 font-mono text-xs sm:text-sm whitespace-nowrap flex-shrink-0">16:30-17:50</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      LINE Messaging
                      APIの概要を学び、予約完了通知をLINEに送る体験をします。最後に、今後のAI活用提案や個別アドバイスで学びを締めくくります。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="col-span-full mt-8">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-yellow-800 text-sm">
                  ※ より良い学びの提供のため、当日の進行や参加者のニーズに応じて内容を調整させていただく場合があります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-900" />
            <span className="text-blue-900">よくあるご質問</span>
          </h2>

          <div className="space-y-4 mb-12">
            {[
              {
                question: "パソコンが苦手な完全な初心者でも大丈夫ですか？",
                answer:
                  "はい、大丈夫です。本講座はPCの基本操作（タイピング、マウス操作）ができれば問題なくご参加いただけます。W講師体制で手厚くサポートしますのでご安心ください。",
              },
              {
                question: "持ち物は何が必要ですか？",
                answer:
                  "ご自身のノートパソコン（Windows/Mac問わず）と、Googleアカウントをご用意ください。講座はWi-Fi環境の整った会場で行います。",
              },
              {
                question: "講座の費用は経費にできますか？",
                answer:
                  "はい、事業に関わる研修費用として経費計上が可能です。領収書も発行いたしますので、お申し込み時にお申し付けください。",
              },
              {
                question: "ChatGPTの有料版（Plus）に登録する必要はありますか？",
                answer:
                  "いいえ、無料版のChatGPTでご参加いただけます。講座内で有料版との違いや、必要になった場合のメリットなども解説します。",
              },
              {
                question: "講座後のサポートはありますか？",
                answer:
                  "はい、講座終了後も1ヶ月間はLINEでのご質問サポートを行います。学んだ内容を実践する際の疑問点などお気軽にご相談ください。",
              },
              {
                question: "欠席した場合の振替はできますか？",
                answer:
                  "やむを得ない事情での欠席の場合、他の開催日への振替が可能です（空席がある場合に限ります）。お早めにご連絡ください。",
              },
            ].map((faq, index) => (
              <Card key={index} className="border border-gray-200">
                <Collapsible open={openFAQ === index} onOpenChange={() => setOpenFAQ(openFAQ === index ? null : index)}>
                  <CollapsibleTrigger asChild>
                    <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            Q
                          </div>
                          {faq.question}
                        </h3>
                        {openFAQ === index ? (
                          <Minus className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Plus className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-6 pb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-gray-700 leading-relaxed flex items-start gap-3">
                          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                            A
                          </div>
                          <span>{faq.answer}</span>
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">その他のご質問がございましたら、お気軽にお問い合わせください</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/line-consultation">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 w-full sm:w-auto"
                >
                  <MessageCircle className="w-5 h-5" />
                  LINEで質問する
                </Button>
              </Link>
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 w-full sm:w-auto"
                >
                  <Target className="w-5 h-5" />
                  申し込みフォームへ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 flex items-center justify-center gap-3">
            <span className="text-blue-900 text-4xl font-bold">¥</span>
            <span className="text-blue-900">料金プラン</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 通常価格 */}
            <Card className="border-2 border-gray-300 relative">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">通常価格</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">¥29,800 / コース</div>

                <div className="grid gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-gray-600 font-bold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      ペア割
                    </div>
                    <div className="text-gray-900 font-bold">お一人様 ¥5,000 OFF</div>
                    <div className="text-sm text-gray-700">（¥24,800 / 人）</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-gray-600 font-bold mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      2日間セット割
                    </div>
                    <div className="text-gray-900 font-bold">合計 ¥13,000 OFF</div>
                    <div className="text-sm text-gray-700">（合計¥46,600）</div>
                  </div>
                </div>

                <ul className="text-left space-y-2 text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>1日集中講座（7-8時間）</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>講師2名による手厚いサポート</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>講座資料・テンプレート集</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>事前ヒアリングで課題に合わせた内容</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>各回8名の超少人数制</span>
                  </li>
                </ul>

                <p className="text-gray-600 text-sm mb-4">8月1日以降のお申し込み</p>
              </CardContent>
            </Card>

            {/* 早割価格 */}
            <Card className="border-4 border-blue-600 relative transform scale-105 animate-glow-border">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-600 text-white px-4 py-2 text-lg font-bold flex items-center gap-2 animate-badge-pulse">
                  <Flame className="w-4 h-4" />
                  早割実施中
                </Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">早割価格</h3>
                <div className="text-lg text-gray-500 line-through mb-2">通常 ¥29,800</div>
                <div className="bg-red-50 rounded-lg p-6 mb-6">
                  <div className="text-red-600 font-bold text-lg mb-2 flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    早割（7月末までのお申込）
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">¥8,000 OFF</div>
                  <div className="text-4xl font-bold text-red-600">¥21,800 / コース</div>
                </div>

                <div className="grid gap-4 mb-6">
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-red-600 font-bold mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      ペア割
                    </div>
                    <div className="text-red-900 font-bold">お一人様 ¥5,000 OFF</div>
                    <div className="text-sm text-red-700">（¥16,800 / 人）</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-red-600 font-bold mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      2日間セット割
                    </div>
                    <div className="text-red-900 font-bold">合計 ¥13,000 OFF</div>
                    <div className="text-sm text-red-700">（合計¥30,600）</div>
                  </div>
                </div>

                <ul className="text-left space-y-2 text-gray-700 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>1日集中講座（7-8時間）</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>講師2名による手厚いサポート</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>講座資料・テンプレート集</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>事前ヒアリングで課題に合わせた内容</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>各回8名の超少人数制</span>
                  </li>
                </ul>

                <p className="text-red-600 font-bold text-sm mb-4">7月末までのお申し込み限定</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-lg text-gray-700 mb-4">
              <strong className="text-red-600">残り{timeLeft.days}日</strong>で早割価格終了
            </p>
            <div className="flex justify-center">
              <Link href="/apply">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2"
                >
                  今すぐ早割で申し込む
                  <Target className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main CTA Section */}
      <section id="main-cta" className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400 flex-shrink-0" />
              <span className="whitespace-nowrap">今すぐ行動して、スキルアップしませんか？</span>
            </div>
          </h2>

          <p className="text-xl mb-6 opacity-90">
            早割価格は、あと<strong>{timeLeft.days}日</strong>で終了します。
            <br />
            各回8名の超少人数制のため、お早めにお申し込みください。
          </p>

          <div className="flex flex-col items-center space-y-4">
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 animate-bounce-cta"
              >
                <Target className="w-6 h-6" />
                今すぐ申し込む（早割価格）
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/line-consultation">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold bg-transparent flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  LINEで相談する
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Push */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">最後に、あなたに質問があります。</h2>

          <div className="text-lg space-y-4 mb-8">
            <p>1年後、あなたはどちらの人生を送っていたいですか？</p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <Card className="bg-white border-gray-200 p-6">
                <CardContent className="text-gray-800">
                  <h3 className="font-bold text-red-600 mb-4 flex items-center gap-2">
                    <X className="w-5 h-5 text-red-500" />
                    行動しなかった場合
                  </h3>
                  <ul className="text-left space-y-2 text-sm text-gray-700">
                    <li>• 相変わらず時間に追われる毎日</li>
                    <li>• 競合に差をつけられ続ける</li>
                    <li>• 非効率な作業の繰り返し</li>
                    <li>• AIの波に乗り遅れて取り残される</li>
                    <li>• 「あの時行動していれば...」という後悔</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 p-6">
                <CardContent className="text-gray-800">
                  <h3 className="font-bold text-green-600 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    今すぐ行動した場合
                  </h3>
                  <ul className="text-left space-y-2 text-sm text-gray-700">
                    <li>• 時間に余裕のある充実した毎日</li>
                    <li>• 最新技術を活用した効率的な業務</li>
                    <li>• 新しいスキルによる成長実感</li>
                    <li>• AIを味方につけた最先端のビジネス</li>
                    <li>• 「行動して良かった」という達成感</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <p className="text-lg sm:text-xl mb-8">
            <span className="block mb-2">選択は、あなた次第です。</span>
            <span className="whitespace-nowrap">でも、<strong className="text-blue-400">行動できるチャンスは今だけ</strong>です。</span>
          </p>

          <div className="text-center">
            <Link href="/apply">
              <Button
                size="lg"
                className="bg-blue-900 hover:bg-blue-800 text-white px-12 py-6 text-xl font-bold shadow-xl transform hover:scale-110 transition-all mx-auto animate-action-button"
              >
                <div className="flex items-center justify-center gap-2">
                  <Rocket className="w-6 h-6" />
                  今すぐ行動を起こす
                  <ArrowRight className="w-6 h-6" />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-4">TOWA</div>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>運営会社：株式会社アクロス</p>
                <p>〒107-0061 東京都港区北青山1-3-1</p>
                <p>アールキューブ青山 3F</p>
                <p>運営拠点：東京・札幌</p>
                <p>Email: info@towa-ai.com</p>
              </div>
            </div>
            <div className="text-right">
              <div className="space-y-2">
                <Link href="/terms" className="block text-gray-400 hover:text-white text-sm">
                  利用規約
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white text-sm">
                  プライバシーポリシー
                </Link>
                <Link href="/about" className="block text-gray-400 hover:text-white text-sm">
                  TOWAについて
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p className="text-gray-400 text-sm">© 2025 TOWA. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-4 right-2 md:right-4 z-50 animate-bounce-gentle">
        <Link href="/apply">
          <Button className="bg-blue-900 hover:bg-blue-800 text-white px-4 md:px-6 py-2 md:py-3 rounded-full shadow-xl animate-scale-pulse flex items-center gap-1 md:gap-2 text-sm md:text-base hover:shadow-2xl transition-all">
            <Target className="w-3 h-3 md:w-4 md:h-4" />
            申し込む
          </Button>
        </Link>
      </div>
    </div>
  )
}
