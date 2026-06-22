import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { DEPARTMENTS, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/departments");

export default function DepartmentsPage() {
  return (
    <>
      <PageHeader
        title="部署一覧"
        path="/departments"
        lead="矢張市役所の各部署と業務内容をご紹介します。総合窓口AIチャットボットがご案内する部署も、こちらの一覧から選ばれています。"
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((department) => (
            <div key={department.name} className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="font-bold text-yahari-navy">{department.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{department.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
