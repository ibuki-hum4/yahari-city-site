import type { NewspaperType } from "@/lib/newspaper";

const TYPE_STYLES: Record<NewspaperType, string> = {
  定期号: "bg-yahari-sky-light text-yahari-navy",
  号外: "bg-red-50 text-red-700",
};

export default function NewspaperBadge({ type }: { type: NewspaperType }) {
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${TYPE_STYLES[type]}`}>
      {type}
    </span>
  );
}
