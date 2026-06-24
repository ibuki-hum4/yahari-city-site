export interface ChangelogEntry {
  version: string;
  date: string;
  highlights: string[];
}

// サイト自体の更新履歴。新しいバージョンをリリースしたら配列の先頭に追加する(新しい順)。
export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "v1.2.1",
    date: "2026年6月24日",
    highlights: [
      "サイトマップ(sitemap.xml)の優先度・更新頻度を新ページ分も含めて整理",
      "更新情報RSS(feed.xml)に市長コラムも含めるよう拡張",
      "コンテナイメージのビルド・プッシュをdocker buildx bakeに変更して高速化",
    ],
  },
  {
    version: "v1.2.0",
    date: "2026年6月24日",
    highlights: [
      "観光スポット(/spots)を追加",
      "更新履歴(/changelog)を追加",
      "フォトギャラリー・殿堂入り・沿革に新記録(293時間56分19秒の耐久VC)と創立4か月の節目を追加",
    ],
  },
  {
    version: "v1.1.1",
    date: "2026年6月23日",
    highlights: ["コンテナイメージの署名(cosign)に使うGitHub Actionsの設定を修正"],
  },
  {
    version: "v1.1.0",
    date: "2026年6月23日",
    highlights: [
      "市民活動団体登録(/groups)の各団体に「編集」「削除」機能を追加(管理パスワードで保護)",
      "コンテナビルドの不具合を修正(コンテンツファイルの欠落、next/imageの最適化エラー)",
    ],
  },
  {
    version: "v1.0.1",
    date: "2026年6月23日",
    highlights: [
      "市民証発行に証明写真のアップロード・トリミング機能を追加",
      "条例集・人事異動情報・市民活動団体登録・市長コラムを新設",
      "市民活動団体の情報をPostgreSQL(Prisma経由)で管理するように変更",
      "Docker・Kubernetesマニフェスト・GitHub Actions(CodeQL・Lint・コンテナビルド)を整備",
    ],
  },
  {
    version: "v1.0.0",
    date: "2026年6月23日",
    highlights: ["矢張市公式サイトを正式リリース"],
  },
];
