"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { DEPARTMENTS } from "@/lib/content";

// ルートレイアウトから全ページに読み込まれるコンポーネント。チャットUI本体(motion・Card・Input)は
// 初期バンドルに載せず、はじめて開いたときにだけ取得する。
const MascotChatPanel = dynamic(() => import("@/components/MascotChatPanel"));

export interface ChatMessage {
  role: "bot" | "user";
  text: string;
}

const GREETING: ChatMessage = {
  role: "bot",
  text: "こんにちは!矢張市総合窓口AIです。なんでもご相談ください(たぶん解決しません)。",
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const HUNGER_REPLIES = [
  "それでしたら、矢張市役所地下食堂の定食(サバ味噌)がおすすめです。本日も大変好評をいただいております。",
  "1階売店のあんぱんが本日入荷しております。数に限りがございますのでお早めに。",
  "2階自販機のコーンポタージュが密かな名物です。冬場は特に売れ行きが良いです。",
  "地下食堂は本日サバ味噌とカツカレーの2択です。迷ったらサバ味噌をお選びください。",
];

const GREETING_REPLIES = [
  "こんにちは。本日はどのようなご用件でしょうか。",
  "ようこそ矢張市総合窓口AIへ。ご質問をどうぞ。",
  "どうも、担当のにゃんこです。何かお困りですか。",
];

const THANKS_REPLIES = [
  "どういたしまして。またのお越しをお待ちしております。",
  "お役に立てたか分かりませんが、こちらこそありがとうございます。",
  "恐縮です。他にご不明な点があれば遠慮なくどうぞ。",
];

const FAREWELL_REPLIES = [
  "またのご相談をお待ちしております。良い1日を。",
  "さようなら。お気をつけてお帰りください。",
  "またお会いしましょう。にゃー。",
];

const IDENTITY_REPLIES = [
  "矢張市総合窓口AI、通称マスコットです。人ではありません、たぶん。",
  "詳しい正体は市の機密事項につき、お答えいたしかねます。",
  "見ての通り猫です。AIかどうかは諸説あります。",
];

const CAT_REPLIES = [
  "その通り、猫です。褒められると尻尾が動きます(表示上は動きません)。",
  "にゃ。",
  "猫好きの方には市民証の即日発行をおすすめしております(嘘です)。",
];

const APPRECIATION_REPLIES = [
  "恐縮です、お疲れ様です。担当窓口も同じ気持ちです。",
  "お疲れ様です。こちらは24時間稼働ですので、いつでもどうぞ。",
  "ねぎらいのお言葉、業務評価シートに記録しておきます(嘘です)。",
];

const COMPLAINT_REPLIES = [
  "申し訳ございません、改善に努めます(努めません)。",
  "耳が痛いお言葉ですが、引き続きご利用いただけますと幸いです。",
  "ご期待に沿えず恐縮です。担当部署にたらい回しさせていただきます。",
];

const WEATHER_REPLIES = [
  "天気予報機能は搭載しておりません。窓の外をご確認ください。",
  "晴れでも雨でも、市役所の営業内容は変わりません。",
  "天候に関するご相談は、残念ながら管轄部署が存在しません。",
];

const DEPARTMENT_TEMPLATES: Array<(name: string) => string> = [
  (name) => `それは${name}の管轄です。お手数ですが、担当部署までお問い合わせください。`,
  (name) => `${name}の方でご対応可能かと思います。恐れ入りますが窓口までどうぞ。`,
  (name) => `詳しくは${name}にお尋ねください。私では力不足のようです。`,
  (name) => `${name}が担当しております。たらい回しで恐縮です。`,
];

function getBotReply(input: string): string {
  if (/腹|すいた|ハングリー|hungry/i.test(input)) {
    return pickRandom(HUNGER_REPLIES);
  }
  if (/さようなら|バイバイ|またね|bye/i.test(input)) {
    return pickRandom(FAREWELL_REPLIES);
  }
  if (/ありがとう|thanks|thank you/i.test(input)) {
    return pickRandom(THANKS_REPLIES);
  }
  if (/お前誰|きみ誰|名前は|AIなの|人間なの/i.test(input)) {
    return pickRandom(IDENTITY_REPLIES);
  }
  if (/猫|にゃ|かわいい|cat/i.test(input)) {
    return pickRandom(CAT_REPLIES);
  }
  if (/疲れた|お疲れ|つかれた/i.test(input)) {
    return pickRandom(APPRECIATION_REPLIES);
  }
  if (/使えない|意味ない|役に立たない|ひどい/i.test(input)) {
    return pickRandom(COMPLAINT_REPLIES);
  }
  if (/天気|雨|晴れ|暑い|寒い/i.test(input)) {
    return pickRandom(WEATHER_REPLIES);
  }
  if (/こんにちは|おはよう|こんばんは|hello|hi/i.test(input)) {
    return pickRandom(GREETING_REPLIES);
  }
  const department = pickRandom(DEPARTMENTS);
  return pickRandom(DEPARTMENT_TEMPLATES)(department.name);
}

export default function MascotChatbot() {
  const [open, setOpen] = useState(false);
  // 一度開いたらマウントしたままにして、閉じるアニメーションと会話履歴を保持する。
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    const reply = getBotReply(text);
    setMessages((prev) => [...prev, { role: "user", text }, { role: "bot", text: reply }]);
    setInput("");
  };

  const toggle = () => {
    setHasOpened(true);
    setOpen((o) => !o);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {hasOpened && (
        <MascotChatPanel
          open={open}
          messages={messages}
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
          onClose={() => setOpen(false)}
        />
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "チャットを閉じる" : "総合窓口AIチャットボットを開く"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-yahari-navy text-2xl shadow-lg transition-transform duration-100 hover:bg-yahari-navy-dark active:scale-90 motion-reduce:transition-none"
      >
        🐱
      </button>
    </div>
  );
}
