// 気象庁(JMA)が公開している防災情報JSON(気象庁ウェブサイトの地図表示等で使用されている公開データ)を取得するユーティリティ。
// 正式な開発者向けAPIではなく無認証で公開されているJSONエンドポイントのため、提供元の仕様変更により動作しなくなる可能性があります。

const JMA_BASE = "https://www.jma.go.jp/bosai";

// 出典: 気象庁防災情報XMLフォーマット「警報等情報要素コード管理表」(https://xml.kishou.go.jp/) より転記
export const WARNING_CODES: Record<string, string> = {
  "2": "暴風雪警報",
  "3": "大雨警報",
  "4": "洪水警報",
  "5": "暴風警報",
  "6": "大雪警報",
  "7": "波浪警報",
  "8": "高潮警報",
  "10": "大雨注意報",
  "12": "大雪注意報",
  "13": "風雪注意報",
  "14": "雷注意報",
  "15": "強風注意報",
  "16": "波浪注意報",
  "17": "融雪注意報",
  "18": "洪水注意報",
  "19": "高潮注意報",
  "20": "濃霧注意報",
  "21": "乾燥注意報",
  "22": "なだれ注意報",
  "23": "低温注意報",
  "24": "霜注意報",
  "25": "着氷注意報",
  "26": "着雪注意報",
  "27": "その他の注意報",
  "32": "暴風雪特別警報",
  "33": "大雨特別警報",
  "35": "暴風特別警報",
  "36": "大雪特別警報",
  "37": "波浪特別警報",
  "38": "高潮特別警報",
};

export function warningName(code: string): string {
  return WARNING_CODES[code] ?? `警報・注意報(コード${code})`;
}

export interface QuakeListItem {
  eid: string;
  rdt: string;
  ttl: string;
  at: string;
  anm: string;
  cod: string;
  mag: string;
  maxi: string;
  en_anm: string;
}

export async function getRecentEarthquakes(limit = 10): Promise<QuakeListItem[]> {
  const res = await fetch(`${JMA_BASE}/quake/data/list.json`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as QuakeListItem[];
  return data.filter((item) => item.ttl === "震源・震度情報" || item.ttl === "震度速報").slice(0, limit);
}

// JMAの震源座標表記(例: "+42.9+144.0-50000/")を緯度・経度・深さ(km)に変換する
export function parseQuakeCoordinates(cod: string): { lat: number; lng: number; depthKm: number | null } | null {
  const match = cod.match(/^([+-]\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)([+-]\d+(?:\.\d+)?)?/);
  if (!match) return null;
  const lat = Number.parseFloat(match[1]);
  const lng = Number.parseFloat(match[2]);
  if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
  const depthM = match[3] ? Number.parseFloat(match[3]) : null;
  return { lat, lng, depthKm: depthM === null ? null : Math.abs(depthM) / 1000 };
}

export interface TsunamiListItem {
  eid: string;
  rdt: string;
  ttl: string;
  at: string;
  anm: string;
  mag: string;
  kind: { code: string; kind: string }[];
}

export async function getRecentTsunamiBulletins(limit = 5): Promise<TsunamiListItem[]> {
  const res = await fetch(`${JMA_BASE}/tsunami/data/list.json`, { cache: "no-store" });
  if (!res.ok) return [];
  const data = (await res.json()) as TsunamiListItem[];
  return data.slice(0, limit);
}

export interface AreaOffice {
  code: string;
  name: string;
  enName: string;
}

interface AreaJson {
  offices: Record<string, { name: string; enName: string }>;
  class10s: Record<string, { name: string; enName: string }>;
}

async function getAreaJson(): Promise<AreaJson | null> {
  const res = await fetch(`${JMA_BASE}/common/const/area.json`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as AreaJson;
}

export async function getAreaOffices(): Promise<AreaOffice[]> {
  const data = await getAreaJson();
  if (!data) return [];
  return Object.entries(data.offices)
    .map(([code, office]) => ({ code, name: office.name, enName: office.enName }))
    .sort((a, b) => a.code.localeCompare(b.code));
}

export async function getClass10Names(): Promise<Record<string, string>> {
  const data = await getAreaJson();
  if (!data) return {};
  return Object.fromEntries(Object.entries(data.class10s).map(([code, area]) => [code, area.name]));
}

export interface WarningArea {
  code: string;
  warnings: { code?: string; status: string }[];
}

export interface WarningResult {
  reportDatetime: string;
  headlineText: string;
  areas: WarningArea[];
}

export async function getWarnings(officeCode: string): Promise<WarningResult | null> {
  const res = await fetch(`${JMA_BASE}/warning/data/warning/${officeCode}.json`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    reportDatetime: string;
    headlineText: string;
    areaTypes: { areas: WarningArea[] }[];
  };
  return {
    reportDatetime: data.reportDatetime,
    headlineText: data.headlineText,
    areas: data.areaTypes[0]?.areas ?? [],
  };
}
