import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AiSummary from "@/components/AiSummary";
import CommentSection from "@/components/CommentSection";
import Markdown from "@/components/Markdown";
import PageHeader from "@/components/PageHeader";
import { getComments } from "@/lib/comments";
import { SITE, buildMetadata } from "@/lib/content";
import { getAllColumns, getColumnBySlug, getExcerpt } from "@/lib/column";
import { summarizeText } from "@/lib/summarize";

export function generateStaticParams() {
  return getAllColumns().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getColumnBySlug(slug);
  if (!item) {
    return {};
  }

  const description = getExcerpt(item.content, 120);
  return {
    ...buildMetadata({ title: item.title, description, path: `/column/${slug}` }),
    openGraph: {
      type: "article",
      title: item.title,
      description,
      url: `/column/${slug}`,
      publishedTime: item.date,
    },
  };
}

export default async function ColumnArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getColumnBySlug(slug);
  if (!item) {
    notFound();
  }

  const summary = await summarizeText(item.content);
  // ビルド時の静的生成ではDBに接続できないため、失敗時は空一覧にフォールバックする
  const comments = await getComments("column", slug).catch(() => []);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    datePublished: item.date,
    dateModified: item.date,
    author: { "@type": "Person", name: SITE.mayor },
    inLanguage: "ja",
    url: `${SITE.url}/column/${slug}`,
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
      <PageHeader title={item.title} path={`/column/${slug}`} parent={{ label: "市長コラム", href: "/column" }} />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <time className="text-sm text-gray-500">{item.date}</time>
        <AiSummary summary={summary} />
        <div className="mt-6">
          <Markdown>{item.content}</Markdown>
        </div>
        <CommentSection targetType="column" targetSlug={slug} initialComments={comments} />
      </section>
    </>
  );
}
