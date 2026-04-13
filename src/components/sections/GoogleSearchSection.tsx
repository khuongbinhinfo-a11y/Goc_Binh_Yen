"use client";

import { FormEvent, useState } from "react";

import { useLocale } from "@/hooks/useLocale";

type HintKey = "empty" | "blocked" | "opened" | null;

export default function GoogleSearchSection() {
  const { t } = useLocale();

  const [keyword, setKeyword] = useState("");
  const [hintKey, setHintKey] = useState<HintKey>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = keyword.trim();

    if (!trimmed) {
      setHintKey("empty");
      return;
    }

    const query = encodeURIComponent(trimmed);
    const popup = window.open(`https://www.google.com/search?q=${query}`, "_blank", "noopener,noreferrer");

    if (!popup) {
      setHintKey("blocked");
      return;
    }

    setHintKey("opened");
  };

  return (
    <section id="tim-kiem-google" className="pb-16">
      <div className="site-shell">
        <article className="soft-panel border-[#d9bda2] bg-[#f8efe5] p-6 sm:p-8">
          <p className="eyebrow">{t.googleSearch.eyebrow}</p>
          <h2 className="mb-3 text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{t.googleSearch.title}</h2>
          <p className="max-w-3xl text-sm leading-8 text-[#654939] sm:text-base">{t.googleSearch.description}</p>

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
                  if (hintKey) {
                    setHintKey(null);
                  }
                }}
                name="keyword"
                placeholder={t.googleSearch.placeholder}
                className="w-full rounded-2xl border border-[#d8b89b] bg-white py-3 pl-10 pr-4 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
              />
            </div>
            <button type="submit" className="soft-button whitespace-nowrap">
              {t.googleSearch.button}
            </button>
          </form>

          {hintKey && <p className="mt-3 text-sm text-[#8e4a33]">{t.googleSearch.hints[hintKey]}</p>}
        </article>
      </div>
    </section>
  );
}