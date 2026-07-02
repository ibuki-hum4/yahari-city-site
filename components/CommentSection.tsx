"use client";

import { useState } from "react";
import { deleteComment, postComment } from "@/app/comments/actions";
import TurnstileWidget from "@/components/TurnstileWidget";
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

    if (result.ok) {
      setBody("");
      // Turnstileトークンは一度検証されると再利用できないため、ウィジェットごと作り直す
      setTurnstileToken("");
      setWidgetKey((key) => key + 1);
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
    <div className="mt-12 border-t border-gray-100 pt-8">
      <h2 className="text-lg font-bold text-yahari-navy">コメント({comments.length}件)</h2>

      <ul className="mt-4 space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="rounded border border-gray-100 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-yahari-navy">{comment.nickname}</span>
              <div className="flex items-center gap-2">
                <time className="text-xs text-gray-500">{comment.createdAt}</time>
                <button
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                  className="text-xs text-gray-400 hover:text-red-600"
                  aria-label="コメントを削除(管理者用)"
                >
                  削除
                </button>
              </div>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm text-gray-700">{comment.body}</p>
          </li>
        ))}
        {comments.length === 0 && <p className="text-sm text-gray-500">まだコメントはありません。</p>}
      </ul>

      <form onSubmit={handleSubmit} className="relative mt-6 space-y-4">
        {errorMessage && (
          <p role="alert" className="rounded bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <div>
          <label htmlFor="comment-nickname" className="block text-sm font-semibold text-gray-700">
            ニックネーム(任意)
          </label>
          <input
            id="comment-nickname"
            type="text"
            maxLength={30}
            placeholder="例: やーはり"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="comment-body" className="block text-sm font-semibold text-gray-700">
            コメント<span className="ml-1 text-red-600">*</span>
          </label>
          <textarea
            id="comment-body"
            required
            maxLength={500}
            rows={3}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
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

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark disabled:opacity-50"
        >
          {submitting ? "送信中…" : "送信する"}
        </button>
      </form>
    </div>
  );
}
