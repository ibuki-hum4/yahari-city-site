"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import PrintButton from "@/components/PrintButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ApplicationDef, ApplicationFieldOption } from "@/lib/applications";
import { generateApplicationNumber } from "@/lib/applications";
import { drawCertificate } from "@/lib/certificate";

type Stage = "form" | "processing" | "done";

const PROCESSING_STEPS = ["ただいま書類を精査中…", "ハンコを押しています…", "受理しています…"];

// グループ名が連続する選択肢をまとめる。グループ指定がない選択肢はそのまま並べる。
function groupOptions(options: ApplicationFieldOption[]): { group?: string; options: ApplicationFieldOption[] }[] {
  const chunks: { group?: string; options: ApplicationFieldOption[] }[] = [];
  for (const option of options) {
    const last = chunks[chunks.length - 1];
    if (last && last.group === option.group) {
      last.options.push(option);
    } else {
      chunks.push({ group: option.group, options: [option] });
    }
  }
  return chunks;
}

export default function ApplicationForm({ application }: { application: ApplicationDef }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<Stage>("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [applicationNumber, setApplicationNumber] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStage("processing");

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      setStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 1300));
    }

    setApplicationNumber(generateApplicationNumber());
    setStage("done");
  };

  // AnimatePresence(mode="wait")が処理中画面の退場アニメーションを終えるまで
  // 証明書のcanvasはDOMに挿入されない。requestAnimationFrameでの描画だとその前に
  // 実行されて何も描かれないため、canvas実マウント時に発火するref callbackで描画する。
  const handleCanvasMount = (node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    if (!node || !applicationNumber) return;
    drawCertificate(node, {
      title: application.title,
      applicationNumber,
      issuedAt: new Date().toLocaleDateString("ja-JP"),
      fields: application.fields.map((field) => ({
        label: field.label,
        value: values[field.name] ?? "",
      })),
    });
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `${application.slug}-${applicationNumber}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleRestart = () => {
    setValues({});
    setStage("form");
  };

  return (
    <AnimatePresence mode="wait">
      {stage === "processing" && (
        <motion.div
          key="processing"
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
          <p className="text-lg font-semibold text-yahari-navy">{PROCESSING_STEPS[stepIndex]}</p>
          <p className="text-sm text-gray-600">しばらくお待ちください...</p>
        </motion.div>
      )}

      {stage === "done" && (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col items-center gap-6 py-8 text-center print-area"
        >
          <p className="text-sm text-gray-600">受理されました。申請番号は以下の通りです。</p>
          <p className="break-all rounded bg-yahari-sky-light px-4 py-2 font-mono text-base font-bold text-yahari-navy sm:text-lg">
            {applicationNumber}
          </p>
          <canvas ref={handleCanvasMount} className="w-full max-w-sm rounded-lg border border-gray-200 shadow-md" />
          <div className="flex flex-wrap justify-center gap-4 no-print">
            <Button type="button" onClick={handleDownload} size="lg" className="rounded-full">
              証明書をダウンロード(PNG)
            </Button>
            <PrintButton label="印刷する" />
            <Button type="button" variant="outline" onClick={handleRestart} size="lg" className="rounded-full">
              新しく申請する
            </Button>
          </div>
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
          {application.fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="ml-1 text-destructive">*</span>}
              </Label>

              {field.type === "select" ? (
                <Select
                  value={values[field.name] ?? ""}
                  onValueChange={(value) => handleChange(field.name, value)}
                  required={field.required}
                >
                  <SelectTrigger id={field.name} className="mt-1 w-full">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupOptions(field.options ?? []).map((chunk, chunkIndex) =>
                      chunk.group ? (
                        <SelectGroup key={chunk.group}>
                          <SelectLabel>{chunk.group}</SelectLabel>
                          {chunk.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ) : (
                        chunk.options.map((option) => (
                          <SelectItem key={`ungrouped-${chunkIndex}-${option.value}`} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))
                      )
                    )}
                  </SelectContent>
                </Select>
              ) : field.type === "date" ? (
                <Input
                  id={field.name}
                  type="date"
                  required={field.required}
                  value={values[field.name] ?? ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  className="mt-1"
                />
              ) : field.type === "textarea" ? (
                <Textarea
                  id={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  rows={3}
                  className="mt-1"
                />
              ) : (
                <Input
                  id={field.name}
                  type="text"
                  required={field.required}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(event) => handleChange(field.name, event.target.value)}
                  className="mt-1"
                />
              )}
            </div>
          ))}

          <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto">
            申請する
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
