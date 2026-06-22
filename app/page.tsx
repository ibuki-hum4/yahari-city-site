import Image from "next/image";
import Link from "next/link";
import Carousel, { type CarouselSlide } from "@/components/Carousel";
import EmergencyBanner from "@/components/EmergencyBanner";
import NewsBadge from "@/components/NewsBadge";
import { SITE } from "@/lib/content";
import { getAllNews } from "@/lib/news";

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

const QUICK_LINKS = [
  {
    href: "/about",
    title: "矢張市について",
    description: "市長メッセージや市の概要、基礎データをご紹介します。",
  },
  {
    href: "/history",
    title: "沿革",
    description: "発足から現在までの矢張市の歩みを年表でご覧いただけます。",
  },
  {
    href: "/pictures",
    title: "フォトギャラリー",
    description: "市章や市民の思い出の写真を掲載しています。",
  },
  {
    href: "/access",
    title: "市民になるには",
    description: "矢張市の公式Discordサーバーへの参加方法をご案内します。",
  },
];

const STATS = [
  { label: "市民数", value: `${SITE.population}人`, note: SITE.populationAsOf },
  { label: "設立", value: SITE.founded },
  { label: "市長", value: SITE.mayor },
  { label: "スローガン", value: SITE.slogan },
];

export default function Home() {
  const news = getAllNews();

  return (
    <>
      <EmergencyBanner />

      <section className="relative overflow-hidden bg-gradient-to-br from-yahari-navy to-yahari-navy-dark text-white">
        <Image
          src={SITE.logo}
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
            <Link
              href="/about"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-yahari-navy hover:bg-yahari-sky-light"
            >
              矢張市について知る
            </Link>
            <a
              href={SITE.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Discordに参加する
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-4">
          <Carousel slides={CAROUSEL_SLIDES} />
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="text-xs font-semibold text-gray-500">{stat.label}</p>
              <p className="mt-1 text-lg font-bold text-yahari-navy">{stat.value}</p>
              {stat.note && <p className="text-xs text-gray-600">{stat.note}</p>}
            </div>
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

      <section className="bg-yahari-sky-light">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">サイトメニュー</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <h3 className="font-bold text-yahari-navy">{link.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
