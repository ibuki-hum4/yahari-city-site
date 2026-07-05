"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { QuakeListItem } from "@/lib/jma";

const EarthquakeMapInner = dynamic(() => import("@/components/EarthquakeMapInner"), {
  ssr: false,
  loading: () => (
    <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-lg">
      <Skeleton className="absolute inset-0 rounded-lg" />
      <p className="relative text-sm text-muted-foreground">地図を読み込み中...</p>
    </div>
  ),
});

export default function EarthquakeMap({ earthquakes }: { earthquakes: QuakeListItem[] }) {
  return <EarthquakeMapInner earthquakes={earthquakes} />;
}
