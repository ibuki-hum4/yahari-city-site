import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SITE_PAGES, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/sitemap");

export default function SitemapPage() {
  return (
    <>
      <PageHeader title="サイトマップ" path="/sitemap" lead="矢張市公式サイトの全ページ一覧です。" />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <ul className="divide-y divide-gray-100 border-y border-gray-100">
          {SITE_PAGES.map((page) => (
            <li key={page.href} className="py-4">
              <Link href={page.href} className="font-semibold text-yahari-navy hover:underline">
                {page.title}
              </Link>
              <p className="mt-1 text-sm text-gray-600">{page.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
