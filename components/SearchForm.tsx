import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/search" method="GET" className={cn("flex items-center gap-1.5", className)}>
      <Input
        type="search"
        name="q"
        placeholder="サイト内検索"
        aria-label="サイト内検索"
        className="h-9"
      />
      <Button type="submit" size="icon" aria-label="検索">
        <Search />
      </Button>
    </form>
  );
}
