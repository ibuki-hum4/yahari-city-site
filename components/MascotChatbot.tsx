"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { DEPARTMENTS } from "@/lib/content";

// ルートレイアウトから全ページに読み込まれるコンポーネント。チャットUI本体(motion・Card・Input)は
// 初期バンドルに載せず、はじめて開いたときにだけ取得する。
const MascotChatPanel = dynamic(() => import("@/components/MascotChatPanel"));

export interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const GREETING: ChatMessage = {
  role: "bot",
  text: "こんにちは!矢張市総合窓口AIです。なんでもご相談ください(たぶん解決しません)。",
};

function getBotReply(input: string): string {
  const hour = new Date().getHours();
  if (hour >= 20 || hour < 8) {
    return "本日の業務は終了しました。明日8時以降にまたお越しください。";
  }
  if (/腹|すいた|ハングリー|hungry/i.test(input)) {
    return "それでしたら、矢張市役所地下食堂の定食(サバ味噌)がおすすめです。本日も大変好評をいただいております。";
  }
  const department = DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)];
  return `それは${department.name}の管轄です。お手数ですが、担当部署までお問い合わせください。`;
}

export default function MascotChatbot() {
  const [open, setOpen] = useState(false);
  // 一度開いたらマウントしたままにして、閉じるアニメーションと会話履歴を保持する。
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    const reply = getBotReply(text);
    setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  const toggle = () => {
    setHasOpened(true);
    setOpen((o) => !o);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {hasOpened && (
        <MascotChatPanel
          open={open}
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          onClose={() => setOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "チャットを閉じる" : "総合窓口AIチャットボットを開く"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-yahari-navy text-2xl shadow-lg transition-transform duration-100 hover:bg-yahari-navy-dark active:scale-90 motion-reduce:transition-none"
      >
        🐱
      </button>
    </div>
  );
}
