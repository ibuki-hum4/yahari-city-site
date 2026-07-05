import { TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { EMERGENCY_NOTICES } from "@/lib/content";

export default function EmergencyBanner() {
  if (EMERGENCY_NOTICES.length === 0) return null;

  return (
    <Alert
      variant="destructive"
      className="block rounded-none border-x-0 border-t-0 bg-destructive/10 py-2 text-center"
    >
      <AlertDescription className="mx-auto max-w-6xl text-destructive">
        <ul className="flex flex-col items-center gap-1">
          {EMERGENCY_NOTICES.map((notice) => (
            <li key={notice.title} className="flex items-center gap-1.5 font-semibold">
              <TriangleAlert className="size-4 shrink-0" aria-hidden />
              <time>{notice.date}</time> {notice.title}
            </li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  );
}
