import localFont from "next/font/local";

// サイト全体の基本フォント。Canvas(市民証・証明書等)の描画でも同じフォントを使うため、
// ここから`lineSeedJP.style.fontFamily`を参照して両方で一貫させる。
//
// 配信量を抑えるため、TTFではなくWOFF2(約1/2.4のサイズ)を使う。
// またウェイトはRegular(400)とBold(700)のみを収録している。TailwindのUtilityとしては
// font-medium(500)/font-semibold(600)も使われているが、CSSのフォントマッチング規則により
// 500は400、600は700へ解決されるため、Thin(100)/ExtraBold(800)を含めても描画結果は変わらない。
//
// フォント実体は`public/`ではなく`assets/`に置く。next/fontがビルド時に
// `/_next/static/media`へハッシュ付き(immutableキャッシュ)で出力するため、
// `public/`にも置くと同じ3MBが実行イメージに二重に載り、しかもそちらは
// キャッシュの効かないURLで公開されてしまう。
export const lineSeedJP = localFont({
  src: [
    { path: "../assets/fonts/LINESeedJP-Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/LINESeedJP-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-line-seed",
  display: "swap",
});
