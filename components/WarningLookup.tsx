"use client";

import { useTransition, useState } from "react";
import { lookupWarnings, type WarningLookupResult } from "@/app/bosai/actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      <Label htmlFor="office-select" className="text-sm font-semibold text-foreground">
        都道府県・地域を選択
      </Label>
      <Select value={officeCode} onValueChange={handleChange}>
        <SelectTrigger id="office-select" className="mt-2 w-full max-w-sm">
          <SelectValue placeholder="選択してください" />
        </SelectTrigger>
        <SelectContent>
          {offices.map((office) => (
            <SelectItem key={office.code} value={office.code}>
              {office.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div aria-live="polite">
        {isPending && <p className="mt-4 text-sm text-muted-foreground">読み込み中...</p>}

        {!isPending && result && (
          <div className="mt-6">
            <p className="text-xs text-muted-foreground">発表: {formatDateTime(result.reportDatetime)}</p>
            {result.headlineText && (
              <p className="mt-2 rounded bg-yahari-sky-light p-3 text-sm leading-relaxed text-foreground">
                {result.headlineText}
              </p>
            )}
            <ul className="mt-4 space-y-2">
              {result.areas.map((area) => (
                <li key={area.code}>
                  <Card size="sm">
                    <CardContent className="flex flex-wrap items-center justify-between gap-2 text-sm">
                      <span className="text-foreground">{area.name}</span>
                      {area.activeWarnings.length > 0 ? (
                        <span className="flex flex-wrap gap-1">
                          {area.activeWarnings.map((w) => (
                            <Badge key={w} variant="destructive">
                              {w}
                            </Badge>
                          ))}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">発表警報・注意報はなし</span>
                      )}
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isPending && officeCode && !result && (
          <p className="mt-4 text-sm text-muted-foreground">
            情報を取得できませんでした。時間を置いて再度お試しください。
          </p>
        )}
      </div>
    </div>
  );
}
