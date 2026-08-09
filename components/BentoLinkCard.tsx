"use client";

import {
  Award,
  Heart,
  History,
  IdCard,
  Image as ImageIcon,
  Landmark,
  Moon,
  Plane,
  UserPlus,
  UsersRound,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Server Component(page.tsx)からClient Componentへは関数(アイコンのコンポーネント参照)を
// propsで直接渡せないため、WeatherIcon.tsxと同じくID文字列で受け取り、ここで解決する。
// サイト内の各ページのBentoグリッドで使い回す共通の語彙。
const ICONS = {
  landmark: Landmark,
  history: History,
  image: ImageIcon,
  "user-plus": UserPlus,
  "users-round": UsersRound,
  plane: Plane,
  "id-card": IdCard,
  heart: Heart,
  moon: Moon,
  award: Award,
} as const;

export type BentoIconId = keyof typeof ICONS;

// トップページのBento風グリッド(サイトメニュー等)で使うリンクカード。
// featuredタイルは紺色の塗りつぶし+アイコンではっきり主役だと分かるようにし、
// それ以外は白背景のまま余白で軽く見せることで、グリッド内のメリハリを強調する。
export default function BentoLinkCard({
  href,
  title,
  description,
  icon,
  className,
  featured,
}: {
  href: string;
  title: string;
  description: string;
  icon?: BentoIconId;
  className?: string;
  featured?: boolean;
}) {
  const Icon = icon ? ICONS[icon] : undefined;
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        className={cn(
          "h-full shadow-none ring-foreground/10 transition-shadow duration-200 hover:shadow-lg",
          featured
            ? "bg-yahari-navy text-white ring-transparent hover:shadow-yahari-navy/30"
            : "hover:ring-yahari-navy/30"
        )}
      >
        <Link href={href} className="block h-full">
          <CardContent className="flex h-full flex-col justify-center gap-2">
            {Icon && (
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full",
                  featured ? "bg-white/15" : "bg-yahari-sky-light"
                )}
              >
                <Icon
                  className={cn("size-4.5", featured ? "text-white" : "text-yahari-navy")}
                  aria-hidden="true"
                />
              </span>
            )}
            <h3 className={cn("font-bold", featured ? "text-lg text-white" : "text-yahari-navy")}>
              {title}
            </h3>
            <p className={cn("text-sm", featured ? "text-white/80" : "text-muted-foreground")}>
              {description}
            </p>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
