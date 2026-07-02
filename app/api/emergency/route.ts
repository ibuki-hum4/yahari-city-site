import { EMERGENCY_NOTICES } from "@/lib/content";

export function GET() {
  return Response.json(EMERGENCY_NOTICES, {
    headers: {
      "Cache-Control": "public, max-age=60",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
