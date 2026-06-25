import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import XHashtagFeed from "@/components/XHashtagFeed";
import { SITE, pageMetadata } from "@/lib/content";

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

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-lg bg-gray-50">
            <div className="relative aspect-video">
              <Image
                src="/224,48,00.png"
                alt="歴代記録、224時間48分の耐久VC"
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-sm text-gray-600">
              歴代記録、224時間48分の耐久VC
              <br />
              <Link href="/legends" className="font-medium text-yahari-navy hover:underline">
                → 殿堂入りページで見る
              </Link>
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-gray-50">
            <div className="relative aspect-video">
              <Image
                src="/op.png"
                alt="盛り上がる雑談チャンネルの一幕"
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-sm text-gray-600">
              盛り上がる雑談チャンネルの一幕
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-gray-50">
            <div className="relative aspect-video">
              <Image
                src="/chojikan-vc.png"
                alt="新記録、293時間56分19秒の耐久VC"
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-sm text-gray-600">
              新記録、293時間56分19秒の耐久VC
              <br />
              <Link href="/legends" className="font-medium text-yahari-navy hover:underline">
                → 殿堂入りページで見る
              </Link>
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-gray-50">
            <div className="relative aspect-video">
              <Image
                src="/300zikan.png"
                alt="新記録、300時間の耐久VC"
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-sm text-gray-600">
              新記録、300時間の耐久VC
              <br />
              <Link href="/legends" className="font-medium text-yahari-navy hover:underline">
                → 殿堂入りページで見る
              </Link>
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-gray-50">
            <div className="relative aspect-video">
              <Image
                src="/4kagetsu.png"
                alt="矢張市創立4か月を祝うメッセージ"
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-sm text-gray-600">
              矢張市創立4か月を祝うメッセージ
              <br />
              <Link href="/history" className="font-medium text-yahari-navy hover:underline">
                → 沿革ページで見る
              </Link>
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-lg bg-gray-50">
            <div className="relative aspect-video">
              <Image
                src="/bazuttaraokutokoro.png"
                alt="「#バズったら置くところ」チャンネルの一幕"
                fill
                sizes="(min-width: 640px) 440px, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-sm text-gray-600">
              「#バズったら置くところ」チャンネルの一幕
            </figcaption>
          </figure>
        </div>

        <div className="mt-8">
          <XHashtagFeed hashtag={SITE.xHashtag} />
        </div>
      </section>
    </>
  );
}
