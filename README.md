矢張市公式サイト
================

Discord上のコミュニティ「矢張市」(市長: やーはり)の公式サイトです。実在の自治体サイト(東京都, 豊島区, 武蔵野市, 日光市, 千葉県, 埼玉県)を参考にデザインしています。Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 で構築しています。

## 開発

```bash
bun install        # 依存パッケージのインストール
bun run dev        # 開発サーバー起動 (http://localhost:3000)
bun run build      # 本番ビルド
bun run lint       # ESLint
bun run typecheck  # 型チェック
```

`package.json`のスクリプトは`bun --bun next dev`ではなく素の`next dev`を呼んでいます(`bun run`経由なので実行自体はbunです)。`--bun`を付けるとこの環境ではdevサーバーが数リクエスト後に無言で落ちる現象が再現したため、安定性を優先しています。

### 動作確認(エージェント向け)

devサーバーの起動からブラウザでのスクリーンショット取得までを1コマンドで実行できます(`.claude/skills/run-yahari-site/`にPlaywrightベースのドライバあり):

```bash
printf 'launch\nnav /\nss home\nquit\n' | node .claude/skills/run-yahari-site/driver.mjs
```

## 構成

- `app/` — 各ページ(ホーム / about / history / pictures / news / newspaper / column / access / faq / search / sitemap / accessibility / privacy / terms / bosai / applications / departments / legends / contact / ordinances / personnel / groups)
- `components/` — Header, Footer, Carousel, AccessibilityMenu, WarningLookup, EarthquakeMap, ApplicationForm, ContactForm, MascotChatbot, Markdown, DiscordWidget, XHashtagFeed, CitizenCardForm, PhotoCropper, OrdinanceSearch, PersonnelTypeBadge, PrintButton, GroupRegistrationForm など共通コンポーネント
- `lib/content.ts` — 市の基礎データ・沿革・部署一覧・殿堂入り記録・市長プロフィール・サイトマップ用ページ一覧・`pageMetadata()`/`buildMetadata()`ヘルパー
- `lib/news.ts` — `content/news/*.md` を読み込むお知らせ取得関数
- `lib/newspaper.ts` — `content/newspaper/*.md` を読み込む矢張市新聞取得関数
- `lib/column.ts` — `content/column/*.md` を読み込む市長コラム取得関数
- `lib/markdown-excerpt.ts` — `lib/news.ts`/`lib/newspaper.ts`/`lib/column.ts`で共用するMarkdown抜粋生成ユーティリティ
- `lib/faq.ts` — よくある質問のデータ
- `lib/jma.ts` — 気象庁の公開JSONを取得するユーティリティ(防災ポータル用)
- `lib/discord.ts` — Discordウィジェット(widget.json)を取得するユーティリティ
- `lib/applications.ts` — 申請フォームの定義一覧・申請番号生成
- `lib/certificate.ts` — Canvasで証明書PNGを描画するユーティリティ
- `lib/citizen-card.ts` — Canvasで市民証PNGを描画するユーティリティ(証明写真の合成にも対応)
- `lib/ordinances.ts` — 条例集のデータ(条例番号・条文・改正履歴)
- `lib/personnel.ts` — 人事異動情報(辞令)のデータと発令文生成
- `lib/groups.ts` — 市民活動団体登録情報の取得(Prisma経由でPostgreSQLから)
- `lib/prisma.ts` — Prisma Clientのシングルトン(`@prisma/adapter-pg`でPostgreSQLに接続)
- `lib/moderation.ts` — Gemini APIで`/contact`投稿内容をモデレーションするユーティリティ
- `prisma/schema.prisma` — DBスキーマ定義(`CitizenGroup`モデル)。生成されたClientは`lib/generated/prisma`(gitignore対象)
- `content/news/*.md` — お知らせ本文(Markdown, frontmatterで`title`/`date`/`category`を指定)
- `content/newspaper/*.md` — 矢張市新聞本文(Markdown, frontmatterで`issue`/`type`(定期号/号外)/`title`/`date`を指定)
- `content/column/*.md` — 市長コラム本文(Markdown, frontmatterで`title`/`date`を指定)

## 機能

- お知らせはMarkdownファイル(`content/news/`)で管理し、`react-markdown`でレンダリング
- 矢張市新聞(`/newspaper`) — `content/newspaper/*.md`で管理する月刊新聞。`type`フィールドで定期号/号外を区別し、号外は赤バッジで表示。お知らせと同じ「一覧は抜粋+リンク、詳細ページに全文+Article JSON-LD」の構成
- サイト内検索(`/search`) — お知らせとページをキーワードで検索(ヘッダーの検索ボックスから利用可)
- サイトマップ(`/sitemap`)、よくある質問(`/faq`)
- Discordウィジェット(`/access`) — `widget.json`から取得した実際のオンライン人数・メンバーアバターを表示(`lib/discord.ts`、60秒キャッシュ)
- 総合窓口AIチャットボット(全ページ右下) — ルールベースの簡易チャット。「お腹すいた」に反応、それ以外はランダムな部署にたらい回し、20時〜8時はsleepモード
- 各種申請窓口(`/applications`) — `lib/applications.ts`の配列に追加するだけで申請フォームを増やせる設計。申請後はお役所風の処理アニメーション→申請番号(`YHR-2026-XXXX-XXXX-WORD-XXX`形式)発行→証明書PNGをダウンロード可能。現実逃避の一時渡航届・ピン留ミアン登録・推し活休暇申請・二度寝許可証・VC耐久参加証明書を収録
- 市民証発行(`/citizen-card`) — 氏名・所属期(クォーター)・加入日を入力し、市章入りの市民証(Canvas描画PNG)をその場で発行。証明写真は任意でアップロードでき、`react-easy-crop`による移動・ズームのトリミングUIで位置調整してから合成できる
- 条例集(`/ordinances`) — `lib/ordinances.ts`の配列で条例番号・条文(第○条・号)・改正履歴を管理。キーワードによる全文検索付き(`components/OrdinanceSearch.tsx`)
- 人事異動情報(`/personnel`) — `lib/personnel.ts`の配列で辞令(就任・異動・退任・新設)を管理。`/personnel/[id]`で正式な辞令書面を表示し、印刷専用CSS(`.print-area`, `app/globals.css`)経由でPDF保存・印刷が可能
- 市民活動団体登録(`/groups`) — 登録団体一覧をPostgreSQL(Prisma経由)から取得して表示。新規登録は`/applications/group-registration`のServer Action(`registerGroup`)がDBへ書き込む
- 市長コラム(`/column`) — `content/column/*.md`で管理する市長のブログ。`/about`に市長プロフィールと「市長の一言コーナー」も追加
- 部署一覧(`/departments`) — `lib/content.ts`の`DEPARTMENTS`配列(MascotChatbotのたらい回し先と共通データ)を一覧表示
- 殿堂入り(`/legends`) — `lib/content.ts`の`LEGEND_RECORDS`配列を手動キュレーションで管理する伝説的記録集
- 市民の声フォーム(`/contact`) — `app/contact/actions.ts`のServer ActionがDiscord Webhook(`DISCORD_FEEDBACK_WEBHOOK_URL`)へ送信する実用フォーム。honeypotフィールドと表示後3秒未満の送信拒否でボット対策、`lib/moderation.ts`がGemini(既定では`gemini-2.5-flash`、`GEMINI_API_KEY`が必要)に投稿内容を判定させ、暴言・差別的表現が含まれる場合は送信前に拒否(APIキー未設定またはAPI呼び出し失敗時も安全側に倒して送信を拒否する)
- 404 (`not-found.tsx`) / 500 (`error.tsx`) / 読み込み中 (`loading.tsx`) のカスタムページ
- Xの「#矢張市最高の瞬間」ハッシュタグタイムライン埋め込み・実際のスクリーンショット掲載(`/pictures`)
- ホームのCarousel(`motion`によるクロスフェード、サムネイルプレビュー、一時停止操作付き)
- 「Discordに参加」ボタンは共通で`/discord`に集約し、`next.config.ts`の`redirects()`で実際のDiscord招待リンクに転送(招待リンクが変わった場合はそこだけ更新すればよい)

### 矢張市防災ポータル(`/bosai`)

気象庁が公開している防災情報JSON(地図表示等に使われている無認証の公開エンドポイント。正式な開発者向けAPIではないため将来仕様変更で動作しなくなる可能性があります)を取得し、全国の地震・津波・警報注意報を表示します。

- 地震情報・津波情報: `lib/jma.ts`がServer Componentから直接取得(`cache: "no-store"`で常に最新を取得)
- 地震マップ: `react-leaflet`(OpenStreetMap)で震源を地図上に表示。SSR非対応のため`next/dynamic({ ssr: false })`で読み込み
- 警報・注意報: 都道府県・地域を選択すると`app/bosai/actions.ts`のServer Actionが該当エリアの警報注意報を取得。警報コード→名称の対応表は気象庁防災情報XMLフォーマット「警報等情報要素コード管理表」を出典として`lib/jma.ts`の`WARNING_CODES`に転記
- 避難所情報: 全国統一のリアルタイムAPIが存在しないため、国土地理院・内閣府・Yahoo!地図の公的な避難所検索サービスへのリンクを掲載
- 日本気象協会(JWA)のWeather APIは法人向け有料サービスでAPIキーが必要なため、本実装では連携していません

### SEO

- `metadataBase`・OGP・Twitter Card・JSON-LD(Organization / WebSite+SearchAction / BreadcrumbList / FAQPage / Article)
- お知らせは`/news/[slug]`で個別URL・個別メタデータ・Article JSON-LDを持つ(一覧`/news`は抜粋+リンクのみ)
- `/sitemap.xml`(`app/sitemap.ts`、お知らせ・市長コラム・条例・人事異動・申請ページなどを含む全URLを`changeFrequency`/`priority`/実日付の`lastModified`付きで出力)、`/robots.txt`(`app/robots.ts`)、`/manifest.webmanifest`(`app/manifest.ts`)、お知らせ・市長コラムRSS(`/feed.xml`、各記事へのパーマリンク付き)
- 各ページの`description`/`canonical`は`lib/content.ts`の`pageMetadata()`/`buildMetadata()`で一元管理
- 検索結果ページ(`/search?q=`)は`robots: { index: false }`で重複コンテンツ化を回避

### アクセシビリティ

- スキップリンク、ランドマーク(`aria-label`)、現在地の`aria-current`
- 文字サイズ変更(保存される)、高コントラスト表示への切り替え、ページ読み上げ、Google翻訳リンク(ヘッダー右上「アクセシビリティ」メニュー)
- カルーセルは`prefers-reduced-motion`に対応し、一時停止操作とホバー/フォーカス時の自動停止に対応(WCAG 2.2.2)
- 配色はWCAG AA(コントラスト比4.5:1以上)を目安に調整
- アクセシビリティ方針(`/accessibility`)、個人情報保護方針(`/privacy`)、このサイトについて(`/terms`)

## コンテナ / Kubernetes

`Dockerfile`はマルチステージ構成で、ビルド・実行ともにBunを使用します。

- `runner`(既定ターゲット) — アプリ本体を実行する軽量イメージ
- `migrator` — `bunx prisma migrate deploy`を実行するイメージ(Prisma CLIを含む。k8sのマイグレーションJobから利用)

### ローカルでの動作確認(`docker-compose.yaml`)

```bash
docker compose up --build       # postgres + appを起動
docker compose run --rm migrate # スキーマ変更時に実行(初回起動時も必要)
```

`.env`の`DISCORD_FEEDBACK_WEBHOOK_URL`/`GEMINI_API_KEY`を読み込み、`DATABASE_URL`は`postgres`サービスを指すように上書きされます(ローカルの`.env`に書いた`DATABASE_URL`の値は使われません)。

### Podmanでのビルド・プッシュ(Docker Hub)

```bash
# アプリ本体イメージ
podman build --target runner -t docker.io/kemar1/yahari-city:vX.Y.Z .
podman push docker.io/kemar1/yahari-city:vX.Y.Z

# マイグレーション用イメージ
podman build --target migrator -t docker.io/kemar1/yahari-city-migrate:vX.Y.Z .
podman push docker.io/kemar1/yahari-city-migrate:vX.Y.Z
```

GitHub Actions(`.github/workflows/docker-publish.yml`)は`vX.Y.Z`形式のタグがpushされたときに、上記と同じ2つのイメージをDocker Hubへ自動的にビルド・プッシュします(Podmanはローカル開発・手動ビルド用)。リポジトリの Settings → Secrets and variables → Actions に `DOCKERHUB_USERNAME` / `DOCKERHUB_TOKEN`(Docker Hubのアクセストークン)を設定してください。

CIでは2イメージを`docker buildx build`で個別にビルドする代わりに、`docker-bake.hcl`(`app`/`migrator`の2ターゲットを定義)を`docker/bake-action`で1回のビルドグラフとしてビルドします。`deps`/`builder`など共有ステージの実行・キャッシュ往復が1回分減るため、2回個別にビルドするより速くなります。

プッシュ後、両イメージは[cosign](https://docs.sigstore.dev/)でkeyless署名されます(GitHub ActionsのOIDCを使うSigstore方式のため、鍵の管理は不要)。検証する場合:

```bash
cosign verify docker.io/kemar1/yahari-city:vX.Y.Z \
  --certificate-identity-regexp "^https://github.com/OWNER/REPO/.github/workflows/docker-publish.yml@refs/tags/v.+$" \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

(`OWNER/REPO`は実際にこのワークフローが動くGitHubリポジトリへ書き換える)

### Kubernetesマニフェスト(`k8s/`)

- `namespace.yaml` — `yahari-city`Namespace
- `postgres.yaml` — PostgreSQL 18のStatefulSet(PVC付き)とヘッドレスService
- `secret.yaml` / `postgres-secret.yaml` — 平文のSecretテンプレート(**gitignore対象。値を埋めてkubesealで`k8s/sealed/`配下に変換した後は、このファイル自体はコミットしない**)
- `sealed/sealedsecret.yaml` / `sealed/sealedpostgres-secret.yaml` — 上記2つをkubesealで暗号化した結果(これをコミットし、`kustomization.yaml`もこちらを参照する)
- `migration-job.yaml` — `migrator`イメージで`prisma migrate deploy`を実行するJob
- `deployment.yaml` / `service.yaml` — アプリ本体のDeployment(`/api/health`でlive/readyを判定)とService
- `ingress.yaml` — Ingress(Traefik + cert-manager想定。`letsencrypt-prod`という名前のClusterIssuerがクラスタ側に既に存在することを前提とする。このリポジトリではClusterIssuer自体は管理しない)
- `kustomization.yaml` — 上記をまとめて適用する。デプロイするバージョンを上げる際は`images`の`newTag`を手動で書き換える(自動更新ツールは使わない運用)

シークレットの更新手順:

```bash
# 1. k8s/secret.yaml, k8s/postgres-secret.yaml に実際の値を書く(このファイルはコミットしない)
# 2. kubesealで暗号化する(sealed-secrets controllerの公開鍵を使用)
kubeseal --format=yaml --cert=k8s/sealed/cert.pem < k8s/secret.yaml > k8s/sealed/sealedsecret.yaml
kubeseal --format=yaml --cert=k8s/sealed/cert.pem < k8s/postgres-secret.yaml > k8s/sealed/sealedpostgres-secret.yaml
# 3. k8s/sealed/配下の2ファイルをコミットする(暗号化済みなので安全)
```

適用前に、各マニフェスト内の`docker.io/kemar1/yahari-city`を実際のイメージ名に書き換えてください。

```bash
kubectl apply -k k8s/
kubectl apply -f k8s/migration-job.yaml   # スキーマ変更時は再適用する(既存Jobの削除が必要な場合あり)
```

## 公開前に置き換えが必要なもの

- `lib/content.ts` の `SITE.url` — 実際に公開するドメイン(metadataBase / OGP / サイトマップ / RSSで使用)
- `content/news/*.md`・`HISTORY_EVENTS`の日付・内容は架空のサンプルです
- `public/` 内の写真ギャラリー用の実際の画像
- `/contact`(市民の声フォーム)を使う場合は、Discordサーバーの「サーバー設定 → 連携サービス → ウェブフック」で新規ウェブフックを作成し、そのURLを`.env.local`に`DISCORD_FEEDBACK_WEBHOOK_URL=...`として設定してください(`.env.local.example`参照)。加えて、投稿内容のモデレーション(Gemini 1.5 Pro)に使う`GEMINI_API_KEY`を[Google AI Studio](https://aistudio.google.com/app/apikey)で発行し設定してください。いずれか未設定のままでもサイトはクラッシュせず、フォームが「準備中」エラーを返すだけです
- `/groups`・`/applications/group-registration`・記事コメント機能を使う場合は、PostgreSQL 18を用意して`DATABASE_URL`を設定し、`bunx prisma migrate deploy`(本番)または`bunx prisma migrate dev`(開発時)でスキーマを反映してください(`.env.local.example`参照)。未設定の場合、これらのページはエラーメッセージを表示します
- 記事コメント機能(`/news`, `/column`)の荒らし対策には[Cloudflare Turnstile](https://dash.cloudflare.com/)のサイトキーを発行し、`NEXT_PUBLIC_TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY`を設定してください(`.env.local.example`参照)。未設定の場合、ウィジェットは「準備中」と表示され投稿は常に拒否されます
- `k8s/ingress.yaml`のホスト名、`k8s/secret.yaml`/`k8s/postgres-secret.yaml`の`CHANGE_ME`(値を埋めたらkubesealで`k8s/sealed/`に変換する。`NEXT_PUBLIC_TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY`も同様に追加が必要)
