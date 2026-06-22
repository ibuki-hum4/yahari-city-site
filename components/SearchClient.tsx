"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import NewsBadge from "@/components/NewsBadge";
import type { SitePage } from "@/lib/content";
import type { NewsItem } from "@/lib/news";

export default function SearchClient({
  initialQuery,
  pages,
  news,
}: {
  initialQuery: string;
  pages: SitePage[];
  news: NewsItem[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim().toLowerCase();

  const matchedPages = useMemo(() => {
    if (!normalized) return [];
    return pages.filter((page) =>
      `${page.title} ${page.description} ${page.keywords}`.toLowerCase().includes(normalized)
    );
  }, [normalized, pages]);

  const matchedNews = useMemo(() => {
    if (!normalized) return [];
    return news.filter((item) =>
      `${item.title} ${item.content}`.toLowerCase().includes(normalized)
    );
  }, [normalized, news]);

  const hasResults = matchedPages.length > 0 || matchedNews.length > 0;

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="キーワードを入力(例: Discord, 沿革)"
        aria-label="サイト内検索"
        className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-yahari-navy focus:outline-none"
      />

      <div aria-live="polite" aria-atomic="true">
        {!normalized && (
          <p className="mt-6 text-sm text-gray-500">キーワードを入力してください。</p>
        )}

        {normalized && !hasResults && (
          <p className="mt-6 text-sm text-gray-500">
            「{query}」に一致する結果は見つかりませんでした。
          </p>
        )}

        {matchedPages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-500">
              ページ({matchedPages.length}件)
            </h2>
            <ul className="mt-3 divide-y divide-gray-100 border-y border-gray-100">
              {matchedPages.map((page) => (
                <li key={page.href} className="py-3">
                  <Link href={page.href} className="font-semibold text-yahari-navy hover:underline">
                    {page.title}
                  </Link>
                  <p className="mt-1 text-sm text-gray-600">{page.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {matchedNews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-500">
              お知らせ({matchedNews.length}件)
            </h2>
            <ul className="mt-3 divide-y divide-gray-100 border-y border-gray-100">
              {matchedNews.map((item) => (
                <li key={item.slug} className="py-3">
                  <div className="flex items-center gap-2">
                    <time className="text-xs text-gray-500">{item.date}</time>
                    <NewsBadge category={item.category} />
                  </div>
                  <Link href="/news" className="font-semibold text-yahari-navy hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
