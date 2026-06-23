import type { PersonnelTransferType } from "@/lib/personnel";

const TYPE_STYLES: Record<PersonnelTransferType, string> = {
  新設: "bg-yahari-sky-light text-yahari-navy",
  就任: "bg-emerald-50 text-emerald-700",
  異動: "bg-amber-50 text-amber-700",
  退任: "bg-gray-100 text-gray-600",
};

export default function PersonnelTypeBadge({ type }: { type: PersonnelTransferType }) {
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${TYPE_STYLES[type]}`}>{type}</span>
  );
}
