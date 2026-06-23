"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteGroup, updateGroup } from "@/app/groups/actions";
import type { CitizenGroup } from "@/lib/groups";

type Mode = "view" | "edit" | "delete";

export default function GroupCard({ group }: { group: CitizenGroup }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("view");
  const [adminSecret, setAdminSecret] = useState("");
  const [values, setValues] = useState({
    name: group.name,
    representative: group.representative,
    activity: group.activity,
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const resetToView = () => {
    setMode("view");
    setAdminSecret("");
    setError("");
    setValues({ name: group.name, representative: group.representative, activity: group.activity });
  };

  const handleDelete = async () => {
    setBusy(true);
    setError("");
    const result = await deleteGroup(group.id, adminSecret);
    setBusy(false);
    if (result.ok) {
      router.refresh();
    } else {
      setError(result.error ?? "削除に失敗しました。");
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    const result = await updateGroup(group.id, adminSecret, values);
    setBusy(false);
    if (result.ok) {
      router.refresh();
      resetToView();
    } else {
      setError(result.error ?? "更新に失敗しました。");
    }
  };

  if (mode === "edit") {
    return (
      <form
        onSubmit={handleUpdate}
        className="rounded-lg border border-yahari-navy bg-white p-5 shadow-sm"
      >
        <p className="text-xs font-semibold text-gray-500">登録番号 {group.registrationNumber}</p>
        <input
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          required
          maxLength={50}
          className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-sm font-bold text-yahari-navy"
        />
        <textarea
          value={values.activity}
          onChange={(event) => setValues((prev) => ({ ...prev, activity: event.target.value }))}
          required
          maxLength={500}
          rows={3}
          className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <input
          value={values.representative}
          onChange={(event) => setValues((prev) => ({ ...prev, representative: event.target.value }))}
          required
          maxLength={30}
          placeholder="代表者名"
          className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-xs"
        />
        <input
          type="password"
          value={adminSecret}
          onChange={(event) => setAdminSecret(event.target.value)}
          required
          placeholder="管理パスワード"
          className="mt-3 w-full rounded border border-gray-300 px-2 py-1 text-xs"
        />
        {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
        <div className="mt-3 flex gap-2">
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-yahari-navy px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
          >
            保存
          </button>
          <button
            type="button"
            onClick={resetToView}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700"
          >
            キャンセル
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold text-gray-500">登録番号 {group.registrationNumber}</p>
      <h2 className="mt-1 font-bold text-yahari-navy">{group.name}</h2>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{group.activity}</p>
      <dl className="mt-3 space-y-1 text-xs text-gray-500">
        <div className="flex gap-2">
          <dt className="font-semibold">代表者</dt>
          <dd>{group.representative}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-semibold">登録日</dt>
          <dd>{group.registeredDate}</dd>
        </div>
      </dl>

      {mode === "delete" ? (
        <div className="mt-3 rounded border border-red-200 bg-red-50 p-3">
          <p className="text-xs text-red-700">本当に削除しますか? 管理パスワードを入力してください。</p>
          <input
            type="password"
            value={adminSecret}
            onChange={(event) => setAdminSecret(event.target.value)}
            placeholder="管理パスワード"
            className="mt-2 w-full rounded border border-gray-300 px-2 py-1 text-xs"
          />
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={handleDelete}
              disabled={busy}
              className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
            >
              削除を確定
            </button>
            <button
              type="button"
              onClick={resetToView}
              className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-700"
            >
              キャンセル
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex gap-3 text-xs">
          <button type="button" onClick={() => setMode("edit")} className="font-semibold text-yahari-navy hover:underline">
            編集
          </button>
          <button type="button" onClick={() => setMode("delete")} className="font-semibold text-red-600 hover:underline">
            削除
          </button>
        </div>
      )}
    </div>
  );
}
