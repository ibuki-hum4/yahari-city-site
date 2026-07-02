"use server";

import { revalidatePath } from "next/cache";
import { isAdminSecretValid } from "@/lib/admin";
import type { CommentTargetType } from "@/lib/comments";
import { moderateText } from "@/lib/moderation";
import { prisma } from "@/lib/prisma";

export interface PostCommentInput {
  targetType: CommentTargetType;
  targetSlug: string;
  nickname: string;
  body: string;
  renderedAt: number;
  website: string;
  turnstileToken: string;
}

export interface CommentActionResult {
  ok: boolean;
  error?: string;
}

const MIN_ELAPSED_MS = 3000;

function targetPath(targetType: CommentTargetType, targetSlug: string): string {
  return targetType === "news" ? `/news/${targetSlug}` : `/column/${targetSlug}`;
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;
  if (!token) return false;

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function postComment(input: PostCommentInput): Promise<CommentActionResult> {
  // honeypotに入力がある、または表示直後の送信はボットとみなし、成功したように見せて無視する
  if (input.website.trim() !== "") {
    return { ok: true };
  }
  if (!Number.isFinite(input.renderedAt) || Date.now() - input.renderedAt < MIN_ELAPSED_MS) {
    return { ok: true };
  }

  const nickname = input.nickname.trim().slice(0, 30);
  const body = input.body.trim();
  if (!body || body.length > 500) {
    return { ok: false, error: "コメントは1〜500文字で入力してください。" };
  }

  const turnstileOk = await verifyTurnstile(input.turnstileToken);
  if (!turnstileOk) {
    return { ok: false, error: "認証に失敗しました。ページを再読み込みしてもう一度お試しください。" };
  }

  const moderation = await moderateText(`ニックネーム: ${nickname || "匿名"}\n内容: ${body}`);
  if (moderation.status === "unavailable") {
    return { ok: false, error: "現在この機能は準備中です。しばらくお待ちください。" };
  }
  if (moderation.status === "flagged") {
    return {
      ok: false,
      error: "暴言・差別的な表現が含まれている可能性があるため送信できませんでした。表現を見直してご記入ください。",
    };
  }

  try {
    await prisma.comment.create({
      data: {
        targetType: input.targetType,
        targetSlug: input.targetSlug,
        nickname: nickname || "匿名",
        body,
      },
    });
  } catch {
    return { ok: false, error: "送信に失敗しました。時間を置いて再度お試しください。" };
  }

  revalidatePath(targetPath(input.targetType, input.targetSlug));
  return { ok: true };
}

export async function deleteComment(
  id: number,
  targetType: CommentTargetType,
  targetSlug: string,
  adminSecret: string
): Promise<CommentActionResult> {
  if (!isAdminSecretValid(adminSecret)) {
    return { ok: false, error: "管理パスワードが正しくありません。" };
  }

  try {
    await prisma.comment.delete({ where: { id } });
  } catch {
    return { ok: false, error: "削除に失敗しました。時間を置いて再度お試しください。" };
  }

  revalidatePath(targetPath(targetType, targetSlug));
  return { ok: true };
}
