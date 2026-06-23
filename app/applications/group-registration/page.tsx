import type { Metadata } from "next";
import GroupRegistrationForm from "@/components/GroupRegistrationForm";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/content";

export const metadata: Metadata = pageMetadata("/applications/group-registration");

export default function GroupRegistrationPage() {
  return (
    <>
      <PageHeader
        title="市民活動団体登録申請"
        path="/applications/group-registration"
        lead="矢張市内で活動する団体の登録はこちらから申請してください。登録された団体は市民活動団体一覧に掲載されます。"
        parent={{ label: "申請窓口", href: "/applications" }}
      />
      <section className="mx-auto max-w-2xl px-4 py-12">
        <GroupRegistrationForm />
      </section>
    </>
  );
}
