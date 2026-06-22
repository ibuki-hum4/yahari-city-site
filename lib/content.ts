import type { Metadata } from "next";

export const SITE = {
  name: "矢張市",
  nameReading: "やはりし",
  englishName: "Yahari City",
  mayor: "やーはり",
  mayorTitle: "矢張市長",
  founded: "2026年2月23日",
  foundedYear: 2026,
  population: "130",
  populationAsOf: "2026年6月22日時点",
  flower: "矢車菊(ヤグルマギク)",
  tree: "クスノキ",
  bird: "ヤイロチョウ",
  slogan: "まっすぐ、未来へ。",
  base: "Discordサーバー「矢張市」",
  discordInviteUrl: "/discord", // next.config.ts の redirects() で実際のDiscord招待リンクに転送
  discordGuildId: "1475468019831406796",
  xHashtag: "矢張市最高の瞬間",
  googleAnalyticsId: "G-VRZTM3QCTC",
  // ロゴは基本的に透過版を使用する。背景あり版は専用の枠で囲うなど場所を選んで使うこと。
  logo: "/矢張市_透過.png",
  logoWithBackground: "/矢張市.png",
  // TODO: 実際に公開するドメインに置き換えてください(metadataBase / OGP / サイトマップ / RSSで使用)
  url: "https://yahari-city.skyia.jp",
} as const;

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "ホーム" },
  { href: "/about", label: "矢張市について" },
  { href: "/history", label: "沿革" },
  { href: "/news", label: "お知らせ" },
  { href: "/bosai", label: "防災ポータル" },
  { href: "/pictures", label: "フォトギャラリー" },
  { href: "/access", label: "市民になるには" },
  { href: "/applications", label: "申請窓口" },
  { href: "/faq", label: "よくある質問" },
];

export interface SitePage {
  href: string;
  title: string;
  description: string;
  keywords: string;
}

export const SITE_PAGES: SitePage[] = [
  {
    href: "/",
    title: "ホーム",
    description: "矢張市公式サイトのトップページです。",
    keywords: "ホーム トップ 矢張市 やはり",
  },
  {
    href: "/about",
    title: "矢張市について",
    description: "市長メッセージや市の概要、基礎データをご紹介します。",
    keywords: "概要 市長 メッセージ 基礎データ 市章 花 木 鳥 スローガン",
  },
  {
    href: "/history",
    title: "沿革",
    description: "発足から現在までの矢張市の歩みを年表でご覧いただけます。",
    keywords: "歴史 年表 発足 沿革 創立",
  },
  {
    href: "/news",
    title: "お知らせ",
    description: "矢張市からの最新情報をまとめてご覧いただけます。",
    keywords: "ニュース 告知 イベント 制度",
  },
  {
    href: "/bosai",
    title: "矢張市防災ポータル",
    description: "気象庁の公開データに基づく、全国の地震・津波・警報注意報・避難所情報をまとめたポータルです。",
    keywords: "防災 地震 津波 警報 注意報 避難所 気象庁",
  },
  {
    href: "/pictures",
    title: "フォトギャラリー",
    description: "市章や市民の思い出の写真を掲載しています。",
    keywords: "写真 画像 ギャラリー 市章",
  },
  {
    href: "/access",
    title: "市民になるには",
    description: "矢張市の公式Discordサーバーへの参加方法をご案内します。",
    keywords: "参加 入市 Discord 招待 本庁",
  },
  {
    href: "/faq",
    title: "よくある質問",
    description: "市民になる方法やサーバーに関するよくある質問をまとめています。",
    keywords: "FAQ 質問 ヘルプ",
  },
  {
    href: "/applications",
    title: "申請窓口",
    description: "矢張市役所の各種オンライン申請はこちらからご利用いただけます。",
    keywords: "申請 手続き 届出 渡航届",
  },
  {
    href: "/search",
    title: "サイト内検索",
    description: "お知らせやページをキーワードで検索できます。",
    keywords: "検索 サーチ",
  },
  {
    href: "/sitemap",
    title: "サイトマップ",
    description: "矢張市公式サイトの全ページ一覧です。",
    keywords: "サイトマップ 一覧",
  },
  {
    href: "/accessibility",
    title: "ウェブアクセシビリティについて",
    description: "矢張市公式サイトのアクセシビリティ方針と対応状況をご紹介します。",
    keywords: "アクセシビリティ JIS 読み上げ 文字サイズ コントラスト",
  },
  {
    href: "/privacy",
    title: "個人情報保護方針",
    description: "矢張市公式サイトにおける個人情報の取り扱いについてご案内します。",
    keywords: "プライバシー 個人情報 Cookie",
  },
  {
    href: "/terms",
    title: "このサイトについて",
    description: "矢張市公式サイトの著作権・リンク・ご利用にあたっての注意事項をご案内します。",
    keywords: "利用規約 著作権 リンク 免責",
  },
];

export function pageMetadata(href: string): Metadata {
  const page = SITE_PAGES.find((p) => p.href === href);
  if (!page) {
    throw new Error(`pageMetadata: unknown page "${href}". Add it to SITE_PAGES first.`);
  }
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.href },
    openGraph: { title: page.title, description: page.description, url: page.href },
    twitter: { title: page.title, description: page.description },
  };
}

export interface EmergencyNotice {
  date: string;
  title: string;
}

// サーバー障害やメンテナンス等が発生した場合はここに追加してください。空の場合はホームに「緊急のお知らせはありません」と表示されます。
export const EMERGENCY_NOTICES: EmergencyNotice[] = [
  // 例: { date: "2026-06-22", title: "Discordサーバーメンテナンスのお知らせ" },
];

export interface HistoryEvent {
  date: string;
  title: string;
  description?: string;
}

export const HISTORY_EVENTS: HistoryEvent[] = [
  {
    date: "2026年2月23日",
    title: "矢張市、発足",
    description: "Discordサーバー「矢張市」が発足しました。",
  },
  {
    date: "2026年3月",
    title: "市章を制定",
    description: "まっすぐに進む矢をモチーフにした、現在の市章を制定しました。",
  },
  {
    date: "2026年5月3日",
    title: "市民数100人を達成",
  },
  {
    date: "2026年6月22日",
    title: "矢張市公式ウェブサイトを開設",
  },
];
