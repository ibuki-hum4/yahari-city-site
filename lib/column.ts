import { createMarkdownCollection, type MarkdownEntryBase } from "@/lib/markdown-collection";

export interface ColumnEntry extends MarkdownEntryBase {
  title: string;
}

const columns = createMarkdownCollection<ColumnEntry>("column", ({ slug, content, data }) => ({
  slug,
  content,
  date: data.date as string,
  title: data.title as string,
}));

export const getAllColumns = columns.getAll;
export const getColumnBySlug = columns.getBySlug;

export { getExcerpt } from "@/lib/markdown-excerpt";
