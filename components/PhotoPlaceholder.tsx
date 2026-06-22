export default function PhotoPlaceholder({ caption }: { caption: string }) {
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-yahari-sky bg-yahari-sky-light text-yahari-navy/80">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="8.5" cy="10" r="1.5" />
        <path d="M3 16l5-4 4 3 5-5 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="px-3 text-center text-xs">{caption}</p>
    </div>
  );
}
