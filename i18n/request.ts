import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // ロケールはURL(`app/[locale]`)から受け取る。以前はCookieを読んでいたが、
  // `cookies()`はルートレイアウトを動的レンダリングに落とすため全ページが
  // 毎リクエストSSRになっていた。
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
