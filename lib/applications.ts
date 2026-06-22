export type ApplicationFieldType = "text" | "textarea" | "select" | "date";

export interface ApplicationFieldOption {
  value: string;
  label: string;
  group?: string;
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

const GENDER_OPTIONS: ApplicationFieldOption[] = [
  { value: "男", label: "男" },
  { value: "女", label: "女" },
  { value: "その他", label: "その他" },
  { value: "草", label: "草" },
  { value: "神", label: "神" },
];

const PIN_MIAN_POSITIONS: ApplicationFieldOption[] = [
  { value: "民間一般ピン留ミアン", label: "民間一般ピン留ミアン", group: "民間" },
  { value: "民間特殊ピン留ミアン", label: "民間特殊ピン留ミアン", group: "民間" },
  { value: "民間臨時ピン留ミアン", label: "民間臨時ピン留ミアン", group: "民間" },
  { value: "公務一般ピン留ミアン", label: "公務一般ピン留ミアン", group: "公務" },
  { value: "公務特殊ピン留ミアン", label: "公務特殊ピン留ミアン", group: "公務" },
  { value: "公務臨時ピン留ミアン", label: "公務臨時ピン留ミアン", group: "公務" },
  { value: "軍事一般ピン留ミアン", label: "軍事一般ピン留ミアン", group: "軍事" },
  { value: "軍事特殊ピン留ミアン", label: "軍事特殊ピン留ミアン", group: "軍事" },
  { value: "軍事臨時ピン留ミアン", label: "軍事臨時ピン留ミアン", group: "軍事" },
];

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
      { name: "gender", label: "性別", type: "select", required: true, options: GENDER_OPTIONS },
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
  {
    slug: "pin-mian-registration",
    title: "ピン留ミアン登録システム",
    description: "矢張市における各種ピン留ミアンの登録はこちらから申請してください。",
    fields: [
      {
        name: "pinMianNumber",
        label: "ピン留ミアン番号",
        type: "text",
        required: true,
        placeholder: "例: PM-0001",
      },
      { name: "name", label: "氏名(ニックネーム可)", type: "text", required: true, placeholder: "例: やーはり" },
      { name: "gender", label: "性別", type: "select", required: true, options: GENDER_OPTIONS },
      { name: "appointmentDate", label: "就任日", type: "date", required: true },
      { name: "position", label: "役職", type: "select", required: true, options: PIN_MIAN_POSITIONS },
    ],
  },
  {
    slug: "oshi-leave",
    title: "推し活休暇申請",
    description: "推しのために業務・学業から一時離脱する市民のための休暇申請です。",
    fields: [
      { name: "name", label: "氏名(ニックネーム可)", type: "text", required: true, placeholder: "例: やーはり" },
      { name: "oshiName", label: "推しの名前", type: "text", required: true, placeholder: "例: ○○担" },
      {
        name: "activity",
        label: "活動内容",
        type: "select",
        required: true,
        options: [
          { value: "配信視聴", label: "配信視聴" },
          { value: "ライブ参戦", label: "ライブ参戦" },
          { value: "円盤鑑賞", label: "円盤鑑賞" },
          { value: "物販列", label: "物販列" },
          { value: "その他", label: "その他" },
        ],
      },
      { name: "duration", label: "休暇期間", type: "text", required: true, placeholder: "例: 3日間、無期限" },
      { name: "love", label: "推しへの愛", type: "textarea", required: true, placeholder: "例: 尊い、生きる希望" },
    ],
  },
  {
    slug: "snooze-permit",
    title: "二度寝許可証",
    description: "二度寝の権利を公的に保障するための許可証です。",
    fields: [
      { name: "name", label: "氏名(ニックネーム可)", type: "text", required: true, placeholder: "例: やーはり" },
      { name: "snoozeTime", label: "二度寝予定時間", type: "text", required: true, placeholder: "例: 30分、3時間" },
      { name: "excuse", label: "言い訳", type: "textarea", required: true, placeholder: "例: 布団が重力に勝てなかった" },
      { name: "wakeUpTime", label: "起床予定", type: "text", placeholder: "例: 正午、未定" },
    ],
  },
  {
    slug: "vc-marathon-certificate",
    title: "VC耐久参加証明書",
    description: "矢張市公認の耐久VCに参加した市民へ贈られる証明書です。",
    fields: [
      { name: "name", label: "氏名(ニックネーム可)", type: "text", required: true, placeholder: "例: やーはり" },
      {
        name: "participationTime",
        label: "参加時間",
        type: "text",
        required: true,
        placeholder: "例: 224時間48分",
      },
      {
        name: "stamina",
        label: "体力残量",
        type: "select",
        required: true,
        options: [
          { value: "満タン", label: "満タン" },
          { value: "普通", label: "普通" },
          { value: "限界", label: "限界" },
          { value: "灰", label: "灰" },
        ],
      },
      { name: "comment", label: "ひとこと", type: "textarea", placeholder: "例: もう一回いけます" },
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
