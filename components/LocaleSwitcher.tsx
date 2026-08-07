"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LOCALES, type Locale } from "@/i18n/locales";

const LOCALE_LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Accessibility");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  // 言語はCookieではなくURLで表す。同じページのまま`/about`↔`/en/about`を行き来する。
  // `pathname`はロケール接頭辞を除いた形で返るため、そのまま渡せばよい。
  const switchTo = (next: Locale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- 動的セグメント([slug]等)を含むパスも現在の値をそのまま引き継ぐ
        { pathname, params },
        { locale: next }
      );
    });
  };

  return (
    <div className="flex w-full items-center justify-between">
      <span>{t("language")}</span>
      <div className="flex gap-1 text-xs font-semibold">
        {LOCALES.map((code) => (
          <button
            key={code}
            type="button"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              switchTo(code);
            }}
            aria-current={locale === code ? "true" : undefined}
            className={`rounded px-1.5 py-0.5 ${
              locale === code ? "bg-yahari-navy text-white" : "text-yahari-navy hover:bg-muted"
            }`}
          >
            {LOCALE_LABELS[code]}
          </button>
        ))}
      </div>
    </div>
  );
}
