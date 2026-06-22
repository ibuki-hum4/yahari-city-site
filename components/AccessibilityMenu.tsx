"use client";

import { useEffect, useRef, useState } from "react";

const CONTRAST_KEY = "yahari-high-contrast";

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 初回マウント時にlocalStorageの保存値をUIへ反映する(SSR時は読めないため effect 内で行う)
    const saved = localStorage.getItem(CONTRAST_KEY) === "1";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHighContrast(saved);
    document.documentElement.classList.toggle("high-contrast", saved);
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
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

  const openTranslate = () => {
    const url = `https://translate.google.com/translate?sl=ja&tl=en&u=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 rounded px-1.5 py-0.5 hover:bg-white/20"
      >
        アクセシビリティ
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-64 rounded-md bg-white p-2 text-sm text-gray-800 shadow-lg">
          <button
            type="button"
            onClick={toggleSpeech}
            className="flex w-full items-center justify-between rounded px-3 py-2 text-left hover:bg-yahari-sky-light"
          >
            <span>ページの読み上げ</span>
            <span className="text-xs font-semibold text-yahari-navy">{speaking ? "停止" : "開始"}</span>
          </button>
          <button
            type="button"
            onClick={toggleContrast}
            className="mt-1 flex w-full items-center justify-between rounded px-3 py-2 text-left hover:bg-yahari-sky-light"
          >
            <span>高コントラスト表示</span>
            <span className="text-xs font-semibold text-yahari-navy">{highContrast ? "ON" : "OFF"}</span>
          </button>
          <button
            type="button"
            onClick={openTranslate}
            className="mt-1 block w-full rounded px-3 py-2 text-left hover:bg-yahari-sky-light"
          >
            English(Google翻訳)
          </button>
        </div>
      )}
    </div>
  );
}
