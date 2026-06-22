"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        setRefreshing(true);
        router.refresh();
        setTimeout(() => setRefreshing(false), 600);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-yahari-navy px-3 py-1.5 text-xs font-semibold text-yahari-navy hover:bg-yahari-sky-light"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={refreshing ? "animate-spin" : ""}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6M20 20v-6h-6" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 9a8 8 0 0114.5-3M19.5 15a8 8 0 01-14.5 3"
        />
      </svg>
      最新の情報に更新
    </button>
  );
}
