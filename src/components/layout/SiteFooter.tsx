import Image from "next/image";

import { BRAND_NAME, FACEBOOK_URL, navItems } from "@/data/homepageData";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#d7b89b]/80 bg-[#efe2d4] py-12">
      <div className="site-shell">
        <div className="grid gap-7 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <a href="#trang-chu" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo-4.jpg"
                alt={`Logo ${BRAND_NAME}`}
                width={46}
                height={46}
                className="h-11 w-11 rounded-xl border border-[#d8b89b] object-cover"
              />
              <h3 className="text-4xl text-[#4a2f20]">{BRAND_NAME}</h3>
            </a>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#654939] sm:text-base">
              Nơi thơ, chuyện và những xúc cảm nhẹ nhàng tìm về nhau giữa sắc chiều quê hương.
            </p>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[#8b5e3c] transition hover:text-[#6f452c]"
            >
              Facebook chính thức
            </a>
          </div>

          <nav
            aria-label="Điều hướng footer"
            className="grid grid-cols-2 gap-3 text-sm text-[#6d4a37] sm:text-base"
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#8b5e3c]">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-[#d8b89b]/70 pt-4 text-xs text-[#8d6b54] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</span>
          <span className="text-right">By Khương Bình</span>
        </div>
      </div>
    </footer>
  );
}
