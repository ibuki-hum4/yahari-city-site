"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // スクロールはCompositorスレッドを塞がないようrAFで間引く。
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setVisible(window.scrollY > 600);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // 表示・非表示のアニメーションはCSSのtransitionで行う。ルートレイアウトから読み込まれる
  // 数少ないコンポーネントのため、ここでmotionを使うと全ページの初期バンドルに載ってしまう。
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="ページの先頭へ戻る"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        buttonVariants({ size: "icon-lg" }),
        "fixed bottom-24 right-6 z-40 rounded-full shadow-lg",
        "transition-[opacity,transform] duration-150 ease-out active:scale-90 motion-reduce:transition-none",
        visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      )}
    >
      <ArrowUp />
    </button>
  );
}
