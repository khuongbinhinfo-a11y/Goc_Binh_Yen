"use client";

import Image from "next/image";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { CONTACT_FORM_URL } from "@/data/homepageData";
import { getBrandPagesCopy } from "@/data/brandPagesI18n";
import { useLocale } from "@/hooks/useLocale";

export default function TuSachPage() {
  const { locale } = useLocale();
  const copy = getBrandPagesCopy(locale).bookcase;

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
                <Image src={copy.featuredBook.coverImage} alt={copy.featuredBook.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3f271b]/38 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                  {copy.featuredLabel}
                </span>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">
                  {copy.featuredBook.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{copy.featuredBook.shortDescription}</p>
                <p className="mt-3 text-sm text-[#745646]">
                  {copy.featuredBook.format} · {copy.featuredBook.yearOrStatus}
                </p>
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
              {copy.books.map((book) => (
                <article key={book.title} className="soft-panel overflow-hidden bg-white/85">
                  <div className="relative h-56">
                    <Image src={book.coverImage} alt={book.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                      {book.format}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20]">{book.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#654939]">{book.shortDescription}</p>
                    <p className="mt-3 text-xs text-[#876756]">{book.yearOrStatus}</p>
                  </div>
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
