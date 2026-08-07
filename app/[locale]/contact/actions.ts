"use server";

import { SITE } from "@/lib/content";
import { moderateText } from "@/lib/moderation";

export interface FeedbackInput {
  category: string;
  nickname: string;
  message: string;
  renderedAt: number;
  website: string;
}

export interface SubmitFeedbackResult {
  ok: boolean;
  error?: string;
}

const MIN_ELAPSED_MS = 3000;

export async function submitFeedback(input: FeedbackInput): Promise<SubmitFeedbackResult> {
  // honeypotに入力がある、または表示直後の送信はボットとみなし、成功したように見せて無視する
  if (input.website.trim() !== "") {
    return { ok: true };
  }
  if (!Number.isFinite(input.renderedAt) || Date.now() - input.renderedAt < MIN_ELAPSED_MS) {
    return { ok: true };
  }

  const message = input.message.trim();
  if (!message || message.length > 1000) {
    return { ok: false, error: "ご意見の内容を1〜1000文字で入力してください。" };
  }
  const nickname = input.nickname.trim().slice(0, 30);

  const moderation = await moderateText(`ニックネーム: ${nickname || "匿名"}\n内容: ${message}`);
  if (moderation.status === "unavailable") {
    return { ok: false, error: "現在この機能は準備中です。しばらくお待ちください。" };
  }
  if (moderation.status === "flagged") {
    return {
      ok: false,
      error: "暴言・差別的な表現が含まれている可能性があるため送信できませんでした。表現を見直してご記入ください。",
    };
  }

  const webhookUrl = process.env.DISCORD_FEEDBACK_WEBHOOK_URL;
  if (!webhookUrl) {
    return { ok: false, error: "現在この機能は準備中です。しばらくお待ちください。" };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: `市民の声: ${input.category}`,
            description: message,
            color: 0x173a5e,
            fields: [{ name: "投稿者", value: nickname || "匿名" }],
            timestamp: new Date().toISOString(),
            footer: { text: `${SITE.name}公式サイト` },
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false, error: "送信に失敗しました。時間を置いて再度お試しください。" };
    }
  } catch {
    return { ok: false, error: "送信に失敗しました。時間を置いて再度お試しください。" };
  }

  return { ok: true };
}
