"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { BRAND_NAME, BRAND_SIGNATURE, FACEBOOK_URL, navItems } from "@/data/homepageData";

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

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("#trang-chu");

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

  return (
    <header className="sticky top-0 z-50 border-b border-[#ceb195]/70 bg-[#f3eadf]/88 backdrop-blur-sm">
      <div className="site-shell">
        <div className="flex items-center justify-between gap-3 py-2 md:hidden">
          <a href="#trang-chu" className="group flex min-w-0 items-center gap-2.5" onClick={closeMobileMenu}>
            <Image
              src="/images/logo-4.jpg"
              alt={`Logo ${BRAND_NAME}`}
              width={42}
              height={42}
              className="h-10 w-10 rounded-xl border border-[#d8b89b] object-cover shadow-[0_6px_14px_rgba(74,47,32,0.12)]"
              priority
            />
            <span className="truncate text-[27px] font-semibold leading-[1.08] tracking-[-0.01em] text-[#4a2f20] transition group-hover:text-[#7b4d33]">
              {BRAND_NAME}
            </span>
          </a>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
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

        <div className="mb-2 flex flex-wrap gap-1.5 pb-1 md:hidden">
          <span className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2 py-0.5 text-[10.5px] font-medium text-[#73503a]">
            <PenIcon className="h-3 w-3" />
            {BRAND_SIGNATURE.poetry}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2 py-0.5 text-[10.5px] font-medium text-[#73503a]">
            <VoiceIcon className="h-3 w-3" />
            {BRAND_SIGNATURE.voice}
          </span>
        </div>

        {isMobileMenuOpen && (
          <div id="mobile-nav-panel" className="pb-3 md:hidden">
            <nav
              aria-label="Điều hướng mobile"
              className="rounded-2xl border border-[#d8b89b] bg-[#fff9f1] p-2 shadow-[0_14px_30px_rgba(74,47,32,0.14)]"
            >
              {navItems.map((item) => {
                const isActive = currentHash === item.href;
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

              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="mt-1.5 block rounded-xl border-t border-[#e2c7ad] px-3 py-2.5 text-sm font-semibold text-[#6f4c38] transition hover:bg-[#f6e7d7]"
              >
                Facebook
              </a>
            </nav>
          </div>
        )}

        <div className="hidden min-h-[74px] items-center justify-between gap-4 py-2.5 md:flex">
          <a href="#trang-chu" className="group flex items-center gap-3">
            <Image
              src="/images/logo-4.jpg"
              alt={`Logo ${BRAND_NAME}`}
              width={58}
              height={58}
              className="h-[52px] w-[52px] rounded-2xl border border-[#d8b89b] object-cover shadow-[0_8px_18px_rgba(74,47,32,0.12)]"
              priority
            />
            <div>
              <div className="text-[29px] font-semibold leading-[1.08] tracking-[-0.01em] text-[#4a2f20] transition group-hover:text-[#7b4d33]">
                {BRAND_NAME}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] text-[#73503a]">
                <span className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2.5 py-1">
                  <PenIcon />
                  {BRAND_SIGNATURE.poetry}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#d8b79b] bg-[#fff8ef] px-2.5 py-1">
                  <VoiceIcon />
                  {BRAND_SIGNATURE.voice}
                </span>
              </div>
            </div>
          </a>

          <div className="items-center gap-6 md:flex">
            <nav aria-label="Điều hướng chính" className="flex items-center gap-7 text-sm">
              {navItems.map((item) => {
                const isActive = currentHash === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative pb-1 font-medium transition ${
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

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#d9bda3] bg-[#fffdf9]/80 px-3 py-1.5 text-[11px] font-semibold text-[#6f4c38] transition hover:bg-[#fffaf3] hover:text-[#4f3223]"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
