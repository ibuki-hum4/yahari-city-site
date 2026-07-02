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
  { href: "/citizen-card", label: "市民証発行" },
  { href: "/faq", label: "よくある質問" },
];

export interface SitePage {
  href: string;
  title: string;
  description: string;
  keywords: string;
  category: "基本情報" | "コンテンツ" | "手続き・くらし" | "その他";
}

export const SITE_PAGES: SitePage[] = [
  {
    href: "/",
    title: "ホーム",
    description: "矢張市公式サイトのトップページです。",
    keywords: "ホーム トップ 矢張市 やはり",
    category: "基本情報",
  },
  {
    href: "/about",
    title: "矢張市について",
    description: "市長メッセージや市の概要、基礎データをご紹介します。",
    keywords: "概要 市長 メッセージ 基礎データ 市章 花 木 鳥 スローガン",
    category: "基本情報",
  },
  {
    href: "/history",
    title: "沿革",
    description: "発足から現在までの矢張市の歩みを年表でご覧いただけます。",
    keywords: "歴史 年表 発足 沿革 創立",
    category: "基本情報",
  },
  {
    href: "/news",
    title: "お知らせ",
    description: "矢張市からの最新情報をまとめてご覧いただけます。",
    keywords: "ニュース 告知 イベント 制度",
    category: "コンテンツ",
  },
  {
    href: "/newspaper",
    title: "矢張市新聞",
    description: "矢張市の月刊新聞です。大きな出来事があった際は号外を発行します。",
    keywords: "新聞 月刊 号外 創刊号",
    category: "コンテンツ",
  },
  {
    href: "/column",
    title: "市長コラム",
    description: "市長が、思いついたことを不定期に書き残すコラムです。",
    keywords: "市長コラム ブログ 市長 エッセイ",
    category: "コンテンツ",
  },
  {
    href: "/bosai",
    title: "矢張市防災ポータル",
    description: "気象庁の公開データに基づく、全国の地震・津波・警報注意報・避難所情報をまとめたポータルです。",
    keywords: "防災 地震 津波 警報 注意報 避難所 気象庁",
    category: "手続き・くらし",
  },
  {
    href: "/pictures",
    title: "フォトギャラリー",
    description: "市章や市民の思い出の写真を掲載しています。",
    keywords: "写真 画像 ギャラリー 市章",
    category: "コンテンツ",
  },
  {
    href: "/access",
    title: "市民になるには",
    description: "矢張市の公式Discordサーバーへの参加方法をご案内します。",
    keywords: "参加 入市 Discord 招待 本庁",
    category: "手続き・くらし",
  },
  {
    href: "/faq",
    title: "よくある質問",
    description: "市民になる方法やサーバーに関するよくある質問をまとめています。",
    keywords: "FAQ 質問 ヘルプ",
    category: "その他",
  },
  {
    href: "/applications",
    title: "申請窓口",
    description: "矢張市役所の各種オンライン申請はこちらからご利用いただけます。",
    keywords: "申請 手続き 届出 渡航届",
    category: "手続き・くらし",
  },
  {
    href: "/departments",
    title: "部署一覧",
    description: "矢張市役所の各部署と業務内容をご紹介します。",
    keywords: "部署 組織図 課 役所 業務",
    category: "手続き・くらし",
  },
  {
    href: "/ordinances",
    title: "条例集",
    description: "矢張市で制定された条例を、条文・改正履歴つきで掲載しています。",
    keywords: "条例 法令 条文 改正履歴 検索",
    category: "手続き・くらし",
  },
  {
    href: "/personnel",
    title: "人事異動情報",
    description: "矢張市役所における辞令(就任・異動・退任・新設)の一覧です。",
    keywords: "人事異動 辞令 就任 異動 退任 新設 PDF",
    category: "手続き・くらし",
  },
  {
    href: "/groups",
    title: "市民活動団体登録",
    description: "矢張市民活動団体登録条例に基づき登録された団体の一覧です。",
    keywords: "市民活動 団体 サークル 登録 申請",
    category: "手続き・くらし",
  },
  {
    href: "/applications/group-registration",
    title: "市民活動団体登録申請",
    description: "矢張市内で活動する団体の登録はこちらから申請してください。",
    keywords: "市民活動 団体 サークル 登録 申請",
    category: "手続き・くらし",
  },
  {
    href: "/citizen-card",
    title: "市民証発行",
    description: "氏名・所属期(クォーター)・加入日を入力すると、市章入りの矢張市民証(画像)をその場で発行・ダウンロードできます。",
    keywords: "市民証 ID 証明書 発行 市章 通し番号 所属期 クォーター",
    category: "手続き・くらし",
  },
  {
    href: "/legends",
    title: "殿堂入り",
    description: "矢張市民が打ち立てた伝説的な記録を集めた殿堂です。",
    keywords: "殿堂 記録 伝説 ランキング VC耐久",
    category: "コンテンツ",
  },
  {
    href: "/spots",
    title: "観光スポット",
    description: "矢張市内の名所をご紹介します。",
    keywords: "観光 スポット 名所 VC耐久の間",
    category: "コンテンツ",
  },
  {
    href: "/changelog",
    title: "更新履歴",
    description: "矢張市公式サイト自体の更新履歴(変更ログ)です。",
    keywords: "更新履歴 変更ログ changelog リリースノート",
    category: "その他",
  },
  {
    href: "/contact",
    title: "市民の声",
    description: "矢張市公式サイトへのご意見・ご感想・不具合の報告はこちらから。",
    keywords: "お問い合わせ 意見 感想 不具合 報告",
    category: "その他",
  },
  {
    href: "/search",
    title: "サイト内検索",
    description: "お知らせやページをキーワードで検索できます。",
    keywords: "検索 サーチ",
    category: "その他",
  },
  {
    href: "/sitemap",
    title: "サイトマップ",
    description: "矢張市公式サイトの全ページ一覧です。",
    keywords: "サイトマップ 一覧",
    category: "その他",
  },
  {
    href: "/accessibility",
    title: "ウェブアクセシビリティについて",
    description: "矢張市公式サイトのアクセシビリティ方針と対応状況をご紹介します。",
    keywords: "アクセシビリティ JIS 読み上げ 文字サイズ コントラスト",
    category: "その他",
  },
  {
    href: "/privacy",
    title: "個人情報保護方針",
    description: "矢張市公式サイトにおける個人情報の取り扱いについてご案内します。",
    keywords: "プライバシー 個人情報 Cookie",
    category: "その他",
  },
  {
    href: "/terms",
    title: "このサイトについて",
    description: "矢張市公式サイトの著作権・リンク・ご利用にあたっての注意事項をご案内します。",
    keywords: "利用規約 著作権 リンク 免責",
    category: "その他",
  },
];

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}

export function pageMetadata(href: string): Metadata {
  const page = SITE_PAGES.find((p) => p.href === href);
  if (!page) {
    throw new Error(`pageMetadata: unknown page "${href}". Add it to SITE_PAGES first.`);
  }
  return buildMetadata({ title: page.title, description: page.description, path: page.href });
}

export interface EmergencyNotice {
  date: string;
  title: string;
}

// サーバー障害やメンテナンス等が発生した場合はここに追加してください。空の場合はバナー自体が非表示になります。
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
  {
    date: "2026年6月23日",
    title: "矢張市創立4か月",
    description: "市長やーはりが創立4か月を祝うメッセージを投稿し、多くの市民から祝福が寄せられました。",
  },
];

export interface Department {
  name: string;
  description: string;
}

// MascotChatbotのたらい回し先と/departmentsページの両方から参照される
export const DEPARTMENTS: Department[] = [
  { name: "観光課", description: "矢張市の見どころ発掘とPRを担当。実在する観光資源は今のところありません。" },
  { name: "戸籍課", description: "市民登録やニックネーム変更などの各種届出を取り扱います。" },
  { name: "税務課", description: "市税に関する業務を担当。矢張市には実際に課税できる税はありません。" },
  { name: "道路課", description: "市内の道路(Discordのテキストチャンネル)の管理・整備を担当。" },
  { name: "環境課", description: "サーバー内の空気を綺麗に保つための雑談浄化活動を行っています。" },
  { name: "広報課", description: "お知らせの作成や公式サイトの運営など、市の情報発信全般を担当。" },
  { name: "防災安全課", description: "矢張市防災ポータルの運営など、市民の安全に関する情報提供を担当。" },
  { name: "教育委員会", description: "矢張市検定(構想中)など、市民の学びを支援する事業を検討しています。" },
  { name: "市民協働課", description: "市民同士の交流イベントの企画・運営を担当。" },
  { name: "上下水道課", description: "Discordサーバーには水道はありませんが、便宜上設置されています。" },
  { name: "住民課", description: "市民の入会・退会(Discordサーバーへの参加・退出)に関する手続きを担当。" },
  { name: "生活福祉課", description: "市民の生活相談を受け付けていますが、相談内容はだいたい「眠い」か「お腹すいた」です。" },
  { name: "財政課", description: "矢張市の予算編成を担当。予算は発足以来ずっと0円です。" },
  { name: "政策推進課", description: "市の政策企画を担当。スローガン「まっすぐ、未来へ。」が現時点で唯一の公式政策です。" },
  { name: "福祉保健局", description: "生活福祉課などを管轄する局。市民の健康(主に夜更かし防止)を見守っています。" },
  { name: "すぐやる課", description: "市民の些細な要望に即対応する課。名前に違わず、本当に「すぐ」対応します。" },
  { name: "春巻き推進課", description: "春巻きの普及と消費拡大を推進する課。なぜ設置されたのかは誰も覚えていません。" },
];

export interface MayorProfileItem {
  label: string;
  value: string;
}

export const MAYOR_PROFILE: MayorProfileItem[] = [
  { label: "就任", value: `${SITE.founded}(矢張市発足と同時に就任)` },
  { label: "出身", value: "Discordのどこかのサーバー(本人もうろ覚え)" },
  { label: "趣味", value: "VC耐久、推し活、二度寝" },
  { label: "座右の銘", value: SITE.slogan },
  { label: "好きな部署", value: "春巻き推進課(設置の経緯はいまだに不明)" },
];

// 「市長の一言コーナー」に表示する一言。配列の先頭(最新)が表示される。更新する場合は先頭に追加する
export const MAYOR_QUOTES: string[] = [
  "市民が増えるたびに、部署が増えている気がする。誰が決めているんだろう。",
  "二度寝にも市長印を。市民の権利は市長が守ります。",
  "「まっすぐ、未来へ。」は市のスローガンですが、私個人の座右の銘でもあります。",
  "市長印は実在しません。押した気分だけ味わってください。",
];

export interface LegendRecord {
  title: string;
  holder?: string;
  detail: string;
  date?: string;
}

export const LEGEND_RECORDS: LegendRecord[] = [
  {
    title: "歴代記録: 224時間48分の耐久VC",
    detail: "矢張市史上最長となったボイスチャット滞在記録(当時)。後に293時間56分19秒の記録に更新されました。",
    date: "2026年",
  },
  {
    title: "歴代記録: 293時間56分19秒の耐久VC",
    detail: "前回記録(224時間48分)を更新したボイスチャット滞在記録(当時)。後に300時間の記録に更新されました。",
    date: "2026年6月",
  },
  {
    title: "新記録: 300時間の耐久VC",
    detail: "前回記録(293時間56分19秒)を更新した、矢張市史上最長のボイスチャット滞在記録。ボイスチャンネル「一般」にて達成されました。詳細は写真とあわせてフォトギャラリーでも公開中です。",
    date: "2026年6月25日",
  },
];

export interface TouristSpot {
  name: string;
  description: string;
  highlight: string;
  image?: string;
}

export const TOURIST_SPOTS: TouristSpot[] = [
  {
    name: "VC耐久の間",
    description: "歴代記録「293時間56分19秒の耐久VC」が打ち立てられた、矢張市で最も有名なボイスチャンネル。",
    highlight: "深夜帯になるほど人が増えるという不思議な名所。",
    image: "/chojikan-vc.png",
  },
  {
    name: "雑談広場",
    description: "市民が集う中央広場のような総合雑談チャンネル。市政とは無関係の話題で常に賑わっています。",
    highlight: "創立4か月のお祝いムードもここから始まりました。",
    image: "/4kagetsu.png",
  },
  {
    name: "春巻き横丁",
    description: "春巻き推進条例(矢張市条例第4号)の制定地とされる、春巻き愛好家たちの集会スポット。",
    highlight: "なぜここが「横丁」なのかは誰も知りません。",
  },
  {
    name: "ピン留め記念碑",
    description: "ピン留ミアン登録システムの発祥地と伝わる場所。多くの市民がここで思い出をピン留めしてきました。",
    highlight: "申請窓口からピン留ミアン登録ができます。",
  },
  {
    name: "バズったら置くところ",
    description: "市民がXでバズった投稿を報告しあう専用チャンネル。矢張市と無関係な話題も大歓迎です。",
    highlight: "世界的なバズり投稿がふらっと貼られることもある隠れた名所。",
    image: "/bazuttaraokutokoro.png",
  },
  {
    name: "フォトギャラリー展望台",
    description: "矢張市の歴史的な瞬間を写真で振り返ることができる展望スポット。",
    highlight: "実際の写真はフォトギャラリーページでご覧いただけます。",
  },
];
