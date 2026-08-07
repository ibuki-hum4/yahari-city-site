import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OrdinanceDiff from "@/components/OrdinanceDiff";
import PageHeader from "@/components/PageHeader";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { buildMetadata } from "@/lib/content";
import { ORDINANCES, getLatestAmendmentDate, getOrdinance, toKanjiNumber, toZenkakuNumber } from "@/lib/ordinances";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return ORDINANCES.map((ordinance) => ({ slug: ordinance.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ordinance = getOrdinance(slug);
  if (!ordinance) {
    return {};
  }
  return buildMetadata({
    title: `${ordinance.title}(${ordinance.number})`,
    description: ordinance.summary,
    path: `/ordinances/${slug}`,
  });
}

export default async function OrdinanceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const ordinance = getOrdinance(slug);
  if (!ordinance) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={ordinance.title}
        path={`/ordinances/${slug}`}
        lead={ordinance.summary}
        parent={{ label: "条例集", href: "/ordinances" }}
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-32 whitespace-nowrap font-semibold text-muted-foreground">条例番号</TableCell>
              <TableCell className="font-mono text-foreground">{ordinance.number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="whitespace-nowrap font-semibold text-muted-foreground">分類</TableCell>
              <TableCell className="text-foreground">{ordinance.category}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="whitespace-nowrap font-semibold text-muted-foreground">制定日</TableCell>
              <TableCell className="text-foreground">{ordinance.enactedDate}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="whitespace-nowrap font-semibold text-muted-foreground">最終改正</TableCell>
              <TableCell className="text-foreground">{getLatestAmendmentDate(ordinance)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {ordinance.amendments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold text-yahari-navy">改正履歴</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border text-sm">
              {ordinance.amendments.map((amendment) => (
                <li key={`${amendment.date}-${amendment.description}`} className="py-3">
                  <div className="flex gap-4">
                    <span className="w-28 shrink-0 text-muted-foreground">{amendment.date}</span>
                    <span className="text-foreground">{amendment.description}</span>
                  </div>
                  {amendment.after && (
                    <div className="ml-[7.5rem]">
                      <Accordion type="single" collapsible>
                        <AccordionItem value="detail" className="border-none">
                          <AccordionTrigger className="w-fit py-1 text-xs font-semibold text-yahari-navy hover:no-underline">
                            改正内容を見る
                          </AccordionTrigger>
                          <AccordionContent>
                            <OrdinanceDiff
                              articleNumber={amendment.articleNumber}
                              before={amendment.before}
                              after={amendment.after}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 space-y-8">
          {ordinance.articles.map((article) => (
            <div key={article.number}>
              <h2 className="font-bold text-yahari-navy">
                第{toZenkakuNumber(article.number)}条
                {article.heading && (
                  <span className="ml-1 font-normal text-muted-foreground">({article.heading})</span>
                )}
              </h2>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/90">
                {article.paragraphs.map((paragraph, index) => (
                  <div key={index}>
                    <p>
                      {article.paragraphs.length > 1 && <span className="mr-1">{toZenkakuNumber(index + 1)}</span>}
                      {paragraph.text}
                    </p>
                    {paragraph.items && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {paragraph.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex gap-2">
                            <span className="shrink-0">{toKanjiNumber(itemIndex + 1)}</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
