"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function PrivacyPage() {
  // ページロード時にスクロール位置を上部にリセット
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/apply" className="flex items-center gap-2 text-blue-900 hover:text-blue-700">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-2xl font-bold">TOWA</span>
          </Link>
          <div className="flex items-center gap-2 text-gray-600">
            <Shield className="w-5 h-5" />
            <span>プライバシーポリシー</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🔒 <span className="text-green-600">プライバシーポリシー</span>
          </h1>
          <p className="text-gray-600">個人情報の取り扱いについて</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-center">プライバシーポリシー</CardTitle>
            <p className="text-center text-green-100 text-sm">最終更新日：2024年7月1日</p>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">1. 基本方針</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  TOWA（以下「当社」といいます）は、個人情報の重要性を認識し、個人情報の保護に関する法律（個人情報保護法）を遵守し、個人情報を適切に取り扱うことをお約束いたします。
                </p>
                <p>
                  本プライバシーポリシーは、当社が提供するサマーブートキャンプ講座（以下「本サービス」といいます）における個人情報の取り扱いについて定めるものです。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                2. 収集する個人情報
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>当社は、本サービスの提供にあたり、以下の個人情報を収集いたします。</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">収集する情報</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>氏名</li>
                    <li>メールアドレス</li>
                    <li>電話番号</li>
                    <li>会社名・屋号（任意）</li>
                    <li>AI・ITツールの使用経験</li>
                    <li>受講の動機・期待すること</li>
                    <li>その他、お問い合わせ内容に含まれる情報</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                3. 個人情報の利用目的
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>当社は、収集した個人情報を以下の目的で利用いたします。</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>講座の申し込み受付および受講者管理</li>
                  <li>講座に関する連絡・案内の送付</li>
                  <li>受講者への事前ヒアリングおよび個別対応</li>
                  <li>講座内容の改善および新サービスの開発</li>
                  <li>お問い合わせへの対応</li>
                  <li>料金の請求および決済処理</li>
                  <li>アフターフォローおよびサポート</li>
                  <li>統計データの作成（個人を特定できない形式）</li>
                  <li>法令に基づく対応</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                4. 個人情報の第三者提供
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>当社は、以下の場合を除き、個人情報を第三者に提供することはありません。</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>ご本人の同意がある場合</li>
                  <li>法令に基づく場合</li>
                  <li>人の生命、身体または財産の保護のために必要がある場合</li>
                  <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                  <li>
                    国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                5. 個人情報の委託
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  当社は、個人情報の取り扱いの全部または一部を第三者に委託する場合があります。その際は、委託先において個人情報が安全に管理されるよう、適切な監督を行います。
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">委託先の例</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-800">
                    <li>メール配信サービス</li>
                    <li>決済代行サービス</li>
                    <li>クラウドストレージサービス</li>
                    <li>顧客管理システム</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                6. 個人情報の保存期間
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>当社は、個人情報を利用目的の達成に必要な期間のみ保存し、その後は適切に廃棄いたします。</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">保存期間の目安</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>受講者情報：講座終了後3年間</li>
                    <li>お問い合わせ情報：対応完了後1年間</li>
                    <li>決済情報：法令で定められた期間</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                7. 個人情報の安全管理
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  当社は、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">安全管理措置</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-800">
                    <li>アクセス権限の管理</li>
                    <li>データの暗号化</li>
                    <li>定期的なセキュリティ監査</li>
                    <li>従業員への教育・研修</li>
                    <li>システムの定期的な更新</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">8. ご本人の権利</h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>ご本人は、当社に対して以下の権利を行使することができます。</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>個人情報の開示請求</li>
                  <li>個人情報の訂正・追加・削除請求</li>
                  <li>個人情報の利用停止・消去請求</li>
                  <li>個人情報の第三者提供の停止請求</li>
                </ul>
                <p className="mt-3">これらの権利を行使される場合は、下記のお問い合わせ先までご連絡ください。</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                9. Cookie等の利用
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  当社のウェブサイトでは、サービスの向上のためにCookieを使用する場合があります。Cookieの使用を希望されない場合は、ブラウザの設定により無効にすることができます。
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-green-200 pb-2">
                10. プライバシーポリシーの変更
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  当社は、法令の変更や事業内容の変更等に伴い、本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
                </p>
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-4">11. お問い合わせ窓口</h2>
              <div className="space-y-3 text-gray-700">
                <p>個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。</p>
                <div className="bg-white p-4 rounded border">
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
                    <strong>個人情報保護責任者：</strong>代表　丹羽奈央
                  </p>
                  <p>
                    <strong>連絡方法：</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Email：info@towa-ai.com</li>
                    <li>LINE公式アカウント：@towa-ai</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-3">
                    ※ お問い合わせへの回答には、お時間をいただく場合があります。
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-4">個人情報保護への取り組み</h2>
              <div className="space-y-3 text-blue-800">
                <p>
                  当社は、受講者の皆様に安心してサービスをご利用いただけるよう、個人情報保護に関する法令を遵守し、個人情報の適切な取り扱いに努めてまいります。
                </p>
                <p>ご不明な点やご質問がございましたら、お気軽にお問い合わせください。</p>
              </div>
            </section>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Link href="/apply">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold">
              申し込みフォームに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
