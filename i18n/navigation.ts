import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// アプリ内リンクは`next/link`ではなくこちらを使う。
// 現在のロケールに応じて`/en`接頭辞を自動で付け外しする。
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
