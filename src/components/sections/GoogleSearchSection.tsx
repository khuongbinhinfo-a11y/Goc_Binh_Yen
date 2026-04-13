"use client";

import { FormEvent, useState } from "react";

export default function GoogleSearchSection() {
  const [keyword, setKeyword] = useState("");
  const [hint, setHint] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = keyword.trim();

    if (!trimmed) {
      setHint("Vui lòng nhập từ khóa trước khi tìm kiếm.");
      return;
    }

    const query = encodeURIComponent(trimmed);
    const popup = window.open(`https://www.google.com/search?q=${query}`, "_blank", "noopener,noreferrer");

    if (!popup) {
      setHint("Trình duyệt đang chặn tab mới. Vui lòng cho phép pop-up để tiếp tục.");
      return;
    }

    setHint("Đã mở Google ở tab mới.");
  };

  return (
    <section id="tim-kiem-google" className="pb-16">
      <div className="site-shell">
        <article className="soft-panel border-[#d9bda2] bg-[#f8efe5] p-6 sm:p-8">
          <p className="eyebrow">Tìm kiếm với Google</p>
          <h2 className="mb-3 text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">Tìm nhanh trên Google</h2>
          <p className="max-w-3xl text-sm leading-8 text-[#654939] sm:text-base">
            Bạn có thể tìm nhanh các bài viết, chủ đề hoặc nội dung liên quan qua Google.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#91664b]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <input
                value={keyword}
                onChange={(event) => {
                  setKeyword(event.target.value);
                  if (hint) {
                    setHint("");
                  }
                }}
                name="keyword"
                placeholder="Ví dụ: thơ chiều tà, truyện chữa lành, quê hương..."
                className="w-full rounded-2xl border border-[#d8b89b] bg-white py-3 pl-10 pr-4 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
              />
            </div>
            <button type="submit" className="soft-button whitespace-nowrap">
              Tìm trên Google
            </button>
          </form>

          {hint && <p className="mt-3 text-sm text-[#8e4a33]">{hint}</p>}
        </article>
      </div>
    </section>
  );
}