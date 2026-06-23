import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { APPLICATIONS } from "@/lib/applications";
import { pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/applications");

export default function ApplicationsPage() {
  return (
    <>
      <PageHeader
        title="申請窓口"
        path="/applications"
        lead="矢張市役所の各種オンライン申請はこちらからご利用いただけます。"
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/applications/group-registration"
            className="rounded-lg bg-yahari-sky-light p-5 shadow-sm transition hover:shadow-md"
          >
            <h2 className="font-bold text-yahari-navy">市民活動団体登録申請</h2>
            <p className="mt-2 text-sm text-gray-600">
              矢張市内で活動する団体の登録はこちらから申請してください。登録された団体は市民活動団体一覧に掲載されます。
            </p>
          </Link>
          {APPLICATIONS.map((application) => (
            <Link
              key={application.slug}
              href={`/applications/${application.slug}`}
              className="rounded-lg bg-yahari-sky-light p-5 shadow-sm transition hover:shadow-md"
            >
              <h2 className="font-bold text-yahari-navy">{application.title}</h2>
              <p className="mt-2 text-sm text-gray-600">{application.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-xs text-gray-600">※ 申請内容は遊戯目的のものであり、実際の行政手続きとは関係ありません。</p>
      </section>
    </>
  );
}
