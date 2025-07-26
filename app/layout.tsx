import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP, Great_Vibes, Playfair_Display } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
})

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair-display",
  display: "swap",
})

// ヒラギノ角ゴ W7フォントの設定
const hiraginoKakuGothic = {
  variable: "--font-hiragino-kaku-gothic",
  className: "font-hiragino-kaku-gothic",
}

export const metadata: Metadata = {
  title: "TOWA - 札幌限定サマーブートキャンプ",
  description: "AIを活用したSNS運用と業務自動化を学ぶ1日集中講座",
  generator: 'v0.dev',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${greatVibes.variable} ${playfairDisplay.variable} ${hiraginoKakuGothic.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={notoSansJP.className}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-CB068FZWB3`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CB068FZWB3');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}
