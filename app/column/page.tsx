import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";
import { getAllColumns, getExcerpt } from "@/lib/column";

export const metadata: Metadata = pageMetadata("/column");

export default function ColumnPage() {
  const columns = getAllColumns();

  return (
    <>
      <PageHeader
        title="市長コラム"
        path="/column"
        lead={`${SITE.mayorTitle}の${SITE.mayor}が、思いついたことを不定期に書き残すコラムです。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <ul className="divide-y divide-gray-100 border-y border-gray-100">
          {columns.map((item) => (
            <li key={item.slug} className="py-6">
              <time className="text-sm text-gray-500">{item.date}</time>
              <h2 className="mt-2 font-bold text-gray-800">
                <Link href={`/column/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {getExcerpt(item.content, 140)}
              </p>
              <Link
                href={`/column/${item.slug}`}
                className="mt-2 inline-block text-sm font-medium text-yahari-navy hover:underline"
              >
                続きを読む ›
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
