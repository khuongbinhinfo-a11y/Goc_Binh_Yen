"use client";

import SafeImage from "@/components/ui/SafeImage";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { CONTACT_FORM_URL } from "@/data/homepageData";
import { getBrandPagesCopy } from "@/data/brandPagesI18n";
import { useLocale } from "@/hooks/useLocale";
import { IMAGE_FALLBACKS } from "@/lib/image";

export default function TuSachPage() {
  const { locale } = useLocale();
  const copy = getBrandPagesCopy(locale).bookcase;

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-[#dec2a7]">
          <div className="absolute inset-0">
            <SafeImage src={copy.heroImage} fallbackSrc={IMAGE_FALLBACKS.bookcase} alt={copy.heroAlt} fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5a3e2c]/30 via-[#4b3326]/44 to-[#2c1c14]/72" />

          <div className="site-shell relative z-10 py-12 sm:py-14">
            <p className="eyebrow text-[#f0d9bd]">{copy.heroEyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-white sm:text-5xl">{copy.heroTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#f6e8d8] sm:text-base">{copy.heroDescription}</p>
          </div>
        </section>

        <section className="py-12 sm:py-14">
          <div className="site-shell">
            <div className="mx-auto max-w-4xl soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-6 sm:p-8">
              <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">{copy.introTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{copy.introDescription}</p>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full border border-[#c79f7d] px-5 py-2.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
              >
                {copy.closingButton}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
