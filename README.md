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

## 構成

- `app/` — 各ページ(ホーム / about / history / pictures / news / access / faq / search / sitemap / accessibility / privacy / terms / bosai / applications)
- `components/` — Header, Footer, Carousel, AccessibilityMenu, WarningLookup, EarthquakeMap, ApplicationForm, MascotChatbot, Markdown, DiscordWidget, XHashtagFeed など共通コンポーネント
- `lib/content.ts` — 市の基礎データ・沿革・サイトマップ用ページ一覧・`pageMetadata()`ヘルパー
- `lib/news.ts` — `content/news/*.md` を読み込むお知らせ取得関数
- `lib/faq.ts` — よくある質問のデータ
- `lib/jma.ts` — 気象庁の公開JSONを取得するユーティリティ(防災ポータル用)
- `lib/discord.ts` — Discordウィジェット(widget.json)を取得するユーティリティ
- `lib/applications.ts` — 申請フォームの定義一覧・申請番号生成
- `lib/certificate.ts` — Canvasで証明書PNGを描画するユーティリティ
- `content/news/*.md` — お知らせ本文(Markdown, frontmatterで`title`/`date`/`category`を指定)

## 機能

- お知らせはMarkdownファイル(`content/news/`)で管理し、`react-markdown`でレンダリング
- サイト内検索(`/search`) — お知らせとページをキーワードで検索(ヘッダーの検索ボックスから利用可)
- サイトマップ(`/sitemap`)、よくある質問(`/faq`)
- Discordウィジェット(`/access`) — `widget.json`から取得した実際のオンライン人数・メンバーアバターを表示(`lib/discord.ts`、60秒キャッシュ)
- 総合窓口AIチャットボット(全ページ右下) — ルールベースの簡易チャット。「お腹すいた」に反応、それ以外はランダムな部署にたらい回し、20時〜8時はsleepモード
- 各種申請窓口(`/applications`) — `lib/applications.ts`の配列に追加するだけで申請フォームを増やせる設計。申請後はお役所風の処理アニメーション→申請番号(`YHR-2026-XXXX-XXXX-WORD-XXX`形式)発行→証明書PNGをダウンロード可能。第一弾は「現実逃避の一時渡航届」
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

- `metadataBase`・OGP・Twitter Card・JSON-LD(Organization / WebSite+SearchAction / BreadcrumbList / FAQPage)
- `/sitemap.xml`(`app/sitemap.ts`)、`/robots.txt`(`app/robots.ts`)、お知らせRSS(`/feed.xml`)
- 各ページの`description`/`canonical`は`lib/content.ts`の`pageMetadata()`で一元管理

### アクセシビリティ

- スキップリンク、ランドマーク(`aria-label`)、現在地の`aria-current`
- 文字サイズ変更(保存される)、高コントラスト表示への切り替え、ページ読み上げ、Google翻訳リンク(ヘッダー右上「アクセシビリティ」メニュー)
- カルーセルは`prefers-reduced-motion`に対応し、一時停止操作とホバー/フォーカス時の自動停止に対応(WCAG 2.2.2)
- 配色はWCAG AA(コントラスト比4.5:1以上)を目安に調整
- アクセシビリティ方針(`/accessibility`)、個人情報保護方針(`/privacy`)、このサイトについて(`/terms`)

## 公開前に置き換えが必要なもの

- `lib/content.ts` の `SITE.url` — 実際に公開するドメイン(metadataBase / OGP / サイトマップ / RSSで使用)
- `content/news/*.md`・`HISTORY_EVENTS`の日付・内容は架空のサンプルです
- `public/` 内の写真ギャラリー用の実際の画像
