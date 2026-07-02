"use server";

import { revalidatePath } from "next/cache";
import { isAdminSecretValid } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export interface AdminActionResult {
  ok: boolean;
  error?: string;
}

export interface GroupUpdateInput {
  name: string;
  representative: string;
  activity: string;
}

export async function deleteGroup(id: number, adminSecret: string): Promise<AdminActionResult> {
  if (!isAdminSecretValid(adminSecret)) {
    return { ok: false, error: "管理パスワードが正しくありません。" };
  }

  try {
    await prisma.citizenGroup.delete({ where: { id } });
  } catch {
    return { ok: false, error: "削除に失敗しました。時間を置いて再度お試しください。" };
  }

  revalidatePath("/groups");
  return { ok: true };
}

export async function updateGroup(
  id: number,
  adminSecret: string,
  input: GroupUpdateInput,
): Promise<AdminActionResult> {
  if (!isAdminSecretValid(adminSecret)) {
    return { ok: false, error: "管理パスワードが正しくありません。" };
  }

  const name = input.name.trim();
  const representative = input.representative.trim();
  const activity = input.activity.trim();

  if (!name || !representative || !activity) {
    return { ok: false, error: "団体名・代表者名・活動内容をすべて入力してください。" };
  }
  if (name.length > 50 || representative.length > 30 || activity.length > 500) {
    return { ok: false, error: "入力内容が長すぎます。団体名は50文字、代表者名は30文字、活動内容は500文字以内でご入力ください。" };
  }

  try {
    await prisma.citizenGroup.update({ where: { id }, data: { name, representative, activity } });
  } catch {
    return { ok: false, error: "更新に失敗しました。時間を置いて再度お試しください。" };
  }

  revalidatePath("/groups");
  return { ok: true };
}
