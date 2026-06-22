---
name: run-yahari-site
description: Build, run, and visually verify the 矢張市サイト (Next.js) app. Use when asked to start the dev server, take a screenshot, or confirm a page/feature renders correctly in the browser.
---

矢張市サイトはNext.js 16 (App Router) + Bunのアプリです。`chromium-cli`はこの環境に存在しないため、Playwright(`chromium`)を直接使ったREPLドライバ(`driver.mjs`)で代用しています。

エージェントから動作確認する場合は **`bun run dev`を直接実行しない**。代わりに`driver.mjs`の`launch`コマンドを使うこと。`launch`が`bun run dev`を管理対象の子プロセスとして起動し、ポートが応答するまで待ってからheadless Chromiumを接続する。`quit`でブラウザとdevサーバーの両方を停止する。

全パスは`矢張市サイト/`(プロジェクトルート)からの相対パス。

## Prerequisites

```bash
bun install                        # playwrightは既にdevDependenciesに入っている
npx playwright install chromium    # ブラウザ本体のダウンロード(初回のみ、~/.cache等に保存される)
```

## Run (agent path)

ワンライナー(launch→トップページのスクリーンショット→quitまで通して動作確認):

```bash
printf 'launch\nnav /\nss home\nquit\n' | node .claude/skills/run-yahari-site/driver.mjs
```

複数手順を対話的に試す場合はtmuxで:

```bash
tmux new-session -d -s yahari -x 200 -y 50
tmux send-keys -t yahari 'node .claude/skills/run-yahari-site/driver.mjs' Enter
timeout 20 bash -c 'until tmux capture-pane -t yahari -p | grep -q "driver>"; do sleep 0.2; done'
tmux send-keys -t yahari 'launch' Enter
timeout 60 bash -c 'until tmux capture-pane -t yahari -p | grep -q "launched"; do sleep 0.2; done'
tmux send-keys -t yahari 'nav /departments' Enter
tmux send-keys -t yahari 'ss departments' Enter
tmux capture-pane -t yahari -p
```

スクリーンショットは`.claude/skills/run-yahari-site/shots/`に保存される(`SCREENSHOT_DIR`で変更可)。

### Commands

| command | what it does |
|---|---|
| `launch` | `bun run dev`を子プロセスとして起動し、ポート応答を待ってからheadless Chromiumを接続 |
| `nav <path>` | devサーバー上の`<path>`に遷移(例: `nav /contact`) |
| `ss [name]` | フルページスクリーンショット → `shots/<name>.png` |
| `click <css-sel>` | DOM経由でクリック(座標クリックではない) |
| `click-text <text>` | テキストを含むbutton/linkをクリック |
| `fill <css-sel> <text>` | inputやtextareaに入力 |
| `type <text>` / `press <key>` | キーボード入力 |
| `wait <css-sel>` | 要素が出るまで待機(10秒タイムアウト) |
| `wait-text <text>` | ページ内に指定テキストが出るまで待機 |
| `eval <js>` | ページ内でJSを評価しJSONで出力 |
| `text [css-sel]` | innerTextを出力(省略時は`<body>`全体) |
| `console-errors` | 捕捉したconsole.error/pageerrorを出力 |
| `quit` | ブラウザとdevサーバーを停止して終了 |

## Run (human path)

```bash
bun run dev   # http://localhost:3000 が開く。Ctrl-Cで終了
```

## Gotchas

- **`button[type="submit"]`は曖昧** — ヘッダーの検索ボックスにもsubmitボタンがあり、DOM順でページ本体より先に出てくるため誤クリックしやすい。フォーム送信ボタンは`click-text 送信する`のように可視テキストで指定すること。
- **`next build`と`next dev`で`.next/`を共有すると壊れる** — ビルド→devの順(またはその逆)を`.next`を消さずに行うと、古いルートマニフェストが残って誤ルーティングする(実例: `/contact`が`/search`の内容を返した)。ページの内容がおかしい場合は`rm -rf .next`してから`launch`し直す。
- **Server Actions(`"use server"`関数、例: `app/contact/actions.ts`)は`eval`から直接呼べない** — 実際のフォーム送信(`fill`→`click-text`)を経由する必要がある。ビルド時に生成される参照経由でのみ呼び出し可能なため、プレーンなHTTPエンドポイントとしては叩けない。
- **`/contact`を実フォーム送信でテストすると本物のDiscord Webhookに届く** — `DISCORD_FEEDBACK_WEBHOOK_URL`と`GEMINI_API_KEY`が両方設定済みの環境では、テスト送信がそのまま実際のDiscordチャンネルに投稿される。動作確認は基本的に「準備中」エラーが出るところまで(どちらかのキーが未設定の状態)で十分なことが多い。実送信まで確認する場合は事前にユーザーへ確認すること。
- **Windowsで`taskkill /F /T /PID <pid>`だけでは子プロセスが残ることがある** — `bun run dev`を`shell:true`で起動した場合、bun/nextがどう子プロセスをネストするかは実行ごとに変わり、`devServer.pid`の木を`/T`で落としてもポートを握っているプロセスが生き残ることがある。`quit`と`launch`の両方で`killPort(PORT)`(netstatでLISTENING中のPIDを直接特定して`taskkill`)を呼ぶことで保証している。

## Troubleshooting

- **`launch`がハングする/devサーバーが起動しない**: `bun install`済みか確認。Windowsの場合`netstat -ano | grep :3000`でポート3000を既存プロセスが握っていないか確認(`launch`は自動で`killPort`するが、念のため)
- **スクリーンショットが真っ白**: Turbopackは初回アクセス時にルートをコンパイルするため、最初の`nav`は10〜40秒かかることがある。`networkidle`待ちで通常は吸収されるが、白い場合は同じコマンドをもう一度試す
