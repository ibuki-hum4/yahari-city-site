import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { SITE, TOURIST_SPOTS, pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/spots");

export default function SpotsPage() {
  return (
    <>
      <PageHeader
        title="観光スポット"
        path="/spots"
        lead={`${SITE.name}内の名所をご紹介します。実際に訪れる際は各チャンネルの趣旨をご確認ください。`}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {TOURIST_SPOTS.map((spot) => (
            <Card key={spot.name} className="overflow-hidden py-0">
              {spot.image && (
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={spot.image}
                    alt={spot.name}
                    fill
                    sizes="(min-width: 640px) 440px, 100vw"
                    className="object-contain"
                  />
                </div>
              )}
              <CardContent className="py-5">
                <h2 className="font-bold text-yahari-navy">{spot.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{spot.description}</p>
                <p className="mt-3 text-xs font-semibold text-yahari-navy">見どころ: {spot.highlight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          ※ 掲載しているスポットは遊戯目的の架空のものです。
        </p>
      </section>
    </>
  );
}
