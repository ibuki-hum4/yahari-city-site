export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-24">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-yahari-sky-light border-t-yahari-navy"
        role="status"
        aria-label="読み込み中"
      />
      <p className="text-sm text-gray-600">読み込み中...</p>
    </div>
  );
}
