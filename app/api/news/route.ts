import { getAllNews } from "@/lib/news";

export function GET() {
  const items = getAllNews().map(({ slug, date, category, title, content }) => ({
    slug,
    date,
    category,
    title,
    content,
  }));

  return Response.json(items, {
    headers: {
      "Cache-Control": "public, max-age=300",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
