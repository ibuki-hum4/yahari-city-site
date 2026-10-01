import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MAIN_TOPICS, MAYOR_PROFILE, MAYOR_QUOTES, SITE, pageMetadata } from "@/lib/content";
import { cn } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/about");

const BASIC_DATA: { label: string; value: string }[] = [
  { label: "名称", value: `${SITE.name}(${SITE.englishName})` },
  { label: "区長", value: SITE.mayor },
  { label: "設立", value: SITE.founded },
  { label: "区民数", value: `${SITE.population}人(${SITE.populationAsOf})` },
  { label: "区の花", value: SITE.flower },
  { label: "区の木", value: SITE.tree },
  { label: "区の鳥", value: SITE.bird },
  { label: "スローガン", value: SITE.slogan },
  { label: "活動拠点", value: SITE.base },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        title="矢張区について"
        path="/about"
        lead="矢張区の概要と、区長からのメッセージをご紹介します。"
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">区長メッセージ</h2>
        <div className="mt-6 flex flex-col gap-6 rounded-lg bg-yahari-sky-light p-6 sm:flex-row">
          <Image
            src={SITE.logoMedium}
            alt={`${SITE.name}章`}
            width={96}
            height={96}
            className="h-24 w-24 shrink-0 self-start"
          />
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              {SITE.name}公式サイトをご覧いただき、誠にありがとうございます。{SITE.mayorTitle}の{SITE.mayor}です。
            </p>
            <p>
              {SITE.name}は、2026年2月23日に誕生した「矢張市」の後継として、{SITE.founded}に新たなDiscordサーバーで発足しました。現在は{SITE.population}人の区民の皆さまが集う「街」です。
            </p>
            <p>
              本区の名前にも掲げた「矢」のように、まっすぐな思いを持つ仲間たちと、これからも一歩ずつ前へ進んでいきたいと考えています。
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

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">{SITE.mayorTitle}プロフィール</h2>
        <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
          {MAYOR_PROFILE.map((item) => (
            <div key={item.label} className="grid grid-cols-3 gap-4 py-3">
              <dt className="font-semibold text-muted-foreground">{item.label}</dt>
              <dd className="col-span-2 text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>

        <Card className="mt-8 border-yahari-sky bg-yahari-sky-light/40">
          <CardContent>
            <h3 className="text-sm font-bold text-yahari-navy">区長の一言コーナー</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">「{MAYOR_QUOTES[0]}」</p>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/column">区長コラムをもっと読む ›</Link>
          </Button>
        </div>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">矢張区について</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              {SITE.name}(やはりく)は、Discord上で活動する非公式・架空の「区」です。実在する地方公共団体とは一切関係ありません。
            </p>
            <p>
              日々の雑談からイベント企画まで、「区民」と呼ばれるメンバーが集い、思い思いに過ごせる場所として運営されています。
            </p>
            <p>
              「矢張(やはり)」の名は、目標に向かって一直線に進む「矢」と、弓を「張る」ことで生まれる推進力を表しており、区章にもそのモチーフが描かれています。
            </p>
          </div>

          <h3 className="mt-8 text-sm font-bold text-yahari-navy">主な話題</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {MAIN_TOPICS.map((topic) => (
              <Badge
                key={topic.label}
                variant={topic.featured ? "default" : "secondary"}
                className={cn(
                  topic.featured && "h-7 bg-yahari-navy px-3 text-sm font-bold text-white"
                )}
              >
                {topic.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">基礎データ</h2>
        <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
          {BASIC_DATA.map((item) => (
            <div key={item.label} className="grid grid-cols-3 gap-4 py-3">
              <dt className="font-semibold text-muted-foreground">{item.label}</dt>
              <dd className="col-span-2 text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/departments">矢張区役所の部署一覧を見る ›</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
