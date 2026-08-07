import type { Metadata } from "next";
import OrdinanceSearch from "@/components/OrdinanceSearch";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/content";
import { ORDINANCES } from "@/lib/ordinances";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const base = pageMetadata("/ordinances");
  return q ? { ...base, robots: { index: false, follow: true } } : base;
}

export default async function OrdinancesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <>
      <PageHeader
        title="条例集"
        path="/ordinances"
        lead="矢張市で制定された条例を、条文・改正履歴つきで掲載しています。条例名やキーワードで検索できます。"
      />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <OrdinanceSearch ordinances={ORDINANCES} initialQuery={q ?? ""} />
        <p className="mt-8 text-xs text-gray-600">
          ※ ここに掲載する条例は、矢張市民のサーバールールを条文形式にまとめたものであり、実際の法令ではありません。
        </p>
      </section>
    </>
  );
}
