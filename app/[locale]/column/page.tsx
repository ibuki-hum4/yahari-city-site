import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { SITE, pageMetadata } from "@/lib/content";
import { getAllColumns, getExcerpt } from "@/lib/column";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/column");

export default async function ColumnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const columns = getAllColumns();

  return (
    <>
      <PageHeader
        title="市長コラム"
        path="/column"
        lead={`${SITE.mayorTitle}の${SITE.mayor}が、思いついたことを不定期に書き残すコラムです。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <ul className="divide-y divide-border border-y border-border">
          {columns.map((item) => (
            <li key={item.slug} className="py-6">
              <time className="text-sm text-muted-foreground">{item.date}</time>
              <h2 className="mt-2 font-bold text-foreground">
                <Link href={`/column/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {getExcerpt(item.content, 140)}
              </p>
              <Button asChild variant="link" className="mt-1 h-auto px-0 text-yahari-navy">
                <Link href={`/column/${item.slug}`}>続きを読む ›</Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
