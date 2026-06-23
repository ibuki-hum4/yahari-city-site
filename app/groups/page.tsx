import type { Metadata } from "next";
import Link from "next/link";
import GroupCard from "@/components/GroupCard";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/content";
import { getAllGroups } from "@/lib/groups";

export const metadata: Metadata = pageMetadata("/groups");

// DBから毎回最新の登録団体一覧を取得するため、静的にプリレンダリングしない
export const dynamic = "force-dynamic";

export default async function GroupsPage() {
  let groups: Awaited<ReturnType<typeof getAllGroups>> = [];
  let dbError = false;
  try {
    groups = await getAllGroups();
  } catch {
    dbError = true;
  }

  return (
    <>
      <PageHeader
        title="市民活動団体登録"
        path="/groups"
        lead="矢張市民活動団体登録条例に基づき登録された団体の一覧です。新たに団体を登録したい場合は申請フォームをご利用ください。"
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        {dbError && (
          <p className="rounded bg-amber-50 px-4 py-3 text-sm text-amber-700">
            現在、団体情報を取得できません。しばらくお待ちください。
          </p>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-yahari-sky-light p-6 text-center">
          <p className="text-sm text-gray-700">矢張市内で活動する団体を、新たに登録することができます。</p>
          <Link
            href="/applications/group-registration"
            className="mt-4 inline-block rounded-full bg-yahari-navy px-8 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark"
          >
            団体を登録申請する
          </Link>
        </div>

        <p className="mt-8 text-xs text-gray-600">
          ※ 掲載している団体は遊戯目的のサンプルです。根拠条例は
          <Link href="/ordinances/citizen-group-registration" className="font-medium text-yahari-navy hover:underline">
            矢張市民活動団体登録条例
          </Link>
          をご覧ください。
        </p>
      </section>
    </>
  );
}
