import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import BackToTop from "@/components/BackToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MascotChatbot from "@/components/MascotChatbot";
import { SITE } from "@/lib/content";
import { lineSeedJP } from "@/lib/fonts";
import "./globals.css";

const description = `${SITE.name}(やはりし)は、Discord上で活動する架空のコミュニティです。市の概要・沿革・お知らせなどをご紹介します。`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}公式サイト`,
    template: `%s | ${SITE.name}公式サイト`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: `${SITE.name}公式サイト`,
    title: `${SITE.name}公式サイト`,
    description,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${SITE.name}公式サイト` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}公式サイト`,
    description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#173a5e",
  colorScheme: "light",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  alternateName: SITE.englishName,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  description,
  founder: { "@type": "Person", name: SITE.mayor },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE.name}公式サイト`,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`h-full antialiased ${lineSeedJP.variable}`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-yahari-navy focus:shadow-lg"
        >
          メインコンテンツへスキップ
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <MascotChatbot />
        <GoogleAnalytics gaId={SITE.googleAnalyticsId} />
      </body>
    </html>
  );
}
