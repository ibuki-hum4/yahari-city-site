bun run devは**絶対に**しない。
`.cjs`,`.cts`ファイルは**絶対に**作成しない。

The skill should be the script piped to `chromium-cli` (with any project-specific selectors or interactions), and instructions to start/stop the dev server. The README should have a one-liner to run the whole thing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
