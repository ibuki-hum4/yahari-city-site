"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteComment, postComment } from "@/app/comments/actions";
import TurnstileWidget from "@/components/TurnstileWidget";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { CommentItem, CommentTargetType } from "@/lib/comments";

export default function CommentSection({
  targetType,
  targetSlug,
  initialComments,
}: {
  targetType: CommentTargetType;
  targetSlug: string;
  initialComments: CommentItem[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [nickname, setNickname] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [widgetKey, setWidgetKey] = useState(0);
  const [renderedAt] = useState(() => Date.now());
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // クライアント遷移で同じ位置のCommentSectionが再利用された場合に備え、
  // targetSlugの変化をレンダー中に検知してcommentsを最新のinitialCommentsへ揃える
  const [prevSlug, setPrevSlug] = useState(targetSlug);
  if (targetSlug !== prevSlug) {
    setPrevSlug(targetSlug);
    setComments(initialComments);
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setSubmitting(true);

    const result = await postComment({
      targetType,
      targetSlug,
      nickname,
      body,
      renderedAt,
      website,
      turnstileToken,
    });

    // Turnstileトークンは検証に使われた時点で成功・失敗を問わず再利用できなくなるため、
    // 送信結果によらず毎回ウィジェットごと作り直す(失敗時に同じトークンで再送すると
    // 「認証に失敗しました」になり続けてしまう)
    setTurnstileToken("");
    setWidgetKey((key) => key + 1);

    if (result.ok) {
      setBody("");
      // DBへは即時反映されるが、Server Componentの再取得を待たずに一覧を更新するため
      // 楽観的にプレースホルダーを差し込む(次回ページ遷移時にrevalidatePathの内容へ揃う)
      setComments((prev) => [
        ...prev,
        { id: -Date.now(), nickname: nickname.trim() || "匿名", body, createdAt: "たった今" },
      ]);
    } else {
      setErrorMessage(result.error ?? "送信に失敗しました。");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id: number) => {
    if (id < 0) return;
    const secret = window.prompt("管理パスワードを入力してください");
    if (secret === null) return;
    const result = await deleteComment(id, targetType, targetSlug, secret);
    if (result.ok) {
      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } else {
      window.alert(result.error ?? "削除に失敗しました。");
    }
  };

  return (
    <div className="mt-12 pt-8">
      <Separator className="mb-8" />
      <h2 className="text-lg font-bold text-yahari-navy">コメント({comments.length}件)</h2>

      <ul className="mt-4 space-y-4">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Card size="sm" className="bg-muted/50 shadow-none">
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-yahari-navy">{comment.nickname}</span>
                  <div className="flex items-center gap-2">
                    <time className="text-xs text-muted-foreground">{comment.createdAt}</time>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(comment.id)}
                      className="text-muted-foreground hover:text-destructive"
                      aria-label="コメントを削除(管理者用)"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">{comment.body}</p>
              </CardContent>
            </Card>
          </li>
        ))}
        {comments.length === 0 && <p className="text-sm text-muted-foreground">まだコメントはありません。</p>}
      </ul>

      <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
        {errorMessage && (
          <Alert variant="destructive" role="alert">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="comment-nickname">ニックネーム(任意)</Label>
          <Input
            id="comment-nickname"
            type="text"
            maxLength={30}
            placeholder="例: やーはり"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="comment-body">
            コメント<span className="ml-1 text-destructive">*</span>
          </Label>
          <Textarea
            id="comment-body"
            required
            maxLength={500}
            rows={3}
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
        </div>

        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="comment-website">website</label>
          <input
            id="comment-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <TurnstileWidget key={widgetKey} onToken={setTurnstileToken} />

        <Button
          type="submit"
          disabled={submitting}
          className="rounded-full px-6"
        >
          {submitting ? "送信中…" : "送信する"}
        </Button>
      </form>
    </div>
  );
}
