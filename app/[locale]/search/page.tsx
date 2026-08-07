import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SearchClient from "@/components/SearchClient";
import { SITE_PAGES, pageMetadata } from "@/lib/content";
import { getAllNews } from "@/lib/news";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const base = pageMetadata("/search");
  // 検索結果ページ(クエリ付き)は重複コンテンツになりやすいためインデックス対象から除外する
  return q ? { ...base, robots: { index: false, follow: true } } : base;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const news = getAllNews();

  return (
    <>
      <PageHeader title="サイト内検索" path="/search" lead="お知らせやページをキーワードで検索できます。" />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <SearchClient initialQuery={q ?? ""} pages={SITE_PAGES} news={news} />
      </section>
    </>
  );
}
