"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FACEBOOK_URL, YOUTUBE_URL } from "@/data/homepageData";
import { Locale } from "@/data/i18n";
import { useLocale } from "@/hooks/useLocale";

function PenIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M7 17.5 17.2 7.3a1.8 1.8 0 0 0 0-2.5l-.6-.6a1.8 1.8 0 0 0-2.5 0L4 14.4V20h5.6l1.4-1.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VoiceIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 15a3 3 0 0 0 3-3V8a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 11.8a5 5 0 1 0 10 0M12 16.8V20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a20.2 20.2 0 0 0-2.5-.1c-2.5 0-4.1 1.5-4.1 4.3V10H7.5v3h2.6v8h3.3Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
      <path d="M21.2 8.5a2.8 2.8 0 0 0-2-2c-1.8-.5-7.2-.5-7.2-.5s-5.4 0-7.2.5a2.8 2.8 0 0 0-2 2C2.3 10.3 2.3 12 2.3 12s0 1.7.5 3.5a2.8 2.8 0 0 0 2 2c1.8.5 7.2.5 7.2.5s5.4 0 7.2-.5a2.8 2.8 0 0 0 2-2c.5-1.8.5-3.5.5-3.5s0-1.7-.5-3.5ZM10.2 14.5V9.5l4.6 2.5-4.6 2.5Z" />
    </svg>
  );
}

function LocaleSwitch({
  locale,
  setLocale,
  compact = false,
}: {
  locale: Locale;
  setLocale: (value: Locale) => void;
  compact?: boolean;
}) {
  const baseClass = compact
    ? "rounded-full px-2 py-1 text-[10px] font-semibold"
    : "rounded-full px-2.5 py-1 text-[11px] font-semibold";

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#d8b89b] bg-[#fff9f1] p-1">
      {(["vi", "en"] as Locale[]).map((item) => {
        const isActive = locale === item;
        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            className={`${baseClass} transition ${
              isActive ? "bg-[#8b5e3c] text-white" : "text-[#6b4a35] hover:bg-[#f2e1cf]"
            }`}
          >
            {item.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export default function SiteHeader() {
  const poetMenuUrl = "https://www.hontho.com/tu-sach";
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("#trang-chu");

  const menuLabel = locale === "vi" ? "Mở menu" : "Open menu";
  const closeLabel = locale === "vi" ? "Đóng menu" : "Close menu";
  const mobileNavLabel = locale === "vi" ? "Điều hướng mobile" : "Mobile navigation";
  const mainNavLabel = locale === "vi" ? "Điều hướng chính" : "Main navigation";

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
      if (window.innerWidth >= 768) {
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
    <header className="sticky top-0 z-50 border-b border-[#ceb195]/70 bg-[#f3eadf]/88 backdrop-blur-sm">
      <div className="site-shell">
        <div className="flex items-center justify-between gap-3 py-2 md:hidden">
          <a href="/#trang-chu" className="group flex min-w-0 items-center gap-2.5" onClick={closeMobileMenu}>
            <Image
              src="/logo.jpg"
              alt={`Logo ${t.brandName}`}
              width={42}
              height={42}
              className="h-10 w-10 rounded-xl border border-[#d8b89b] object-cover shadow-[0_6px_14px_rgba(74,47,32,0.12)]"
              priority
            />
            <span className="truncate text-[27px] font-semibold leading-[1.1] text-[#4a2f20] transition group-hover:text-[#7b4d33]">
              {t.brandName}
            </span>
          </a>

          <div className="flex items-center gap-1.5">
            <LocaleSwitch locale={locale} setLocale={setLocale} compact />
            <button
              type="button"
              aria-label={isMobileMenuOpen ? closeLabel : menuLabel}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8b79b] bg-[#fff8ef]/85 text-[#5f4331] transition hover:bg-[#fff2e4]"
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

        <div className="mb-2 flex flex-wrap gap-1.5 pb-1 md:hidden">
          <a
            href={poetMenuUrl}
            className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2 py-0.5 text-[10.5px] font-medium text-[#73503a] transition hover:bg-[#f6e7d7] hover:text-[#4f3223]"
          >
            <PenIcon className="h-3 w-3" />
            {t.signature.poetry}
          </a>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2 py-0.5 text-[10.5px] font-medium text-[#73503a]">
            <VoiceIcon className="h-3 w-3" />
            {t.signature.voice}
          </span>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-nav-panel" className="pb-3 md:hidden">
            <nav
              aria-label={mobileNavLabel}
              className="rounded-2xl border border-[#d8b89b] bg-[#fff9f1] p-2 shadow-[0_14px_30px_rgba(74,47,32,0.14)]"
            >
              {navItems.map((item) => {
                const isActive = isItemActive(item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive ? "bg-[#f0dfcd] text-[#4a2f20]" : "text-[#5f4230] hover:bg-[#f6e7d7]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}

              <div className="mt-1.5 border-t border-[#e2c7ad] px-3 py-2.5">
                <LocaleSwitch locale={locale} setLocale={setLocale} />
              </div>

              <div className="mt-1 grid grid-cols-2 gap-2 px-1 pb-1">
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#dcc2a7] bg-[#fffdf9] px-3 py-2 text-sm font-semibold text-[#6f4c38] transition hover:bg-[#f6e7d7]"
                >
                  <FacebookIcon />
                  {t.nav.facebook}
                </a>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#dcc2a7] bg-[#fffdf9] px-3 py-2 text-sm font-semibold text-[#6f4c38] transition hover:bg-[#f6e7d7]"
                >
                  <YoutubeIcon />
                  {t.nav.youtube}
                </a>
              </div>
            </nav>
          </div>
        )}

        <div className="hidden min-h-[74px] items-center justify-between gap-4 py-2.5 md:flex">
          <a href="/#trang-chu" className="group flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt={`Logo ${t.brandName}`}
              width={58}
              height={58}
              className="h-[52px] w-[52px] rounded-2xl border border-[#d8b89b] object-cover shadow-[0_8px_18px_rgba(74,47,32,0.12)]"
              priority
            />
            <div>
              <div className="text-[29px] font-semibold leading-[1.1] text-[#4a2f20] transition group-hover:text-[#7b4d33]">
                {t.brandName}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] text-[#73503a]">
                <a
                  href={poetMenuUrl}
                  className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2.5 py-1 transition hover:bg-[#f6e7d7] hover:text-[#4f3223]"
                >
                  <PenIcon />
                  {t.signature.poetry}
                </a>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2.5 py-1">
                  <VoiceIcon />
                  {t.signature.voice}
                </span>
              </div>
            </div>
          </a>

          <div className="items-center gap-6 md:flex">
            <nav aria-label={mainNavLabel} className="flex items-center gap-6 text-[13.5px]">
              {navItems.map((item) => {
                const isActive = isItemActive(item.href);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative whitespace-nowrap pb-1 font-medium leading-none tracking-[0.01em] transition ${
                      isActive ? "text-[#4a2f20]" : "text-[#5f4230] hover:text-[#4a2f20]"
                    } after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:rounded-full after:bg-[#8b5e3c] after:transition-transform ${
                      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <LocaleSwitch locale={locale} setLocale={setLocale} />

            <div className="flex items-center gap-2">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d9bda3] bg-[#fffdf9]/80 px-3 py-1.5 text-[11px] font-semibold text-[#6f4c38] transition hover:bg-[#fffaf3] hover:text-[#4f3223]"
              >
                <FacebookIcon />
                {t.nav.facebook}
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#d9bda3] bg-[#fffdf9]/80 px-3 py-1.5 text-[11px] font-semibold text-[#6f4c38] transition hover:bg-[#fffaf3] hover:text-[#4f3223]"
              >
                <YoutubeIcon />
                {t.nav.youtube}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
