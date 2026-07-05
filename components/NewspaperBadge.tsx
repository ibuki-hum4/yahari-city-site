import { Badge } from "@/components/ui/badge";
import type { NewspaperType } from "@/lib/newspaper";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<NewspaperType, string> = {
  定期号: "bg-yahari-sky-light text-yahari-navy",
  号外: "bg-red-50 text-red-700",
};

export default function NewspaperBadge({ type }: { type: NewspaperType }) {
  return <Badge className={cn(TYPE_STYLES[type])}>{type}</Badge>;
}
