import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWS_DIR = path.join(process.cwd(), "content", "news");

export type NewsCategory = "お知らせ" | "イベント" | "制度";

export interface NewsItem {
  slug: string;
  date: string;
  category: NewsCategory;
  title: string;
  content: string;
}

export function getAllNews(): NewsItem[] {
  const files = fs.readdirSync(NEWS_DIR).filter((file) => file.endsWith(".md"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(NEWS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      date: data.date as string,
      category: data.category as NewsCategory,
      title: data.title as string,
      content: content.trim(),
    };
  });

  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return getAllNews().find((item) => item.slug === slug);
}

export { getExcerpt } from "@/lib/markdown-excerpt";
