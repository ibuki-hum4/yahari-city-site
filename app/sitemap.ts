import type { MetadataRoute } from "next";
import { APPLICATIONS } from "@/lib/applications";
import { SITE, SITE_PAGES } from "@/lib/content";
import { getAllNews } from "@/lib/news";

// ページの重要度を明示しない場合は0.6を既定値とする
const PRIORITY: Record<string, number> = {
  "/": 1,
  "/news": 0.9,
  "/accessibility": 0.3,
  "/privacy": 0.3,
  "/terms": 0.3,
  "/sitemap": 0.3,
  "/search": 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = SITE_PAGES.map((page) => ({
    url: `${SITE.url}${page.href}`,
    changeFrequency: page.href === "/" || page.href === "/news" ? "weekly" : ("monthly" as const),
    priority: PRIORITY[page.href] ?? 0.6,
  }));

  const newsPages: MetadataRoute.Sitemap = getAllNews().map((item) => ({
    url: `${SITE.url}/news/${item.slug}`,
    lastModified: item.date,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const applicationPages: MetadataRoute.Sitemap = APPLICATIONS.map((application) => ({
    url: `${SITE.url}/applications/${application.slug}`,
    changeFrequency: "yearly" as const,
    priority: 0.4,
  }));

  return [...pages, ...newsPages, ...applicationPages];
}
