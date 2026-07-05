"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteGroup, updateGroup } from "@/app/groups/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      <Card className="border border-yahari-navy">
        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">登録番号 {group.registrationNumber}</p>
            <div>
              <Label htmlFor={`name-${group.id}`} className="sr-only">
                団体名
              </Label>
              <Input
                id={`name-${group.id}`}
                value={values.name}
                onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                required
                maxLength={50}
                className="font-bold text-yahari-navy"
              />
            </div>
            <div>
              <Label htmlFor={`activity-${group.id}`} className="sr-only">
                活動内容
              </Label>
              <Textarea
                id={`activity-${group.id}`}
                value={values.activity}
                onChange={(event) => setValues((prev) => ({ ...prev, activity: event.target.value }))}
                required
                maxLength={500}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor={`representative-${group.id}`} className="sr-only">
                代表者名
              </Label>
              <Input
                id={`representative-${group.id}`}
                value={values.representative}
                onChange={(event) => setValues((prev) => ({ ...prev, representative: event.target.value }))}
                required
                maxLength={30}
                placeholder="代表者名"
                className="text-xs"
              />
            </div>
            <div>
              <Label htmlFor={`secret-${group.id}`} className="sr-only">
                管理パスワード
              </Label>
              <Input
                id={`secret-${group.id}`}
                type="password"
                value={adminSecret}
                onChange={(event) => setAdminSecret(event.target.value)}
                required
                placeholder="管理パスワード"
                className="text-xs"
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <div className="flex gap-2 pt-1">
              <Button type="submit" disabled={busy} size="sm" className="rounded-full">
                保存
              </Button>
              <Button type="button" variant="outline" onClick={resetToView} size="sm" className="rounded-full">
                キャンセル
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <p className="text-xs font-semibold text-muted-foreground">登録番号 {group.registrationNumber}</p>
        <h2 className="mt-1 font-bold text-yahari-navy">{group.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{group.activity}</p>
        <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
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
          <div className="mt-3 rounded border border-destructive/30 bg-destructive/5 p-3">
            <p className="text-xs text-destructive">本当に削除しますか? 管理パスワードを入力してください。</p>
            <Label htmlFor={`delete-secret-${group.id}`} className="sr-only">
              管理パスワード
            </Label>
            <Input
              id={`delete-secret-${group.id}`}
              type="password"
              value={adminSecret}
              onChange={(event) => setAdminSecret(event.target.value)}
              placeholder="管理パスワード"
              className="mt-2 text-xs"
            />
            {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
            <div className="mt-2 flex gap-2">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={busy}
                size="sm"
                className="rounded-full"
              >
                削除を確定
              </Button>
              <Button type="button" variant="outline" onClick={resetToView} size="sm" className="rounded-full">
                キャンセル
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex gap-3 text-xs">
            <button type="button" onClick={() => setMode("edit")} className="font-semibold text-yahari-navy hover:underline">
              編集
            </button>
            <button type="button" onClick={() => setMode("delete")} className="font-semibold text-destructive hover:underline">
              削除
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
