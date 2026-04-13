"use client";

import { useLocale } from "@/hooks/useLocale";

export default function IntroSection() {
  const { t } = useLocale();

  return (
    <section className="py-20">
      <div className="site-shell">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <p className="eyebrow">{t.intro.eyebrow}</p>
            <h2 className="mb-4 text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{t.intro.title}</h2>
            <p className="text-base leading-8 text-[#604536] sm:text-lg">{t.intro.description}</p>
          </div>

          <aside className="soft-panel bg-[#eddccb] p-6">
            <h3 className="mb-4 text-3xl font-semibold leading-tight text-[#4c3123]">{t.intro.keywordTitle}</h3>
            <ul className="grid gap-2 text-sm leading-7 text-[#5a4030] sm:text-base">
              {t.intro.keywords.map((keyword) => (
                <li key={keyword} className="flex items-center gap-2">
                  <span className="text-[#8b5e3c]">•</span>
                  <span>{keyword}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}