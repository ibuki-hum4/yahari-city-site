import type { Metadata } from "next";
import Link from "next/link";
import DiscordWidget from "@/components/DiscordWidget";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/access");

const STEPS = [
  {
    title: "公式Discordサーバーへアクセス",
    description: "下のボタンから、矢張市の公式Discordサーバーへ参加してください。",
  },
  {
    title: "案内に沿って自己紹介",
    description: "サーバー内の案内チャンネルの手順に沿って、簡単な自己紹介を行います。",
  },
  {
    title: "市民として活動開始",
    description: "市民ロール(役職)が付与されたら、矢張市民として活動を開始できます。",
  },
];

const OFFICE_INFO: { label: string; value: string }[] = [
  { label: "受付時間", value: "24時間365日対応(Discordのため休館日はありません)" },
  { label: "お問い合わせ", value: "サーバー内「#お問い合わせ」チャンネルまで" },
  { label: "所在地", value: "Discord上(インターネットのどこでも)" },
];

export default function AccessPage() {
  return (
    <>
      <PageHeader
        title="市民になるには"
        path="/access"
        lead={`${SITE.name}の公式Discordサーバーへの参加方法をご案内します。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">参加までの3ステップ</h2>
        <ol className="mt-6 grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-lg bg-yahari-sky-light p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yahari-navy text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 font-bold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-10 text-center">
          <a
            href={SITE.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-yahari-navy px-8 py-3 font-semibold text-white hover:bg-yahari-navy-dark"
          >
            Discordサーバーに参加する
          </a>
          <p className="mt-4 text-sm">
            市民になったら、
            <Link href="/citizen-card" className="font-medium text-yahari-navy hover:underline">
              市民証発行ページ
            </Link>
            から自分だけの市民証を発行してみましょう。
          </p>
        </div>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">サーバーの様子</h2>
          <p className="mt-2 text-sm text-gray-600">
            現在オンラインの市民数などをリアルタイムで確認できます。
          </p>
          <div className="mt-6">
            <DiscordWidget />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">本庁情報</h2>
          <dl className="mt-6 divide-y divide-gray-100 border-y border-gray-100 text-sm">
            {OFFICE_INFO.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-4 py-3">
                <dt className="font-semibold text-gray-500">{item.label}</dt>
                <dd className="col-span-2 text-gray-800">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
