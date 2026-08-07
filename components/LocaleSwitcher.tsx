"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocaleCookie } from "@/i18n/actions";
import { type Locale } from "@/i18n/locales";

const LOCALE_LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Accessibility");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setLocale = (next: Locale) => {
    if (next === locale) return;
    startTransition(async () => {
      await setLocaleCookie(next);
      router.refresh();
    });
  };

  return (
    <div className="flex w-full items-center justify-between">
      <span>{t("language")}</span>
      <div className="flex gap-1 text-xs font-semibold">
        {(Object.keys(LOCALE_LABELS) as Locale[]).map((code) => (
          <button
            key={code}
            type="button"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              setLocale(code);
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
