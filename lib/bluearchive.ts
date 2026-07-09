const STUDENTS_API_URL = "https://bluearchive-api.skyia.jp/api/students?limit=1000";

export interface BlueArchiveStudent {
  id: string;
  name: string;
  rarity: number;
  weapon: { type: string; cover: boolean };
  role: { type: string; class: string; position: string };
  school: string;
  combat: { attackType: string; defenseType: string };
  terrainAdaptation: { city: string; outdoor: string; indoor: string };
}

interface StudentsResponse {
  data: BlueArchiveStudent[];
  total: number;
}

function todayKey(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo" }).format(new Date());
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export async function getTodayStudent(): Promise<BlueArchiveStudent | null> {
  try {
    const res = await fetch(STUDENTS_API_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const { data }: StudentsResponse = await res.json();
    if (!data?.length) return null;

    const index = hashString(todayKey()) % data.length;
    return data[index];
  } catch {
    return null;
  }
}
