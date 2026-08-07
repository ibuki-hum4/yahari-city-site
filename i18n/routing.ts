import { defineRouting } from "next-intl/routing";

import { DEFAULT_LOCALE, LOCALES } from "./locales";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // 既定言語(日本語)にはURL接頭辞を付けない。`/about`は従来どおり日本語、
  // 英語は`/en/about`。公開済みURLを一切変えずに多言語化するための設定。
  localePrefix: "as-needed",
  // 言語の選択はCookieではなくURLで表す。Cookieを読むとルートレイアウトが
  // 動的レンダリングに落ち、全ページが毎リクエストSSRになってしまうため無効化する。
  localeDetection: false,
});
