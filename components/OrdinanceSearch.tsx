"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="条例名・条文・キーワードで検索(例: 推し活、春巻き)"
        aria-label="条例集を検索"
        className="w-full rounded border border-gray-300 px-4 py-2 text-sm focus:border-yahari-navy focus:outline-none"
      />

      <p className="mt-3 text-xs text-gray-500">{filtered.length}件の条例が見つかりました。</p>

      <div className="mt-4 overflow-x-auto rounded border border-gray-200">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-yahari-sky-light text-xs text-gray-600">
            <tr>
              <th className="px-4 py-2">条例番号</th>
              <th className="px-4 py-2">件名</th>
              <th className="px-4 py-2">制定日</th>
              <th className="px-4 py-2">最終改正</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((ordinance) => (
              <tr key={ordinance.slug} className="hover:bg-yahari-sky-light/40">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-600">
                  {ordinance.number}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/ordinances/${ordinance.slug}`}
                    className="font-semibold text-yahari-navy hover:underline"
                  >
                    {ordinance.title}
                  </Link>
                  <p className="mt-1 text-xs text-gray-500">{ordinance.summary}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-600">{ordinance.enactedDate}</td>
                <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-600">
                  {getLatestAmendmentDate(ordinance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-gray-500">
            「{query}」に一致する条例は見つかりませんでした。
          </p>
        )}
      </div>
    </div>
  );
}
