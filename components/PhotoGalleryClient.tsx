"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PHOTO_ALBUMS, type Photo } from "@/lib/photos";

const ALL = "すべて";

export default function PhotoGalleryClient({ photos }: { photos: Photo[] }) {
  const [album, setAlbum] = useState<string>(ALL);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = album === ALL ? photos : photos.filter((photo) => photo.album === album);
  const selected = selectedIndex !== null ? filtered[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex((i) => (i === null ? i : (i + 1) % filtered.length));
      if (event.key === "ArrowLeft") setSelectedIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, filtered.length]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {[ALL, ...PHOTO_ALBUMS].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              setAlbum(name);
              setSelectedIndex(null);
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
              album === name
                ? "bg-yahari-navy text-white"
                : "bg-white text-yahari-navy hover:bg-yahari-sky-light"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {filtered.map((photo, index) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="overflow-hidden rounded-lg bg-gray-50 text-left"
          >
            <div className="relative aspect-video">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 640px) 440px, 100vw" className="object-contain" />
            </div>
            <p className="px-4 py-3 text-center text-sm text-gray-600">
              {photo.caption}
              {photo.relatedHref && (
                <>
                  <br />
                  <Link href={photo.relatedHref} className="font-medium text-yahari-navy hover:underline">
                    → {photo.relatedLabel}
                  </Link>
                </>
              )}
            </p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              type="button"
              aria-label="閉じる"
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 text-3xl text-white/80 hover:text-white"
            >
              ×
            </button>
            <div className="relative h-[70vh] w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
              <Image src={selected.src} alt={selected.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-white/90">
              {selected.caption}
            </p>
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="前の写真"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-3xl text-white/80 hover:text-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="次の写真"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedIndex((i) => (i === null ? i : (i + 1) % filtered.length));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl text-white/80 hover:text-white"
                >
                  ›
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
