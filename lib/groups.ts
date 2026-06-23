import { prisma } from "@/lib/prisma";

export interface CitizenGroup {
  registrationNumber: string;
  name: string;
  representative: string;
  activity: string;
  registeredDate: string;
}

// 市民活動団体登録条例(矢張市条例第5号)に基づき登録された団体の一覧をDBから取得する。
// 新規登録は「市民活動団体登録申請」(/applications/group-registration)から行われる。
export async function getAllGroups(): Promise<CitizenGroup[]> {
  const groups = await prisma.citizenGroup.findMany({ orderBy: { id: "asc" } });
  return groups.map((group) => ({
    registrationNumber: group.registrationNumber,
    name: group.name,
    representative: group.representative,
    activity: group.activity,
    registeredDate: group.registeredAt.toLocaleDateString("ja-JP"),
  }));
}

export async function getNextRegistrationNumber(): Promise<string> {
  const count = await prisma.citizenGroup.count();
  return `第${count + 1}号`;
}
