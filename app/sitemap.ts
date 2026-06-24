import type { MetadataRoute } from "next";
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

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = SITE_PAGES.map((page) => ({
    url: `${SITE.url}${page.href}`,
    changeFrequency: WEEKLY_PAGES.has(page.href) ? "weekly" : ("monthly" as const),
    priority: PRIORITY[page.href] ?? 0.6,
  }));

  const newsPages: MetadataRoute.Sitemap = getAllNews().map((item) => ({
    url: `${SITE.url}/news/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const newspaperPages: MetadataRoute.Sitemap = getAllIssues().map((issue) => ({
    url: `${SITE.url}/newspaper/${issue.slug}`,
    lastModified: issue.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const applicationPages: MetadataRoute.Sitemap = APPLICATIONS.map((application) => ({
    url: `${SITE.url}/applications/${application.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  const columnPages: MetadataRoute.Sitemap = getAllColumns().map((item) => ({
    url: `${SITE.url}/column/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const ordinancePages: MetadataRoute.Sitemap = ORDINANCES.map((ordinance) => ({
    url: `${SITE.url}/ordinances/${ordinance.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const personnelPages: MetadataRoute.Sitemap = PERSONNEL_TRANSFERS.map((transfer) => ({
    url: `${SITE.url}/personnel/${transfer.id}`,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    ...pages,
    ...newsPages,
    ...newspaperPages,
    ...applicationPages,
    ...columnPages,
    ...ordinancePages,
    ...personnelPages,
  ];
}
