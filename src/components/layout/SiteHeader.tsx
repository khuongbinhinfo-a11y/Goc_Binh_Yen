"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Locale } from "@/data/i18n";
import { useLocale } from "@/hooks/useLocale";
import { getSafeImageSrc } from "@/lib/image";

function LocaleSwitch({
  locale,
  setLocale,
  compact = false,
}: {
  locale: Locale;
  setLocale: (value: Locale) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full border border-[#d7b99d]/80 bg-[#fffaf4]/80 p-0.5 ${
        compact ? "gap-0" : "gap-0.5"
      }`}
    >
      {(["vi", "en"] as Locale[]).map((item) => {
        const isActive = locale === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            aria-pressed={isActive}
            className={`rounded-full font-semibold transition ${
              compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-[11px]"
            } ${
              isActive
                ? "bg-[#6f472e] text-[#fffaf5] shadow-sm"
                : "text-[#775641] hover:bg-[#f2e2d2] hover:text-[#4d3324]"
            }`}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

function AppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m15.7 8.3-2.1 5.3-5.3 2.1 2.1-5.3 5.3-2.1Z" />
    </svg>
  );
}

function HeartIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className={className} fill="none">
      <path
        d="M10 15.7 5 10.9a3 3 0 1 1 4.2-4.3L10 7.4l.8-.8a3 3 0 1 1 4.2 4.3l-5 4.8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const appHubUrl = "https://app.hontho.com";
  const supportUrl = "/ung-ho";
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("#trang-chu");

  const menuLabel = locale === "vi" ? "Mở menu" : "Open menu";
  const closeLabel = locale === "vi" ? "Đóng menu" : "Close menu";
  const mobileNavLabel = locale === "vi" ? "Điều hướng mobile" : "Mobile navigation";
  const mainNavLabel = locale === "vi" ? "Điều hướng chính" : "Main navigation";
  const appLabel = locale === "vi" ? "Ứng dụng" : "Apps";

  useEffect(() => {
    const updateCurrentHash = () => {
      setCurrentHash(window.location.hash || "#trang-chu");
    };

    updateCurrentHash();
    window.addEventListener("hashchange", updateCurrentHash);

    return () => {
      window.removeEventListener("hashchange", updateCurrentHash);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = useMemo(() => t.nav.items, [t.nav.items]);

  const isItemActive = (href: string) => {
    if (href === "/doc-tho") {
      return pathname === "/doc-tho" || pathname.startsWith("/doc-tho/");
    }

    if (href === "/ke-chuyen") {
      return pathname === "/ke-chuyen" || pathname.startsWith("/ke-chuyen/");
    }

    if (href === "/tam-linh") {
      return pathname === "/tam-linh" || pathname.startsWith("/tam-linh/");
    }

    if (href === "/huyen-mon-tham-khao") {
      return pathname === "/huyen-mon-tham-khao" || pathname.startsWith("/huyen-mon-tham-khao/");
    }

    if (href.startsWith("/#")) {
      const targetHash = href.slice(1);
      return pathname === "/" && (currentHash || "#trang-chu") === targetHash;
    }

    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#d8c0a8]/75 bg-[#f7efe5]/95 shadow-[0_1px_10px_rgba(74,47,32,0.04)] backdrop-blur-md">
      <div className="site-shell">
        <div className="flex min-h-[68px] items-center justify-between gap-3 lg:hidden">
          <a
            href="/#trang-chu"
            className="group flex min-w-0 items-center gap-2.5 hover:no-underline"
            onClick={closeMobileMenu}
          >
            <Image
              src={getSafeImageSrc("/logo.jpg")}
              alt={`Logo ${t.brandName}`}
              width={42}
              height={42}
              className="h-10 w-10 rounded-xl border border-[#d6b99e] object-cover shadow-[0_5px_14px_rgba(74,47,32,0.1)]"
              priority
            />
            <span className="truncate text-[26px] font-semibold leading-none text-[#4a2f20] transition group-hover:text-[#70472f]">
              {t.brandName}
            </span>
          </a>

          <div className="flex shrink-0 items-center gap-2">
            <LocaleSwitch locale={locale} setLocale={setLocale} compact />
            <button
              type="button"
              aria-label={isMobileMenuOpen ? closeLabel : menuLabel}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d6b99e] bg-[#fffaf4]/75 text-[#5b3e2c] transition hover:bg-[#f1e1d1]"
            >
              {isMobileMenuOpen ? (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-nav-panel" className="pb-3 lg:hidden">
            <nav
              aria-label={mobileNavLabel}
              className="rounded-2xl border border-[#d8bea5] bg-[#fffaf4] p-2.5 shadow-[0_16px_34px_rgba(74,47,32,0.12)]"
            >
              <div className="grid gap-1">
                {navItems.map((item) => {
                  const isActive = isItemActive(item.href);
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={closeMobileMenu}
                      className={`rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                        isActive
                          ? "bg-[#efe0d0] text-[#482f20]"
                          : "text-[#654735] hover:bg-[#f6e9dc] hover:text-[#482f20]"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[#e6d2bd] pt-2">
                <a
                  href={appHubUrl}
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#d8bea5] bg-[#fffdf9] px-3 py-2.5 text-sm font-semibold text-[#684833] transition hover:bg-[#f5e7d9]"
                >
                  <AppIcon />
                  {appLabel}
                </a>
                <a
                  href={supportUrl}
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6f472e] px-3 py-2.5 text-sm font-semibold text-[#fffaf5] transition hover:bg-[#5e3b27]"
                >
                  <HeartIcon />
                  {t.nav.support}
                </a>
              </div>
            </nav>
          </div>
        )}

        <div className="hidden h-[76px] items-center gap-6 lg:flex">
          <a
            href="/#trang-chu"
            className="group flex shrink-0 items-center gap-2.5 hover:no-underline"
          >
            <Image
              src={getSafeImageSrc("/logo.jpg")}
              alt={`Logo ${t.brandName}`}
              width={46}
              height={46}
              className="h-11 w-11 rounded-xl border border-[#d6b99e] object-cover shadow-[0_5px_14px_rgba(74,47,32,0.1)]"
              priority
            />
            <span className="text-[28px] font-semibold leading-none tracking-[-0.02em] text-[#4a2f20] transition group-hover:text-[#70472f] xl:text-[30px]">
              {t.brandName}
            </span>
          </a>

          <nav
            aria-label={mainNavLabel}
            className="flex min-w-0 flex-1 items-center justify-center gap-4 text-[13.5px] xl:gap-7 xl:text-[15px]"
          >
            {navItems.map((item) => {
              const isActive = isItemActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative whitespace-nowrap py-2 font-medium tracking-[0.005em] transition ${
                    isActive ? "text-[#452c1e]" : "text-[#684a37] hover:text-[#452c1e]"
                  } after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-center after:rounded-full after:bg-[#8b5e3c] after:transition-transform ${
                    isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LocaleSwitch locale={locale} setLocale={setLocale} />
            <a
              href={appHubUrl}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#d5b79b] bg-[#fffaf4]/65 px-3 text-[12px] font-semibold text-[#6a4934] transition hover:bg-[#efe0d0] hover:text-[#4d3324]"
            >
              <AppIcon className="h-3.5 w-3.5" />
              {appLabel}
            </a>
            <a
              href={supportUrl}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#6f472e] px-3.5 text-[12px] font-semibold text-[#fffaf5] shadow-[0_4px_12px_rgba(74,47,32,0.08)] transition hover:bg-[#5e3b27]"
            >
              <HeartIcon className="h-3.5 w-3.5" />
              {t.nav.support}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
