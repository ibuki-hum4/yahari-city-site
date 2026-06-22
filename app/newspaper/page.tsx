import type { Metadata } from "next";
import Link from "next/link";
import NewspaperBadge from "@/components/NewspaperBadge";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";
import { getAllIssues, getExcerpt } from "@/lib/newspaper";

export const metadata: Metadata = pageMetadata("/newspaper");

export default function NewspaperPage() {
  const issues = getAllIssues();

  return (
    <>
      <PageHeader
        title="矢張市新聞"
        path="/newspaper"
        lead={`${SITE.name}の月刊新聞です。大きな出来事があった際は号外を発行します。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <ul className="divide-y divide-gray-100 border-y border-gray-100">
          {issues.map((issue) => (
            <li key={issue.slug} className="py-6">
              <div className="flex items-center gap-3">
                <time className="text-sm text-gray-500">{issue.date}</time>
                <NewspaperBadge type={issue.type} />
                <span className="text-xs font-semibold text-gray-500">{issue.issue}</span>
              </div>
              <h2 className="mt-2 font-bold text-gray-800">
                <Link href={`/newspaper/${issue.slug}`} className="hover:underline">
                  {issue.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {getExcerpt(issue.content, 140)}
              </p>
              <Link
                href={`/newspaper/${issue.slug}`}
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
