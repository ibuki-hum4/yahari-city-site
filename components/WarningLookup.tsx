"use client";

import { useTransition, useState } from "react";
import { lookupWarnings, type WarningLookupResult } from "@/app/bosai/actions";
import type { AreaOffice } from "@/lib/jma";

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("ja-JP", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function WarningLookup({ offices }: { offices: AreaOffice[] }) {
  const [officeCode, setOfficeCode] = useState("");
  const [result, setResult] = useState<WarningLookupResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (code: string) => {
    setOfficeCode(code);
    setResult(null);
    if (!code) return;
    startTransition(async () => {
      const data = await lookupWarnings(code);
      setResult(data);
    });
  };

  return (
    <div>
      <label htmlFor="office-select" className="block text-sm font-semibold text-gray-700">
        都道府県・地域を選択
      </label>
      <select
        id="office-select"
        value={officeCode}
        onChange={(event) => handleChange(event.target.value)}
        className="mt-2 w-full max-w-sm rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
      >
        <option value="">選択してください</option>
        {offices.map((office) => (
          <option key={office.code} value={office.code}>
            {office.name}
          </option>
        ))}
      </select>

      <div aria-live="polite">
        {isPending && <p className="mt-4 text-sm text-gray-600">読み込み中...</p>}

        {!isPending && result && (
          <div className="mt-6">
            <p className="text-xs text-gray-600">発表: {formatDateTime(result.reportDatetime)}</p>
            {result.headlineText && (
              <p className="mt-2 rounded bg-yahari-sky-light p-3 text-sm leading-relaxed text-gray-800">
                {result.headlineText}
              </p>
            )}
            <ul className="mt-4 divide-y divide-gray-100 border-y border-gray-100">
              {result.areas.map((area) => (
                <li
                  key={area.code}
                  className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm"
                >
                  <span className="text-gray-800">{area.name}</span>
                  {area.activeWarnings.length > 0 ? (
                    <span className="flex flex-wrap gap-1">
                      {area.activeWarnings.map((w) => (
                        <span
                          key={w}
                          className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700"
                        >
                          {w}
                        </span>
                      ))}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-600">発表警報・注意報はなし</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isPending && officeCode && !result && (
          <p className="mt-4 text-sm text-gray-600">
            情報を取得できませんでした。時間を置いて再度お試しください。
          </p>
        )}
      </div>
    </div>
  );
}
