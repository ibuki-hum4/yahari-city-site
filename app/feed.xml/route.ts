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

export async function GET() {
  const news = getAllNews();

  const items = news
    .map((item) => {
      const link = `${SITE.url}/news`;
      const pubDate = new Date(item.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">${SITE.url}/news#${item.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.content)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE.name)}公式サイト お知らせ</title>
    <link>${SITE.url}/news</link>
    <description>${escapeXml(SITE.name)}からの最新情報</description>
    <language>ja</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
