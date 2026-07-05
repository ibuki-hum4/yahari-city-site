import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
            <Card key={department.name}>
              <CardContent>
                <h2 className="font-bold text-yahari-navy">{department.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{department.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="link" className="h-auto p-0 text-sm">
            <Link href="/personnel">人事異動情報(辞令一覧)を見る ›</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
