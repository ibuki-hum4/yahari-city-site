import { Skeleton } from "@/components/ui/skeleton";

export default function BosaiLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8" role="status" aria-label="読み込み中">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="mt-4 h-4 w-64" />
      <Skeleton className="mt-4 h-[400px] w-full rounded-lg" />
      <div className="mt-4 space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">気象庁の最新情報を取得しています...</p>
    </div>
  );
}
