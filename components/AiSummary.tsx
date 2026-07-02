import type { SummaryOutcome } from "@/lib/summarize";

export default function AiSummary({ summary }: { summary: SummaryOutcome }) {
  if (summary.status !== "ok") return null;

  return (
    <div className="mt-4 rounded-lg border border-yahari-sky bg-yahari-sky-light p-4">
      <p className="text-xs font-semibold text-yahari-navy">AIによる3行まとめ</p>
      <ul className="mt-2 space-y-1 text-sm text-gray-700">
        {summary.lines.map((line, index) => (
          <li key={index}>・{line}</li>
        ))}
      </ul>
    </div>
  );
}
