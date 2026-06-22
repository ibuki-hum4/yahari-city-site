"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { SITE } from "@/lib/content";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <Image src={SITE.logo} alt="" width={96} height={96} aria-hidden className="opacity-60" />
      <p className="mt-6 text-sm font-semibold tracking-widest text-yahari-accent">ERROR 500</p>
      <h1 className="mt-2 text-2xl font-bold text-yahari-navy sm:text-3xl">
        システムエラーが発生しました
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-600">
        申し訳ございません。処理中に予期しないエラーが発生しました。お手数ですが、しばらく経ってから再度お試しください。
      </p>
      {error.digest && <p className="mt-2 text-xs text-gray-600">エラーコード: {error.digest}</p>}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark"
        >
          再読み込み
        </button>
        <Link
          href="/"
          className="rounded-full border border-yahari-navy px-6 py-3 text-sm font-semibold text-yahari-navy hover:bg-yahari-sky-light"
        >
          ホームへ戻る
        </Link>
      </div>
    </section>
  );
}
