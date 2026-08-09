"use client";

import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { advisoryIconClassName } from "@/components/AdvisoryBadge";
import WeatherIcon from "@/components/WeatherIcon";
import { getTodayAdvisory, getTodayWeather } from "@/lib/weather";

// ヘッダーのロゴ・サイト名の隣に表示する小さな天気ウィジェット。/weatherページへのリンクを兼ねる。
export default function WeatherBadge() {
  const [weather] = useState(() => getTodayWeather());
  const [advisory] = useState(() => getTodayAdvisory());

  return (
    <Link
      href="/weather"
      className="flex items-center gap-1 rounded-full bg-yahari-sky-light px-2.5 py-1 text-xs font-semibold text-yahari-navy hover:bg-yahari-sky-light/70"
      aria-label={`本日の矢張市の天気: ${weather.label}${advisory ? `(${advisory.level}「${advisory.label}」発表中)` : ""}。詳細ページへ`}
    >
      <WeatherIcon icon={weather.icon} className="size-4" />
      <span className="hidden sm:inline">{weather.label}</span>
      {advisory && (
        <TriangleAlert
          className={`size-3.5 ${advisoryIconClassName(advisory.level)}`}
          aria-hidden="true"
        >
          <title>{`${advisory.level}: ${advisory.label}`}</title>
        </TriangleAlert>
      )}
    </Link>
  );
}
