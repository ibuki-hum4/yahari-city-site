import type { Metadata } from "next";
import Markdown from "@/components/Markdown";
import NewsBadge from "@/components/NewsBadge";
import PageHeader from "@/components/PageHeader";
import { SITE, pageMetadata } from "@/lib/content";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = pageMetadata("/news");

export default function NewsPage() {
  const news = getAllNews();

  return (
    <>
      <PageHeader title="お知らせ" path="/news" lead={`${SITE.name}からの最新情報をまとめてご覧いただけます。`} />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <ul className="divide-y divide-gray-100 border-y border-gray-100">
          {news.map((item) => (
            <li key={item.slug} className="py-6">
              <div className="flex items-center gap-3">
                <time className="text-sm text-gray-500">{item.date}</time>
                <NewsBadge category={item.category} />
              </div>
              <h2 className="mt-2 font-bold text-gray-800">{item.title}</h2>
              <div className="mt-2">
                <Markdown>{item.content}</Markdown>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
