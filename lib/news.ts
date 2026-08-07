import { createMarkdownCollection, type MarkdownEntryBase } from "@/lib/markdown-collection";

export type NewsCategory = "お知らせ" | "イベント" | "制度";

export interface NewsItem extends MarkdownEntryBase {
  category: NewsCategory;
  title: string;
}

const news = createMarkdownCollection<NewsItem>("news", ({ slug, content, data }) => ({
  slug,
  content,
  date: data.date as string,
  category: data.category as NewsCategory,
  title: data.title as string,
}));

export const getAllNews = news.getAll;
export const getNewsBySlug = news.getBySlug;

export { getExcerpt } from "@/lib/markdown-excerpt";
