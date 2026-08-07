"use client";

import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import NewsBadge from "@/components/NewsBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  const normalized = query.trim();

  const pagesFuse = useMemo(
    () => new Fuse(pages, { keys: ["title", "description", "keywords"], threshold: 0.4, ignoreLocation: true }),
    [pages]
  );
  const newsFuse = useMemo(
    () => new Fuse(news, { keys: ["title", "content"], threshold: 0.4, ignoreLocation: true }),
    [news]
  );

  const matchedPages = useMemo(() => {
    if (!normalized) return [];
    return pagesFuse.search(normalized).map((result) => result.item);
  }, [normalized, pagesFuse]);

  const matchedNews = useMemo(() => {
    if (!normalized) return [];
    return newsFuse.search(normalized).map((result) => result.item);
  }, [normalized, newsFuse]);

  const hasResults = matchedPages.length > 0 || matchedNews.length > 0;

  return (
    <div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="キーワードを入力(例: Discord, 沿革)"
          aria-label="サイト内検索"
          className="h-10 pl-8"
        />
      </div>

      <div aria-live="polite" aria-atomic="true">
        {!normalized && (
          <p className="mt-6 text-sm text-muted-foreground">キーワードを入力してください。</p>
        )}

        {normalized && !hasResults && (
          <p className="mt-6 text-sm text-muted-foreground">
            「{query}」に一致する結果は見つかりませんでした。
          </p>
        )}

        {matchedPages.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-muted-foreground">
              ページ({matchedPages.length}件)
            </h2>
            <div className="mt-3 space-y-3">
              {matchedPages.map((page) => (
                <Card key={page.href} size="sm">
                  <CardContent>
                    <Link href={page.href} className="font-semibold text-yahari-navy hover:underline">
                      {page.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">{page.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {matchedNews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-muted-foreground">
              お知らせ({matchedNews.length}件)
            </h2>
            <div className="mt-3 space-y-3">
              {matchedNews.map((item) => (
                <Card key={item.slug} size="sm">
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <time className="text-xs text-muted-foreground">{item.date}</time>
                      <NewsBadge category={item.category} />
                    </div>
                    <Link href="/news" className="font-semibold text-yahari-navy hover:underline">
                      {item.title}
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
