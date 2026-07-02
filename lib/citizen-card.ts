import { SITE } from "@/lib/content";

export interface CitizenCardOptions {
  name: string;
  term: string;
  joinDate: string;
  citizenSerial: string;
  issuedAt: string;
  photoDataUrl?: string;
}

export interface CitizenTermOption {
  value: string;
  label: string;
}

// 写真欄のアスペクト比。フォーム側のクロップUIもこの比率に合わせる
export const CITIZEN_PHOTO_WIDTH = 150;
export const CITIZEN_PHOTO_HEIGHT = 190;

// 矢張市はクォーター制(四半期ごとの「期」)を採用している。新しい期が始まったらここに追記する。
export const CITIZEN_TERMS: CitizenTermOption[] = [
  { value: "O0", label: "O0(Origin 0)" },
  { value: "01A", label: "01A" },
  { value: "01B", label: "01B" },
];

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`failed to load ${src}`));
    img.src = src;
  });
}

// 画像をアスペクト比を保ったまま枠いっぱいに切り出して描画する(object-fit: coverと同じ挙動)
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  const scale = Math.max(w / img.width, h / img.height);
  const sw = w / scale;
  const sh = h / scale;
  const sx = (img.width - sw) / 2;
  const sy = (img.height - sh) / 2;
  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

// 指定した最大幅に収まるまでフォントサイズを段階的に縮小する(市民名の長さは可変のため)
function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  minSize: number,
  weight = "bold",
): number {
  let size = startSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px sans-serif`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

export function generateCitizenSerial(): string {
  const base = Number(SITE.population) || 0;
  const offset = Math.floor(Math.random() * 50) + 1;
  return String(base + offset).padStart(6, "0");
}

export async function drawCitizenCard(canvas: HTMLCanvasElement, options: CitizenCardOptions): Promise<void> {
  const width = 1000;
  const height = 630;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#173a5e";
  ctx.lineWidth = 8;
  ctx.strokeRect(15, 15, width - 30, height - 30);
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, width - 60, height - 60);

  // ヘッダー帯
  ctx.fillStyle = "#173a5e";
  ctx.fillRect(30, 30, width - 60, 120);

  try {
    const logo = await loadImage("/矢張市_透過.png");
    ctx.drawImage(logo, 55, 50, 80, 80);
  } catch {
    // ロゴが読み込めない場合は省略してそのまま続行する
  }

  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 34px sans-serif";
  ctx.fillText("矢張市民証", 155, 90);
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#a6e1ff";
  ctx.fillText("YAHARI CITY RESIDENT CARD", 155, 118);

  ctx.textAlign = "right";
  ctx.font = "13px sans-serif";
  ctx.fillStyle = "#a6e1ff";
  ctx.fillText(SITE.slogan, width - 55, 118);

  // ICチップ
  ctx.fillStyle = "#d4af37";
  ctx.fillRect(55, 175, 70, 50);
  ctx.strokeStyle = "#a07c1f";
  ctx.lineWidth = 1.5;
  for (const x of [70, 85, 100]) {
    ctx.beginPath();
    ctx.moveTo(x, 175);
    ctx.lineTo(x, 225);
    ctx.stroke();
  }
  for (const y of [190, 210]) {
    ctx.beginPath();
    ctx.moveTo(55, y);
    ctx.lineTo(125, y);
    ctx.stroke();
  }

  // 写真欄(写真が指定されていればそれを描画し、なければシルエットを表示する)
  const photoX = 790;
  const photoY = 175;
  const photoW = CITIZEN_PHOTO_WIDTH;
  const photoH = CITIZEN_PHOTO_HEIGHT;
  ctx.fillStyle = "#f3f4f6";
  ctx.fillRect(photoX, photoY, photoW, photoH);

  let photo: HTMLImageElement | null = null;
  if (options.photoDataUrl) {
    try {
      photo = await loadImage(options.photoDataUrl);
    } catch {
      // 画像の読み込みに失敗した場合はシルエット表示にフォールバックする
    }
  }

  if (photo) {
    drawImageCover(ctx, photo, photoX, photoY, photoW, photoH);
  } else {
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.arc(photoX + photoW / 2, photoY + 68, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(photoX + photoW / 2, photoY + 165, 50, 55, 0, Math.PI, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "#173a5e";
  ctx.lineWidth = 2;
  ctx.strokeRect(photoX, photoY, photoW, photoH);

  if (!photo) {
    ctx.textAlign = "center";
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px sans-serif";
    ctx.fillText("PHOTO", photoX + photoW / 2, photoY + photoH + 20);
  }

  // 各項目
  const fieldMaxWidth = photoX - 90;
  ctx.textAlign = "left";

  const fieldRows: { label: string; value: string; color: string; baseSize: number; mono?: boolean }[] = [
    { label: "氏名 / NAME", value: options.name, color: "#173a5e", baseSize: 32 },
    { label: "所属期 / TERM", value: options.term, color: "#1f2937", baseSize: 28 },
    { label: "加入日 / DATE OF ENTRY", value: options.joinDate, color: "#1f2937", baseSize: 28 },
    { label: "市民番号 / CITIZEN No.", value: `第${options.citizenSerial}号`, color: "#c0392b", baseSize: 28, mono: true },
  ];

  let rowY = 255;
  for (const row of fieldRows) {
    ctx.fillStyle = "#6b7280";
    ctx.font = "14px sans-serif";
    ctx.fillText(row.label, 55, rowY);
    const fontFamily = row.mono ? "monospace" : "sans-serif";
    const size = fitFontSize(ctx, row.value, fieldMaxWidth, row.baseSize, 16);
    ctx.fillStyle = row.color;
    ctx.font = `bold ${size}px ${fontFamily}`;
    ctx.fillText(row.value, 55, rowY + 37);
    rowY += 78;
  }

  // 市長印
  ctx.save();
  ctx.translate(865, 470);
  ctx.rotate(-0.15);
  ctx.strokeStyle = "#c0392b";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 48, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 37, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#c0392b";
  ctx.textAlign = "center";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText("矢張", 0, -4);
  ctx.fillText("市長印", 0, 16);
  ctx.restore();

  // 簡易バーコード(装飾)
  let barX = 55;
  const barY = 555;
  const barcodeSeed = `${options.citizenSerial}${options.name}`;
  for (let i = 0; i < 60 && barX < width - 55; i++) {
    const code = barcodeSeed.charCodeAt(i % barcodeSeed.length);
    const barWidth = 2 + (code % 4);
    ctx.fillStyle = i % 2 === 0 ? "#173a5e" : "#a6e1ff";
    ctx.fillRect(barX, barY, barWidth, 16);
    barX += barWidth + 2;
  }

  ctx.textAlign = "left";
  ctx.fillStyle = "#6b7280";
  ctx.font = "13px sans-serif";
  ctx.fillText(`発行日: ${options.issuedAt}`, 55, 595);

  ctx.textAlign = "center";
  ctx.font = "11px sans-serif";
  ctx.fillText(
    "このカードは矢張市公式サイトにより自動発行されたものです(架空のコミュニティによる遊戯目的の発行物です)",
    width / 2,
    615,
  );
}
