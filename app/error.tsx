"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
      <Alert variant="destructive" className="mt-6 text-left">
        <AlertTitle>予期しないエラーが発生しました</AlertTitle>
        <AlertDescription>
          申し訳ございません。処理中に予期しないエラーが発生しました。お手数ですが、しばらく経ってから再度お試しください。
          {error.digest && <p className="mt-2 text-xs">エラーコード: {error.digest}</p>}
        </AlertDescription>
      </Alert>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          type="button"
          size="lg"
          onClick={reset}
          className="rounded-full bg-yahari-navy px-6 py-3 hover:bg-yahari-navy-dark"
        >
          再読み込み
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full border-yahari-navy px-6 py-3 text-yahari-navy hover:bg-yahari-sky-light"
        >
          <Link href="/">ホームへ戻る</Link>
        </Button>
      </div>
    </section>
  );
}
