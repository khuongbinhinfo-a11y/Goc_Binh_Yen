"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import SafeImage from "@/components/ui/SafeImage";
import EditorialListingGrid from "@/components/content/EditorialListingGrid";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { shouldRenderAuthor } from "@/data/contentLibrary";
import { getContentRoutePrefix, getLocalizedContentList } from "@/data/localizedContent";
import { getReadingCopy } from "@/data/readingI18n";
import { useLocale } from "@/hooks/useLocale";
import { getContentFallbackCandidates, getContentFallbackImage, LOCAL_IMAGE_MAP } from "@/lib/image";

function normalizeSearchValue(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export default function DocThoPage() {
  const { locale } = useLocale();
  const copy = getReadingCopy(locale, "poem").listing;
  const routePrefix = getContentRoutePrefix("poem");
  const poems = getLocalizedContentList("poem", locale);
  const featured = poems.find((item) => item.isFeatured) ?? poems[0];
  const listItems = featured ? poems.filter((item) => item.slug !== featured.slug) : poems;
  const hasFallback = poems.some((item) => item.i18nStatus.hasFallback);
  const poemFallbackCandidates = getContentFallbackCandidates("poem");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [audioOnly, setAudioOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const availableTags = useMemo(() => {
    return Array.from(new Set(poems.map((item) => item.tag).filter(Boolean))) as string[];
  }, [poems]);

  const normalizedSearch = normalizeSearchValue(deferredSearchQuery);
  const hasActiveFilters = Boolean(normalizedSearch) || selectedTag !== "all" || audioOnly;
  const filterSource = hasActiveFilters ? poems : listItems;

  const filteredItems = filterSource.filter((item) => {
    const matchesTag = selectedTag === "all" ? true : item.tag === selectedTag;
    const matchesAudio = audioOnly ? item.hasAudio : true;
    const searchableText = normalizeSearchValue(
      [item.title, item.author ?? "", item.excerpt ?? "", item.tag ?? "", item.publishedAt ?? ""].join(" "),
    );
    const matchesSearch = normalizedSearch ? searchableText.includes(normalizedSearch) : true;

    return matchesTag && matchesAudio && matchesSearch;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMoreItems = visibleCount < filteredItems.length;

  useEffect(() => {
    setVisibleCount(9);
  }, [normalizedSearch, selectedTag, audioOnly]);

  function clearFilters() {
    setSearchQuery("");
    setSelectedTag("all");
    setAudioOnly(false);
  }

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-[#dec2a7]">
          <div className="absolute inset-0">
            <SafeImage
              src={copy.heroImage}
              srcCandidates={LOCAL_IMAGE_MAP.heroPoetry.candidates}
              fallbackSrc={getContentFallbackImage("poem")}
              alt={copy.heroAlt}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5a3a28]/28 via-[#4c3022]/46 to-[#2a1a13]/78" />

          <div className="site-shell relative z-10 py-12 sm:py-14">
            <p className="eyebrow text-[#f1d9bd]">{copy.eyebrow}</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-white sm:text-5xl">{copy.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-[#f6e8d7] sm:text-base">{copy.description}</p>
          </div>
        </section>

        <section className="py-8 sm:py-10">
          <div className="site-shell">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6245]">{copy.mobileFilterBtn}</p>
                <h2 className="mt-1 text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.gridTitle}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-[#654939]">{copy.intro}</p>
              </div>
              <p className="shrink-0 text-sm font-medium text-[#7a5a45]">
                {filteredItems.length} {copy.mobileCountSuffix}
              </p>
            </div>

            {locale === "en" && hasFallback ? (
              <p className="mb-4 rounded-xl border border-[#d8b89b] bg-[#fff6ea] px-3 py-2 text-xs text-[#77533b]">
                {copy.fallbackNotice}
              </p>
            ) : null}

            <div className="rounded-[22px] border border-[#dcc0a5] bg-[#fbf4eb] p-4 shadow-[0_8px_24px_rgba(78,49,31,0.04)] sm:p-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
                <label className="min-w-0 flex-1">
                  <span className="mb-2 block text-sm font-semibold text-[#6d4b36]">{copy.searchLabel}</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={copy.searchPlaceholder}
                    className="w-full rounded-xl border border-[#d5b89f] bg-white px-4 py-2.5 text-sm text-[#4a2f20] outline-none transition placeholder:text-[#9b7a63] focus:border-[#a66f49] focus:ring-2 focus:ring-[#d8b89b]/30"
                  />
                </label>

                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="self-start rounded-full px-1 py-2 text-sm font-semibold text-[#8a5b3b] underline decoration-[#cba98b] underline-offset-4 transition hover:text-[#5c3925] lg:self-end"
                  >
                    {copy.clearFilters}
                  </button>
                ) : null}
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <button
                  type="button"
                  aria-pressed={audioOnly}
                  onClick={() => setAudioOnly((value) => !value)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    audioOnly
                      ? "border-[#9e6844] bg-[#6f452d] text-white"
                      : "border-[#d8b99d] bg-white text-[#765038] hover:bg-[#f5e7d8]"
                  }`}
                >
                  {audioOnly ? `✓ ${copy.audioFilterFull}` : copy.audioFilterFull}
                </button>

                <button
                  type="button"
                  aria-pressed={selectedTag === "all"}
                  onClick={() => setSelectedTag("all")}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    selectedTag === "all"
                      ? "border-[#b7835f] bg-[#efe0d0] text-[#5f3b27]"
                      : "border-[#d8b99d] bg-white text-[#765038] hover:bg-[#f5e7d8]"
                  }`}
                >
                  {copy.allTagsLabel}
                </button>

                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={selectedTag === tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      selectedTag === tag
                        ? "border-[#b7835f] bg-[#efe0d0] text-[#5f3b27]"
                        : "border-[#d8b99d] bg-white text-[#765038] hover:bg-[#f5e7d8]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {!hasActiveFilters && featured ? (
              <article className="mt-8 overflow-hidden rounded-[24px] border border-[#dcc0a5] bg-white/80 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
                <div className="relative min-h-[240px]">
                  <SafeImage
                    src={featured.coverImage}
                    srcCandidates={poemFallbackCandidates}
                    fallbackSrc={getContentFallbackImage("poem")}
                    alt={featured.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3f271b]/38 to-transparent" />
                </div>
                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                      {copy.featuredTag}
                    </span>
                    {featured.hasAudio ? (
                      <span className="inline-flex rounded-full border border-[#d7b596] bg-[#fff7ef] px-3 py-1 text-xs font-semibold text-[#7d5439]">
                        {copy.audioFilterInactive}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{featured.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{featured.excerpt}</p>
                  {shouldRenderAuthor(featured) ? <p className="mt-2 text-sm text-[#745646]">{featured.author}</p> : null}
                  <p className="mt-1 text-xs text-[#876756]">{featured.publishedAt}</p>
                  <Link href={`${routePrefix}/${featured.slug}`} className="soft-button mt-6 inline-flex">
                    {copy.readButton}
                  </Link>
                </div>
              </article>
            ) : null}

            <div className="mt-8">
              <p className="mb-4 text-sm text-[#745646]">
                {hasActiveFilters
                  ? copy.countActive.replace("{visible}", String(visibleItems.length)).replace("{total}", String(filteredItems.length))
                  : copy.countAll.replace("{visible}", String(visibleItems.length)).replace("{total}", String(listItems.length))}
              </p>

              {filteredItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[#d6b695] bg-[#faf2e8] px-5 py-6 text-left sm:flex sm:items-center sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#4a2f20]">{copy.emptyTitle}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#654939]">{copy.emptyBody}</p>
                  </div>
                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-[#9a7357] sm:mt-0">
                    {normalizedSearch ? `“${deferredSearchQuery.trim()}”` : copy.mobileFilterBtn}
                  </p>
                </div>
              ) : (
                <EditorialListingGrid
                  items={visibleItems}
                  routePrefix={routePrefix}
                  readButtonLabel={copy.readButton}
                  showAuthor
                  showAudioBadge
                />
              )}

              {filteredItems.length > 0 && hasMoreItems ? (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + 9)}
                    className="inline-flex rounded-full border border-[#c79f7d] bg-[#fff8f0] px-5 py-2.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                  >
                    {copy.loadMore}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
