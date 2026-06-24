import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/content";
import { CHANGELOG } from "@/lib/changelog";

export const metadata: Metadata = pageMetadata("/changelog");

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        title="更新履歴"
        path="/changelog"
        lead="矢張市公式サイト自体の更新履歴(変更ログ)です。"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <ol className="relative border-l-2 border-yahari-sky pl-8">
          {CHANGELOG.map((entry) => (
            <li key={entry.version} className="mb-10 last:mb-0">
              <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-white bg-yahari-navy" />
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="rounded bg-yahari-sky-light px-2 py-0.5 font-mono text-sm font-bold text-yahari-navy">
                  {entry.version}
                </span>
                <time className="text-sm text-gray-500">{entry.date}</time>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-700">
                {entry.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
