import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pageMetadata } from "@/lib/content";
import { CHANGELOG } from "@/lib/changelog";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/changelog");

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        title="更新履歴"
        path="/changelog"
        lead="矢張市公式サイト自体の更新履歴(変更ログ)です。"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <ol className="relative border-l-2 border-yahari-sky pl-8">
          {CHANGELOG.map((entry) => (
            <li key={entry.version} className="mb-6 last:mb-0">
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-background bg-yahari-navy" />
              <Card size="sm">
                <CardHeader>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <Badge variant="secondary" className="font-mono">
                      {entry.version}
                    </Badge>
                    <time className="text-sm text-muted-foreground">{entry.date}</time>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
