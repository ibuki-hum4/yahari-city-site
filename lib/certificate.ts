import { lineSeedJP } from "@/lib/fonts";

const FONT_FAMILY = `${lineSeedJP.style.fontFamily}, sans-serif`;

export interface CertificateField {
  label: string;
  value: string;
}

export interface CertificateOptions {
  title: string;
  applicationNumber: string;
  issuedAt: string;
  fields: CertificateField[];
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`failed to load ${src}`));
    img.src = src;
  });
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  let line = "";
  let curY = y;
  for (const char of text) {
    const test = line + char;
    if (line && ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, curY);
      line = char;
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, curY);
    curY += lineHeight;
  }
  return curY;
}

export async function drawCertificate(canvas: HTMLCanvasElement, options: CertificateOptions): Promise<void> {
  const width = 900;
  const height = 520 + options.fields.length * 90;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // next/fontのFace読み込みを待ってから描画する(先にfillTextすると
  // フォールバック書体でテキストが確定してしまい、後からLINE Seed JPに切り替わらない)
  await document.fonts.ready;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#173a5e";
  ctx.lineWidth = 10;
  ctx.strokeRect(20, 20, width - 40, height - 40);
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  try {
    const logo = await loadImage("/矢張市.png");
    ctx.drawImage(logo, width / 2 - 45, 65, 90, 90);
  } catch {
    // ロゴが読み込めない場合は省略してそのまま続行する
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#173a5e";
  ctx.font = `bold 28px ${FONT_FAMILY}`;
  ctx.fillText("矢張市", width / 2, 195);

  ctx.font = `bold 38px ${FONT_FAMILY}`;
  ctx.fillText(options.title, width / 2, 250);

  ctx.font = `18px ${FONT_FAMILY}`;
  ctx.fillStyle = "#374151";
  ctx.fillText(`申請番号: ${options.applicationNumber}`, width / 2, 290);
  ctx.fillText(`発行日: ${options.issuedAt}`, width / 2, 316);

  ctx.strokeStyle = "#a6e1ff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 350);
  ctx.lineTo(width - 80, 350);
  ctx.stroke();

  ctx.textAlign = "left";
  let y = 400;
  for (const field of options.fields) {
    ctx.fillStyle = "#173a5e";
    ctx.font = `bold 20px ${FONT_FAMILY}`;
    ctx.fillText(field.label, 90, y);
    ctx.fillStyle = "#1f2937";
    ctx.font = `20px ${FONT_FAMILY}`;
    y = wrapText(ctx, field.value || "(未記入)", 90, y + 30, width - 180, 26);
    y += 40;
  }

  const hankoX = width - 150;
  const hankoY = height - 150;
  ctx.save();
  ctx.translate(hankoX, hankoY);
  ctx.rotate(-0.15);
  ctx.strokeStyle = "#c0392b";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 46, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#c0392b";
  ctx.textAlign = "center";
  ctx.font = `bold 18px ${FONT_FAMILY}`;
  ctx.fillText("矢張", 0, -6);
  ctx.fillText("市長印", 0, 18);
  ctx.restore();

  ctx.textAlign = "center";
  ctx.fillStyle = "#6b7280";
  ctx.font = `14px ${FONT_FAMILY}`;
  ctx.fillText(
    "この証明書は矢張市公式サイトにより自動発行されたものです(架空のコミュニティによる遊戯目的の発行物です)",
    width / 2,
    height - 50,
  );
}
