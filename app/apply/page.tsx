"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MapPin, CheckCircle, CreditCard, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ApplyPage() {
  // ページロード時にスクロール位置を上部にリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // フォーム状態管理
  const [pricingType, setPricingType] = useState("")
  const [discountType, setDiscountType] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [attendeeName, setAttendeeName] = useState("")
  const [partnerName, setPartnerName] = useState("")

  // フォーム状態管理の部分に追加
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [company, setCompany] = useState("")
  const [aiExperience, setAiExperience] = useState("")
  const [motivation, setMotivation] = useState("")
  const [partnerEmail, setPartnerEmail] = useState("")
  const [partnerPhone, setPartnerPhone] = useState("")

  // フォーム状態管理の部分に追加
  const [privacyAgreed, setPrivacyAgreed] = useState(false)
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)



  // 料金計算
  const calculatePrice = () => {
    let price = 0
    let originalPrice = 0

    if (discountType === "single") {
      if (pricingType === "early") {
        price = 21800
        originalPrice = 29800
      } else {
        price = 29800
        originalPrice = 29800
      }
    } else if (discountType === "pair") {
      price = 33600 // 2人分の合計金額
      originalPrice = pricingType === "early" ? 43600 : 59600 // 通常価格の2人分
    } else if (discountType === "set") {
      price = 30600 // 2日セット割（早割価格のみ）
      originalPrice = pricingType === "early" ? 43600 : 59600 // 通常価格の2日分
    } else if (discountType === "pair-set") {
      price = 61200 // 2日セット割をペアで受講（2人 × ¥30,600）
      originalPrice = pricingType === "early" ? 87200 : 119200 // 通常価格の2人 × 2日分
    }

    return { price, originalPrice, discount: originalPrice - price }
  }

  // Stripe Checkout Sessionを作成
  const createCheckoutSession = async (applicationData: any) => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })

      if (!response.ok) {
        throw new Error("Checkout Session作成に失敗しました")
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Checkout Session作成エラー:", error)
      throw error
    }
  }

  // Webhookにデータを送信する関数
  const sendToWebhook = async (applicationData: any) => {
    try {
      const response = await fetch("/api/webhook/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Webhook送信エラー:", error)
      return { success: false, error }
    }
  }

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // バリデーション部分を更新
    if (
      !pricingType ||
      !discountType ||
      !attendeeName ||
      !email ||
      !phone ||
      !aiExperience ||
      !motivation ||
      !selectedDate ||
      !privacyAgreed ||
      !termsAgreed
    ) {
      alert("必須項目をすべて入力し、利用規約とプライバシーポリシーに同意してください")
      setIsSubmitting(false)
      return
    }

    if ((discountType === "pair" || discountType === "pair-set") && (!partnerName || !partnerEmail || !partnerPhone)) {
      alert("ペア受講者の情報をすべて入力してください")
      setIsSubmitting(false)
      return
    }

    const { price } = calculatePrice()

    // 申し込み情報を作成
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://summer-bootcamp.towa-ai.com"
    
    const applicationData = {
      pricingType,
      discountType,
      attendeeName,
      email,
      phone,
      company,
      aiExperience,
      motivation,
      partnerName: discountType === "pair" || discountType === "pair-set" ? partnerName : "",
      partnerEmail: discountType === "pair" || discountType === "pair-set" ? partnerEmail : "",
      partnerPhone: discountType === "pair" || discountType === "pair-set" ? partnerPhone : "",
      selectedDate,
      price,
      timestamp: new Date().toISOString(),
      privacyAgreed,
      termsAgreed,
      baseUrl,
    }

    try {
      console.log("申し込み処理開始:", applicationData)

      // Stripe Checkout Sessionを作成
      const session = await createCheckoutSession(applicationData)
      console.log("Checkout Session作成成功:", session)

      if (session.url) {
        window.location.href = session.url
      } else {
        alert("決済ページの生成に失敗しました。")
      }
    } catch (error) {
      console.error("申し込み処理エラー:", error)
      alert("申し込み処理中にエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  const { price, originalPrice, discount } = calculatePrice()

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
          <Badge className="bg-red-100 text-red-800 px-3 py-1">🔥 早割実施中（7月末まで）</Badge>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📝 <span className="text-blue-900">お申し込み</span>
          </h1>
          <p className="text-gray-600">札幌限定サマーブートキャンプへのお申し込み</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: 料金タイプ選択 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                料金タイプ選択
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={pricingType} onValueChange={setPricingType}>
                <div className="flex items-center space-x-3 p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 bg-red-50/50">
                  <RadioGroupItem value="early" id="early" />
                  <Label htmlFor="early" className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-red-700">🔥 早割価格（7月末まで）</div>
                        <div className="text-2xl font-bold text-red-800">¥21,800</div>
                        <div className="text-sm text-red-600">¥8,000 OFF</div>
                      </div>
                      <Badge className="bg-red-600 text-white">おすすめ</Badge>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="regular" id="regular" />
                  <Label htmlFor="regular" className="cursor-pointer">
                    <div className="font-semibold text-gray-900">通常価格</div>
                    <div className="text-2xl font-bold text-gray-900">¥29,800</div>
                    <div className="text-sm text-gray-600">8月1日以降</div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Step 2: 割引オプション選択 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                割引オプション選択
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={discountType} onValueChange={setDiscountType}>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single" className="cursor-pointer flex-1">
                    <div>
                      <div className="font-semibold">通常申し込み</div>
                      <div className="text-sm text-gray-600">1日講座を受講</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="pair" id="pair" />
                  <Label htmlFor="pair" className="cursor-pointer flex-1">
                    <div>
                      <div className="font-semibold">👥 ペア割</div>
                      <div className="text-xl font-bold text-blue-900">¥33,600</div>
                      <div className="text-sm text-gray-600">お二人分の合計金額</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="set" id="set" />
                  <Label htmlFor="set" className="cursor-pointer flex-1">
                    <div>
                      <div className="font-semibold">📚 2日間セット割</div>
                      <div className="text-xl font-bold text-green-900">¥30,600</div>
                      <div className="text-sm text-gray-600">SNS講座 + GAS講座の両方を受講</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="pair-set" id="pair-set" />
                  <Label htmlFor="pair-set" className="cursor-pointer flex-1">
                    <div>
                      <div className="font-semibold">👥📚 2日間セット割 + ペア割</div>
                      <div className="text-xl font-bold text-purple-900">¥61,200</div>
                      <div className="text-sm text-gray-600">お二人で両講座（SNS + GAS）を受講</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Step 3: 受講日選択 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                受講日選択
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700">
                  受講希望日 <span className="text-red-500">*</span>
                </Label>

                {discountType === "set" || discountType === "pair-set" ? (
                  <div className="space-y-3">
                    <p className="text-sm text-blue-600 mb-3">
                      2日間セット割の場合は、以下から2つの日程をお選びください
                    </p>
                    <div className="grid gap-3">
                      {[
                        { date: "8月11日（月・祝）", course: "AI×GAS自動化講座", time: "10:00〜17:50" },
                        { date: "8月12日（火）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
                        { date: "8月16日（土）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
                      ].map((session, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                          <input
                            type="checkbox"
                            id={`date-${index}`}
                            value={`${session.date} ${session.course}`}
                            onChange={(e) => {
                              const value = e.target.value
                              if (e.target.checked) {
                                setSelectedDate((prev) => (prev ? `${prev}, ${value}` : value))
                              } else {
                                setSelectedDate((prev) =>
                                  prev
                                    .split(", ")
                                    .filter((d) => d !== value)
                                    .join(", "),
                                )
                              }
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <Label htmlFor={`date-${index}`} className="cursor-pointer flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-semibold">{session.date}</div>
                                <div className="text-sm text-gray-600">{session.course}</div>
                              </div>
                              <div className="text-sm text-gray-500">{session.time}</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <RadioGroup value={selectedDate} onValueChange={setSelectedDate}>
                    {[
                      { date: "8月11日（月・祝）", course: "AI×GAS自動化講座", time: "10:00〜17:50" },
                      { date: "8月12日（火）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
                      { date: "8月16日（土）", course: "AI×SNS運用講座", time: "10:00〜16:50" },
                    ].map((session, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={`${session.date} ${session.course}`} id={`date-${index}`} />
                        <Label htmlFor={`date-${index}`} className="cursor-pointer flex-1">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold">{session.date}</div>
                              <div className="text-sm text-gray-600">{session.course}</div>
                            </div>
                            <div className="text-sm text-gray-500">{session.time}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 4: 個人情報入力 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  4
                </span>
                個人情報入力
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="attendeeName" className="text-sm font-medium text-gray-700 mb-2 block">
                  お名前 <span className="text-red-500">*</span>
                </Label>
                <input
                  type="text"
                  id="attendeeName"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="山田太郎"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  メールアドレス <span className="text-red-500">*</span>
                </Label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                  電話番号 <span className="text-red-500">*</span>
                </Label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="090-1234-5678"
                  required
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2 block">
                  会社名・屋号 <span className="text-gray-500">(任意)</span>
                </Label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="株式会社○○"
                />
              </div>

              <div>
                <Label htmlFor="aiExperience" className="text-sm font-medium text-gray-700 mb-2 block">
                  AI・ITツールの使用経験 <span className="text-red-500">*</span>
                </Label>
                <select
                  id="aiExperience"
                  value={aiExperience}
                  onChange={(e) => setAiExperience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">経験レベルを選択してください</option>
                  <option value="beginner">初心者（ほとんど使ったことがない）</option>
                  <option value="basic">基本レベル（ChatGPTなどを時々使用）</option>
                  <option value="intermediate">中級レベル（日常的にAIツールを活用）</option>
                  <option value="advanced">上級レベル（業務で積極的に活用している）</option>
                </select>
              </div>

              <div>
                <Label htmlFor="motivation" className="text-sm font-medium text-gray-700 mb-2 block">
                  受講の動機・期待すること <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="motivation"
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="講座に期待することや、解決したい課題などをお聞かせください"
                  required
                />
              </div>

              {discountType === "pair" || discountType === "pair-set" ? (
                <div className="border-t pt-4 mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">ペア受講者の情報</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="partnerName" className="text-sm font-medium text-gray-700 mb-2 block">
                        ペア受講者のお名前 <span className="text-red-500">*</span>
                      </Label>
                      <input
                        type="text"
                        id="partnerName"
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="田中花子"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="partnerEmail" className="text-sm font-medium text-gray-700 mb-2 block">
                        ペア受講者のメールアドレス <span className="text-red-500">*</span>
                      </Label>
                      <input
                        type="email"
                        id="partnerEmail"
                        value={partnerEmail}
                        onChange={(e) => setPartnerEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="partner@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="partnerPhone" className="text-sm font-medium text-gray-700 mb-2 block">
                        ペア受講者の電話番号 <span className="text-red-500">*</span>
                      </Label>
                      <input
                        type="tel"
                        id="partnerPhone"
                        value={partnerPhone}
                        onChange={(e) => setPartnerPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="080-9876-5432"
                        required
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {/* 利用規約・プライバシーポリシー同意 */}
              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-900 mb-4">利用規約・プライバシーポリシーへの同意</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsAgreed"
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                      required
                    />
                    <Label htmlFor="termsAgreed" className="cursor-pointer text-sm text-gray-700">
                      <Link href="/terms" target="_blank" className="text-blue-600 hover:underline">
                        利用規約
                      </Link>
                      に同意します <span className="text-red-500">*</span>
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacyAgreed"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                      required
                    />
                    <Label htmlFor="privacyAgreed" className="cursor-pointer text-sm text-gray-700">
                      <Link href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                        プライバシーポリシー
                      </Link>
                      に同意し、個人情報の取り扱いについて理解しました <span className="text-red-500">*</span>
                    </Label>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>個人情報の利用目的：</strong>
                      講座の申し込み受付、受講者管理、講座に関する連絡・案内の送付、お問い合わせへの対応、料金の請求および決済処理、アフターフォローおよびサポートのために利用いたします。
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 料金確認 */}
          {pricingType && discountType && (
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                    5
                  </span>
                  料金確認
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">選択内容</span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>料金タイプ: {pricingType === "early" ? "早割価格" : "通常価格"}</p>
                      <p>
                        割引オプション:{" "}
                        {discountType === "single"
                          ? "通常申し込み"
                          : discountType === "pair"
                            ? "ペア割"
                            : discountType === "set"
                              ? "2日間セット割"
                              : discountType === "pair-set"
                                ? "お二人分2日セット合計金額"
                                : "受講料金"}
                      </p>
                    </div>
                    <hr />
                    {discount > 0 && (
                      <>
                        <div className="flex justify-between text-gray-600">
                          <span>通常料金</span>
                          <span>¥{originalPrice.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-red-600">
                          <span>割引額</span>
                          <span>-¥{discount.toLocaleString()}</span>
                        </div>
                        <hr />
                      </>
                    )}
                    <div className="flex justify-between text-2xl font-bold text-blue-900">
                      <span>
                        {discountType === "pair"
                          ? "お二人分合計金額"
                          : discountType === "set"
                            ? "2日セット合計金額"
                            : discountType === "pair-set"
                              ? "お二人分2日セット合計金額"
                              : "受講料金"}
                      </span>
                      <span>¥{price.toLocaleString()}</span>
                    </div>
                    {discountType === "pair" && (
                      <p className="text-sm text-blue-600 text-center">※ お二人分の合計金額です</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 注意事項 */}
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <h3 className="font-bold text-yellow-800 mb-3">📋 お申し込み前にご確認ください</h3>
              <div className="space-y-2 text-sm text-yellow-700">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>決済完了後、自動的にお申し込み完了ページに移動します</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>申し込み内容は自動的にinfo@towa-ai.comに送信されます</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>詳細な会場情報を24時間以内にメールでお送りします</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>キャンセルポリシーについては下記をご確認ください</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* キャンセルポリシー */}
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <span className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  6
                </span>
                キャンセルポリシー
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-3">📅 キャンセル・返金について</h4>
                <p className="text-sm text-orange-800 mb-3">お支払い後のキャンセルは、以下の通り返金対応いたします。</p>
                <div className="space-y-3 text-sm text-orange-800">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>開催10日前まで：</strong>全額返金
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>開催9日前〜3日前：</strong>受講料の50％を返金
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>開催2日前以降：</strong>返金不可
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-xs text-orange-700 space-y-1">
                    <p>※返金はStripeを通じてクレジットカードへ行います。</p>
                    <p>※返金時、Stripe決済手数料（約3.6%）はご返金対象外となります。</p>
                    <p>※ご不明な点はお気軽にご連絡ください。</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">📞 キャンセルのご連絡方法</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>
                    <strong>Email：</strong>info@towa-ai.com
                  </p>
                  <p>
                    <strong>LINE：</strong>@towa-ai
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    ※ キャンセルをご希望の場合は、お早めにご連絡ください
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 申し込みボタン */}
          <Card>
            <CardContent className="p-8 text-center">
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-blue-900 hover:bg-blue-800 text-white px-12 py-6 text-lg font-bold shadow-xl transform hover:scale-105 transition-all flex items-center gap-2 w-full sm:w-auto max-w-md"
                  disabled={!pricingType || !discountType || !privacyAgreed || !termsAgreed || isSubmitting}
                >
                  <CreditCard className="w-6 h-6" />
                  {isSubmitting ? "処理中..." : "申し込みを確定する（決済画面へ）"}
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-4">※ Stripeの安全な決済画面に移動します</p>
              <p className="text-xs text-gray-500 mt-2">決済完了後、自動的にお申し込み完了ページに移動します</p>
            </CardContent>
          </Card>

          {/* 会場情報 */}
          <Card className="mt-8 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-yellow-800">会場・運営情報</h3>
              </div>
              <div className="text-left space-y-2 text-yellow-700">
                <p>
                  <strong>運営会社：</strong>株式会社アクロス（TOWA事業）
                </p>
                <p>
                  <strong>会場：</strong>札幌駅近郊セミナールーム（主にEZOHUB SAPPORO）
                </p>
                <p>
                  <strong>定員：</strong>各回8名（超少人数制）
                </p>
                <p>
                  <strong>最低開催人数：</strong>3名
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
                <p className="text-sm">※ 決済完了後、詳細な場所をご連絡します</p>
              </div>
            </CardContent>
          </Card>



          {/* サポート情報 */}
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-bold text-blue-900 mb-4">ご不明な点がございましたら</h3>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Link href="/line-consultation" className="w-full sm:w-auto max-w-xs">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold flex items-center gap-2 w-full justify-center"
                  >
                    LINEで相談する
                  </Button>
                </Link>
                <Link href="/" className="w-full sm:w-auto max-w-xs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 text-lg font-semibold bg-transparent w-full justify-center"
                  >
                    トップページに戻る
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
