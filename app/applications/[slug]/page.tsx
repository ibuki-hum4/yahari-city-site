import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/ApplicationForm";
import PageHeader from "@/components/PageHeader";
import { APPLICATIONS, getApplication } from "@/lib/applications";
import { buildMetadata } from "@/lib/content";

export function generateStaticParams() {
  return APPLICATIONS.map((application) => ({ slug: application.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const application = getApplication(slug);
  if (!application) {
    return {};
  }
  return buildMetadata({
    title: application.title,
    description: application.description,
    path: `/applications/${slug}`,
  });
}

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const application = getApplication(slug);
  if (!application) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={application.title}
        path={`/applications/${slug}`}
        lead={application.description}
        parent={{ label: "申請窓口", href: "/applications" }}
      />
      <section className="mx-auto max-w-2xl px-4 py-12">
        <ApplicationForm application={application} />
      </section>
    </>
  );
}
