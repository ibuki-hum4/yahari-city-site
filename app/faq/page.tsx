import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FAQ_ITEMS } from "@/lib/faq";
import { pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/faq");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHeader
        title="よくある質問"
        path="/faq"
        lead="市民になる方法やサーバーに関するよくある質問をまとめています。"
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="divide-y divide-gray-100 border-y border-gray-100">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-800">
                <span>Q. {item.question}</span>
                <span className="ml-4 shrink-0 text-yahari-navy transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">A. {item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
