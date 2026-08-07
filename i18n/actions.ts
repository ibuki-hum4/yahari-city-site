"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, LOCALES, type Locale } from "./locales";

/**
 * 表示言語のCookieを更新する。
 * `i18n/request.ts`がこのCookieを読んでロケールを決めるため、
 * 呼び出し後にrouter.refresh()すれば新しい言語で再描画される。
 */
export async function setLocaleCookie(locale: Locale): Promise<void> {
  const next = LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, next, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
