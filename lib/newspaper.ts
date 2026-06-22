import fs from "fs";
import path from "path";
import matter from "gray-matter";

const NEWSPAPER_DIR = path.join(process.cwd(), "content", "newspaper");

export type NewspaperType = "定期号" | "号外";

export interface NewspaperIssue {
  slug: string;
  issue: string;
  type: NewspaperType;
  title: string;
  date: string;
  content: string;
}

export function getAllIssues(): NewspaperIssue[] {
  const files = fs.readdirSync(NEWSPAPER_DIR).filter((file) => file.endsWith(".md"));

  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(NEWSPAPER_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      issue: data.issue as string,
      type: data.type as NewspaperType,
      title: data.title as string,
      date: data.date as string,
      content: content.trim(),
    };
  });

  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getIssueBySlug(slug: string): NewspaperIssue | undefined {
  return getAllIssues().find((item) => item.slug === slug);
}

export { getExcerpt } from "@/lib/markdown-excerpt";
