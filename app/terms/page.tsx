"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function TermsPage() {
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
            <FileText className="w-5 h-5" />
            <span>利用規約</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            📋 <span className="text-blue-900">利用規約</span>
          </h1>
          <p className="text-gray-600">TOWAサマーブートキャンプ講座の利用規約</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-blue-900 text-white">
            <CardTitle className="text-center">利用規約</CardTitle>
            <p className="text-center text-blue-100 text-sm">最終更新日：2024年7月1日</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">第1条（適用）</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  1.
                  本規約は、TOWA（以下「当社」といいます）が提供するサマーブートキャンプ講座（以下「本サービス」といいます）の利用条件を定めるものです。
                </p>
                <p>2. 受講者の皆様（以下「利用者」といいます）には、本規約に従って本サービスをご利用いただきます。</p>
                <p>3. 本規約に同意いただけない場合は、本サービスをご利用いただくことはできません。</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第2条（利用登録）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  1.
                  本サービスの利用を希望する方は、本規約に同意の上、当社の定める方法によって利用登録を申請するものとします。
                </p>
                <p>
                  2.
                  当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあります。
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                  <li>本規約に違反したことがある者からの申請である場合</li>
                  <li>その他、当社が利用登録を相当でないと判断した場合</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第3条（講座内容・料金）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>1. 本サービスは、AI技術を活用したSNS運用および業務自動化に関する講座を提供します。</p>
                <p>2. 講座料金は、当社ウェブサイトに記載された金額とし、事前にお支払いいただきます。</p>
                <p>
                  3.
                  一度お支払いいただいた料金は、原則として返金いたしません。ただし、当社の都合により講座を中止する場合はこの限りではありません。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第4条（禁止事項）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>利用者は、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>法令または公序良俗に違反する行為</li>
                  <li>犯罪行為に関連する行為</li>
                  <li>講座内容の無断録音・録画・撮影</li>
                  <li>講座資料の無断複製・配布・転売</li>
                  <li>他の受講者や講師への迷惑行為</li>
                  <li>当社のサービスの運営を妨害するおそれのある行為</li>
                  <li>その他、当社が不適切と判断する行為</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第5条（本サービスの提供の停止等）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  1.
                  当社は、以下のいずれかの事由があると判断した場合、利用者に事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>天災地変等の不可抗力により本サービスの提供が困難となった場合</li>
                  <li>講師の急病等により講座の実施が困難となった場合</li>
                  <li>その他、当社が本サービスの提供が困難と判断した場合</li>
                </ul>
                <p>
                  2.
                  当社は、本サービスの提供の停止または中断により、利用者または第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">第6条（著作権）</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>1. 講座で使用される資料、教材等の著作権は当社または当社にその利用を許諾した権利者に帰属します。</p>
                <p>
                  2. 利用者は、当社の事前の書面による同意なく、講座資料等を複製、配布、公衆送信等することはできません。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第7条（免責事項）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  1. 当社は、本サービスに事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しておりません。
                </p>
                <p>2. 当社は、本サービスに起因して利用者に生じたあらゆる損害について、一切の責任を負いません。</p>
                <p>3. 講座で学習した内容の活用により生じた結果について、当社は一切の責任を負いません。</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第8条（サービス内容の変更等）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  当社は、利用者への事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、利用者はこれに同意するものとします。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第9条（利用規約の変更）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  当社は、必要と判断した場合には、利用者に通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該利用者は変更後の規約に同意したものとみなします。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第10条（個人情報の取扱い）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  当社は、本サービスの利用によって取得する個人情報については、当社「プライバシーポリシー」に従い適切に取り扱うものとします。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-200 pb-2">
                第11条（準拠法・裁判管轄）
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>1. 本規約の解釈にあたっては、日本法を準拠法とします。</p>
                <p>2. 本サービスに関して紛争が生じた場合には、札幌地方裁判所を専属的合意管轄とします。</p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
              <div className="space-y-2 text-gray-700">
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
                <p>
                  <strong>その他の連絡先：</strong>LINEまたはメールにてお問い合わせください
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg font-semibold"
            onClick={() => window.history.back()}
          >
            申し込みフォームに戻る
          </Button>
        </div>
      </div>
    </div>
  )
}
