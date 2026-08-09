import type { Metadata } from "next";
import BentoLinkCard, { type BentoIconId } from "@/components/BentoLinkCard";
import PageHeader from "@/components/PageHeader";
import { APPLICATIONS } from "@/lib/applications";
import { pageMetadata } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/applications");

// 6件と少数精鋭なので、団体登録と推し活休暇の2件を帯タイルにして目を引かせ、
// 残りは通常タイルで並べるBento構成にしている(全件を同じ水色で塗っていた旧デザインより
// メリハリが付き、情報量に見合った程度の派手さに収まる)。
const APPLICATION_ICONS: Record<string, BentoIconId> = {
  "group-registration": "users-round",
  "reality-escape": "plane",
  "pin-mian-registration": "id-card",
  "oshi-leave": "heart",
  "snooze-permit": "moon",
  "vc-marathon-certificate": "award",
};
const FEATURED_SLUGS = new Set(["group-registration", "oshi-leave"]);

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        title="申請窓口"
        path="/applications"
        lead="矢張市役所の各種オンライン申請はこちらからご利用いただけます。"
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BentoLinkCard
            href="/applications/group-registration"
            title="市民活動団体登録申請"
            description="矢張市内で活動する団体の登録はこちらから申請してください。登録された団体は市民活動団体一覧に掲載されます。"
            icon={APPLICATION_ICONS["group-registration"]}
            featured={FEATURED_SLUGS.has("group-registration")}
            className="sm:col-span-2"
          />
          {APPLICATIONS.map((application) => (
            <BentoLinkCard
              key={application.slug}
              href={`/applications/${application.slug}`}
              title={application.title}
              description={application.description}
              icon={APPLICATION_ICONS[application.slug]}
              featured={FEATURED_SLUGS.has(application.slug)}
              className={FEATURED_SLUGS.has(application.slug) ? "sm:col-span-2" : undefined}
            />
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          ※ 申請内容は遊戯目的のものであり、実際の行政手続きとは関係ありません。
        </p>
      </section>
    </>
  );
}
