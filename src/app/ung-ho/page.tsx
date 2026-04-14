"use client";

import { useState } from "react";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SafeImage from "@/components/ui/SafeImage";
import { getBrandPagesCopy } from "@/data/brandPagesI18n";
import { useLocale } from "@/hooks/useLocale";
import { IMAGE_FALLBACKS } from "@/lib/image";

export default function UngHoPage() {
  const { locale } = useLocale();
  const copy = getBrandPagesCopy(locale).support;
  const [copied, setCopied] = useState(false);

  const handleCopyAccountNumber = async () => {
    if (!copy.accountNumber) {
      return;
    }

    try {
      await navigator.clipboard.writeText(copy.accountNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

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

        <section className="py-8 sm:py-10">
          <div className="site-shell">
            <article className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-5 sm:p-6">
              <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">{copy.companionTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{copy.companionDescription}</p>
            </article>
          </div>
        </section>

        <section className="pb-16 sm:pb-18">
          <div className="site-shell">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <article className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-6 sm:p-7">
                <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.qrCardTitle}</h2>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{copy.qrCardDescription}</p>
                <p className="mt-4 text-xs leading-6 text-[#886958] sm:text-sm">{copy.helperText}</p>
              </article>

              <article className="soft-panel overflow-hidden border-[#d8b89b] bg-[#f8efe5]">
                <div className="relative h-52 bg-[#f3e0cd] sm:h-60">
                  <SafeImage
                    src={copy.qrCardImage}
                    fallbackSrc={IMAGE_FALLBACKS.support}
                    alt={copy.qrCardAlt}
                    fill
                    className="object-contain p-5 sm:p-7"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4a2f20]/8 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-[#4a2f20] sm:text-lg">{copy.transferInfoTitle}</h3>
                  <dl className="mt-3 space-y-2.5">
                    {copy.transferDetails.map((detail) => (
                      <div key={detail.label} className="flex items-start justify-between gap-3 rounded-xl bg-white/70 px-3 py-2.5">
                        <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b684f]">{detail.label}</dt>
                        <dd className="text-sm font-medium text-[#4a2f20]">{detail.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <button
                    type="button"
                    onClick={handleCopyAccountNumber}
                    className="mt-4 inline-flex rounded-full border border-[#c9a488] px-4 py-2 text-xs font-semibold text-[#7a5236] transition hover:bg-[#f2dfcb] sm:text-sm"
                  >
                    {copied ? copy.copiedButton : copy.copyButton}
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <article className="soft-panel border-[#d8b89b] bg-[#f8efe5] p-7 sm:p-9">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.closingTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">{copy.closingDescription}</p>
              <a
                href={copy.closingAction.href}
                target={copy.closingAction.external ? "_blank" : undefined}
                rel={copy.closingAction.external ? "noreferrer" : undefined}
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
