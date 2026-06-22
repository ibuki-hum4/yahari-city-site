import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/privacy");

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="個人情報保護方針"
        path="/privacy"
        lead={`${SITE.name}公式サイトにおける個人情報の取り扱いについてご案内します。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">本サイトでの情報の取得について</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            {SITE.name}公式サイトには、お名前やメールアドレスなどの個人情報を入力する問い合わせフォーム等は設置していません。サイト内検索やフォトギャラリーなどの機能は、入力された内容をサーバーに送信せず、お使いの端末(ブラウザ)内のみで処理しています。
          </p>
        </div>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">外部サービスの埋め込みについて</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              本サイトでは、以下の外部サービスのコンテンツを埋め込んでいます。これらのサービスは、各社のプライバシーポリシーに基づき、Cookie等を利用して情報を取得する場合があります。
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Discord(サーバー参加状況の表示) —{" "}
                <a
                  href="https://discord.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yahari-navy underline"
                >
                  Discordのプライバシーポリシー
                </a>
              </li>
              <li>
                X(旧Twitter、投稿タイムラインの表示) —{" "}
                <a
                  href="https://x.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yahari-navy underline"
                >
                  Xのプライバシーポリシー
                </a>
              </li>
              <li>Google翻訳(ヘッダーの「English」リンクから利用した場合)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">アクセス解析について</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          現時点で、本サイトはアクセス解析ツールを導入していません。導入する場合は、本ページにて事前にお知らせします。
        </p>
        <p className="mt-8 text-xs text-gray-600">本方針は2026年6月22日に制定しました。</p>
      </section>
    </>
  );
}
