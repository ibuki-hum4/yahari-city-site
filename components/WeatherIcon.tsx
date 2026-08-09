import {
  CalendarDays,
  Cloud,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Flower2,
  PawPrint,
  Rainbow,
  Sun,
  SunSnow,
  TreePine,
  type LucideProps,
} from "lucide-react";
import type { WeatherIconId } from "@/lib/weather";

// 絵文字は環境依存で表示崩れするため、天気アイコンは全てlucide-reactで統一する。
const ICONS: Record<WeatherIconId, React.ComponentType<LucideProps>> = {
  sun: Sun,
  cloud: Cloud,
  "cloud-rain": CloudRain,
  "cloud-snow": CloudSnow,
  "cloud-hail": CloudHail,
  "cloud-lightning": CloudLightning,
  "paw-print": PawPrint,
  flower: Flower2,
  "tree-pine": TreePine,
  rainbow: Rainbow,
  "calendar-days": CalendarDays,
  "sun-snow": SunSnow,
};

export default function WeatherIcon({ icon, className }: { icon: WeatherIconId; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden="true" />;
}
