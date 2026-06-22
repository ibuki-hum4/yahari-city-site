"use client";

import { useRef, useState } from "react";
import type { ApplicationDef } from "@/lib/applications";
import { generateApplicationNumber } from "@/lib/applications";
import { drawCertificate } from "@/lib/certificate";

type Stage = "form" | "processing" | "done";

const PROCESSING_STEPS = ["ただいま書類を精査中…", "ハンコを押しています…", "受理しています…"];

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

    const number = generateApplicationNumber();
    setApplicationNumber(number);
    setStage("done");

    requestAnimationFrame(() => {
      if (!canvasRef.current) return;
      drawCertificate(canvasRef.current, {
        title: application.title,
        applicationNumber: number,
        issuedAt: new Date().toLocaleDateString("ja-JP"),
        fields: application.fields.map((field) => ({
          label: field.label,
          value: values[field.name] ?? "",
        })),
      });
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

  if (stage === "processing") {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center" aria-live="polite">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-yahari-sky-light border-t-yahari-navy"
          role="status"
        />
        <p className="text-lg font-semibold text-yahari-navy">{PROCESSING_STEPS[stepIndex]}</p>
        <p className="text-sm text-gray-600">しばらくお待ちください...</p>
      </div>
    );
  }

  if (stage === "done") {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <p className="text-sm text-gray-600">受理されました。申請番号は以下の通りです。</p>
        <p className="break-all rounded bg-yahari-sky-light px-4 py-2 font-mono text-base font-bold text-yahari-navy sm:text-lg">
          {applicationNumber}
        </p>
        <canvas ref={canvasRef} className="w-full max-w-sm rounded-lg border border-gray-200 shadow-md" />
        <div className="flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark"
          >
            証明書をダウンロード(PNG)
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="rounded-full border border-yahari-navy px-6 py-3 text-sm font-semibold text-yahari-navy hover:bg-yahari-sky-light"
          >
            新しく申請する
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {application.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-semibold text-gray-700">
            {field.label}
            {field.required && <span className="ml-1 text-red-600">*</span>}
          </label>

          {field.type === "select" ? (
            <select
              id={field.name}
              required={field.required}
              value={values[field.name] ?? ""}
              onChange={(event) => handleChange(field.name, event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            >
              <option value="">選択してください</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea
              id={field.name}
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(event) => handleChange(field.name, event.target.value)}
              rows={3}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            />
          ) : (
            <input
              id={field.name}
              type="text"
              required={field.required}
              placeholder={field.placeholder}
              value={values[field.name] ?? ""}
              onChange={(event) => handleChange(field.name, event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark sm:w-auto"
      >
        申請する
      </button>
    </form>
  );
}
