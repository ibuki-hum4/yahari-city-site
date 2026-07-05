import { Badge } from "@/components/ui/badge";
import type { NewsCategory } from "@/lib/news";
import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  お知らせ: "bg-yahari-sky-light text-yahari-navy",
  イベント: "bg-emerald-50 text-emerald-700",
  制度: "bg-amber-50 text-amber-700",
};

export default function NewsBadge({ category }: { category: NewsCategory }) {
  return <Badge className={cn(CATEGORY_STYLES[category])}>{category}</Badge>;
}
