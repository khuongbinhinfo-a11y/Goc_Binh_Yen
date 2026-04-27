"use client";

import { useState } from "react";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SafeImage from "@/components/ui/SafeImage";
import { getBrandPagesCopy } from "@/data/brandPagesI18n";
import { useLocale } from "@/hooks/useLocale";
import { IMAGE_FALLBACKS, LOCAL_IMAGE_MAP } from "@/lib/image";

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
            <SafeImage
              src={copy.heroImage}
              srcCandidates={LOCAL_IMAGE_MAP.heroSupport.candidates}
              fallbackSrc={IMAGE_FALLBACKS.global}
              alt={copy.heroAlt}
              fill
              priority
              className="object-cover"
            />
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
                    srcCandidates={LOCAL_IMAGE_MAP.supportQr.candidates}
                    fallbackSrc={IMAGE_FALLBACKS.support}
                    alt={copy.qrCardAlt}
                    fill
                    className="object-contain p-5 sm:p-7"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4a2f20]/8 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm leading-7 text-[#654939] sm:text-base">{copy.qrCardDescription}</p>
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
            <article className="soft-panel relative overflow-hidden border-[#d8b89b] bg-[#f8efe5] p-7 sm:p-9">
              <div className="pointer-events-none absolute right-5 top-4 text-[#cfa787]/45">
                <svg viewBox="0 0 120 120" className="h-20 w-20" fill="none" aria-hidden="true">
                  <path d="M60 25C64 43 77 56 95 60C77 64 64 77 60 95C56 77 43 64 25 60C43 56 56 43 60 25Z" stroke="currentColor" strokeWidth="2.2" />
                  <path d="M60 35V85M35 60H85" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="60" cy="60" r="7" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </div>
              <div className="pointer-events-none absolute bottom-3 left-5 text-[#b88966]/40">
                <svg viewBox="0 0 140 70" className="h-12 w-28" fill="none" aria-hidden="true">
                  <path d="M8 56C28 56 44 46 58 30C70 17 87 10 110 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M48 42C41 40 37 35 35 28C42 30 47 34 48 42Z" fill="currentColor" />
                  <path d="M68 31C61 29 57 24 55 17C62 19 67 23 68 31Z" fill="currentColor" />
                  <path d="M88 21C81 19 77 14 75 7C82 9 87 13 88 21Z" fill="currentColor" />
                </svg>
              </div>

              <h2 className="relative text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.closingTitle}</h2>
              {copy.closingDescription ? (
                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">{copy.closingDescription}</p>
              ) : null}
              <a
                href={copy.closingAction.href}
                target={copy.closingAction.external ? "_blank" : undefined}
                rel={copy.closingAction.external ? "noreferrer" : undefined}
                className="relative mt-6 inline-flex rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#764a2f]"
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
