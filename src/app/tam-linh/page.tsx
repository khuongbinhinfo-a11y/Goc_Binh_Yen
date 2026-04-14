"use client";

import Image from "next/image";
import Link from "next/link";

import EditorialListingGrid from "@/components/content/EditorialListingGrid";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { getContentRoutePrefix, getLocalizedContentList } from "@/data/localizedContent";
import { getReadingCopy } from "@/data/readingI18n";
import { useLocale } from "@/hooks/useLocale";

export default function TamLinhPage() {
  const { locale } = useLocale();
  const copy = getReadingCopy(locale, "spiritual").listing;
  const routePrefix = getContentRoutePrefix("spiritual");
  const items = getLocalizedContentList("spiritual", locale);
  const featured = items.find((item) => item.isFeatured) ?? items[0];
  const listItems = items.filter((item) => item.slug !== featured.slug);
  const hasFallback = items.some((item) => item.i18nStatus.hasFallback);

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-[#dec2a7] bg-gradient-to-b from-[#f8efe4] to-[#f1e3d4] py-12 sm:py-14">
          <div className="site-shell">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-[#3f2b20] sm:text-5xl">{copy.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#664a3a] sm:text-base">{copy.description}</p>
          </div>
        </section>

        <section className="py-8">
          <div className="site-shell">
            <div className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-5 sm:p-6">
              <p className="text-sm leading-7 text-[#654939] sm:text-base">{copy.intro}</p>
              {locale === "en" && hasFallback ? (
                <p className="mt-3 rounded-xl border border-[#d8b89b] bg-[#fff6ea] px-3 py-2 text-xs text-[#77533b]">
                  {copy.fallbackNotice}
                </p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="pb-12 sm:pb-14">
          <div className="site-shell">
            <article className="soft-panel overflow-hidden bg-white/80 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <div className="relative min-h-[260px]">
                <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#3f271b]/38 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                  {copy.featuredTag}
                </span>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{featured.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{featured.excerpt}</p>
                <p className="mt-1 text-xs text-[#876756]">{featured.publishedAt}</p>
                <Link href={`${routePrefix}/${featured.slug}`} className="soft-button mt-6 inline-flex">
                  {copy.readButton}
                </Link>
              </div>
            </article>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.gridTitle}</h2>
            </div>

            <EditorialListingGrid items={listItems} routePrefix={routePrefix} readButtonLabel={copy.readButton} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
