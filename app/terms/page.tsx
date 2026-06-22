import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/terms");

export default function TermsPage() {
  return (
    <>
      <PageHeader
        title="このサイトについて"
        path="/terms"
        lead={`${SITE.name}公式サイトの著作権・リンク・ご利用にあたっての注意事項をご案内します。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">運営について</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          {SITE.name}は、Discord上で活動する架空のコミュニティです。実在する地方公共団体とは一切関係ありません。本サイトは{SITE.name}の運営メンバーが個人として運営しています。
        </p>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">著作権について</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            本サイトに掲載しているテキスト・市章・画像等の著作権は、特に記載のあるものを除き{SITE.name}に帰属します。市民の皆さまからご提供いただいた写真等の著作権は、提供者に帰属します。無断での転載・複製はお控えください。
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">リンクについて</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          本サイトへのリンクは原則自由です。リンクを設定される際の事前のご連絡は不要です。ただし、本サイトの内容を誤解させるような形でのリンク・引用はご遠慮ください。
        </p>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">免責事項</h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-700">
            本サイトの内容(沿革・お知らせ等を含む)は、予告なく変更・削除される場合があります。本サイトの情報を利用したことにより生じたいかなる損害についても、{SITE.name}は責任を負いません。
          </p>
          <p className="mt-8 text-xs text-gray-600">本ページは2026年6月22日に制定しました。</p>
        </div>
      </section>
    </>
  );
}
