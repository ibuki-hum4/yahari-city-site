import { Badge } from "@/components/ui/badge";
import type { PersonnelTransferType } from "@/lib/personnel";
import { cn } from "@/lib/utils";

const TYPE_STYLES: Record<PersonnelTransferType, string> = {
  新設: "bg-yahari-sky-light text-yahari-navy",
  就任: "bg-emerald-50 text-emerald-700",
  異動: "bg-amber-50 text-amber-700",
  退任: "bg-muted text-muted-foreground",
};

export default function PersonnelTypeBadge({ type }: { type: PersonnelTransferType }) {
  return <Badge className={cn(TYPE_STYLES[type])}>{type}</Badge>;
}
