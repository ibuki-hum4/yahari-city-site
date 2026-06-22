import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/about");

const BASIC_DATA: { label: string; value: string }[] = [
  { label: "名称", value: `${SITE.name}(${SITE.englishName})` },
  { label: "市長", value: SITE.mayor },
  { label: "設立", value: SITE.founded },
  { label: "市民数", value: `${SITE.population}人(${SITE.populationAsOf})` },
  { label: "市の花", value: SITE.flower },
  { label: "市の木", value: SITE.tree },
  { label: "市の鳥", value: SITE.bird },
  { label: "スローガン", value: SITE.slogan },
  { label: "活動拠点", value: SITE.base },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="矢張市について"
        path="/about"
        lead="矢張市の概要と、市長からのメッセージをご紹介します。"
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">市長メッセージ</h2>
        <div className="mt-6 flex flex-col gap-6 rounded-lg bg-yahari-sky-light p-6 sm:flex-row">
          <Image
            src={SITE.logo}
            alt={`${SITE.name}章`}
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 self-start"
          />
          <div className="space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              {SITE.name}公式サイトをご覧いただき、誠にありがとうございます。{SITE.mayorTitle}の{SITE.mayor}です。
            </p>
            <p>
              {SITE.name}は、{SITE.founded}に小さなDiscordサーバーとして誕生しました。以来、多くの市民の皆さまに支えられ、今では{SITE.population}人が集う「街」へと育ちました。
            </p>
            <p>
              本市の名前にも掲げた「矢」のように、まっすぐな思いを持つ仲間たちと、これからも一歩ずつ前へ進んでいきたいと考えています。
            </p>
            <p>
              このサイトでは、{SITE.name}の歴史や日々の出来事をご紹介してまいります。ぜひゆっくりとご覧ください。
            </p>
            <p className="text-right font-semibold text-yahari-navy">
              {SITE.mayorTitle}　{SITE.mayor}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">矢張市について</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              {SITE.name}(やはりし)は、Discord上で活動する非公式・架空の「市」です。実在する地方公共団体とは一切関係ありません。
            </p>
            <p>
              日々の雑談からイベント企画まで、「市民」と呼ばれるメンバーが集い、思い思いに過ごせる場所として運営されています。
            </p>
            <p>
              「矢張(やはり)」の名は、目標に向かって一直線に進む「矢」と、弓を「張る」ことで生まれる推進力を表しており、市章にもそのモチーフが描かれています。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">基礎データ</h2>
        <dl className="mt-6 divide-y divide-gray-100 border-y border-gray-100 text-sm">
          {BASIC_DATA.map((item) => (
            <div key={item.label} className="grid grid-cols-3 gap-4 py-3">
              <dt className="font-semibold text-gray-500">{item.label}</dt>
              <dd className="col-span-2 text-gray-800">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm">
          <Link href="/departments" className="font-medium text-yahari-navy hover:underline">
            矢張市役所の部署一覧を見る ›
          </Link>
        </p>
      </section>
    </>
  );
}
