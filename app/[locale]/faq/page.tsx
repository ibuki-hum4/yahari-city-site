import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/lib/faq";
import { pageMetadata } from "@/lib/content";
import { setRequestLocale } from "next-intl/server";

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

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
        <Accordion type="single" collapsible className="border-y border-border">
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.question} value={item.question} className="px-1">
              <AccordionTrigger className="font-semibold text-foreground">
                Q. {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                A. {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
