import type { Metadata } from "next";
import Link from "next/link";
import NewsBadge from "@/components/NewsBadge";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { SITE, pageMetadata } from "@/lib/content";
import { getAllNews, getExcerpt } from "@/lib/news";

export const metadata: Metadata = pageMetadata("/news");

export default function NewsPage() {
  const news = getAllNews();

  return (
    <>
      <PageHeader title="お知らせ" path="/news" lead={`${SITE.name}からの最新情報をまとめてご覧いただけます。`} />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <ul className="divide-y divide-border border-y border-border">
          {news.map((item) => (
            <li key={item.slug} className="py-6">
              <div className="flex items-center gap-3">
                <time className="text-sm text-muted-foreground">{item.date}</time>
                <NewsBadge category={item.category} />
              </div>
              <h2 className="mt-2 font-bold text-foreground">
                <Link href={`/news/${item.slug}`} className="hover:underline">
                  {item.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {getExcerpt(item.content, 140)}
              </p>
              <Button asChild variant="link" className="mt-1 h-auto px-0 text-yahari-navy">
                <Link href={`/news/${item.slug}`}>続きを読む ›</Link>
              </Button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
