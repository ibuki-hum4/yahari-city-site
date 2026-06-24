import { getAllColumns } from "@/lib/column";
import { SITE } from "@/lib/content";
import { getAllNews } from "@/lib/news";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface FeedItem {
  title: string;
  link: string;
  date: string;
  category: string;
  description: string;
}

export async function GET() {
  const newsItems: FeedItem[] = getAllNews().map((item) => ({
    title: item.title,
    link: `${SITE.url}/news/${item.slug}`,
    date: item.date,
    category: item.category,
    description: item.content,
  }));

  const columnItems: FeedItem[] = getAllColumns().map((item) => ({
    title: item.title,
    link: `${SITE.url}/column/${item.slug}`,
    date: item.date,
    category: "市長コラム",
    description: item.content,
  }));

  const allItems = [...newsItems, ...columnItems].sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = allItems
    .map((item) => {
      const pubDate = new Date(item.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE.name)}公式サイト お知らせ・市長コラム</title>
    <link>${SITE.url}/news</link>
    <description>${escapeXml(SITE.name)}からの最新情報と市長コラム</description>
    <language>ja</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
