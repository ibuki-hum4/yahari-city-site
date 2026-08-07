"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { submitFeedback } from "@/app/[locale]/contact/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
          <Button type="button" variant="outline" size="lg" onClick={handleRestart} className="rounded-full">
            もう一件送る
          </Button>
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
            <Alert variant="destructive" role="alert">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="category" className="text-sm font-semibold text-foreground">
              種別
            </Label>
            <Select value={values.category} onValueChange={(value) => handleChange("category", value)}>
              <SelectTrigger id="category" className="mt-1 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="nickname" className="text-sm font-semibold text-foreground">
              ニックネーム(任意)
            </Label>
            <Input
              id="nickname"
              type="text"
              maxLength={30}
              placeholder="例: やーはり"
              value={values.nickname}
              onChange={(event) => handleChange("nickname", event.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-semibold text-foreground">
              ご意見・ご感想
              <span className="ml-1 text-destructive">*</span>
            </Label>
            <Textarea
              id="message"
              required
              maxLength={1000}
              rows={5}
              placeholder="サイトへのご意見、不具合の報告などをお書きください。"
              value={values.message}
              onChange={(event) => handleChange("message", event.target.value)}
              className="mt-1"
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

          <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto">
            送信する
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
