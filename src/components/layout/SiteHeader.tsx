import { FACEBOOK_URL, navItems } from "@/data/homepageData";

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M13.4 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V4a20.2 20.2 0 0 0-2.5-.1c-2.5 0-4.1 1.5-4.1 4.3V10H7.5v3h2.6v8h3.3Z" />
    </svg>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#c9aa8a]/60 bg-[#f3eadf]/85 backdrop-blur-md">
      <div className="site-shell flex min-h-[78px] items-center justify-between gap-4">
        <a href="#trang-chu" className="group">
          <div className="text-[32px] leading-none text-[#4f2f1e] transition group-hover:text-[#8b5e3c]">
            Góc Bình Yên
          </div>
          <div className="mt-1 text-xs text-[#7f5c45]">
            Thơ (Lê Dũng) · Giọng Đọc (Hồng Tâm)
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          <nav aria-label="Điều hướng chính" className="flex items-center gap-5 text-sm">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-medium text-[#5a3d2b] transition hover:text-[#8b5e3c]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#d7b99e] bg-white/60 px-4 py-2 text-xs font-semibold text-[#6d4833] transition hover:bg-white"
          >
            <FacebookIcon />
            Facebook
          </a>
        </div>
      </div>
    </header>
  );
}
