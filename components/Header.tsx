"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import SearchForm from "@/components/SearchForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-50 border-b bg-background shadow-sm">
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
            <Button
              asChild
              size="xs"
              className="rounded-full bg-yahari-sky text-yahari-navy-dark hover:bg-white"
            >
              <a href={SITE.discordInviteUrl} target="_blank" rel="noopener noreferrer">
                Discordに参加
              </a>
            </Button>
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
            <span className="block text-xs text-muted-foreground">
              {SITE.englishName} 公式サイト
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <SearchForm className="hidden w-48 lg:flex" />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-yahari-navy lg:hidden"
                aria-label="メニューを開く"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-4/5 p-0 sm:max-w-xs">
              <SheetHeader className="border-b">
                <SheetTitle className="flex items-center gap-2 text-yahari-navy">
                  <Image src={SITE.logo} alt="" width={24} height={24} aria-hidden />
                  {SITE.name}メニュー
                </SheetTitle>
              </SheetHeader>
              <div className="px-4 pb-4">
                <SearchForm />
              </div>
              <nav aria-label="メインナビゲーション" className="flex flex-col overflow-y-auto px-2 pb-6">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-muted",
                        isActive && "bg-yahari-sky-light font-bold text-yahari-navy"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <nav aria-label="メインナビゲーション" className="hidden bg-yahari-navy text-white lg:block">
        <ul className="mx-auto flex max-w-6xl flex-wrap justify-center">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block whitespace-nowrap px-3 py-3 text-sm font-medium hover:bg-yahari-navy-dark",
                    isActive && "bg-yahari-navy-dark font-bold"
                  )}
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
