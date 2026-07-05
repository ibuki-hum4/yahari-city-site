"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CarouselSlide {
  src: string;
  alt: string;
  href: string;
  external?: boolean;
}

export default function Carousel({ slides }: { slides: CarouselSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    if (paused || hovered) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length, index, paused, hovered]);

  const goTo = (next: number) => {
    setIndex((next + slides.length) % slides.length);
  };

  const slide = slides[index];
  const image = (
    <Image
      src={slide.src}
      alt={slide.alt}
      fill
      sizes="(min-width: 1024px) 896px, 100vw"
      className="object-cover"
      priority={index === 0}
    />
  );

  return (
    <MotionConfig reducedMotion="user">
      <div>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="おすすめ情報"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="relative mx-auto aspect-[1280/670] w-full max-w-4xl overflow-hidden rounded-lg shadow-md"
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={slide.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {slide.external ? (
                <a href={slide.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                  {image}
                </a>
              ) : (
                <Link href={slide.href} className="absolute inset-0">
                  {image}
                </Link>
              )}
            </motion.div>
          </AnimatePresence>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => goTo(index - 1)}
            aria-label="前のスライド"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-white"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => goTo(index + 1)}
            aria-label="次のスライド"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-white"
          >
            <ChevronRight />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "自動再生を開始" : "自動再生を一時停止"}
            className="absolute bottom-3 right-3 z-10 rounded-full bg-black/40 text-white hover:bg-black/60 hover:text-white"
          >
            {paused ? <Play className="fill-current" /> : <Pause className="fill-current" />}
          </Button>
        </div>

        <div className="mx-auto mt-4 flex max-w-4xl justify-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`スライド${i + 1}: ${s.alt}`}
              aria-current={i === index}
              className={cn(
                "relative h-14 w-24 shrink-0 overflow-hidden rounded border-2 transition",
                i === index ? "border-yahari-navy" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image src={s.src} alt={s.alt} fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}
