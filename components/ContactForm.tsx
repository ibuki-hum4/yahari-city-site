"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { submitFeedback } from "@/app/contact/actions";

type Stage = "form" | "submitting" | "done";

const CATEGORY_OPTIONS = ["ご意見・ご感想", "不具合の報告", "その他"];

export default function ContactForm() {
  const [stage, setStage] = useState<Stage>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({ category: CATEGORY_OPTIONS[0], nickname: "", message: "", website: "" });
  const [renderedAt] = useState(() => Date.now());

  const handleChange = (name: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setStage("submitting");

    const result = await submitFeedback({ ...values, renderedAt });
    if (result.ok) {
      setStage("done");
    } else {
      setErrorMessage(result.error ?? "送信に失敗しました。");
      setStage("form");
    }
  };

  const handleRestart = () => {
    setValues({ category: CATEGORY_OPTIONS[0], nickname: "", message: "", website: "" });
    setStage("form");
  };

  return (
    <AnimatePresence mode="wait">
      {stage === "submitting" && (
        <motion.div
          key="submitting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-4 py-16 text-center"
          aria-live="polite"
        >
          <div
            className="h-10 w-10 animate-spin rounded-full border-4 border-yahari-sky-light border-t-yahari-navy"
            role="status"
          />
          <p className="text-sm text-gray-600">送信しています…</p>
        </motion.div>
      )}

      {stage === "done" && (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center gap-4 py-16 text-center"
        >
          <p className="font-semibold text-yahari-navy">送信しました。ご意見ありがとうございます。</p>
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-full border border-yahari-navy px-6 py-3 text-sm font-semibold text-yahari-navy hover:bg-yahari-sky-light"
          >
            もう一件送る
          </button>
        </motion.div>
      )}

      {stage === "form" && (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onSubmit={handleSubmit}
          className="relative space-y-5"
        >
          {errorMessage && (
            <p role="alert" className="rounded bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          )}

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
              種別
            </label>
            <select
              id="category"
              value={values.category}
              onChange={(event) => handleChange("category", event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="nickname" className="block text-sm font-semibold text-gray-700">
              ニックネーム(任意)
            </label>
            <input
              id="nickname"
              type="text"
              maxLength={30}
              placeholder="例: やーはり"
              value={values.nickname}
              onChange={(event) => handleChange("nickname", event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              ご意見・ご感想
              <span className="ml-1 text-red-600">*</span>
            </label>
            <textarea
              id="message"
              required
              maxLength={1000}
              rows={5}
              placeholder="サイトへのご意見、不具合の報告などをお書きください。"
              value={values.message}
              onChange={(event) => handleChange("message", event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            />
          </div>

          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor="website">website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => handleChange("website", event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark sm:w-auto"
          >
            送信する
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
