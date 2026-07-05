"use client";

import { Button } from "@/components/ui/button";

export default function PrintButton({ label }: { label: string }) {
  return (
    <Button
      type="button"
      onClick={() => window.print()}
      size="lg"
      className="no-print rounded-full"
    >
      {label}
    </Button>
  );
}
