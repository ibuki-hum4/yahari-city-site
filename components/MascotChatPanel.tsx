"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ChatMessage } from "@/components/MascotChatbot";

// チャット本体。motion・Card・Inputに依存するため、開くまで読み込まれないよう
// MascotChatbotから`next/dynamic`で遅延読み込みされる。
export default function MascotChatPanel({
  open,
  messages,
  input,
  onInputChange,
  onSend,
  onClose,
}: {
  open: boolean;
  messages: ChatMessage[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: (event: React.FormEvent) => void;
  onClose: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  return (
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
                onClick={onClose}
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
                      message.role === "user"
                        ? "bg-yahari-navy text-white"
                        : "bg-yahari-sky-light text-foreground"
                    }`}
                  >
                    {message.text}
                  </p>
                </motion.div>
              ))}
            </div>
            <form onSubmit={onSend} className="flex gap-2 border-t p-2">
              <label htmlFor="mascot-chat-input" className="sr-only">
                チャット入力
              </label>
              <Input
                id="mascot-chat-input"
                type="text"
                value={input}
                onChange={(event) => onInputChange(event.target.value)}
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
  );
}
