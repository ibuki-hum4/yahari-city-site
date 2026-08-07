import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** `content/<dir>` 配下のMarkdownが必ず持つフィールド。日付は一覧の並び替えに使う。 */
export interface MarkdownEntryBase {
  slug: string;
  date: string;
  content: string;
}

interface RawEntry {
  slug: string;
  content: string;
  data: Record<string, unknown>;
}

export interface MarkdownCollection<T extends MarkdownEntryBase> {
  /** 日付の新しい順。 */
  getAll: () => T[];
  getBySlug: (slug: string) => T | undefined;
}

/**
 * `content/<dirName>` 配下のMarkdownを読み込むコレクションを生成する。
 *
 * 読み込み結果は本番ビルドでのみプロセス内にキャッシュする。Markdownはイメージに焼き込まれ
 * 実行中に変化しないため、リクエストのたびにディスクを読み直す必要がない。
 * 開発中はファイルを編集したら即座に反映されるよう、キャッシュを無効にする。
 */
export function createMarkdownCollection<T extends MarkdownEntryBase>(
  dirName: string,
  toEntry: (raw: RawEntry) => T
): MarkdownCollection<T> {
  const dir = path.join(process.cwd(), "content", dirName);
  const shouldCache = process.env.NODE_ENV === "production";

  let cache: { all: T[]; bySlug: Map<string, T> } | undefined;

  const load = () => {
    if (shouldCache && cache) return cache;

    const all = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
        return toEntry({ slug: file.replace(/\.md$/, ""), content: content.trim(), data });
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));

    const loaded = { all, bySlug: new Map(all.map((entry) => [entry.slug, entry])) };
    if (shouldCache) cache = loaded;
    return loaded;
  };

  return {
    getAll: () => load().all,
    getBySlug: (slug) => load().bySlug.get(slug),
  };
}
