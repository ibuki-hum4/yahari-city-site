"use client";

import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const DEPARTMENTS = [
  "観光課",
  "戸籍課",
  "税務課",
  "道路課",
  "環境課",
  "広報課",
  "防災安全課",
  "教育委員会",
  "市民協働課",
  "上下水道課",
];

function getBotReply(input: string): string {
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 8) {
    return "本日の業務は終了しました(AIなのに退勤)。明日8時以降にまたお越しください。";
  }
  if (/腹|すいた|ハングリー|hungry/i.test(input)) {
    return "それでしたら、矢張市役所地下食堂の定食(サバ味噌)がおすすめです。本日も大変好評をいただいております。";
  }
  const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
  return `それは${department}の管轄です。お手数ですが、担当部署までお問い合わせください。`;
}

export default function MascotChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "こんにちは!矢張市総合窓口AIです。なんでもご相談ください(たぶん解決しません)。" },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    const reply = getBotReply(text);
    setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-gray-200">
          <div className="flex items-center justify-between bg-yahari-navy px-4 py-3 text-white">
            <span className="text-sm font-bold">矢張市総合窓口AI</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="チャットを閉じる"
              className="text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user" ? "bg-yahari-navy text-white" : "bg-yahari-sky-light text-gray-800"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex gap-2 border-t border-gray-100 p-2">
            <label htmlFor="mascot-chat-input" className="sr-only">
              チャット入力
            </label>
            <input
              id="mascot-chat-input"
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="なんでもご相談ください"
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            />
            <button
              type="submit"
              className="rounded bg-yahari-navy px-3 py-2 text-sm font-semibold text-white hover:bg-yahari-navy-dark"
            >
              送信
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "チャットを閉じる" : "総合窓口AIチャットボットを開く"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-yahari-navy text-2xl shadow-lg hover:bg-yahari-navy-dark"
      >
        🐱
      </button>
    </div>
  );
}
