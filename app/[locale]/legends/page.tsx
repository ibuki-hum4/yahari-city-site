import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { LEGEND_RECORDS, pageMetadata } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = pageMetadata("/legends");

export default async function LegendsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHeader
        title="殿堂入り"
        path="/legends"
        lead="矢張市民が打ち立てた伝説的な記録を集めた殿堂です。新たな記録が生まれた際は随時追加していきます。"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <ol className="relative space-y-6 border-l-2 border-yahari-sky pl-8">
          {LEGEND_RECORDS.map((record) => (
            <li key={record.title} className="relative">
              <span className="absolute -left-[41px] mt-1.5 h-4 w-4 rounded-full border-2 border-background bg-yahari-navy" />
              <Card>
                <CardContent>
                  {record.date && (
                    <time className="text-sm font-semibold text-yahari-navy">{record.date}</time>
                  )}
                  <h2 className="mt-1 font-bold text-foreground">{record.title}</h2>
                  {record.holder && (
                    <p className="mt-1 text-sm font-semibold text-muted-foreground">
                      記録保持者: {record.holder}
                    </p>
                  )}
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{record.detail}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
