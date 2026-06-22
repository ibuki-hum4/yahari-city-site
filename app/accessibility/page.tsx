import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/accessibility");

const FEATURES = [
  "文字サイズの変更(小・中・大の3段階、設定はブラウザに保存されます)",
  "ページ読み上げ機能(お使いの端末の音声合成機能を利用します)",
  "高コントラスト表示への切り替え",
  "キーボード操作のみでの全ページ利用(スキップリンク・フォーカス表示に対応)",
  "見出し・ランドマーク(ヘッダー/ナビゲーション/メインコンテンツ/フッター)の適切な構造化",
  "画像への代替テキスト(alt)の設定",
  "自動で切り替わるカルーセルの一時停止操作、およびOSの「視差効果を減らす」設定への対応",
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        title="ウェブアクセシビリティについて"
        path="/accessibility"
        lead={`${SITE.name}公式サイトのアクセシビリティ方針と対応状況をご紹介します。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">基本方針</h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
          <p>
            {SITE.name}公式サイトは、高齢の方や障害のある方を含め、誰もが利用しやすいウェブサイトを目指しています。日本産業規格「JIS
            X 8341-3」の適合レベルAAを目標として、可能な範囲で継続的な改善に取り組んでいます。
          </p>
          <p>
            ただし、本サイトは個人運営の非公式サイトであり、すべてのページ・すべての環境において目標を満たすことを保証するものではありません。
          </p>
        </div>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">対応している機能</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-700">
            {FEATURES.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">ご意見・お問い合わせ</h2>
        <p className="mt-4 text-sm leading-relaxed text-gray-700">
          本サイトのご利用にあたって分かりにくい点や改善のご提案がございましたら、Discordサーバー内の「#お問い合わせ」チャンネルまでお知らせください。
        </p>
        <p className="mt-8 text-xs text-gray-600">本方針は2026年6月22日に制定しました。</p>
      </section>
    </>
  );
}
