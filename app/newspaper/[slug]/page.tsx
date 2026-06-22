import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Markdown from "@/components/Markdown";
import NewspaperBadge from "@/components/NewspaperBadge";
import PageHeader from "@/components/PageHeader";
import { SITE, buildMetadata } from "@/lib/content";
import { getAllIssues, getExcerpt, getIssueBySlug } from "@/lib/newspaper";

export function generateStaticParams() {
  return getAllIssues().map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) {
    return {};
  }

  const description = getExcerpt(issue.content, 120);
  return {
    ...buildMetadata({ title: `${issue.title}(${issue.issue})`, description, path: `/newspaper/${slug}` }),
    openGraph: {
      type: "article",
      title: issue.title,
      description,
      url: `/newspaper/${slug}`,
      publishedTime: issue.date,
    },
  };
}

export default async function NewspaperIssuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const issue = getIssueBySlug(slug);
  if (!issue) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: issue.title,
    datePublished: issue.date,
    dateModified: issue.date,
    articleSection: issue.type,
    inLanguage: "ja",
    url: `${SITE.url}/newspaper/${slug}`,
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
      <PageHeader title={issue.title} path={`/newspaper/${slug}`} parent={{ label: "矢張市新聞", href: "/newspaper" }} />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="flex items-center gap-3">
          <time className="text-sm text-gray-500">{issue.date}</time>
          <NewspaperBadge type={issue.type} />
          <span className="text-xs font-semibold text-gray-500">{issue.issue}</span>
        </div>
        <div className="mt-6">
          <Markdown>{issue.content}</Markdown>
        </div>
      </section>
    </>
  );
}
