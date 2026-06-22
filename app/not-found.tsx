import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "ページが見つかりません",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <Image src={SITE.logo} alt="" width={96} height={96} aria-hidden className="opacity-60" />
      <p className="mt-6 text-sm font-semibold tracking-widest text-yahari-sky">ERROR 404</p>
      <h1 className="mt-2 text-2xl font-bold text-yahari-navy sm:text-3xl">
        お探しのページが見つかりませんでした
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        URLが変更されたか、削除された可能性があります。担当部署に問い合わせましたが、「存在しないページについては関知しません」との回答でした。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark"
        >
          ホームへ戻る
        </Link>
        <Link
          href="/sitemap"
          className="rounded-full border border-yahari-navy px-6 py-3 text-sm font-semibold text-yahari-navy hover:bg-yahari-sky-light"
        >
          サイトマップを見る
        </Link>
      </div>
    </section>
  );
}
