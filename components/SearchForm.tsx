export default function SearchForm({ className = "" }: { className?: string }) {
  return (
    <form action="/search" method="GET" className={`flex items-center ${className}`}>
      <input
        type="search"
        name="q"
        placeholder="サイト内検索"
        aria-label="サイト内検索"
        className="w-full min-w-0 rounded-l border border-gray-300 px-3 py-1.5 text-sm text-gray-800 focus:border-yahari-navy focus:outline-none"
      />
      <button
        type="submit"
        aria-label="検索"
        className="shrink-0 rounded-r border border-l-0 border-gray-300 bg-yahari-navy px-3 py-1.5 text-white hover:bg-yahari-navy-dark"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}
