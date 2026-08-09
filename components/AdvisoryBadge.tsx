import { TriangleAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Advisory, AdvisoryLevel } from "@/lib/weather";

// 警報・注意報の重大度ごとの色分け。気象庁の「警戒レベルと配色一覧」に準拠
// (レベル2=注意報=黄、レベル3=警報=赤、レベル5=特別警報=黒)。
// destructiveバリアント1色だけでは段階が伝わらないため、レベルごとに個別のスタイルを持たせる。
const LEVEL_STYLES: Record<AdvisoryLevel, { badge: string; icon: string; levelLabel: string }> = {
  注意報: {
    badge: "border-yellow-400 bg-yellow-50 text-yellow-800",
    icon: "text-yellow-600",
    levelLabel: "警戒レベル2相当",
  },
  警報: {
    badge: "border-red-300 bg-red-50 text-red-700",
    icon: "text-red-600",
    levelLabel: "警戒レベル3相当",
  },
  特別警報: {
    badge: "border-transparent bg-black text-white",
    icon: "text-black",
    levelLabel: "警戒レベル5相当",
  },
};

export function advisoryIconClassName(level: AdvisoryLevel): string {
  return LEVEL_STYLES[level].icon;
}

export function advisoryLevelLabel(level: AdvisoryLevel): string {
  return LEVEL_STYLES[level].levelLabel;
}

export default function AdvisoryBadge({ advisory }: { advisory: Advisory }) {
  const style = LEVEL_STYLES[advisory.level];
  return (
    <Badge variant="outline" className={style.badge}>
      <TriangleAlert className="size-3" aria-hidden="true" />
      {advisory.label}
    </Badge>
  );
}
