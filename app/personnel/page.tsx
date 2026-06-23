import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import PersonnelTypeBadge from "@/components/PersonnelTypeBadge";
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
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-yahari-sky-light text-xs text-gray-600">
              <tr>
                <th className="px-4 py-2">発令日</th>
                <th className="px-4 py-2">氏名</th>
                <th className="px-4 py-2">旧職</th>
                <th className="px-4 py-2">新職</th>
                <th className="px-4 py-2">種別</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PERSONNEL_TRANSFERS.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-yahari-sky-light/40">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-600">{transfer.issuedDate}</td>
                  <td className="px-4 py-3">
                    <Link href={`/personnel/${transfer.id}`} className="font-semibold text-yahari-navy hover:underline">
                      {transfer.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-600">{transfer.previousPosition}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-600">{transfer.newPosition}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <PersonnelTypeBadge type={transfer.type} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-xs text-gray-600">※ 掲載している辞令は遊戯目的のサンプルです。</p>
      </section>
    </>
  );
}
