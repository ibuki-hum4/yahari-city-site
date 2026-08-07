import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SitemapGraph from "@/components/SitemapGraph";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_PAGES, pageMetadata } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/sitemap");

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader title="サイトマップ" path="/sitemap" lead="矢張市公式サイトの全ページ一覧です。" />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <SitemapGraph pages={SITE_PAGES} />
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <h2 className="text-sm font-semibold text-muted-foreground">ページ一覧(テキスト版)</h2>
        <div className="mt-3 space-y-3">
          {SITE_PAGES.map((page) => (
            <Card key={page.href} size="sm">
              <CardContent>
                <Link href={page.href} className="font-semibold text-yahari-navy hover:underline">
                  {page.title}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
