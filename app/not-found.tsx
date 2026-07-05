import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card className="mt-6 shadow-none">
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            URLが変更されたか、削除された可能性があります。担当部署に問い合わせましたが、「存在しないページについては関知しません」との回答でした。
          </p>
        </CardContent>
      </Card>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-yahari-navy px-6 py-3 hover:bg-yahari-navy-dark"
        >
          <Link href="/">ホームへ戻る</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="rounded-full border-yahari-navy px-6 py-3 text-yahari-navy hover:bg-yahari-sky-light"
        >
          <Link href="/sitemap">サイトマップを見る</Link>
        </Button>
      </div>
    </section>
  );
}
