"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DEPARTMENTS } from "@/lib/content";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3"
          >
            <Card className="h-96 w-80 gap-0 py-0">
              <div className="flex items-center justify-between rounded-t-xl bg-yahari-navy px-4 py-3 text-white">
                <span className="text-sm font-bold">矢張市総合窓口AI</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setOpen(false)}
                  aria-label="チャットを閉じる"
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <X />
                </Button>
              </div>
              <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-3">
                {messages.map((message, index) => (
                  <motion.div
                    key={`${message.role}-${index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <p
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                        message.role === "user" ? "bg-yahari-navy text-white" : "bg-yahari-sky-light text-foreground"
                      }`}
                    >
                      {message.text}
                    </p>
                  </motion.div>
                ))}
              </div>
              <form onSubmit={handleSend} className="flex gap-2 border-t p-2">
                <label htmlFor="mascot-chat-input" className="sr-only">
                  チャット入力
                </label>
                <Input
                  id="mascot-chat-input"
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="なんでもご相談ください"
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  送信
                </Button>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "チャットを閉じる" : "総合窓口AIチャットボットを開く"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-yahari-navy text-2xl shadow-lg hover:bg-yahari-navy-dark"
      >
        🐱
      </motion.button>
    </div>
  );
}
