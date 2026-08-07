import { revalidatePath } from "next/cache";

import { LOCALES } from "@/i18n/locales";

/**
 * ロケール接頭辞を含む全バリアントのページキャッシュを破棄する。
 *
 * `localePrefix: "as-needed"`により公開URLは`/news/x`(日本語)と`/en/news/x`(英語)だが、
 * ミドルウェアが内部的に`/ja/news/x`へ書き換えるため、Nextのキャッシュキーは
 * 常にロケール接頭辞付きになる。`revalidatePath("/news/x")`では一致しない。
 */
export function revalidateLocalizedPath(path: string): void {
  for (const locale of LOCALES) {
    revalidatePath(`/${locale}${path}`);
  }
}
