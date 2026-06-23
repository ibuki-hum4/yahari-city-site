import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import PrintButton from "@/components/PrintButton";
import { SITE, buildMetadata } from "@/lib/content";
import { PERSONNEL_TRANSFERS, getOrderText, getPersonnelTransfer } from "@/lib/personnel";

export function generateStaticParams() {
  return PERSONNEL_TRANSFERS.map((transfer) => ({ id: transfer.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const transfer = getPersonnelTransfer(id);
  if (!transfer) {
    return {};
  }
  return buildMetadata({
    title: `辞令(${transfer.name})`,
    description: getOrderText(transfer),
    path: `/personnel/${id}`,
  });
}

export default async function PersonnelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const transfer = getPersonnelTransfer(id);
  if (!transfer) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={`辞令: ${transfer.name}`}
        path={`/personnel/${id}`}
        parent={{ label: "人事異動情報", href: "/personnel" }}
      />

      <section className="mx-auto max-w-2xl px-4 py-12">
        <div className="print-area rounded-lg border-2 border-yahari-navy p-8 sm:p-10">
          <p className="text-right text-sm text-gray-600">辞令番号 第{id}号</p>
          <h2 className="mt-4 text-center text-2xl font-bold text-yahari-navy">辞令</h2>

          <p className="mt-10 text-lg font-semibold text-gray-800">{transfer.name} 殿</p>
          <p className="mt-6 text-base leading-loose text-gray-800">{getOrderText(transfer)}</p>
          {transfer.note && <p className="mt-4 text-sm leading-relaxed text-gray-600">{transfer.note}</p>}

          <p className="mt-12 text-right text-sm text-gray-600">{transfer.issuedDate}</p>
          <p className="mt-2 text-right text-base font-semibold text-yahari-navy">
            {SITE.name}　{SITE.mayorTitle}　{SITE.mayor}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <PrintButton label="辞令書をPDFとして保存・印刷する" />
        </div>
        <p className="mt-4 text-center text-xs text-gray-600">
          ※ 印刷ダイアログの出力先を「PDFに保存」にすると、PDFファイルとして保存できます。
        </p>
      </section>
    </>
  );
}
