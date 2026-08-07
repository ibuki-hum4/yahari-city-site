"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { getNextRegistrationNumber } from "@/lib/groups";
import { prisma } from "@/lib/prisma";

export interface GroupRegistrationInput {
  name: string;
  representative: string;
  activity: string;
}

export interface GroupRegistrationResult {
  ok: boolean;
  error?: string;
  registrationNumber?: string;
}

const MAX_ATTEMPTS = 3;

export async function registerGroup(input: GroupRegistrationInput): Promise<GroupRegistrationResult> {
  const name = input.name.trim();
  const representative = input.representative.trim();
  const activity = input.activity.trim();

  if (!name || !representative || !activity) {
    return { ok: false, error: "団体名・代表者名・活動内容をすべて入力してください。" };
  }
  if (name.length > 50 || representative.length > 30 || activity.length > 500) {
    return { ok: false, error: "入力内容が長すぎます。団体名は50文字、代表者名は30文字、活動内容は500文字以内でご入力ください。" };
  }

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const registrationNumber = await getNextRegistrationNumber();
      await prisma.citizenGroup.create({ data: { name, representative, activity, registrationNumber } });
      return { ok: true, registrationNumber };
    } catch (error) {
      // 登録番号の重複(同時登録によるレースコンディション)の場合のみ番号を振り直して再試行する
      const isDuplicateNumber = error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
      if (!isDuplicateNumber) {
        return { ok: false, error: "登録に失敗しました。時間を置いて再度お試しください。" };
      }
    }
  }

  return { ok: false, error: "登録に失敗しました。時間を置いて再度お試しください。" };
}
