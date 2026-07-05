"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { registerGroup } from "@/app/applications/group-registration/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Stage = "form" | "submitting" | "done";

export default function GroupRegistrationForm() {
  const [stage, setStage] = useState<Stage>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [values, setValues] = useState({ name: "", representative: "", activity: "" });

  const handleChange = (name: keyof typeof values, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    setStage("submitting");

    const result = await registerGroup(values);
    if (result.ok && result.registrationNumber) {
      setRegistrationNumber(result.registrationNumber);
      setStage("done");
    } else {
      setErrorMessage(result.error ?? "登録に失敗しました。");
      setStage("form");
    }
  };

  const handleRestart = () => {
    setValues({ name: "", representative: "", activity: "" });
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
          <p className="text-sm text-gray-600">登録しています…</p>
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
          <p className="font-semibold text-yahari-navy">登録が完了しました。</p>
          <p className="rounded bg-yahari-sky-light px-4 py-2 font-mono text-base font-bold text-yahari-navy">
            登録番号 {registrationNumber}
          </p>
          <p className="text-sm text-muted-foreground">団体一覧ページに反映されます。</p>
          <Button type="button" variant="outline" onClick={handleRestart} size="lg" className="rounded-full">
            もう一団体登録する
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
          className="space-y-5"
        >
          {errorMessage && (
            <Alert variant="destructive" role="alert">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div>
            <Label htmlFor="name">
              団体名<span className="ml-1 text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              required
              maxLength={50}
              placeholder="例: 春巻き同好会"
              value={values.name}
              onChange={(event) => handleChange("name", event.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="representative">
              代表者名(ニックネーム可)<span className="ml-1 text-destructive">*</span>
            </Label>
            <Input
              id="representative"
              type="text"
              required
              maxLength={30}
              placeholder="例: やーはり"
              value={values.representative}
              onChange={(event) => handleChange("representative", event.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="activity">
              活動内容<span className="ml-1 text-destructive">*</span>
            </Label>
            <Textarea
              id="activity"
              required
              maxLength={500}
              rows={4}
              placeholder="例: 月1回、春巻きを食べながら雑談するVCを開催しています。"
              value={values.activity}
              onChange={(event) => handleChange("activity", event.target.value)}
              className="mt-1"
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto">
            登録申請する
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
