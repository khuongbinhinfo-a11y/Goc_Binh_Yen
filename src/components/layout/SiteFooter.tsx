"use client";

import Image from "next/image";

import { useLocale } from "@/hooks/useLocale";

type FooterGroupType = "explore" | "companion";
type FooterLinkIconId =
  | "home"
  | "poetry"
  | "stories"
  | "spiritual"
  | "contact"
  | "facebook"
  | "bookcase"
  | "support";

function FooterGroupIcon({ type }: { type: FooterGroupType }) {
  if (type === "companion") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path
          d="M10 16 4.6 10.8a3.3 3.3 0 1 1 4.7-4.7L10 6.9l.7-.8a3.3 3.3 0 1 1 4.7 4.7L10 16Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
      <path d="M5 15.3h10M6.7 14.5V5.8a1 1 0 0 1 1-1h6.6a1 1 0 0 1 1 1v8.7H6.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8.7 7.6h4.8M8.7 9.8h4.8M8.7 12h3.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FooterLinkIcon({ id }: { id: FooterLinkIconId }) {
  if (id === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path d="M11.8 6.2h2V3.5h-2.3c-2.1 0-3.4 1.2-3.4 3.4V9H6v2.6h2v4.9h2.7v-4.9h2.3l.4-2.6h-2.7V7.2c0-.7.3-1 1.1-1Z" fill="currentColor" />
      </svg>
    );
  }

  if (id === "bookcase") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path d="M4.5 15.5h11M6 14.5V5.4a.9.9 0 0 1 .9-.9h2v10H6ZM11 14.5v-8a.9.9 0 0 1 .9-.9h2.1v8.9H11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "support") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path d="M10 15.7 5 10.9a3 3 0 1 1 4.2-4.3L10 7.4l.8-.8a3 3 0 1 1 4.2 4.3l-5 4.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    );
  }

  if (id === "contact") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none">
        <path d="M4 5.8a1.6 1.6 0 0 1 1.6-1.6h8.8A1.6 1.6 0 0 1 16 5.8v8.4a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 14.2V5.8Z" stroke="currentColor" strokeWidth="1.4" />
        <path d="m5.5 7 4.5 3.4L14.5 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="none">
      <path d="m7.5 6.5 5 3.5-5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SiteFooter() {
  const { locale, t } = useLocale();

  return (
    <footer className="border-t border-[#d7b89b]/80 bg-[#efe2d4] py-14 sm:py-16">
      <div className="site-shell">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.85fr]">
          <div>
            <a href="/#trang-chu" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo-4.jpg"
                alt={`Logo ${t.brandName}`}
                width={46}
                height={46}
                className="h-11 w-11 rounded-xl border border-[#d8b89b] object-cover"
              />
              <h3 className="text-4xl text-[#4a2f20]">{t.brandName}</h3>
            </a>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#654939] sm:text-base">{t.footer.description}</p>

            <div className="mt-5 rounded-2xl border border-[#d8b89b]/80 bg-[#f6ecdf]/75 p-4">
              <div className="flex items-center gap-3 text-[#8b5e3c]">
                <svg aria-hidden="true" viewBox="0 0 120 20" className="h-4 w-28" fill="none">
                  <path
                    d="M2 10c7-6 14-6 21 0s14 6 21 0 14-6 21 0 14 6 21 0 14-6 21 0"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[11px] uppercase tracking-[0.14em]">{t.footer.decorativeNote}</span>
              </div>
            </div>
          </div>

          <nav aria-label={locale === "vi" ? "Khám phá nội dung" : "Explore links"}>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6449]">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f2dfcb] text-[#785239]">
                <FooterGroupIcon type="explore" />
              </span>
              <span>{t.footer.exploreTitle}</span>
            </p>
            <ul className="space-y-2.5">
              {t.footer.exploreLinks.map((item) => (
                <li key={`${item.id}-${item.href}`}>
                  <a
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm text-[#6c4a37] transition hover:text-[#8b5e3c] sm:text-base"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f3e3d2] text-[#8b5f3e]">
                      <FooterLinkIcon id={item.id} />
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={locale === "vi" ? "Đồng hành cùng Hồn Thơ" : "Companion links"}>
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6449]">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f2dfcb] text-[#785239]">
                <FooterGroupIcon type="companion" />
              </span>
              <span>{t.footer.companionTitle}</span>
            </p>
            <ul className="space-y-2.5">
              {t.footer.companionLinks.map((item) => (
                <li key={`${item.id}-${item.href}`}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm text-[#6c4a37] transition hover:text-[#8b5e3c] sm:text-base"
                  >
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#f3e3d2] text-[#8b5f3e]">
                      <FooterLinkIcon id={item.id} />
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#d8b89b]/70 pt-4 text-xs text-[#8d6b54] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {t.brandName}. {t.footer.rights}
          </span>
          <span className="text-right">{t.footer.by}</span>
        </div>
      </div>
    </footer>
  );
}
