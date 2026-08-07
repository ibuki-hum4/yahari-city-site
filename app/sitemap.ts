import type { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/locales";
import { APPLICATIONS } from "@/lib/applications";
import { SITE, SITE_PAGES } from "@/lib/content";
import { getAllColumns } from "@/lib/column";
import { getAllNews } from "@/lib/news";
import { getAllIssues } from "@/lib/newspaper";
import { ORDINANCES } from "@/lib/ordinances";
import { PERSONNEL_TRANSFERS } from "@/lib/personnel";

// ページの重要度を明示しない場合は0.6を既定値とする
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/news": 0.9,
  "/newspaper": 0.7,
  "/citizen-card": 0.7,
  "/column": 0.7,
  "/groups": 0.6,
  "/ordinances": 0.6,
  "/spots": 0.5,
  "/personnel": 0.5,
  "/changelog": 0.4,
  "/accessibility": 0.3,
  "/privacy": 0.3,
  "/terms": 0.3,
  "/sitemap": 0.3,
  "/search": 0.3,
};

// 更新頻度が高めのページは明示的にweeklyとする(それ以外はmonthly)
const WEEKLY_PAGES = new Set(["/", "/news", "/column", "/groups", "/changelog"]);

interface Entry {
  path: string;
  lastModified?: string;
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
}

/** `localePrefix: "as-needed"`に合わせ、既定言語(日本語)だけ接頭辞なしのURLにする。 */
function localizedUrl(path: string, locale: string): string {
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`;
  return `${SITE.url}${prefix}${path === "/" ? "" : path}` || `${SITE.url}/`;
}

function toSitemapEntry(entry: Entry): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(entry.path, DEFAULT_LOCALE),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency ?? (WEEKLY_PAGES.has(entry.path) ? "weekly" : "monthly"),
    priority: entry.priority ?? PRIORITY[entry.path] ?? 0.6,
    // 各URLの言語違いをhreflangとして併記する
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((locale) => [locale, localizedUrl(entry.path, locale)])
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: Entry[] = [
    ...SITE_PAGES.map((page) => ({ path: page.href })),
    ...getAllNews().map((item) => ({
      path: `/news/${item.slug}`,
      lastModified: item.date,
      priority: 0.5,
    })),
    ...getAllIssues().map((issue) => ({
      path: `/newspaper/${issue.slug}`,
      lastModified: issue.date,
      priority: 0.5,
    })),
    ...getAllColumns().map((item) => ({
      path: `/column/${item.slug}`,
      lastModified: item.date,
      priority: 0.5,
    })),
    ...APPLICATIONS.map((application) => ({
      path: `/applications/${application.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
    ...ORDINANCES.map((ordinance) => ({
      path: `/ordinances/${ordinance.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...PERSONNEL_TRANSFERS.map((transfer) => ({
      path: `/personnel/${transfer.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  return entries.map(toSitemapEntry);
}
