import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // API・Next内部アセット・拡張子付きの静的ファイル(画像やrobots.txt等)は
  // ロケール解決の対象外にする。
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
