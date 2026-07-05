import { Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { SummaryOutcome } from "@/lib/summarize";

export default function AiSummary({ summary }: { summary: SummaryOutcome }) {
  if (summary.status !== "ok") return null;

  return (
    <Alert className="mt-4 border-yahari-sky bg-yahari-sky-light">
      <Sparkles className="text-yahari-navy" />
      <AlertTitle className="text-xs font-semibold text-yahari-navy">AIによる3行まとめ</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-1 text-sm text-foreground">
          {summary.lines.map((line, index) => (
            <li key={index}>・{line}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
