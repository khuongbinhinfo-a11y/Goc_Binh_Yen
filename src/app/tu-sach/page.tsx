"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  const authorAudioRef = useRef<HTMLAudioElement>(null);
  const [isAuthorPlaying, setIsAuthorPlaying] = useState(false);

  const playAuthorAudio = useCallback(async () => {
    const audio = authorAudioRef.current;
    if (!audio) return;

    try {
      await audio.play();
    } catch {
      // Ignore autoplay failures and keep playback available on the next user gesture.
    }
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#tac-gia") return;
    void playAuthorAudio();
  }, [playAuthorAudio]);

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

            <article
              id="tac-gia"
              role="button"
              tabIndex={0}
              aria-label={copy.authorAudioLabel}
              aria-pressed={isAuthorPlaying}
              onClick={() => {
                void playAuthorAudio();
              }}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                void playAuthorAudio();
              }}
              className={`mx-auto mt-7 max-w-5xl soft-panel relative overflow-hidden border-[#dcc0a5] bg-[#fbf4eb] p-6 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b6825e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3eadf] sm:p-8 ${
                isAuthorPlaying ? "ring-1 ring-[#c79068]" : "cursor-pointer"
              }`}
            >
              <div className="pointer-events-none absolute -right-16 top-0 h-44 w-44 rounded-full bg-[#ecd5be]/40 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#efd9c4]/45 blur-2xl" />

              <audio
                ref={authorAudioRef}
                preload="metadata"
                src={copy.authorAudioUrl}
                onPlay={() => setIsAuthorPlaying(true)}
                onPause={() => setIsAuthorPlaying(false)}
                onEnded={() => setIsAuthorPlaying(false)}
                className="hidden"
              />

              <div className="relative grid gap-6 lg:grid-cols-[300px_1fr] lg:items-start">
                <div className="mx-auto w-full max-w-[320px]">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#d8b89b] bg-[#f1dfcb]">
                    <SafeImage
                      src={copy.authorImage}
                      fallbackSrc={IMAGE_FALLBACKS.bookcase}
                      alt={copy.authorImageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 rounded-2xl border border-[#e0c7af] bg-[#fff7ee] px-4 py-3 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8a6246]">{copy.authorTitle}</p>
                    <p className="mt-1 text-lg font-semibold text-[#4a2f20]">{copy.authorName}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">Chút lời từ tác giả</h3>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-[#654939] sm:text-base">
                    {copy.authorParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
