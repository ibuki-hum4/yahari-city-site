export type PersonnelTransferType = "就任" | "異動" | "退任" | "新設";

export interface PersonnelTransfer {
  id: string;
  issuedDate: string;
  name: string;
  previousPosition: string;
  newPosition: string;
  type: PersonnelTransferType;
  note?: string;
}

// 新しい辞令を追加したい場合は、この配列の先頭に項目を追加する(一覧は発令日の降順で表示される)
export const PERSONNEL_TRANSFERS: PersonnelTransfer[] = [
  {
    id: "2026-0016",
    issuedDate: "2026年7月9日",
    name: "赤い人",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0015",
    issuedDate: "2026年7月9日",
    name: "ねろん",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0014",
    issuedDate: "2026年7月9日",
    name: "PHI (ふぁい)",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0013",
    issuedDate: "2026年7月9日",
    name: "紅._.BENI (紅)",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0012",
    issuedDate: "2026年7月9日",
    name: "棒人間",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0011",
    issuedDate: "2026年7月9日",
    name: "まとらき",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0010",
    issuedDate: "2026年7月9日",
    name: "ぽけべる",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0009",
    issuedDate: "2026年7月9日",
    name: "やーはり",
    previousPosition: "なし",
    newPosition: "過疎化対策委員会委員",
    type: "新設",
  },
  {
    id: "2026-0008",
    issuedDate: "2026年7月9日",
    name: "るーい",
    previousPosition: "なし",
    newPosition: "役員補佐",
    type: "新設",
  },
  {
    id: "2026-0007",
    issuedDate: "2026年7月9日",
    name: "カヨっちゃん",
    previousPosition: "なし",
    newPosition: "役員補佐",
    type: "新設",
  },
  {
    id: "2026-0006",
    issuedDate: "2026年7月9日",
    name: "紅._.BENI (紅)",
    previousPosition: "なし",
    newPosition: "役員",
    type: "新設",
  },
  {
    id: "2026-0005",
    issuedDate: "2026年7月9日",
    name: "PHI (ふぁい)",
    previousPosition: "なし",
    newPosition: "役員",
    type: "新設",
  },
  {
    id: "2026-0004",
    issuedDate: "2026年7月9日",
    name: "KaiTomotake",
    previousPosition: "なし",
    newPosition: "役員",
    type: "新設",
  },
  {
    id: "2026-0003",
    issuedDate: "2026年7月9日",
    name: "やーはり",
    previousPosition: "なし",
    newPosition: "役員(矢張市長兼任)",
    type: "新設",
  },
  {
    id: "2026-0002",
    issuedDate: "2026年7月9日",
    name: "ひき逃げ",
    previousPosition: "なし",
    newPosition: "役員",
    type: "新設",
  },
  {
    id: "2026-0001",
    issuedDate: "2026年2月23日",
    name: "やーはり",
    previousPosition: "なし",
    newPosition: "矢張市長",
    type: "新設",
    note: "矢張市発足に伴う初代矢張市長就任。",
  },
  // 例：{
  //  id: "2026-0001",
  //  issuedDate: "2026年2月23日",
  //  name: "やーはり",
  //  previousPosition: "なし",
  //  newPosition: "矢張市長",
  //  type: "新設",
  //  note: "矢張市発足に伴う初代矢張市長就任。",
  //},
];

export function getPersonnelTransfer(id: string): PersonnelTransfer | undefined {
  return PERSONNEL_TRANSFERS.find((transfer) => transfer.id === id);
}

export function getOrderText(transfer: PersonnelTransfer): string {
  switch (transfer.type) {
    case "新設":
      return `${transfer.newPosition}を新設し、${transfer.name}を命ずる。`;
    case "就任":
      return `${transfer.name}に、${transfer.newPosition}を命ずる。`;
    case "異動":
      return `${transfer.name}に、${transfer.previousPosition}から${transfer.newPosition}への異動を命ずる。`;
    case "退任":
      return `${transfer.name}の、${transfer.previousPosition}を免ずる。`;
  }
}
