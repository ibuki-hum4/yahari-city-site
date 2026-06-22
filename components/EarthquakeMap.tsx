"use client";

import dynamic from "next/dynamic";
import type { QuakeListItem } from "@/lib/jma";

const EarthquakeMapInner = dynamic(() => import("@/components/EarthquakeMapInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-600">
      地図を読み込み中...
    </div>
  ),
});

export default function EarthquakeMap({ earthquakes }: { earthquakes: QuakeListItem[] }) {
  return <EarthquakeMapInner earthquakes={earthquakes} />;
}
