import type { NewsCategory } from "@/lib/news";

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  お知らせ: "bg-yahari-sky-light text-yahari-navy",
  イベント: "bg-emerald-50 text-emerald-700",
  制度: "bg-amber-50 text-amber-700",
};

export default function NewsBadge({ category }: { category: NewsCategory }) {
  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${CATEGORY_STYLES[category]}`}
    >
      {category}
    </span>
  );
}
