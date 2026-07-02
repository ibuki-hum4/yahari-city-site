import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PhotoGalleryClient from "@/components/PhotoGalleryClient";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import XHashtagFeed from "@/components/XHashtagFeed";
import { SITE, pageMetadata } from "@/lib/content";
import { PHOTOS } from "@/lib/photos";

export const metadata: Metadata = pageMetadata("/pictures");

const COMING_SOON_CAPTIONS = [
  "フォトコンテスト入選作品",
  "創立記念イベント",
  "市民の日常",
];

export default function PicturesPage() {
  return (
    <>
      <PageHeader
        title="フォトギャラリー"
        path="/pictures"
        lead={`${SITE.name}の市章や、市民の皆さまから寄せられた写真を掲載しています。`}
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">市章・シンボル</h2>
        <p className="mt-2 text-sm text-gray-600">
          通常は透過版をご利用ください。背景あり版は、背景色を選べない場面など、用途に応じて使用してください。
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <figure className="rounded-lg bg-yahari-navy p-8">
            <Image
              src={SITE.logo}
              alt={`${SITE.name}章(透過版)`}
              width={240}
              height={240}
              className="mx-auto h-48 w-48"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {SITE.name}章(透過版)
            </figcaption>
          </figure>
          <figure className="rounded-lg bg-yahari-sky-light p-8">
            <Image
              src={SITE.logoWithBackground}
              alt={`${SITE.name}章(背景あり版)`}
              width={240}
              height={240}
              className="mx-auto h-48 w-48 object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-gray-600">
              {SITE.name}章(背景あり版)
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-yahari-sky-light/40">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="text-xl font-bold text-yahari-navy">市民の思い出</h2>
          <p className="mt-2 text-sm text-gray-600">
            市民の皆さまから寄せられた写真は、今後随時こちらに追加していく予定です。掲載をご希望の方はサーバー内「#写真募集」チャンネルへどうぞ。
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {COMING_SOON_CAPTIONS.map((caption) => (
              <PhotoPlaceholder key={caption} caption={caption} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-bold text-yahari-navy">
          Xでの「#{SITE.xHashtag}」
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          市民の皆さまがXに投稿した「#{SITE.xHashtag}」タグの様子をご覧いただけます。
        </p>

        <div className="mt-6">
          <PhotoGalleryClient photos={PHOTOS} />
        </div>

        <div className="mt-8">
          <XHashtagFeed hashtag={SITE.xHashtag} />
        </div>
      </section>
    </>
  );
}
