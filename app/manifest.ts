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
    icons: [{ src: SITE.logo, sizes: "2000x2000", type: "image/png" }],
  };
}
