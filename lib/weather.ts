// 矢張市の「架空の天気」機能。実在の気象情報とは一切関係のないジョークコンテンツ。
// 日付(JST)をシードにした決定論的な抽選のため、同じ日であれば誰がいつ見ても
// 同じ天気・警報注意報・的中率になる(サーバー/クライアントで計算がずれない)。

export type WeatherCategory = "clear" | "cloud" | "rain" | "snow";

// 二十四節気の立春・立夏・立秋・立冬を月単位に簡略化した4区分。冬(11,12,1月)から時計回りに
// 春(2,3,4月)・夏(5,6,7月)・秋(8,9,10月)と続く伝統的な四季区分に合わせている
// (いわゆる「気象学上の四季」(3-5月が春等)とはひと月ずれている点に注意)。
export type Season = "spring" | "summer" | "autumn" | "winter";

// 絵文字は環境によって見た目が大きく異なる(未対応環境では表示すらされない)ため、
// アイコンはIDのみ持たせ、実際の描画は components/WeatherIcon.tsx (lucide-react) に委ねる。
export type WeatherIconId =
  | "sun"
  | "cloud"
  | "cloud-rain"
  | "cloud-snow"
  | "cloud-hail"
  | "cloud-lightning"
  | "paw-print"
  | "flower"
  | "tree-pine"
  | "rainbow"
  | "calendar-days"
  | "sun-snow";

export interface WeatherType {
  id: string;
  icon: WeatherIconId;
  label: string;
  reading?: string;
  description: string;
  category: WeatherCategory;
  /** 指定した季節のみ抽選対象にする。未指定なら通年いつでも出現する。 */
  season?: Season;
  gag?: boolean;
}

export type AdvisoryLevel = "注意報" | "警報" | "特別警報";

export interface Advisory {
  id: string;
  label: string;
  level: AdvisoryLevel;
  /** 抽選時の重み(相対頻度、既定1)。特別警報のようなレアな上位区分を低頻度にするために使う。 */
  weight?: number;
  gag?: boolean;
}

export const WEATHER_TYPES: WeatherType[] = [
  {
    id: "clear",
    icon: "sun",
    label: "晴れ",
    description: "雲ひとつない、矢張市らしい爽やかな晴天です。",
    category: "clear",
  },
  {
    id: "cloudy",
    icon: "cloud",
    label: "曇り",
    description: "空全体を雲が覆う、落ち着いた一日になりそうです。",
    category: "cloud",
  },
  {
    id: "rain",
    icon: "cloud-rain",
    label: "雨",
    description: "傘が手放せない一日です。足元にご注意ください。",
    category: "rain",
  },
  {
    id: "snow",
    icon: "cloud-snow",
    label: "雪",
    description: "市内各所で積雪が見込まれます。路面凍結にご注意ください。",
    category: "snow",
    season: "winter",
  },
  {
    id: "sleet",
    icon: "cloud-hail",
    label: "みぞれ",
    description: "雨と雪が入り混じる、判断に迷う空模様です。",
    category: "snow",
    season: "winter",
  },
  {
    id: "thunderstorm",
    icon: "cloud-lightning",
    label: "雷雨",
    description: "激しい雷を伴う雨が予想されます。屋内で安全にお過ごしください。",
    category: "rain",
    season: "summer",
  },
  {
    id: "catrain",
    icon: "paw-print",
    label: "猫雨",
    reading: "びょうさめ",
    description: "猫の足音のように静かに降る、ごく弱い雨です。",
    category: "rain",
    gag: true,
  },
  {
    id: "cornflowerfine",
    icon: "flower",
    label: "矢車日和",
    reading: "やぐるまびより",
    description: "市の花・矢車菊が映える、穏やかで過ごしやすい晴れです。",
    category: "clear",
    season: "spring", // 矢車菊(コーンフラワー)の開花期(春)に合わせる
    gag: true,
  },
  {
    id: "camphorcloud",
    icon: "tree-pine",
    label: "楠曇り",
    reading: "くすぐもり",
    description: "市の木・クスノキの葉がざわざわと揺れる、どこかくすぐったい曇り空です。",
    category: "cloud",
    gag: true,
  },
  {
    id: "eightcolorrain",
    icon: "rainbow",
    label: "八色雨",
    reading: "やいろさめ",
    description: "市の鳥・ヤイロチョウにちなみ、光の加減で虹色に霞んで見える通り雨です。",
    category: "rain",
    season: "summer", // ヤイロチョウは夏鳥(繁殖のため夏に飛来する)なのに合わせる
    gag: true,
  },
  {
    id: "anomalyday",
    icon: "calendar-days",
    label: "矢張特異日",
    reading: "やはりとくいび",
    description: "統計的になぜか同じ天気になりやすいとされる、矢張市ならではの特異日です。",
    category: "clear",
    gag: true,
  },
  {
    id: "snowyclear",
    icon: "sun-snow",
    label: "綿雪晴れ",
    reading: "わたゆきばれ",
    description: "雪がちらつきながらも晴れ間がのぞく、珍しい空模様です。",
    category: "snow",
    season: "winter",
    gag: true,
  },
];

const ADVISORY_POOLS: Record<WeatherCategory, Advisory[]> = {
  rain: [
    { id: "heavy-rain-advisory", label: "大雨注意報", level: "注意報", weight: 35 },
    { id: "flood-advisory", label: "洪水注意報", level: "注意報", weight: 20 },
    { id: "thunder-advisory", label: "雷注意報", level: "注意報", weight: 20 },
    { id: "heavy-rain-warning", label: "大雨警報", level: "警報", weight: 20 },
    { id: "heavy-rain-emergency", label: "大雨特別警報", level: "特別警報", weight: 5 },
  ],
  snow: [
    { id: "heavy-snow-advisory", label: "大雪注意報", level: "注意報", weight: 40 },
    { id: "snow-accretion-advisory", label: "着雪注意報", level: "注意報", weight: 25 },
    { id: "heavy-snow-warning", label: "大雪警報", level: "警報", weight: 25 },
    { id: "heavy-snow-emergency", label: "大雪特別警報", level: "特別警報", weight: 10 },
  ],
  cloud: [
    { id: "dry-advisory", label: "乾燥注意報", level: "注意報" },
    { id: "runaround-advisory", label: "たらい回し注意報", level: "注意報", gag: true },
    { id: "oversleep-advisory", label: "二度寝注意報", level: "注意報", gag: true },
  ],
  clear: [
    { id: "dry-advisory", label: "乾燥注意報", level: "注意報" },
    { id: "uv-advisory", label: "紫外線注意報", level: "注意報" },
    { id: "runaround-advisory", label: "たらい回し注意報", level: "注意報", gag: true },
    { id: "oversleep-advisory", label: "二度寝注意報", level: "注意報", gag: true },
  ],
};

// 発生率(%)。雨・雪系は高め、晴れ・曇り系は「なし」が大半になるよう低めに設定。
const ADVISORY_PRESENCE_RATE: Record<WeatherCategory, number> = {
  rain: 45,
  snow: 40,
  cloud: 12,
  clear: 10,
};

/** シード生成専用の簡易文字列ハッシュ(暗号強度は不要)。 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** `seed`から重み付きで1件選ぶ。特別警報のようなレアな区分の出現率を下げるために使う。 */
function weightedPick<T extends { weight?: number }>(items: T[], seed: number): T {
  const totalWeight = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  const roll = seed % totalWeight;
  let cumulative = 0;
  for (const item of items) {
    cumulative += item.weight ?? 1;
    if (roll < cumulative) {
      return item;
    }
  }
  return items[items.length - 1];
}

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

/**
 * サーバー/クライアントのローカルタイムゾーンに依存せず、JST基準の日付キー(YYYY-MM-DD)を返す。
 * `toLocaleDateString`等のIntl APIはJS実行エンジンによって出力が微妙に異なりうる
 * (このサイトのdevサーバーはBun/JavaScriptCore、ブラウザはChromium/V8で動くため、
 * SSRとハイドレーションでエンジンが異なる)。そのため、あえてIntlを使わずUTCミリ秒への
 * 単純な加算だけでJSTの日付を求め、どの実行エンジンでも同じ文字列になるようにしている。
 */
export function getJstDateKey(date: Date = new Date()): string {
  const jst = new Date(date.getTime() + JST_OFFSET_MS);
  const year = jst.getUTCFullYear();
  const month = String(jst.getUTCMonth() + 1).padStart(2, "0");
  const day = String(jst.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** JST基準の現在時(0-23)を返す。的中率の発表判定(21時)に使用。理由はgetJstDateKeyと同じ。 */
export function getJstHour(date: Date = new Date()): number {
  const jst = new Date(date.getTime() + JST_OFFSET_MS);
  return jst.getUTCHours();
}

export const SEASON_LABELS: Record<Season, string> = {
  spring: "春",
  summer: "夏",
  autumn: "秋",
  winter: "冬",
};

const SEASON_MONTHS: Record<Season, number[]> = {
  winter: [11, 12, 1],
  spring: [2, 3, 4],
  summer: [5, 6, 7],
  autumn: [8, 9, 10],
};

/** JST基準の月から季節を求める(冬=11,12,1月〜、立春・立夏・立秋・立冬による伝統的な区分)。 */
export function getSeason(date: Date = new Date()): Season {
  const jst = new Date(date.getTime() + JST_OFFSET_MS);
  const month = jst.getUTCMonth() + 1;
  const entry = (Object.entries(SEASON_MONTHS) as [Season, number[]][]).find(([, months]) =>
    months.includes(month)
  );
  // SEASON_MONTHSは1〜12月を過不足なく網羅しているため、このfallbackには実際には到達しない。
  return entry?.[0] ?? "winter";
}

/** 季節限定でない天気、または`season`と一致する天気だけの一覧を返す。 */
function weatherPoolForSeason(season: Season): WeatherType[] {
  return WEATHER_TYPES.filter((type) => !type.season || type.season === season);
}

/** 本日(JST)の天気を決定論的に抽選する。同じ日なら常に同じ結果になる(季節限定の天気はその季節のみ)。 */
export function getTodayWeather(date: Date = new Date()): WeatherType {
  const dateKey = getJstDateKey(date);
  const pool = weatherPoolForSeason(getSeason(date));
  const index = hashString(`${dateKey}:weather`) % pool.length;
  return pool[index];
}

/** 本日(JST)の警報・注意報を、天気の系統に矛盾しない範囲で決定論的に抽選する。なければnull。 */
export function getTodayAdvisory(date: Date = new Date()): Advisory | null {
  const dateKey = getJstDateKey(date);
  const category = getTodayWeather(date).category;
  const presenceRoll = hashString(`${dateKey}:advisory-presence:${category}`) % 100;
  if (presenceRoll >= ADVISORY_PRESENCE_RATE[category]) {
    return null;
  }
  const pool = ADVISORY_POOLS[category];
  const seed = hashString(`${dateKey}:advisory-pick:${category}`);
  return weightedPick(pool, seed);
}

/** 本日(JST)の的中率(80〜99%)を決定論的に抽選する。 */
export function getTodayAccuracy(date: Date = new Date()): number {
  const dateKey = getJstDateKey(date);
  return 80 + (hashString(`${dateKey}:accuracy`) % 20);
}

/** 的中率は21時(JST)以降に発表される。 */
export function isAccuracyRevealed(date: Date = new Date()): boolean {
  return getJstHour(date) >= 21;
}

export interface ForecastDay {
  dateKey: string;
  weekdayLabel: string;
  isToday: boolean;
  weather: WeatherType;
}

const WEEKDAY_LABELS = ["月", "火", "水", "木", "金", "土", "日"];

/**
 * `dateKey`(JST基準のYYYY-MM-DD)が属する週の月曜日のdateKeyを返す。
 * 純粋なカレンダー計算(タイムゾーン変換は不要)のため、UTC正午の`Date`として扱うことで
 * 実行環境のタイムゾーンによる日付ズレを避ける。
 */
function getWeekMondayKey(dateKey: string): string {
  const d = new Date(`${dateKey}T00:00:00Z`);
  const mondayFirstIndex = (d.getUTCDay() + 6) % 7; // 月=0, 火=1, ..., 日=6
  d.setUTCDate(d.getUTCDate() - mondayFirstIndex);
  return d.toISOString().slice(0, 10);
}

/**
 * 週間天気予報(月曜始まりの7日分)を返す。各日の天気は`getTodayWeather()`と同じ
 * 日付キー方式の抽選をその日の日付でそのまま呼び出しているため、「今日」欄は常に
 * 上部の「本日の天気」と完全に一致する(=予報と実況が食い違うことはない)。
 * また各日の抽選結果は日付だけで決まるため、週の途中で見ても同じ週内なら値は変わらない。
 */
export function getWeeklyForecast(date: Date = new Date()): ForecastDay[] {
  const todayKey = getJstDateKey(date);
  const mondayKey = getWeekMondayKey(todayKey);
  const monday = new Date(`${mondayKey}T00:00:00Z`);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + i);
    const dateKey = d.toISOString().slice(0, 10);
    return {
      dateKey,
      weekdayLabel: WEEKDAY_LABELS[i],
      isToday: dateKey === todayKey,
      weather: getTodayWeather(d),
    };
  });
}
