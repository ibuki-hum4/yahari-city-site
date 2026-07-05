import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PersonnelTypeBadge from "@/components/PersonnelTypeBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { pageMetadata } from "@/lib/content";
import { PERSONNEL_TRANSFERS } from "@/lib/personnel";

export const metadata: Metadata = pageMetadata("/personnel");

export default function PersonnelPage() {
  return (
    <>
      <PageHeader
        title="人事異動情報"
        path="/personnel"
        lead="矢張市役所における辞令(就任・異動・退任・新設)の一覧です。各行から辞令書を確認・印刷できます。"
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="overflow-x-auto rounded border border-border">
          <Table className="min-w-[640px]">
            <TableHeader className="bg-yahari-sky-light">
              <TableRow className="hover:bg-yahari-sky-light">
                <TableHead>発令日</TableHead>
                <TableHead>氏名</TableHead>
                <TableHead>旧職</TableHead>
                <TableHead>新職</TableHead>
                <TableHead>種別</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERSONNEL_TRANSFERS.map((transfer) => (
                <TableRow key={transfer.id}>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {transfer.issuedDate}
                  </TableCell>
                  <TableCell>
                    <Link href={`/personnel/${transfer.id}`} className="font-semibold text-yahari-navy hover:underline">
                      {transfer.name}
                    </Link>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {transfer.previousPosition}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {transfer.newPosition}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <PersonnelTypeBadge type={transfer.type} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">※ 掲載している辞令は遊戯目的のサンプルです。</p>
      </section>
    </>
  );
}
