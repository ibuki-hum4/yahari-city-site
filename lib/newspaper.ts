import { createMarkdownCollection, type MarkdownEntryBase } from "@/lib/markdown-collection";

export type NewspaperType = "定期号" | "号外";

export interface NewspaperIssue extends MarkdownEntryBase {
  issue: string;
  type: NewspaperType;
  title: string;
}

const newspaper = createMarkdownCollection<NewspaperIssue>("newspaper", ({ slug, content, data }) => ({
  slug,
  content,
  date: data.date as string,
  issue: data.issue as string,
  type: data.type as NewspaperType,
  title: data.title as string,
}));

export const getAllIssues = newspaper.getAll;
export const getIssueBySlug = newspaper.getBySlug;

export { getExcerpt } from "@/lib/markdown-excerpt";
