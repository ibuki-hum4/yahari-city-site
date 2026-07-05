"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function RefreshButton() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="rounded-full border-yahari-navy text-yahari-navy hover:bg-yahari-sky-light hover:text-yahari-navy"
      onClick={() => {
        setRefreshing(true);
        router.refresh();
        setTimeout(() => setRefreshing(false), 600);
      }}
    >
      <RefreshCw className={refreshing ? "animate-spin" : ""} />
      最新の情報に更新
    </Button>
  );
}
