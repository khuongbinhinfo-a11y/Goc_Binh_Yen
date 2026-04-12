import Image from "next/image";

import { BRAND_NAME, BRAND_SIGNATURE, FACEBOOK_URL, navItems } from "@/data/homepageData";

function PenIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
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

function VoiceIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <path
        d="M12 15a3 3 0 0 0 3-3V8a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
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
  return (
    <header className="sticky top-0 z-50 border-b border-[#ceb195]/70 bg-[#f3eadf]/88 backdrop-blur-sm">
      <div className="site-shell flex min-h-[74px] items-center justify-between gap-4 py-2.5">
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
            <div className="text-[29px] leading-none text-[#4a2f20] transition group-hover:text-[#7b4d33]">
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

        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Điều hướng chính" className="flex items-center gap-7 text-sm">
            {navItems.map((item) => {
              const isActive = item.href === "#trang-chu";
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
    </header>
  );
}
