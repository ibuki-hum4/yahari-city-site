import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // next/imageの最適化はsharpのネイティブバイナリに依存しており、Bunランタイムの
    // コンテナ上では正しく動作しない("isn't a valid image"エラー)。最適化を無効化し、
    // publicの画像をそのまま配信する。
    unoptimized: true,
  },
  // `public/`配下はファイル名にハッシュが付かないため、Nextの既定では`max-age=0`となり
  // ページ遷移のたびに再検証が走る。差し替え頻度が低い画像だけ1日キャッシュし、
  // その後1週間はstale-while-revalidateで即座に返す。
  async headers() {
    return [
      {
        source: "/:path*.(png|svg|webp|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/ycNhzjbTuY",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
