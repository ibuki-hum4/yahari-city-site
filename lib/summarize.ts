import { GoogleGenerativeAI } from "@google/generative-ai";

// お知らせ/コラム記事本文の3行要約。lib/moderation.tsのGemini連携パターンを踏襲し、
// キー未設定・パース失敗時は「unavailable」を返して呼び出し側で非表示に倒す。
const MODEL_NAME = "gemini-2.5-flash";

const PROMPT_TEMPLATE = `あなたはウェブサイトの記事編集者です。次の記事本文を3行以内で要約してください。

出力は次のJSON形式のみとし、説明文やコードブロックは付けないでください:
{"lines": ["1行目", "2行目", "3行目"]}

記事本文:
"""
{{TEXT}}
"""`;

// 記事ページのレンダリング中に直接awaitされるため、Gemini側が遅延・無応答でも
// ページ全体がブロックされないよう一定時間でunavailableにフォールバックする
const CALL_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error("summarize timeout")), ms)),
  ]);
}

export type SummaryOutcome = { status: "ok"; lines: string[] } | { status: "unavailable" };

function parseResponse(raw: string): SummaryOutcome {
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return { status: "unavailable" };
  try {
    const parsed = JSON.parse(jsonMatch[0]) as { lines?: unknown };
    if (!Array.isArray(parsed.lines) || parsed.lines.some((line) => typeof line !== "string")) {
      return { status: "unavailable" };
    }
    const lines = (parsed.lines as string[]).filter((line) => line.trim() !== "");
    if (lines.length === 0) return { status: "unavailable" };
    return { status: "ok", lines };
  } catch {
    return { status: "unavailable" };
  }
}

export async function summarizeText(text: string): Promise<SummaryOutcome> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { status: "unavailable" };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const prompt = PROMPT_TEMPLATE.replace("{{TEXT}}", text);
    const result = await withTimeout(model.generateContent(prompt), CALL_TIMEOUT_MS);
    return parseResponse(result.response.text());
  } catch {
    return { status: "unavailable" };
  }
}
