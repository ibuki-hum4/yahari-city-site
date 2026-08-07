"use server";

import { getClass10Names, getWarnings, warningName } from "@/lib/jma";

export interface WarningAreaResult {
  code: string;
  name: string;
  activeWarnings: string[];
}

export interface WarningLookupResult {
  reportDatetime: string;
  headlineText: string;
  areas: WarningAreaResult[];
}

export async function lookupWarnings(officeCode: string): Promise<WarningLookupResult | null> {
  const [warnings, names] = await Promise.all([getWarnings(officeCode), getClass10Names()]);
  if (!warnings) return null;

  return {
    reportDatetime: warnings.reportDatetime,
    headlineText: warnings.headlineText,
    areas: warnings.areas.map((area) => {
      const active = area.warnings.filter((w) => w.code && w.status !== "解除");
      return {
        code: area.code,
        name: names[area.code] ?? area.code,
        activeWarnings: active.map((w) => warningName(w.code as string)),
      };
    }),
  };
}
