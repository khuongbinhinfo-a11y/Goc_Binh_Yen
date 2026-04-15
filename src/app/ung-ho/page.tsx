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
        <section className="relative overflow-hidden border-b border-[#dec2a7]">
          <div className="absolute inset-0">
            <SafeImage src={copy.heroImage} fallbackSrc={IMAGE_FALLBACKS.global} alt={copy.heroAlt} fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5b432f]/30 via-[#493428]/46 to-[#241912]/78" />

          <div className="site-shell relative z-10 py-12 sm:py-14">
            <p className="eyebrow text-[#efdcc5]">{copy.heroEyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-white sm:text-5xl">{copy.heroTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#f4e8d7] sm:text-base">{copy.heroDescription}</p>
          </div>
        </section>

        <section className="py-10 pb-16 sm:pb-18 sm:pt-12">
          <div className="site-shell">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <article className="soft-panel relative min-h-[320px] overflow-hidden border-[#dcc0a5] bg-[#ead8c5] sm:min-h-[360px]">
                <div className="absolute inset-0">
                  <SafeImage
                    src={copy.companionImage}
                    fallbackSrc={IMAGE_FALLBACKS.global}
                    alt={copy.companionAlt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#2f2118]/58 via-[#3d2b1f]/28 to-[#3d2b1f]/12" />

                <div className="relative z-10 flex min-h-[320px] items-end p-5 sm:min-h-[360px] sm:p-7">
                  <div className="max-w-[30rem] rounded-2xl border border-white/28 bg-[#fff5e8]/88 p-4 backdrop-blur-[1px] sm:p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b654c] sm:text-xs">{copy.companionTitle}</p>
                    <p className="mt-2 text-sm leading-7 text-[#4f3628] sm:text-base">{copy.companionDescription}</p>
                  </div>
                </div>
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
                  <h2 className="text-2xl font-semibold leading-tight text-[#3f2b20] sm:text-3xl">{copy.qrCardTitle}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#654939] sm:text-base">{copy.qrCardDescription}</p>
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
                  <p className="mt-3 text-xs text-[#8a6a57] sm:text-sm">{copy.helperText}</p>
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
