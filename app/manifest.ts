import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name}公式サイト`,
    short_name: SITE.name,
    description: `${SITE.name}(やはりし)は、Discord上で活動する架空のコミュニティです。`,
    start_url: "/",
    display: "standalone",
    lang: "ja",
    background_color: "#ffffff",
    theme_color: "#173a5e",
    // PWAのインストール時に2000x2000の原寸を取得させないよう、推奨サイズを明示する。
    icons: [
      { src: "/矢張市_透過-192.png", sizes: "192x192", type: "image/png" },
      { src: SITE.logoMedium, sizes: "512x512", type: "image/png" },
    ],
  };
}
