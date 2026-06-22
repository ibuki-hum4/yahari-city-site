import { EMERGENCY_NOTICES } from "@/lib/content";

export default function EmergencyBanner() {
  const hasNotices = EMERGENCY_NOTICES.length > 0;

  return (
    <div
      className={`border-b px-4 py-2 text-center text-sm ${
        hasNotices ? "border-red-200 bg-red-50 text-red-700" : "border-gray-100 bg-gray-50 text-gray-600"
      }`}
    >
      {hasNotices ? (
        <ul className="mx-auto max-w-6xl space-y-1">
          {EMERGENCY_NOTICES.map((notice) => (
            <li key={notice.title} className="font-semibold">
              <time>{notice.date}</time> {notice.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>現在、矢張市に関する緊急のお知らせはありません。</p>
      )}
    </div>
  );
}
