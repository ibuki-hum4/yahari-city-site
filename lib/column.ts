import fs from "fs";
import path from "path";
import matter from "gray-matter";

const COLUMN_DIR = path.join(process.cwd(), "content", "column");

export interface ColumnEntry {
  slug: string;
  date: string;
  title: string;
  content: string;
}

export function getAllColumns(): ColumnEntry[] {
  const files = fs.readdirSync(COLUMN_DIR).filter((file) => file.endsWith(".md"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(COLUMN_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      date: data.date as string,
      title: data.title as string,
      content: content.trim(),
    };
  });

  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getColumnBySlug(slug: string): ColumnEntry | undefined {
  return getAllColumns().find((item) => item.slug === slug);
}

export { getExcerpt } from "@/lib/markdown-excerpt";
