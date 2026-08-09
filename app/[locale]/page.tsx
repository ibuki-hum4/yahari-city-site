import { CalendarDays, Crown, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import BentoLinkCard from "@/components/BentoLinkCard";
import Carousel, { type CarouselSlide } from "@/components/Carousel";
import EmergencyBanner from "@/components/EmergencyBanner";
import NewsBadge from "@/components/NewsBadge";
import TodayStudent from "@/components/TodayStudent";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/content";
import { getAllNews } from "@/lib/news";
import { cn } from "@/lib/utils";
import { setRequestLocale } from "next-intl/server";

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    src: "/Carousel/Discord.png",
    alt: "Discordサーバー メンバー募集中",
    href: SITE.discordInviteUrl,
    external: true,
  },
  {
    src: "/Carousel/yahari-city.png",
    alt: "ABOUT 新都市、矢張市とは?",
    href: "/about",
  },
];

// STATSと同じくBento風の非対称グリッド。「矢張市について」を大きめの入口タイルにし、
// 「市民になるには」はCTA的な帯タイルとして下段に配置している。
const QUICK_LINKS = [
  {
    href: "/about",
    title: "矢張市について",
    description: "市長メッセージや市の概要、基礎データをご紹介します。",
    icon: "landmark" as const,
    className: "col-span-2 lg:col-span-2",
    featured: true,
  },
  {
    href: "/history",
    title: "沿革",
    description: "発足から現在までの矢張市の歩みを年表でご覧いただけます。",
    icon: "history" as const,
    className: "col-span-1",
  },
  {
    href: "/pictures",
    title: "フォトギャラリー",
    description: "市章や市民の思い出の写真を掲載しています。",
    icon: "image" as const,
    className: "col-span-1",
  },
  {
    href: "/access",
    title: "市民になるには",
    description: "矢張市の公式Discordサーバーへの参加方法をご案内します。",
    icon: "user-plus" as const,
    className: "col-span-2 lg:col-span-4",
    featured: true,
  },
];

// Bento風の非対称グリッドで表示する。市民数を大きめのタイルにし、
// スローガンは下段の帯タイルにすることで、均一なカード4つ並びの単調さを崩している。
const STATS = [
  {
    label: "市民数",
    value: `${SITE.population}人`,
    note: SITE.populationAsOf,
    icon: Users,
    className: "col-span-2 sm:col-span-2",
    featured: true,
  },
  { label: "設立", value: SITE.founded, icon: CalendarDays, className: "col-span-1" },
  { label: "市長", value: SITE.mayor, icon: Crown, className: "col-span-1" },
  {
    label: "スローガン",
    value: SITE.slogan,
    icon: Sparkles,
    className: "col-span-2 sm:col-span-4",
    featured: true,
  },
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const news = getAllNews();

  return (
    <>
      <EmergencyBanner />

      <section className="relative overflow-hidden bg-gradient-to-br from-yahari-navy to-yahari-navy-dark text-white">
        <Image
          src={SITE.logoMedium}
          alt=""
          width={520}
          height={520}
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 opacity-10"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <p className="text-sm font-semibold tracking-widest text-yahari-sky">
            {SITE.englishName}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">
            {SITE.name}公式サイト
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            {SITE.slogan} Discord上に築かれた、市民{SITE.population}人の「街」です。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-yahari-navy hover:bg-yahari-sky-light"
            >
              <Link href="/about">矢張市について知る</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href={SITE.discordInviteUrl} target="_blank" rel="noopener noreferrer">
                Discordに参加する
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-4">
          <Carousel slides={CAROUSEL_SLIDES} />
        </div>
      </section>

      <section className="border-b bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-10 sm:grid-cols-4">
          {STATS.map((stat) => (
            <Card
              key={stat.label}
              size="sm"
              className={cn(
                "shadow-none transition-shadow duration-200 hover:shadow-lg",
                stat.className,
                stat.featured
                  ? "bg-yahari-navy text-white ring-transparent"
                  : "hover:ring-yahari-navy/30"
              )}
            >
              <CardContent className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full",
                    stat.featured ? "bg-white/15" : "bg-yahari-sky-light"
                  )}
                >
                  <stat.icon
                    className={cn("size-4.5", stat.featured ? "text-white" : "text-yahari-navy")}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <p className={cn("text-xs font-semibold", stat.featured ? "text-white/70" : "text-muted-foreground")}>
                    {stat.label}
                  </p>
                  <p
                    className={cn(
                      "mt-0.5 font-bold",
                      stat.featured ? "text-2xl text-white" : "text-lg text-yahari-navy"
                    )}
                  >
                    {stat.value}
                  </p>
                  {stat.note && (
                    <p className={cn("text-xs", stat.featured ? "text-white/70" : "text-muted-foreground")}>
                      {stat.note}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold text-yahari-navy">お知らせ</h2>
          <Link href="/news" className="text-sm font-medium text-yahari-navy hover:underline">
            お知らせ一覧へ ›
          </Link>
        </div>
        <ul className="mt-6 divide-y divide-gray-100 border-y border-gray-100">
          {news.slice(0, 4).map((item) => (
            <li key={item.slug} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:gap-4">
              <time className="w-24 shrink-0 text-sm text-gray-500">{item.date}</time>
              <div className="shrink-0">
                <NewsBadge category={item.category} />
              </div>
              <p className="text-sm text-gray-800">{item.title}</p>
            </li>
          ))}
        </ul>
      </section>

      <TodayStudent />

      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-xl font-bold text-yahari-navy">サイトメニュー</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <BentoLinkCard
                key={link.href}
                href={link.href}
                title={link.title}
                description={link.description}
                icon={link.icon}
                className={link.className}
                featured={link.featured}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
