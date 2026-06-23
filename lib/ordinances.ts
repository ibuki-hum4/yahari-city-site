export interface OrdinanceParagraph {
  text: string;
  items?: string[];
}

export interface OrdinanceArticle {
  number: number;
  heading?: string;
  paragraphs: OrdinanceParagraph[];
}

export interface OrdinanceAmendment {
  date: string;
  description: string;
}

export interface Ordinance {
  slug: string;
  number: string;
  title: string;
  category: string;
  enactedDate: string;
  summary: string;
  amendments: OrdinanceAmendment[];
  articles: OrdinanceArticle[];
}

// 新しい条例を追加したい場合は、この配列に項目を追加するだけで /ordinances 一覧と
// /ordinances/[slug] の詳細ページに自動的に反映されます。
export const ORDINANCES: Ordinance[] = [
  {
    slug: "citizen-charter",
    number: "矢張市条例第1号",
    title: "矢張市民憲章",
    category: "基本",
    enactedDate: "2026年2月23日",
    summary: "矢張市の理念と、市民の定義を定める基本条例。",
    amendments: [{ date: "2026年3月", description: "市章の制定に伴い、第3条(市章)を新設する改正。" }],
    articles: [
      {
        number: 1,
        heading: "目的",
        paragraphs: [
          { text: "この憲章は、矢張市の基本理念を明らかにし、市民相互の自由な活動を保障することを目的とする。" },
        ],
      },
      {
        number: 2,
        heading: "市民の定義",
        paragraphs: [
          { text: "矢張市民とは、矢張市の公式Discordサーバーに参加し、市民ロールの付与を受けた者をいう。" },
          { text: "前項の規定にかかわらず、サーバーを退出した者は、再加入するまでの間、市民の資格を停止される。" },
        ],
      },
      {
        number: 3,
        heading: "市章",
        paragraphs: [
          { text: "矢張市は、まっすぐに進む矢をモチーフとした市章を用いる。" },
          { text: "市章は、市の発行する証明書その他の公式な文書に使用することができる。" },
        ],
      },
      {
        number: 4,
        heading: "スローガン",
        paragraphs: [{ text: "矢張市のスローガンは「まっすぐ、未来へ。」とする。" }],
      },
    ],
  },
  {
    slug: "daily-life-basics",
    number: "矢張市条例第2号",
    title: "矢張市生活基本条例",
    category: "生活",
    enactedDate: "2026年3月10日",
    summary: "市民が矢張市で快適に過ごすための、基本的な生活ルールを定める条例。",
    amendments: [],
    articles: [
      {
        number: 1,
        heading: "目的",
        paragraphs: [{ text: "この条例は、市民が矢張市において快適に活動するための基本的な事項を定める。" }],
      },
      {
        number: 2,
        heading: "雑談の自由",
        paragraphs: [{ text: "市民は、各チャンネルの趣旨に反しない限り、自由に雑談することができる。" }],
      },
      {
        number: 3,
        heading: "二度寝の権利",
        paragraphs: [
          { text: "市民は、二度寝をする権利を有する。" },
          { text: "市民協働課に申請のうえ「二度寝許可証」の発行を受けることができる。詳細は申請窓口を参照する。" },
        ],
      },
      {
        number: 4,
        heading: "環境の保全",
        paragraphs: [{ text: "市民は、サーバー内の空気(雰囲気)を清潔に保つよう努めるものとする。" }],
      },
    ],
  },
  {
    slug: "oshi-leave",
    number: "矢張市条例第3号",
    title: "矢張市推し活休暇条例",
    category: "生活",
    enactedDate: "2026年4月1日",
    summary: "市民が推し活のために業務・学業から一時離脱することを保障する条例。",
    amendments: [],
    articles: [
      {
        number: 1,
        heading: "目的",
        paragraphs: [{ text: "この条例は、市民の推し活動を保護し、健全な市民生活を支援することを目的とする。" }],
      },
      {
        number: 2,
        heading: "休暇の申請",
        paragraphs: [{ text: "推し活休暇を希望する市民は、申請窓口より「推し活休暇申請」を提出するものとする。" }],
      },
      {
        number: 3,
        heading: "不利益取扱いの禁止",
        paragraphs: [{ text: "市は、推し活休暇を取得した市民に対し、いかなる不利益な取扱いも行わない。" }],
      },
    ],
  },
  {
    slug: "harumaki-promotion",
    number: "矢張市条例第4号",
    title: "春巻き推進条例",
    category: "産業",
    enactedDate: "2026年4月29日",
    summary: "春巻きの普及及び消費拡大を推進する条例。なお、制定の経緯は記録に残っていない。",
    amendments: [{ date: "2026年5月", description: "春巻き推進課の設置を明記する改正。" }],
    articles: [
      {
        number: 1,
        heading: "目的",
        paragraphs: [{ text: "この条例は、春巻きの普及及び消費拡大を図ることを目的とする。" }],
      },
      {
        number: 2,
        heading: "春巻き推進課の設置",
        paragraphs: [{ text: "前条の目的を達成するため、矢張市役所に春巻き推進課を置く。" }],
      },
      {
        number: 3,
        heading: "雑則",
        paragraphs: [{ text: "この条例の施行に関し必要な事項は、春巻き推進課が定める。" }],
      },
    ],
  },
  {
    slug: "citizen-group-registration",
    number: "矢張市条例第5号",
    title: "矢張市民活動団体登録条例",
    category: "市民活動",
    enactedDate: "2026年5月20日",
    summary: "市民が結成する活動団体の登録制度を定める条例。",
    amendments: [],
    articles: [
      {
        number: 1,
        heading: "目的",
        paragraphs: [
          { text: "この条例は、市民活動団体の登録に関し必要な事項を定め、市民活動の振興を図ることを目的とする。" },
        ],
      },
      {
        number: 2,
        heading: "登録",
        paragraphs: [
          { text: "市内で活動する団体は、市民協働課に申請のうえ、登録を受けることができる。" },
          { text: "登録を受けた団体には、登録番号を付与する。" },
        ],
      },
      {
        number: 3,
        heading: "登録団体の公示",
        paragraphs: [{ text: "市は、登録を受けた団体の名称及び活動内容を、市民活動団体登録ページにおいて公示する。" }],
      },
    ],
  },
  {
    slug: "community-safety",
    number: "矢張市条例第6号",
    title: "矢張市コミュニティ安全条例",
    category: "安全",
    enactedDate: "2026年2月23日",
    summary: "「自由な発言」ではなく「安心して参加できる自由」を優先するため、禁止事項・処分・緊急対応・通報・異議申し立て等を定める条例。",
    amendments: [],
    articles: [
      {
        number: 1,
        heading: "目的",
        paragraphs: [
          {
            text: "この条例は、「自由な発言」ではなく「安心して参加できる自由」を優先する理念のもと、他者の尊厳やコミュニティの秩序を損なう行為を禁止し、市民が安心して参加できる環境を確保することを目的とする。",
          },
        ],
      },
      {
        number: 2,
        heading: "禁止事項",
        paragraphs: [
          {
            text: "市民は、次に掲げる行為をしてはならない。",
            items: [
              "荒らし・スパム",
              "過度な暴言・人格攻撃",
              "過度に性的な内容(R-18・R-15は指定チャンネルのみ。R-18Gは禁止する。)",
              "個人情報の投稿・拡散",
              "違法行為の助長",
              "ヘイト・差別的発言",
              "脅迫・継続的な嫌がらせ",
              "モデレーション妨害",
              "ルールの抜け穴を意図的に利用する行為",
            ],
          },
          { text: "前項各号の程度の判断は、運営が行う。" },
        ],
      },
      {
        number: 3,
        heading: "処分",
        paragraphs: [
          {
            text: "処分は、原則として厳重注意、警告、厳重警告、TO、Kick、BANの順に段階的に行う。ただし、悪質又は緊急性が高い場合は、段階を経ずに即時の対応を行うことができる。",
          },
          {
            text: "処分の内容は、次のとおりとする。",
            items: [
              "厳重注意: 口頭注意(記録なし)",
              "警告: 記録付きの注意",
              "厳重警告: 最終警告",
              "TO: 一定期間の発言停止",
              "Kick: 再参加可能な退出",
              "BAN: 再参加不可(原則永久)",
            ],
          },
        ],
      },
      {
        number: 4,
        heading: "緊急対応",
        paragraphs: [
          {
            text: "次に掲げる行為は、前条の規定にかかわらず、段階を省略し、即時の削除、TO又はBANの対象とする。",
            items: ["犯罪予告", "個人情報漏洩", "詐欺・違法勧誘", "未成年保護上重大な問題", "外部からの攻撃", "重度の荒らし・妨害"],
          },
          { text: "前項各号への対応に当たっては、必要に応じて保護者、学校、法執行機関等と連携する。" },
        ],
      },
      {
        number: 5,
        heading: "通報",
        paragraphs: [
          { text: "違反を見つけた市民は、モデレーターへのダイレクトメッセージ又は専用通報チャンネルにより通報することができる。" },
          { text: "虚偽の通報は、処分の対象とする。" },
        ],
      },
      {
        number: 6,
        heading: "異議申し立て",
        paragraphs: [{ text: "処分に異議がある市民は、処分の日から7日以内に、運営に対し異議を申し立てることができる。" }],
      },
      {
        number: 7,
        heading: "個人間トラブル",
        paragraphs: [
          { text: "個人間の問題については、原則として運営は関与しない。" },
          { text: "ただし、サーバー内に影響を及ぼす場合は、この限りでない。" },
        ],
      },
      {
        number: 8,
        heading: "最終判断",
        paragraphs: [{ text: "この条例の運用に関する最終判断は、運営が行う。運営は、公平性・透明性・説明責任をもって対応する。" }],
      },
    ],
  },
];

export function getOrdinance(slug: string): Ordinance | undefined {
  return ORDINANCES.find((ordinance) => ordinance.slug === slug);
}

export function getLatestAmendmentDate(ordinance: Ordinance): string {
  if (ordinance.amendments.length === 0) return ordinance.enactedDate;
  return ordinance.amendments[ordinance.amendments.length - 1].date;
}

const ZENKAKU_DIGITS = ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"];

// 法令の項番号は全角数字で表記する慣例に合わせる(例: ２、１０)
export function toZenkakuNumber(n: number): string {
  return String(n)
    .split("")
    .map((digit) => ZENKAKU_DIGITS[Number(digit)])
    .join("");
}

const KANJI_DIGITS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

// 号(列記事項)の番号は漢数字で表記する慣例に合わせる(例: 一、二、十)
export function toKanjiNumber(n: number): string {
  if (n <= 10) return KANJI_DIGITS[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${tens > 1 ? KANJI_DIGITS[tens] : ""}十${ones > 0 ? KANJI_DIGITS[ones] : ""}`;
}
