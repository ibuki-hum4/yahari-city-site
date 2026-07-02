import { prisma } from "@/lib/prisma";

export type CommentTargetType = "news" | "column";

export interface CommentItem {
  id: number;
  nickname: string;
  body: string;
  createdAt: string;
}

export async function getComments(targetType: CommentTargetType, targetSlug: string): Promise<CommentItem[]> {
  const comments = await prisma.comment.findMany({
    where: { targetType, targetSlug },
    orderBy: { createdAt: "asc" },
  });
  return comments.map((comment) => ({
    id: comment.id,
    nickname: comment.nickname,
    body: comment.body,
    createdAt: comment.createdAt.toLocaleString("ja-JP"),
  }));
}
