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
          <div className="absolute inset-0 bg-gradient-to-b from-[#5a3e2c]/34 via-[#4b3326]/50 to-[#2c1c14]/80" />

          <div className="site-shell relative z-10 py-12 sm:py-14">
            <p className="eyebrow text-[#f0d9bd]">{copy.heroEyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-white sm:text-5xl">{copy.heroTitle}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#f6e8d8] sm:text-base">{copy.heroDescription}</p>
          </div>
        </section>

        <section className="py-8">
          <div className="site-shell">
            <div className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-5 sm:p-6">
              <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-3xl">{copy.introTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{copy.introDescription}</p>
            </div>
          </div>
        </section>

        <section className="pb-12 sm:pb-14">
          <div className="site-shell">
            <article className="soft-panel overflow-hidden bg-white/85 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <div className="relative min-h-[260px]">
                <SafeImage
                  src={copy.featuredBook.coverImage}
                  fallbackSrc={IMAGE_FALLBACKS.bookcase}
                  alt={copy.featuredBook.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3f271b]/38 to-transparent" />
              </div>

              <div className="p-6 sm:p-7">
                <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                  {copy.featuredLabel}
                </span>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{copy.featuredBook.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{copy.featuredBook.shortDescription}</p>

                <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
                  <span className="rounded-full bg-[#f1dfcc] px-3 py-1 font-semibold text-[#7e563b]">
                    {copy.formatLabel}: {copy.featuredBook.format}
                  </span>
                  <span className="rounded-full border border-[#d6b89a] bg-white px-3 py-1 font-semibold text-[#6f4d37]">
                    {copy.statusLabel}: {copy.featuredBook.status}
                  </span>
                </div>

                <div className="mt-4 rounded-2xl border border-[#ead2b8] bg-[#fcf3e8] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8c694f] sm:text-[0.78rem]">
                    {copy.readingSuggestionLabel}
                  </p>
                  <p className="mt-1.5 text-sm leading-7 text-[#654939]">{copy.featuredBook.readingSuggestion}</p>
                </div>

                {copy.featuredBook.action ? (
                  <a
                    href={copy.featuredBook.action.href}
                    target={copy.featuredBook.action.external ? "_blank" : undefined}
                    rel={copy.featuredBook.action.external ? "noreferrer" : undefined}
                    className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                  >
                    {copy.featuredBook.action.label}
                  </a>
                ) : null}
              </div>
            </article>
          </div>
        </section>

        <section className="pb-16">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.gridTitle}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {copy.books.map((book, index) => {
                const action = book.action ?? {
                  label: copy.closingButton,
                  href: CONTACT_FORM_URL,
                  external: true,
                };

                return (
                  <article
                    key={book.title}
                    className={`soft-panel overflow-hidden bg-white/85 ${index === 0 ? "md:col-span-2 xl:col-span-2" : ""}`}
                  >
                    <div className={`relative ${index === 0 ? "h-64 sm:h-72" : "h-56"}`}>
                      <SafeImage src={book.coverImage} fallbackSrc={IMAGE_FALLBACKS.bookcase} alt={book.title} fill className="object-cover" />
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-2xl font-semibold leading-tight text-[#4a2f20] sm:text-[1.65rem]">{book.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#654939]">{book.shortDescription}</p>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs sm:text-sm">
                        <span className="rounded-full bg-[#f1dfcc] px-3 py-1 font-semibold text-[#7e563b]">
                          {copy.formatLabel}: {book.format}
                        </span>
                        <span className="rounded-full border border-[#d6b89a] bg-white px-3 py-1 font-semibold text-[#6f4d37]">
                          {copy.statusLabel}: {book.status}
                        </span>
                      </div>

                      <div className="mt-4 rounded-2xl border border-[#ead2b8] bg-[#fcf3e8] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8c694f] sm:text-[0.78rem]">
                          {copy.readingSuggestionLabel}
                        </p>
                        <p className="mt-1.5 text-sm leading-7 text-[#654939]">{book.readingSuggestion}</p>
                      </div>

                      <a
                        href={action.href}
                        target={action.external ? "_blank" : undefined}
                        rel={action.external ? "noreferrer" : undefined}
                        className="mt-4 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                      >
                        {action.label}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <article className="soft-panel border-[#d8b89b] bg-[#f8efe5] p-7 sm:p-9">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.closingTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">{copy.closingDescription}</p>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
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
