import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SitemapGraph from "@/components/SitemapGraph";
import { SITE_PAGES, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/sitemap");

export default function SitemapPage() {
  return (
    <>
      <PageHeader title="サイトマップ" path="/sitemap" lead="矢張市公式サイトの全ページ一覧です。" />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <SitemapGraph pages={SITE_PAGES} />
      </section>
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <h2 className="text-sm font-semibold text-gray-500">ページ一覧(テキスト版)</h2>
        <ul className="mt-3 divide-y divide-gray-100 border-y border-gray-100">
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
