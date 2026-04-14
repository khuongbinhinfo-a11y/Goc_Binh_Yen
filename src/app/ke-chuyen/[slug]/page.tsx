"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useParams } from "next/navigation";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SafeImage from "@/components/ui/SafeImage";
import { CONTACT_FORM_URL } from "@/data/homepageData";
import { getContentRoutePrefix, getLocalizedContentBySlug, getLocalizedRelatedContent } from "@/data/localizedContent";
import { getReadingCopy } from "@/data/readingI18n";
import { useLocale } from "@/hooks/useLocale";
import { getContentFallbackImage } from "@/lib/image";

export default function StoryDetailPage() {
  const params = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const story = getLocalizedContentBySlug("story", slug, locale);
  const copy = getReadingCopy(locale, "story").detail;
  const routePrefix = getContentRoutePrefix("story");

  const relatedStories = useMemo(() => {
    if (!story) return [];
    return getLocalizedRelatedContent(story, locale, 3);
  }, [story, locale]);

  if (!story) {
    return (
      <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
        <SiteHeader />
        <main className="site-shell py-16 sm:py-20">
          <div className="soft-panel max-w-2xl bg-[#fff9f2] p-6 sm:p-8">
            <p className="text-base leading-7 text-[#654939]">{copy.notFound}</p>
            <Link
              href={routePrefix}
              className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
            >
              {copy.notFoundBack}
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const mediaItems = [
    story.hasAudio && story.audioUrl
      ? { title: copy.audioTitle, href: story.audioUrl, button: copy.audioButton }
      : null,
    story.hasVideo && story.youtubeUrl
      ? { title: copy.videoTitle, href: story.youtubeUrl, button: copy.videoButton }
      : null,
  ].filter((item): item is { title: string; href: string; button: string } => Boolean(item));

  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://hon-tho.vercel.app${routePrefix}/${story.slug}`,
  )}`;

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SafeImage
              src={story.coverImage}
              fallbackSrc={getContentFallbackImage("story")}
              alt={story.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#5a3a28]/30 via-[#4c3022]/46 to-[#2b1b14]/76" />

          <div className="site-shell relative z-10 py-16 sm:py-20 lg:py-24">
            <article className="max-w-4xl rounded-[2rem] border border-[#f2dcc3]/35 bg-[#4b2f20]/38 p-6 text-[#f6eadb] shadow-[0_24px_56px_rgba(34,22,16,0.38)] backdrop-blur-[5px] sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#f3ddc2]">
                <Link href={routePrefix} className="transition hover:text-white">
                  {copy.breadcrumb}
                </Link>
                <span aria-hidden="true">/</span>
                <span>{story.title}</span>
              </div>

              <p className="mb-3 inline-flex rounded-full border border-[#f7e3cb]/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4dcc0]">
                {story.category}
              </p>

              <h1 className="mb-4 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{story.title}</h1>
              <p className="max-w-3xl text-base leading-8 text-[#f6e8d8] sm:text-lg">{story.excerpt}</p>

              <div className="mt-6 grid gap-2 text-sm text-[#f2dbc2] sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{copy.metaVoice}:</span> {story.voiceBy}
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{copy.metaReadTime}:</span> {story.readingTime}
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{copy.metaDate}:</span> {story.publishedAt}
                </p>
              </div>
              {locale === "en" && story.i18nStatus.hasFallback ? (
                <p className="mt-4 rounded-xl border border-[#f2dcc3]/40 bg-white/10 px-3 py-2 text-xs text-[#f6e7d4]">
                  {copy.fallbackNotice}
                </p>
              ) : null}
            </article>
          </div>
        </section>

        <section className="border-y border-[#dfc3a8] bg-[#efe0cf] py-4">
          <div className="site-shell">
            <nav className="flex flex-wrap gap-2" aria-label={story.title}>
              <a
                href="#noi-dung-bai"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                {copy.actionRead}
              </a>
              {story.hasAudio && story.audioUrl && (
                <a
                  href="#nghe-xem"
                  className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
                >
                  {copy.actionListen}
                </a>
              )}
              {story.hasVideo && story.youtubeUrl && (
                <a
                  href="#nghe-xem"
                  className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
                >
                  {copy.actionWatch}
                </a>
              )}
              <a
                href={shareUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                {copy.actionShare}
              </a>
            </nav>
          </div>
        </section>

        <section id="noi-dung-bai" className="py-12 sm:py-14">
          <div className="site-shell">
            <article className="mx-auto max-w-3xl rounded-[1.8rem] border border-[#d9ba9d] bg-[#fffaf4] p-6 shadow-soft sm:p-8 lg:p-10">
              <div className="whitespace-pre-wrap text-[18px] leading-9 text-[#51392b]">{story.content}</div>
            </article>
          </div>
        </section>

        {mediaItems.length > 0 && (
          <section id="nghe-xem" className="bg-[#e9dac9] py-14">
            <div className="site-shell">
              <p className="eyebrow">{copy.mediaEyebrow}</p>
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.mediaTitle}</h2>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {mediaItems.map((media) => (
                  <article key={media.title} className="soft-panel bg-[#fffaf5] p-6">
                    <h3 className="text-2xl font-semibold leading-tight text-[#4a2f20]">{media.title}</h3>
                    <a
                      href={media.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                    >
                      {media.button}
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-14">
          <div className="site-shell">
            <div className="mb-6">
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.relatedTitle}</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {relatedStories.map((item) => (
                <article key={item.slug} className="soft-panel overflow-hidden bg-white/85">
                  <div className="relative h-48">
                    <SafeImage
                      src={item.coverImage}
                      fallbackSrc={getContentFallbackImage("story")}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-flex rounded-full bg-[#f1dfcc] px-3 py-1 text-xs font-semibold text-[#865a3c]">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#654939]">{item.excerpt}</p>
                    <Link
                      href={`${routePrefix}/${item.slug}`}
                      className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                    >
                      {copy.readButton}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="site-shell">
            <div className="rounded-[1.8rem] border border-[#d8b89b] bg-[#f8efe5] p-7 shadow-soft sm:p-9">
              <p className="eyebrow mb-2">{copy.contactEyebrow}</p>
              <h2 className="text-3xl font-semibold leading-tight text-[#3f2b20] sm:text-4xl">{copy.contactTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#654939] sm:text-base">{copy.contactDescription}</p>
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#764a2f]"
              >
                {copy.contactButton}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

