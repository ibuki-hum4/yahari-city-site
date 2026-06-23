"use client";

import { useCallback, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("failed to load image"));
    img.src = src;
  });
}

async function cropImage(imageSrc: string, area: Area, outputWidth: number, outputHeight: number): Promise<string> {
  const image = await loadImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return imageSrc;
  ctx.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, outputWidth, outputHeight);
  return canvas.toDataURL("image/png");
}

export default function PhotoCropper({
  imageSrc,
  aspect,
  outputWidth,
  outputHeight,
  onConfirm,
  onCancel,
}: {
  imageSrc: string;
  aspect: number;
  outputWidth: number;
  outputHeight: number;
  onConfirm: (dataUrl: string) => void;
  onCancel: () => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    const dataUrl = await cropImage(imageSrc, croppedAreaPixels, outputWidth, outputHeight);
    onConfirm(dataUrl);
  };

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden rounded border border-gray-300 bg-gray-900">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="shrink-0 text-xs text-gray-600">ズーム</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(event) => setZoom(Number(event.target.value))}
          className="flex-1"
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">ドラッグで位置を移動、スライダーで拡大・縮小できます。</p>

      <div className="mt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-full bg-yahari-navy px-5 py-2 text-sm font-semibold text-white hover:bg-yahari-navy-dark"
        >
          この範囲に決定
        </button>
      </div>
    </div>
  );
}
