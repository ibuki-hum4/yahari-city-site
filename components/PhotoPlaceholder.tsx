import { ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PhotoPlaceholder({ caption }: { caption: string }) {
  return (
    <Card className="aspect-[4/3] border-2 border-dashed border-yahari-sky bg-yahari-sky-light shadow-none">
      <CardContent className="flex flex-1 flex-col items-center justify-center gap-2 text-yahari-navy/80">
        <ImageIcon className="size-8" strokeWidth={1.5} />
        <p className="px-3 text-center text-xs">{caption}</p>
      </CardContent>
    </Card>
  );
}
