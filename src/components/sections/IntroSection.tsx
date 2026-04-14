"use client";

import Image from "next/image";

import { getHomepageBrandCopy } from "@/data/homepageBrandI18n";
import { useLocale } from "@/hooks/useLocale";

export default function IntroSection() {
  const { locale, t } = useLocale();
  const brandCopy = getHomepageBrandCopy(locale).intro;

  return (
    <section className="py-20">
      <div className="site-shell">
        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
          <div>
            <p className="eyebrow">{brandCopy.eyebrow}</p>
            <h2 className="mb-4 text-4xl font-semibold leading-tight text-[#3f2b20] sm:text-5xl">{brandCopy.title}</h2>
            <p className="text-base leading-8 text-[#604536] sm:text-lg">{brandCopy.description}</p>
          </div>

          <aside className="soft-panel overflow-hidden bg-[#efe0cf]">
            <div className="relative h-[240px] sm:h-[260px]">
              <Image src="/images/4.webp" alt={t.intro.brandCardTitle} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3b2519]/74 via-[#4c3122]/48 to-[#76513a]/12" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#efd6ba]">{t.intro.brandCardTitle}</p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-[#fff6ec] sm:text-3xl">{t.intro.brandCardSlogan}</h3>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <p className="text-sm leading-7 text-[#5a4030] sm:text-base">{t.intro.brandCardDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.intro.brandCardTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-[#d2b394] bg-[#f9f0e6] px-3 py-1 text-xs font-semibold text-[#7a5237]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
