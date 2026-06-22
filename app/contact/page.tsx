import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="市民の声"
        path="/contact"
        lead="矢張市公式サイトへのご意見・ご感想・不具合の報告はこちらからお寄せください。"
      />
      <section className="mx-auto max-w-2xl px-4 py-12">
        <ContactForm />
      </section>
    </>
  );
}
