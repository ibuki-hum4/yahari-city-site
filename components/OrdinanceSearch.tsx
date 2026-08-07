"use client";

import { Link } from "@/i18n/navigation";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Ordinance } from "@/lib/ordinances";
import { getLatestAmendmentDate } from "@/lib/ordinances";

function buildSearchText(ordinance: Ordinance): string {
  const articleText = ordinance.articles
    .map((article) => {
      const paragraphText = article.paragraphs
        .map((paragraph) => `${paragraph.text} ${paragraph.items?.join(" ") ?? ""}`)
        .join(" ");
      return `${article.heading ?? ""} ${paragraphText}`;
    })
    .join(" ");
  return `${ordinance.number} ${ordinance.title} ${ordinance.category} ${ordinance.summary} ${articleText}`.toLowerCase();
}

export default function OrdinanceSearch({
  ordinances,
  initialQuery,
}: {
  ordinances: Ordinance[];
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const normalized = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalized) return ordinances;
    return ordinances.filter((ordinance) => buildSearchText(ordinance).includes(normalized));
  }, [normalized, ordinances]);

  return (
    <div>
      <Input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="条例名・条文・キーワードで検索(例: 推し活、春巻き)"
        aria-label="条例集を検索"
      />

      <p className="mt-3 text-xs text-muted-foreground">{filtered.length}件の条例が見つかりました。</p>

      <div className="mt-4 overflow-x-auto rounded border border-border">
        <Table className="min-w-[640px]">
          <TableHeader className="bg-yahari-sky-light">
            <TableRow className="hover:bg-yahari-sky-light">
              <TableHead>条例番号</TableHead>
              <TableHead>件名</TableHead>
              <TableHead>制定日</TableHead>
              <TableHead>最終改正</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((ordinance) => (
              <TableRow key={ordinance.slug}>
                <TableCell className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                  {ordinance.number}
                </TableCell>
                <TableCell className="whitespace-normal">
                  <Link
                    href={`/ordinances/${ordinance.slug}`}
                    className="font-semibold text-yahari-navy hover:underline"
                  >
                    {ordinance.title}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">{ordinance.summary}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {ordinance.enactedDate}
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {getLatestAmendmentDate(ordinance)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            「{query}」に一致する条例は見つかりませんでした。
          </p>
        )}
      </div>
    </div>
  );
}
