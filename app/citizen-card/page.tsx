import type { Metadata } from "next";
import CitizenCardForm from "@/components/CitizenCardForm";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/citizen-card");

export default function CitizenCardPage() {
  return (
    <>
      <PageHeader
        title="市民証発行"
        path="/citizen-card"
        lead="氏名・所属期(クォーター)・加入日を入力すると、市章入りの矢張市民証(画像)をその場で発行・ダウンロードできます。"
      />
      <section className="mx-auto max-w-2xl px-4 py-12">
        <CitizenCardForm />
        <p className="mt-8 text-xs text-gray-600">
          ※ この市民証は遊戯目的で自動生成される画像であり、実際の身分証明書としての効力はありません。
        </p>
      </section>
    </>
  );
}
