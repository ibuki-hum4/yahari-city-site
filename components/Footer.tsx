import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS, SITE } from "@/lib/content";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Nav");

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
          <h3 className="text-sm font-semibold text-white/80">{t("pageList")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {tNav(link.href)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/80">{t("otherInfo")}</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/newspaper" className="hover:text-white hover:underline">
                {t("newspaper")}
              </Link>
            </li>
            <li>
              <Link href="/column" className="hover:text-white hover:underline">
                {t("column")}
              </Link>
            </li>
            <li>
              <Link href="/departments" className="hover:text-white hover:underline">
                {t("departments")}
              </Link>
            </li>
            <li>
              <Link href="/ordinances" className="hover:text-white hover:underline">
                {t("ordinances")}
              </Link>
            </li>
            <li>
              <Link href="/personnel" className="hover:text-white hover:underline">
                {t("personnel")}
              </Link>
            </li>
            <li>
              <Link href="/groups" className="hover:text-white hover:underline">
                {t("groups")}
              </Link>
            </li>
            <li>
              <Link href="/legends" className="hover:text-white hover:underline">
                {t("legends")}
              </Link>
            </li>
            <li>
              <Link href="/spots" className="hover:text-white hover:underline">
                {t("spots")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white hover:underline">
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link href="/changelog" className="hover:text-white hover:underline">
                {t("changelog")}
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:text-white hover:underline">
                {t("search")}
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="hover:text-white hover:underline">
                {t("sitemap")}
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="hover:text-white hover:underline">
                {t("accessibility")}
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white hover:underline">
                {t("privacy")}
              </Link>
            </li>
            <li>
              <a href="/feed.xml" className="hover:text-white hover:underline">
                {t("rss")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/80">
            <Link href="/terms" className="hover:text-white hover:underline">
              {t("aboutSite")}
            </Link>
          </h3>
          <p className="mt-3 text-sm text-white/70">
            {t("aboutSiteBody", { name: SITE.name })}
          </p>
          <Link href="/terms" className="mt-2 inline-block text-sm text-white/70 underline hover:text-white">
            {t("copyrightLink")}
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

      <Separator className="bg-white/10" />
      <div className="px-4 py-4 text-center text-xs text-white/70">
        © {SITE.foundedYear} {SITE.name}. {t("rights")}
      </div>
    </footer>
  );
}
