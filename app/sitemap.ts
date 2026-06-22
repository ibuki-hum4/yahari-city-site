import type { MetadataRoute } from "next";
import { SITE, SITE_PAGES } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.map((page) => ({
    url: `${SITE.url}${page.href}`,
    lastModified: new Date(),
  }));
}
