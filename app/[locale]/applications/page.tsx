import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { APPLICATIONS } from "@/lib/applications";
import { pageMetadata } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/applications");

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
        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="bg-yahari-sky-light transition hover:shadow-md">
            <Link href="/applications/group-registration">
              <CardContent>
                <h2 className="font-bold text-yahari-navy">市民活動団体登録申請</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  矢張市内で活動する団体の登録はこちらから申請してください。登録された団体は市民活動団体一覧に掲載されます。
                </p>
              </CardContent>
            </Link>
          </Card>
          {APPLICATIONS.map((application) => (
            <Card key={application.slug} className="bg-yahari-sky-light transition hover:shadow-md">
              <Link href={`/applications/${application.slug}`}>
                <CardContent>
                  <h2 className="font-bold text-yahari-navy">{application.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{application.description}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          ※ 申請内容は遊戯目的のものであり、実際の行政手続きとは関係ありません。
        </p>
      </section>
    </>
  );
}
