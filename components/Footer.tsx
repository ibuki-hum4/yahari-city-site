import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-yahari-navy-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image src={SITE.logo} alt={`${SITE.name}章`} width={32} height={32} />
            <span className="text-lg font-bold">{SITE.name}</span>
          </div>
          <p className="mt-3 text-sm text-white/70">{SITE.slogan}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/80">ページ一覧</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/80">各種情報</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/newspaper" className="hover:text-white hover:underline">
                矢張市新聞
              </Link>
            </li>
            <li>
              <Link href="/column" className="hover:text-white hover:underline">
                市長コラム
              </Link>
            </li>
            <li>
              <Link href="/departments" className="hover:text-white hover:underline">
                部署一覧
              </Link>
            </li>
            <li>
              <Link href="/ordinances" className="hover:text-white hover:underline">
                条例集
              </Link>
            </li>
            <li>
              <Link href="/personnel" className="hover:text-white hover:underline">
                人事異動情報
              </Link>
            </li>
            <li>
              <Link href="/groups" className="hover:text-white hover:underline">
                市民活動団体登録
              </Link>
            </li>
            <li>
              <Link href="/legends" className="hover:text-white hover:underline">
                殿堂入り
              </Link>
            </li>
            <li>
              <Link href="/spots" className="hover:text-white hover:underline">
                観光スポット
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:underline">
                市民の声
              </Link>
            </li>
            <li>
              <Link href="/changelog" className="hover:text-white hover:underline">
                更新履歴
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-white hover:underline">
                サイト内検索
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-white hover:underline">
                サイトマップ
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white hover:underline">
                ウェブアクセシビリティについて
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white hover:underline">
                個人情報保護方針
              </Link>
            </li>
            <li>
              <a href="/feed.xml" className="hover:text-white hover:underline">
                お知らせ・コラムRSS
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/80">
            <Link href="/terms" className="hover:text-white hover:underline">
              このサイトについて
            </Link>
          </h3>
          <p className="mt-3 text-sm text-white/70">
            {SITE.name}は、Discord上で活動する架空のコミュニティです。実在する地方公共団体とは一切関係ありません。
          </p>
          <Link href="/terms" className="mt-2 inline-block text-sm text-white/70 underline hover:text-white">
            著作権・リンクについて
          </Link>
          <a
            href="https://uniproject.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 opacity-90 transition hover:opacity-100"
          >
            <Image src="/powered_by_unipro_ol.svg" alt="Powered by UniProject" width={140} height={38} className="h-[26px] w-auto" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/70">
        © {SITE.foundedYear} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
