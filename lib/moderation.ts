import { GoogleGenerativeAI } from "@google/generative-ai";

// /contact(市民の声)フォーム用のAIモデレーション。Geminiに暴言・脅迫・
// 差別的表現が含まれるかを判定させ、判定不能な場合は「unavailable」を返して
// 呼び出し側で安全側(送信拒否)に倒す。
// gemini-1.5-proは廃止済みのため、判定タスクには十分な性能のgemini-2.5-flashを使用。
const MODEL_NAME = "gemini-2.5-flash";

const PROMPT_TEMPLATE = `あなたはウェブサイトの投稿フォームに送られたテキストを確認するモデレーターです。
次のテキストに、暴言・脅迫・誹謗中傷・差別的表現(人種・国籍・性別・障害・性的指向などに対するもの)が含まれているかどうかだけを判定してください。

出力は次のJSON形式のみとし、説明文やコードブロックは付けないでください:
{"flagged": true または false, "reason": "判定理由を一言で。含まれていない場合は空文字"}

判定対象テキスト:
"""
{{TEXT}}
"""`;

export type ModerationOutcome =
  | { status: "clean" }
  | { status: "flagged"; reason?: string }
  | { status: "unavailable" };

function parseResponse(raw: string): ModerationOutcome {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return { status: "unavailable" };
  try {
    const parsed = JSON.parse(jsonMatch[0]) as { flagged?: unknown; reason?: unknown };
    if (typeof parsed.flagged !== "boolean") return { status: "unavailable" };
    if (!parsed.flagged) return { status: "clean" };
    return { status: "flagged", reason: typeof parsed.reason === "string" ? parsed.reason : undefined };
  } catch {
    return { status: "unavailable" };
  }
}

export async function moderateText(text: string): Promise<ModerationOutcome> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { status: "unavailable" };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = PROMPT_TEMPLATE.replace("{{TEXT}}", text);
    const result = await model.generateContent(prompt);
    return parseResponse(result.response.text());
  } catch {
    return { status: "unavailable" };
  }
}
