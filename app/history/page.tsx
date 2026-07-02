import type { Metadata } from "next";
import HistoryTimeline from "@/components/HistoryTimeline";
import PageHeader from "@/components/PageHeader";
import { HISTORY_EVENTS, SITE, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/history");

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        title="沿革"
        path="/history"
        lead={`${SITE.founded}の発足から現在までの、${SITE.name}の歩みをご紹介します。`}
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <HistoryTimeline events={HISTORY_EVENTS} />
        <p className="mt-4 text-xs text-gray-600">
          ※ 年表の日付は今後の市政の進展に応じて更新されます。
        </p>
      </section>
    </>
  );
}
