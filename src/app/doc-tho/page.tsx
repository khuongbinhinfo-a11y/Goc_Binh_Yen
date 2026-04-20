"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
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

export default function DocThoPage() {
  const { locale } = useLocale();
  const copy = getReadingCopy(locale, "poem").listing;
  const routePrefix = getContentRoutePrefix("poem");
  const poems = getLocalizedContentList("poem", locale);
  const featured = poems.find((item) => item.isFeatured) ?? poems[0];
  const listItems = poems.filter((item) => item.slug !== featured.slug);
  const hasFallback = poems.some((item) => item.i18nStatus.hasFallback);
  const poemFallbackCandidates = getContentFallbackCandidates("poem");
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [audioOnly, setAudioOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(9);
  const deferredSearchQuery = useDeferredValue(searchQuery);

  const availableTags = useMemo(() => {
    return Array.from(new Set(listItems.map((item) => item.tag).filter(Boolean))) as string[];
  }, [listItems]);

  const normalizedSearch = deferredSearchQuery.trim().toLowerCase();
  const filteredItems = listItems.filter((item) => {
    const matchesTag = selectedTag === "all" ? true : item.tag === selectedTag;
    const matchesAudio = audioOnly ? item.hasAudio : true;
    const haystack = [item.title, item.excerpt, item.author ?? "", item.tag ?? ""].join(" ").toLowerCase();
    const matchesSearch = normalizedSearch ? haystack.includes(normalizedSearch) : true;

    return matchesTag && matchesAudio && matchesSearch;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasActiveFilters = Boolean(normalizedSearch) || selectedTag !== "all" || audioOnly;
  const hasMoreItems = visibleCount < filteredItems.length;

  useEffect(() => {
    setVisibleCount(9);
  }, [normalizedSearch, selectedTag, audioOnly]);

  function scrollToControls() {
    controlsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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

        <section className="sticky top-16 z-20 border-y border-[#e2ccb4] bg-[#f7ede1]/95 py-3 backdrop-blur md:hidden">
          <div className="site-shell flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6245]">Doc tho</p>
              <p className="text-sm font-semibold text-[#4a2f20]">{filteredItems.length} bai phu hop</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAudioOnly((value) => !value)}
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${audioOnly ? "border-[#a56d47] bg-[#f1ddc6] text-[#6b432c]" : "border-[#d6b695] bg-[#fff8f0] text-[#7d5439]"}`}
              >
                {audioOnly ? "Dang loc audio" : "Co audio"}
              </button>
              <button
                type="button"
                onClick={scrollToControls}
                className="rounded-full border border-[#d6b695] bg-[#fff8f0] px-3 py-2 text-xs font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
              >
                Tim va loc
              </button>
            </div>
          </div>
        </section>

        {!hasActiveFilters ? (
          <section className="pb-12 sm:pb-14">
            <div className="site-shell">
              <article className="soft-panel overflow-hidden bg-white/80 md:grid md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
                <div className="relative min-h-[260px]">
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
                        Co audio
                      </span>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">{featured.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#654939] sm:text-base">{featured.excerpt}</p>
                  {shouldRenderAuthor(featured) ? <p className="mt-2 text-sm text-[#745646]">{featured.author}</p> : null}
                  <p className="mt-1 text-xs text-[#876756]">{featured.publishedAt}</p>
                  <Link href={`${routePrefix}/${featured.slug}`} className="soft-button mt-6 inline-flex">
                    {copy.readButton}
                  </Link>
                </div>
              </article>
            </div>
          </section>
        ) : null}

        <section className="pb-20">
          <div className="site-shell">
            <div ref={controlsRef} className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a6245]">Tim va loc</p>
                  <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#3f2b20] sm:text-3xl">Tim bai phu hop de doc nhanh hon</h2>
                  <p className="mt-2 text-sm leading-7 text-[#654939]">Loc theo ten bai, chu de va audio de tranh cuon qua dai khi kho tho mo rong.</p>
                </div>
                <div className="text-sm text-[#7a5a45]">{filteredItems.length} bai phu hop</div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-[#6d4b36]">Tim theo ten bai, tac gia</span>
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Vi du: Them, Le Dung, Tho dem"
                    className="w-full rounded-2xl border border-[#d5b89f] bg-white px-4 py-3 text-sm text-[#4a2f20] outline-none transition placeholder:text-[#9b7a63] focus:border-[#b9835f]"
                  />
                </label>

                <div className="flex flex-col justify-end gap-3 sm:flex-row sm:items-center sm:justify-end">
                  {hasActiveFilters ? (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="rounded-full border border-[#d6b695] bg-white px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                    >
                      Xoa bo loc
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mt-5 -mx-5 sm:-mx-6">
                <div className="flex gap-2 overflow-x-auto px-5 pb-3 sm:px-6 [&::-webkit-scrollbar]:hidden">
                  <button
                    type="button"
                    onClick={() => setAudioOnly((value) => !value)}
                    className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${audioOnly ? "border-[#a56d47] bg-[#f1ddc6] text-[#6b432c]" : "border-[#d6b695] bg-white text-[#7d5439] hover:bg-[#f4e4d2]"}`}
                  >
                    {audioOnly ? "✓ Co audio" : "Co audio"}
                  </button>
                  <div className="mx-1 shrink-0 self-stretch border-l border-[#d5b89f]" />
                  <button
                    type="button"
                    onClick={() => setSelectedTag("all")}
                    className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${selectedTag === "all" ? "border-[#a56d47] bg-[#f1ddc6] text-[#6b432c]" : "border-[#d6b695] bg-white text-[#7d5439] hover:bg-[#f4e4d2]"}`}
                  >
                    Tat ca
                  </button>
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${selectedTag === tag ? "border-[#a56d47] bg-[#f1ddc6] text-[#6b432c]" : "border-[#d6b695] bg-white text-[#7d5439] hover:bg-[#f4e4d2]"}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6 mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.gridTitle}</h2>
                <p className="mt-2 text-sm leading-7 text-[#654939]">
                  {hasActiveFilters ? `Dang hien ${visibleItems.length}/${filteredItems.length} bai sau khi loc.` : `Dang hien ${visibleItems.length}/${listItems.length} bai trong kho tho.`}
                </p>
              </div>
              {hasMoreItems ? (
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 9)}
                  className="inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Xem them 9 bai
                </button>
              ) : null}
            </div>

            {filteredItems.length === 0 ? (
              <div className="soft-panel border-[#dcc0a5] bg-[#fbf4eb] p-6 text-center">
                <h3 className="text-2xl font-semibold text-[#4a2f20]">Chua tim thay bai phu hop</h3>
                <p className="mt-3 text-sm leading-7 text-[#654939]">Thu doi tu khoa tim kiem hoac mo rong bo loc de thay them bai tho.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Xoa bo loc
                </button>
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
                  className="inline-flex rounded-full border border-[#c79f7d] px-5 py-3 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Xem them
                </button>
              </div>
            ) : null}

            <div className="mt-8 hidden justify-end md:flex">
              <button
                type="button"
                onClick={scrollToControls}
                className="inline-flex rounded-full border border-[#d6b695] bg-white px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
              >
                Quay lai bo loc
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
