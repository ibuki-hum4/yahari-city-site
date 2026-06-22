export type ApplicationFieldType = "text" | "select" | "textarea";

export interface ApplicationFieldOption {
  value: string;
  label: string;
}

export interface ApplicationField {
  name: string;
  label: string;
  type: ApplicationFieldType;
  required?: boolean;
  placeholder?: string;
  options?: ApplicationFieldOption[];
}

export interface ApplicationDef {
  slug: string;
  title: string;
  description: string;
  fields: ApplicationField[];
}

// 新しい申請を追加したい場合は、この配列に項目を追加するだけで /applications 一覧と
// /applications/[slug] のフォームに自動的に反映されます。
export const APPLICATIONS: ApplicationDef[] = [
  {
    slug: "reality-escape",
    title: "現実逃避の一時渡航届",
    description:
      "心が疲れたとき、矢張市民は一時的に「現実」を離れることができます。出発前にこちらの渡航届をご提出ください。",
    fields: [
      { name: "name", label: "氏名(ニックネーム可)", type: "text", required: true, placeholder: "例: やーはり" },
      {
        name: "gender",
        label: "性別",
        type: "select",
        required: true,
        options: [
          { value: "男", label: "男" },
          { value: "女", label: "女" },
          { value: "その他", label: "その他" },
          { value: "草", label: "草" },
        ],
      },
      {
        name: "destination",
        label: "逃避先",
        type: "text",
        required: true,
        placeholder: "例: 布団の中、ソシャゲの世界、推しのライブ会場",
      },
      { name: "duration", label: "逃避時間", type: "text", required: true, placeholder: "例: 3時間、無期限" },
      {
        name: "level",
        label: "現実逃避レベル",
        type: "select",
        options: [
          { value: "ライト(力を抜く程度)", label: "ライト(力を抜く程度)" },
          { value: "ミドル(スマホの電源を切る)", label: "ミドル(スマホの電源を切る)" },
          { value: "ガチ(失踪)", label: "ガチ(失踪)" },
        ],
      },
      { name: "reason", label: "理由", type: "textarea", required: true, placeholder: "例: 月曜日だから" },
      { name: "companion", label: "同伴者", type: "text", placeholder: "例: なし、猫、推しキャラ" },
      { name: "remarks", label: "備考", type: "textarea" },
    ],
  },
];

export function getApplication(slug: string): ApplicationDef | undefined {
  return APPLICATIONS.find((app) => app.slug === slug);
}

const SILLY_WORDS = [
  "HARUMAKI",
  "GYOZA",
  "TAIYAKI",
  "MOCHI",
  "UDON",
  "ONIGIRI",
  "TEMPURA",
  "RAMEN",
  "DAIFUKU",
  "KARAAGE",
  "TAKOYAKI",
  "OKONOMIYAKI",
  "NATTO",
  "WASABI",
  "UMESHU",
];

export function generateApplicationNumber(): string {
  const year = new Date().getFullYear();
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part1 = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  const word = SILLY_WORDS[Math.floor(Math.random() * SILLY_WORDS.length)];
  const part3 = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `YHR-${year}-${part1}-${part2}-${word}-${part3}`;
}
