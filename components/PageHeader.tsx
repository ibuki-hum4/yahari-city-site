import Link from "next/link";
import { SITE } from "@/lib/content";

export default function PageHeader({
  title,
  path,
  lead,
  parent,
}: {
  title: string;
  path: string;
  lead?: string;
  parent?: { label: string; href: string };
}) {
  const crumbs = [
    { name: "ホーム", item: SITE.url },
    ...(parent ? [{ name: parent.label, item: `${SITE.url}${parent.href}` }] : []),
    { name: title, item: `${SITE.url}${path}` },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  return (
    <div className="bg-yahari-sky-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav aria-label="現在の位置" className="text-xs text-gray-600">
          <Link href="/" className="hover:underline">
            ホーム
          </Link>
          <span className="mx-1">›</span>
          {parent && (
            <>
              <Link href={parent.href} className="hover:underline">
                {parent.label}
              </Link>
              <span className="mx-1">›</span>
            </>
          )}
          <span className="text-gray-700">{title}</span>
        </nav>
        <h1 className="mt-2 text-2xl font-bold text-yahari-navy sm:text-3xl">
          {title}
        </h1>
        {lead && <p className="mt-3 max-w-2xl text-sm text-gray-600">{lead}</p>}
      </div>
    </div>
  );
}
