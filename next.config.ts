import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // next/imageの最適化はsharpのネイティブバイナリに依存しており、Bunランタイムの
    // コンテナ上では正しく動作しない("isn't a valid image"エラー)。最適化を無効化し、
    // publicの画像をそのまま配信する。
    unoptimized: true,
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

export default nextConfig;
