import { EMERGENCY_NOTICES } from "@/lib/content";

export default function EmergencyBanner() {
  if (EMERGENCY_NOTICES.length === 0) return null;

  return (
    <div className="border-b border-red-200 bg-red-50 px-4 py-2 text-center text-sm text-red-700">
      <ul className="mx-auto max-w-6xl space-y-1">
        {EMERGENCY_NOTICES.map((notice) => (
          <li key={notice.title} className="font-semibold">
            <time>{notice.date}</time> {notice.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
