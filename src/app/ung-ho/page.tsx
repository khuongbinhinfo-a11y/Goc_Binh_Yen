"use client";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { getBrandPagesCopy } from "@/data/brandPagesI18n";
import { useLocale } from "@/hooks/useLocale";

export default function UngHoPage() {
  const { locale } = useLocale();
  const copy = getBrandPagesCopy(locale).support;

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="border-b border-[#dec2a7] bg-gradient-to-b from-[#f8efe4] to-[#f1e3d4] py-12 sm:py-14">
          <div className="site-shell">
            <p className="eyebrow">{copy.heroEyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-[#3f2b20] sm:text-5xl">{copy.heroTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#664a3a] sm:text-base">{copy.heroDescription}</p>
          </div>
        </section>

        <section className="py-8">
          <div className="site-shell">
            <article className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-5 sm:p-6">
              <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">{copy.introTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{copy.introDescription}</p>
            </article>
          </div>
        </section>

        <section className="pb-16">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.waysTitle}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {copy.ways.map((way) => (
                <article key={way.title} className="soft-panel bg-white/85 p-6">
                  <h3 className="text-2xl font-semibold leading-tight text-[#4a2f20]">{way.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#654939]">{way.description}</p>
                  <a
                    href={way.action.href}
                    target={way.action.external ? "_blank" : undefined}
                    rel={way.action.external ? "noreferrer" : undefined}
                    className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                  >
                    {way.action.label}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <article className="soft-panel border-[#d8b89b] bg-[#f8efe5] p-7 sm:p-9">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.closingTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">{copy.closingDescription}</p>
              <a
                href={copy.ways[0].action.href}
                target={copy.ways[0].action.external ? "_blank" : undefined}
                rel={copy.ways[0].action.external ? "noreferrer" : undefined}
                className="mt-6 inline-flex rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#764a2f]"
              >
                {copy.closingButton}
              </a>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
