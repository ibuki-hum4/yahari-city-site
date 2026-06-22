import type { Metadata } from "next";
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
        <ol className="relative border-l-2 border-yahari-sky pl-8">
          {HISTORY_EVENTS.map((event) => (
            <li key={`${event.date}-${event.title}`} className="mb-10 last:mb-0">
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-yahari-navy" />
              <time className="text-sm font-semibold text-yahari-navy">{event.date}</time>
              <h2 className="mt-1 font-bold text-gray-800">{event.title}</h2>
              {event.description && (
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {event.description}
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-gray-600">
          ※ 年表の日付は今後の市政の進展に応じて更新されます。
        </p>
      </section>
    </>
  );
}
