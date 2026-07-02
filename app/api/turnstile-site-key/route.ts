// NEXT_PUBLIC_TURNSTILE_SITE_KEYはk8s Secretから実行時に注入されるが、
// /news/[slug]・/column/[slug]はgenerateStaticParamsでビルド時に静的HTML化されるため、
// サーバーコンポーネントで直接読んでも値がビルド時点で固定されてしまう。
// このRoute Handlerを常に動的実行にして、クライアント側から実行時に取得させる。
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null });
}
