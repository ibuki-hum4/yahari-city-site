// 管理者操作(団体登録の編集・削除、コメント削除等)で共通利用するパスワード照合。
export function isAdminSecretValid(adminSecret: string): boolean {
  const expected = process.env.ADMIN_SECRET;
  return Boolean(expected) && adminSecret === expected;
}
