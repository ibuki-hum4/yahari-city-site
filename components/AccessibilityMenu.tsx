"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CONTRAST_KEY = "yahari-high-contrast";

export default function AccessibilityMenu() {
  const t = useTranslations("Accessibility");
  const [highContrast, setHighContrast] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    // 初回マウント時にlocalStorageの保存値をUIへ反映する(SSR時は読めないため effect 内で行う)
    const saved = localStorage.getItem(CONTRAST_KEY) === "1";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHighContrast(saved);
    document.documentElement.classList.toggle("high-contrast", saved);
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggleContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    document.documentElement.classList.toggle("high-contrast", next);
    localStorage.setItem(CONTRAST_KEY, next ? "1" : "0");
  };

  const toggleSpeech = () => {
    if (!("speechSynthesis" in window)) return;

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const main = document.getElementById("main-content");
    if (!main) return;

    const utterance = new SpeechSynthesisUtterance(main.innerText);
    utterance.lang = "ja-JP";
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/20">
        {t("menuLabel")}
        <ChevronDown className="size-3" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 text-foreground">
        <DropdownMenuItem onSelect={(event) => { event.preventDefault(); toggleSpeech(); }}>
          <span className="flex w-full items-center justify-between">
            <span>{t("readAloud")}</span>
            <span className="text-xs font-semibold text-yahari-navy">
              {speaking ? t("readAloudStop") : t("readAloudStart")}
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(event) => { event.preventDefault(); toggleContrast(); }}>
          <span className="flex w-full items-center justify-between">
            <span>{t("highContrast")}</span>
            <span className="text-xs font-semibold text-yahari-navy">{highContrast ? "ON" : "OFF"}</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
          <LocaleSwitcher />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
