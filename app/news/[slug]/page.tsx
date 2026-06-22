import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import NewsBadge from "@/components/NewsBadge";
import PageHeader from "@/components/PageHeader";
import { SITE, buildMetadata } from "@/lib/content";
import { getAllNews, getExcerpt, getNewsBySlug } from "@/lib/news";

export function generateStaticParams() {
  return getAllNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) {
    return {};
  }

  const description = getExcerpt(item.content, 120);
  return {
    ...buildMetadata({ title: item.title, description, path: `/news/${slug}` }),
    openGraph: {
      type: "article",
      title: item.title,
      description,
      url: `/news/${slug}`,
      publishedTime: item.date,
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    datePublished: item.date,
    dateModified: item.date,
    articleSection: item.category,
    inLanguage: "ja",
    url: `${SITE.url}/news/${slug}`,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: `${SITE.url}${SITE.logo}` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageHeader title={item.title} path={`/news/${slug}`} parent={{ label: "お知らせ", href: "/news" }} />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="flex items-center gap-3">
          <time className="text-sm text-gray-500">{item.date}</time>
          <NewsBadge category={item.category} />
        </div>
        <div className="mt-6">
          <Markdown>{item.content}</Markdown>
        </div>
      </section>
    </>
  );
}
