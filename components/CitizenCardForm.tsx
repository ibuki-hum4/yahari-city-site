"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import {
  CITIZEN_PHOTO_HEIGHT,
  CITIZEN_PHOTO_WIDTH,
  CITIZEN_TERMS,
  drawCitizenCard,
  generateCitizenSerial,
} from "@/lib/citizen-card";
import PhotoCropper from "@/components/PhotoCropper";
import PrintButton from "@/components/PrintButton";
import { SITE } from "@/lib/content";

const PHOTO_ASPECT = CITIZEN_PHOTO_WIDTH / CITIZEN_PHOTO_HEIGHT;
const PHOTO_OUTPUT_WIDTH = CITIZEN_PHOTO_WIDTH * 2;
const PHOTO_OUTPUT_HEIGHT = CITIZEN_PHOTO_HEIGHT * 2;

type Stage = "form" | "processing" | "done";

const PROCESSING_STEPS = ["市民データベースを検索中…", "市章を転写中…", "市民証を発行中…"];

function formatJaDate(value: string): string {
  const [year, month, day] = value.split("-");
  return `${year}年${Number(month)}月${Number(day)}日`;
}

export default function CitizenCardForm() {
  const [name, setName] = useState("");
  const [term, setTerm] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [rawPhotoSrc, setRawPhotoSrc] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [stage, setStage] = useState<Stage>("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [citizenSerial, setCitizenSerial] = useState("");
  const [issuedAt, setIssuedAt] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawPhotoSrc(reader.result as string);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropConfirm = (dataUrl: string) => {
    setPhotoDataUrl(dataUrl);
    setIsCropping(false);
  };

  const handleCropCancel = () => {
    setIsCropping(false);
    setRawPhotoSrc(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStage("processing");

    for (let i = 0; i < PROCESSING_STEPS.length; i++) {
      setStepIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 1300));
    }

    setCitizenSerial(generateCitizenSerial());
    setIssuedAt(new Date().toLocaleDateString("ja-JP"));
    setStage("done");
  };

  // AnimatePresence(mode="wait")の退場アニメーション完了後にcanvasがマウントされるため、
  // ref callbackのマウント時に描画する(useEffectでは早すぎて何も描かれない)
  const handleCanvasMount = (node: HTMLCanvasElement | null) => {
    canvasRef.current = node;
    if (!node || !citizenSerial) return;
    drawCitizenCard(node, {
      name,
      term: CITIZEN_TERMS.find((option) => option.value === term)?.label ?? term,
      joinDate: formatJaDate(joinDate),
      citizenSerial,
      issuedAt,
      photoDataUrl: photoDataUrl ?? undefined,
    });
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `yahari-citizen-card-${citizenSerial}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const shareText = `${SITE.name}民証(第${citizenSerial}号)を発行しました`;

    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (blob) {
      const file = new File([blob], `yahari-citizen-card-${citizenSerial}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: `${SITE.name}民証`, text: shareText });
          return;
        } catch {
          // 共有がキャンセルされた場合等はX投稿画面へのフォールバックに進む
        }
      }
    }

    const intentUrl = new URL("https://twitter.com/intent/tweet");
    intentUrl.searchParams.set("text", shareText);
    intentUrl.searchParams.set("url", `${SITE.url}/citizen-card`);
    intentUrl.searchParams.set("hashtags", SITE.xHashtag);
    window.open(intentUrl.toString(), "_blank", "noopener,noreferrer");
  };

  const handleRestart = () => {
    setName("");
    setTerm("");
    setJoinDate("");
    setPhotoDataUrl(null);
    setRawPhotoSrc(null);
    setIsCropping(false);
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
          <p className="text-sm text-gray-600">市民証が発行されました。市民番号は以下の通りです。</p>
          <p className="break-all rounded bg-yahari-sky-light px-4 py-2 font-mono text-base font-bold text-yahari-navy sm:text-lg">
            第{citizenSerial}号
          </p>
          <canvas ref={handleCanvasMount} className="w-full max-w-xl rounded-lg border border-gray-200 shadow-md" />
          <div className="flex flex-wrap justify-center gap-4 no-print">
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark"
            >
              市民証をダウンロード(PNG)
            </button>
            <PrintButton label="印刷する" />
            <button
              type="button"
              onClick={handleShare}
              className="rounded-full border border-yahari-navy px-6 py-3 text-sm font-semibold text-yahari-navy hover:bg-yahari-sky-light"
            >
              Xでシェア
            </button>
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-full border border-yahari-navy px-6 py-3 text-sm font-semibold text-yahari-navy hover:bg-yahari-sky-light"
            >
              新しく発行する
            </button>
          </div>
          <p className="text-xs text-gray-500 no-print">
            ※ お使いの環境によっては画像を直接共有できない場合があります。その際は先にダウンロードしてから、開いた投稿画面に画像を添付してください。
          </p>
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
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              氏名(ニックネーム可)<span className="ml-1 text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              placeholder="例: やーはり"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="term" className="block text-sm font-semibold text-gray-700">
              所属期(クォーター)<span className="ml-1 text-red-600">*</span>
            </label>
            <select
              id="term"
              required
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            >
              <option value="">選択してください</option>
              {CITIZEN_TERMS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="joinDate" className="block text-sm font-semibold text-gray-700">
              矢張市への加入日<span className="ml-1 text-red-600">*</span>
            </label>
            <input
              id="joinDate"
              type="date"
              required
              value={joinDate}
              onChange={(event) => setJoinDate(event.target.value)}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-yahari-navy focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-semibold text-gray-700">
              証明写真(任意)
            </label>

            {isCropping && rawPhotoSrc ? (
              <div className="mt-2">
                <PhotoCropper
                  imageSrc={rawPhotoSrc}
                  aspect={PHOTO_ASPECT}
                  outputWidth={PHOTO_OUTPUT_WIDTH}
                  outputHeight={PHOTO_OUTPUT_HEIGHT}
                  onConfirm={handleCropConfirm}
                  onCancel={handleCropCancel}
                />
              </div>
            ) : (
              <>
                <div className="mt-1 flex items-center gap-4">
                  {photoDataUrl && (
                    // eslint-disable-next-line @next/next/no-img-element -- ローカルのdata URLを即時プレビューするため
                    <img
                      src={photoDataUrl}
                      alt="証明写真プレビュー"
                      className="h-16 w-16 rounded border border-gray-300 object-cover"
                    />
                  )}
                  {photoDataUrl && rawPhotoSrc && (
                    <button
                      type="button"
                      onClick={() => setIsCropping(true)}
                      className="shrink-0 rounded-full border border-yahari-navy px-4 py-1.5 text-xs font-semibold text-yahari-navy hover:bg-yahari-sky-light"
                    >
                      位置・拡大を編集
                    </button>
                  )}
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="block w-full text-sm text-gray-700 file:mr-3 file:rounded-full file:border-0 file:bg-yahari-sky-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-yahari-navy hover:file:bg-yahari-sky"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  未指定の場合はシルエットが表示されます。選択後にトリミング(移動・ズーム)できます。画像はブラウザ内でのみ処理され、サーバーには送信されません。
                </p>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-yahari-navy px-6 py-3 text-sm font-semibold text-white hover:bg-yahari-navy-dark sm:w-auto"
          >
            市民証を発行する
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
