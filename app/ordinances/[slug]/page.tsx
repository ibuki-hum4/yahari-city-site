import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { buildMetadata } from "@/lib/content";
import { ORDINANCES, getLatestAmendmentDate, getOrdinance, toKanjiNumber, toZenkakuNumber } from "@/lib/ordinances";

export function generateStaticParams() {
  return ORDINANCES.map((ordinance) => ({ slug: ordinance.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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
        <dl className="divide-y divide-gray-100 border-y border-gray-100 text-sm">
          <div className="grid grid-cols-3 gap-4 py-3">
            <dt className="font-semibold text-gray-500">条例番号</dt>
            <dd className="col-span-2 font-mono text-gray-800">{ordinance.number}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 py-3">
            <dt className="font-semibold text-gray-500">分類</dt>
            <dd className="col-span-2 text-gray-800">{ordinance.category}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 py-3">
            <dt className="font-semibold text-gray-500">制定日</dt>
            <dd className="col-span-2 text-gray-800">{ordinance.enactedDate}</dd>
          </div>
          <div className="grid grid-cols-3 gap-4 py-3">
            <dt className="font-semibold text-gray-500">最終改正</dt>
            <dd className="col-span-2 text-gray-800">{getLatestAmendmentDate(ordinance)}</dd>
          </div>
        </dl>

        {ordinance.amendments.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-bold text-yahari-navy">改正履歴</h2>
            <ul className="mt-3 divide-y divide-gray-100 border-y border-gray-100 text-sm">
              {ordinance.amendments.map((amendment) => (
                <li key={`${amendment.date}-${amendment.description}`} className="flex gap-4 py-3">
                  <span className="w-28 shrink-0 text-gray-500">{amendment.date}</span>
                  <span className="text-gray-800">{amendment.description}</span>
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
                {article.heading && <span className="ml-1 font-normal text-gray-600">({article.heading})</span>}
              </h2>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-gray-700">
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
