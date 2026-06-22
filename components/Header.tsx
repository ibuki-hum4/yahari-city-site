"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import SearchForm from "@/components/SearchForm";
import { NAV_LINKS, SITE } from "@/lib/content";

const FONT_SCALE_KEY = "yahari-font-scale";
const FONT_SCALES = [
  { label: "小", value: "87.5%" },
  { label: "中", value: "100%" },
  { label: "大", value: "115%" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem(FONT_SCALE_KEY);
    if (saved) {
      document.documentElement.style.fontSize = saved;
    }
  }, []);

  const setFontScale = (value: string) => {
    // ボタン押下に応じた直接的なDOM操作(ユーザー操作起点のため effect化は不要)
    // eslint-disable-next-line react-hooks/immutability
    document.documentElement.style.fontSize = value;
    localStorage.setItem(FONT_SCALE_KEY, value);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-yahari-navy-dark text-xs text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5">
          <p className="hidden sm:block">{SITE.name}公式サイト</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">文字サイズ</span>
              {FONT_SCALES.map((scale) => (
                <button
                  key={scale.value}
                  type="button"
                  onClick={() => setFontScale(scale.value)}
                  className="rounded px-1.5 py-0.5 hover:bg-white/20"
                  aria-label={`文字サイズ${scale.label}`}
                >
                  {scale.label}
                </button>
              ))}
            </div>
            <AccessibilityMenu />
            <a
              href={SITE.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-yahari-sky px-3 py-1 font-semibold text-yahari-navy-dark hover:bg-white"
            >
              Discordに参加
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={SITE.logo}
            alt={`${SITE.name}章`}
            width={44}
            height={44}
            priority
          />
          <span>
            <span className="block text-xl font-bold tracking-wide text-yahari-navy">
              {SITE.name}
            </span>
            <span className="block text-xs text-gray-600">
              {SITE.englishName} 公式サイト
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <SearchForm className="hidden w-48 lg:flex" />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded p-2 text-yahari-navy hover:bg-yahari-sky-light lg:hidden"
            aria-label="メニューを開く"
            aria-expanded={menuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <nav aria-label="メインナビゲーション" className={`bg-yahari-navy text-white ${menuOpen ? "block" : "hidden"} lg:block`}>
        <div className="px-4 py-3 lg:hidden">
          <SearchForm />
        </div>
        <ul className="mx-auto flex max-w-6xl flex-col lg:flex-row">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="lg:flex-1 lg:text-center">
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block px-4 py-3 text-sm font-medium hover:bg-yahari-navy-dark ${
                    isActive ? "bg-yahari-navy-dark font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
