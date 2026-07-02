import localFont from "next/font/local";

// サイト全体の基本フォント。Canvas(市民証・証明書等)の描画でも同じフォントを使うため、
// ここから`lineSeedJP.style.fontFamily`を参照して両方で一貫させる。
export const lineSeedJP = localFont({
  src: [
    { path: "../public/fonts/LINESeedJP-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/LINESeedJP-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/LINESeedJP-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/LINESeedJP-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-line-seed",
  display: "swap",
});
