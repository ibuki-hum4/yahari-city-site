import Link from "next/link";
import type { Metadata } from "next";
import EarthquakeMap from "@/components/EarthquakeMap";
import PageHeader from "@/components/PageHeader";
import RefreshButton from "@/components/RefreshButton";
import WarningLookup from "@/components/WarningLookup";
import { pageMetadata } from "@/lib/content";
import { getAreaOffices, getRecentEarthquakes, getRecentTsunamiBulletins } from "@/lib/jma";

export const metadata: Metadata = pageMetadata("/bosai");

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ja-JP", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

const SHELTER_LINKS = [
  {
    href: "https://disaportal.gsi.go.jp/",
    title: "重ねるハザードマップ(国土地理院)",
    description: "全国の洪水・土砂災害・高潮等のハザード情報と避難所を地図上で確認できます。",
  },
  {
    href: "https://www.bousai.go.jp/",
    title: "防災情報のページ(内閣府)",
    description: "国の防災施策・災害対応に関する公式情報です。",
  },
  {
    href: "https://map.yahoo.co.jp/disaster/evacuation/",
    title: "避難場所マップ(Yahoo!地図)",
    description: "現在地周辺の指定避難所・避難場所を検索できます。",
  },
];

export default async function BosaiPage() {
  const [earthquakes, tsunamis, offices] = await Promise.all([
    getRecentEarthquakes(10),
    getRecentTsunamiBulletins(5),
    getAreaOffices(),
  ]);

  return (
    <>
      <PageHeader
        title="矢張市防災ポータル"
        path="/bosai"
        lead="気象庁が公開する観測データをもとに、全国の地震・津波・警報注意報・避難所情報をまとめてご覧いただけます。"
      />

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-800">
          <p className="font-bold">ご利用にあたって</p>
          <p className="mt-1">
            本ポータルは気象庁が公開している観測データを独自に集約した参考情報です。矢張市は架空の自治体であり、本ポータル自体が公式な防災機関ではありません。
            <strong>
              最新かつ正式な情報は、必ず
              <a
                href="https://www.jma.go.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                気象庁公式サイト
              </a>
              およびお住まいの自治体の発表でご確認ください。
            </strong>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-yahari-navy">地震情報</h2>
          <RefreshButton />
        </div>
        <p className="mt-1 text-xs text-gray-600">出典: 気象庁(直近{earthquakes.length}件)</p>

        <div className="mt-4">
          <EarthquakeMap earthquakes={earthquakes} />
        </div>

        {earthquakes.length === 0 ? (
          <p className="mt-4 text-sm text-gray-600">情報を取得できませんでした。</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100 border-y border-gray-100">
            {earthquakes.map((eq) => (
              <li key={eq.eid + eq.rdt} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3 text-sm">
                <time className="w-40 shrink-0 text-gray-600">{formatDateTime(eq.at)}</time>
                <span className="font-semibold text-gray-800">{eq.anm || eq.en_anm}</span>
                <span className="text-gray-600">M{eq.mag || "不明"}</span>
                <span className="rounded bg-yahari-sky-light px-2 py-0.5 text-xs font-semibold text-yahari-navy">
                  最大震度 {eq.maxi || "不明"}
                </span>
              </li>
            ))}
          </ul>
        )}
        <a
          href="https://www.jma.go.jp/bosai/map.html"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-yahari-navy hover:underline"
        >
          気象庁の防災情報マップで詳しく見る ›
        </a>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h2 className="text-xl font-bold text-yahari-navy">津波情報</h2>
          <p className="mt-1 text-xs text-gray-600">出典: 気象庁(直近の発表{tsunamis.length}件)</p>

          {tsunamis.length === 0 ? (
            <p className="mt-4 text-sm text-gray-600">直近の発表はありません。</p>
          ) : (
            <ul className="mt-4 divide-y divide-gray-100 border-y border-gray-100">
              {tsunamis.map((t) => (
                <li key={t.eid + t.rdt} className="py-3 text-sm">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <time className="w-40 shrink-0 text-gray-600">{formatDateTime(t.rdt)}</time>
                    <span className="font-semibold text-gray-800">{t.ttl}</span>
                    <span className="text-gray-600">{t.anm}</span>
                  </div>
                  {t.kind.length > 0 && (
                    <ul className="mt-1 flex flex-wrap gap-1 pl-0 sm:pl-44">
                      {[...new Set(t.kind.map((k) => k.kind))].map((kind) => (
                        <li
                          key={kind}
                          className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700"
                        >
                          {kind}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
          <a
            href="https://www.jma.go.jp/bosai/map.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-yahari-navy hover:underline"
          >
            気象庁の防災情報マップで詳しく見る ›
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="text-xl font-bold text-yahari-navy">警報・注意報</h2>
        <p className="mt-1 text-xs text-gray-600">出典: 気象庁</p>
        <div className="mt-4">
          <WarningLookup offices={offices} />
        </div>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h2 className="text-xl font-bold text-yahari-navy">避難所情報</h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-700">
            避難所・避難場所は市区町村ごとに指定されており、全国を網羅する単一のリアルタイムAPIは公開されていません。お住まいの地域の最新の指定状況は、以下の公的なサービスでご確認ください。
          </p>
          <ul className="mt-4 space-y-3">
            {SHELTER_LINKS.map((link) => (
              <li key={link.href} className="rounded-lg bg-white p-4 shadow-sm">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-yahari-navy hover:underline"
                >
                  {link.title}
                </a>
                <p className="mt-1 text-sm text-gray-600">{link.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-8">
        <p className="text-xs text-gray-600">
          矢張市防災ポータルは、
          <Link href="/about" className="underline">
            矢張市
          </Link>
          が独自に運営する非公式の情報集約サービスです。気象庁・国土地理院・内閣府等の発表データを引用していますが、これらの機関とは関係ありません。
        </p>
      </section>
    </>
  );
}
