import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import DiscordWidget from "@/components/DiscordWidget";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE, pageMetadata } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";

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

export default async function AccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        title="市民になるには"
        path="/access"
        lead={`${SITE.name}の公式Discordサーバーへの参加方法をご案内します。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">参加までの3ステップ</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3" role="list">
          {STEPS.map((step, index) => (
            <Card key={step.title} role="listitem" className="bg-yahari-sky-light shadow-none">
              <CardContent>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yahari-navy text-sm font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-3 font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href={SITE.discordInviteUrl} target="_blank" rel="noopener noreferrer">
              Discordサーバーに参加する
            </a>
          </Button>
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
          <p className="mt-2 text-sm text-muted-foreground">
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
          <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
            {OFFICE_INFO.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-4 py-3">
                <dt className="font-semibold text-muted-foreground">{item.label}</dt>
                <dd className="col-span-2 text-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
