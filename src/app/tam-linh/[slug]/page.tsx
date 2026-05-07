"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import InlineAudioPlayer from "@/components/content/InlineAudioPlayer";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import SafeImage from "@/components/ui/SafeImage";
import { CONTACT_FORM_URL } from "@/data/homepageData";
import {
  getContentRoutePrefix,
  getLocalizedContentBySlug,
  getLocalizedContentList,
  getLocalizedRelatedContent,
} from "@/data/localizedContent";
import { getReadingCopy } from "@/data/readingI18n";
import { useLocale } from "@/hooks/useLocale";
import { buildAudioQueue } from "@/lib/audio";
import { getContentFallbackCandidates, getContentFallbackImage } from "@/lib/image";

export default function SpiritualDetailPage() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { locale } = useLocale();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const post = getLocalizedContentBySlug("spiritual", slug, locale);
  const shouldAutoPlayOnMount = searchParams.get("autoplay") === "1";
  const copy = getReadingCopy(locale, "spiritual").detail;
  const routePrefix = getContentRoutePrefix("spiritual");
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isManualShareOpen, setIsManualShareOpen] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return getLocalizedRelatedContent(post, locale, 3);
  }, [post, locale]);

  const audioQueue = useMemo(() => buildAudioQueue(getLocalizedContentList("spiritual", locale)), [locale]);

  const spiritualFallbackCandidates = getContentFallbackCandidates("spiritual");

  if (!post) {
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
    post.hasAudio && post.audioUrl
      ? { title: copy.audioTitle, href: post.audioUrl, button: copy.audioButton, type: "audio" as const }
      : null,
    post.hasVideo && post.youtubeUrl
      ? { title: copy.videoTitle, href: post.youtubeUrl, button: copy.videoButton, type: "video" as const }
      : null,
  ].filter((item): item is { title: string; href: string; button: string; type: "audio" | "video" } => Boolean(item));

  const getArticleUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${routePrefix}/${post.slug}`;
    }

    return `https://www.hontho.com${routePrefix}/${post.slug}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        return true;
      } catch {
        return false;
      }
    }
  };

  const showCopiedToast = (message: string) => {
    setShareToast(message);
    window.setTimeout(() => setShareToast(null), 1800);
  };

  const handleShareFacebook = async () => {
    const shareText = [
      post.title,
      "",
      post.content,
      "",
      getArticleUrl(),
    ]
      .filter(Boolean)
      .join("\n");

    const copied = await copyToClipboard(shareText);
    if (copied) showCopiedToast("Đã copy nội dung chia sẻ Facebook");

    window.open("https://www.facebook.com/hontho.mytho", "_blank", "noopener,noreferrer");
    setIsShareMenuOpen(false);
    setIsManualShareOpen(false);
  };

  const handleOpenManualShare = () => {
    setIsManualShareOpen((prev) => !prev);
  };

  const handleCopyArticleLink = async () => {
    const copied = await copyToClipboard(getArticleUrl());
    if (copied) showCopiedToast("Đã copy link bài viết");
  };

  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SafeImage
              src={post.coverImage}
              srcCandidates={spiritualFallbackCandidates}
              fallbackSrc={getContentFallbackImage("spiritual")}
              alt={post.title}
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
                <span>{post.title}</span>
              </div>

              <p className="mb-3 inline-flex rounded-full border border-[#f7e3cb]/30 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f4dcc0]">
                {post.category}
              </p>

              <h1 className="mb-4 text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{post.title}</h1>
              <p className="max-w-3xl text-base leading-8 text-[#f6e8d8] sm:text-lg">{post.excerpt}</p>

              <div className="mt-6 grid gap-2 text-sm text-[#f2dbc2] sm:grid-cols-2 lg:grid-cols-4">
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{copy.metaVoice}:</span> {post.voiceBy}
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{copy.metaReadTime}:</span> {post.readingTime}
                </p>
                <p>
                  <span className="font-semibold text-[#f8e8d5]">{copy.metaDate}:</span> {post.publishedAt}
                </p>
              </div>
              {locale === "en" && post.i18nStatus.hasFallback ? (
                <p className="mt-4 rounded-xl border border-[#f2dcc3]/40 bg-white/10 px-3 py-2 text-xs text-[#f6e7d4]">
                  {copy.fallbackNotice}
                </p>
              ) : null}
            </article>
          </div>
        </section>

        <section className="border-y border-[#dfc3a8] bg-[#efe0cf] py-4">
          <div className="site-shell">
            <nav className="flex flex-wrap gap-2" aria-label={post.title}>
              <a
                href="#noi-dung-bai"
                className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
              >
                {copy.actionRead}
              </a>
              {post.hasAudio && post.audioUrl && (
                <Link
                  href={`${routePrefix}/${post.slug}?autoplay=1#nghe-xem`}
                  className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
                >
                  {copy.actionListen}
                </Link>
              )}
              {post.hasVideo && post.youtubeUrl && (
                <a
                  href="#nghe-xem"
                  className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
                >
                  {copy.actionWatch}
                </a>
              )}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setIsShareMenuOpen((prev) => !prev);
                    setIsManualShareOpen(false);
                  }}
                  className="inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-4 py-2 text-sm font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
                >
                  {copy.actionShare}
                </button>

                {isShareMenuOpen ? (
                  <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl border border-[#d8b89b] bg-[#fffaf5] p-2 shadow-lg">
                    <button
                      type="button"
                      onClick={handleShareFacebook}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#6d4733] transition hover:bg-[#f6e6d3]"
                    >
                      Facebook (tự copy nội dung)
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenManualShare}
                      className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-[#6d4733] transition hover:bg-[#f6e6d3]"
                    >
                      Khác (copy link để gửi thủ công)
                    </button>
                  </div>
                ) : null}

                {isShareMenuOpen && isManualShareOpen ? (
                  <div className="absolute right-0 z-20 mt-28 w-72 rounded-xl border border-[#d8b89b] bg-[#fffaf5] p-3 shadow-lg">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#865a3c]">Link bài viết</p>
                    <p className="break-all rounded-lg border border-[#e7d0b9] bg-white px-2 py-2 text-xs text-[#654939]">{getArticleUrl()}</p>
                    <button
                      type="button"
                      onClick={handleCopyArticleLink}
                      className="mt-2 inline-flex rounded-full border border-[#c89f7f] bg-[#fff8ee] px-3 py-1.5 text-xs font-semibold text-[#6d4733] transition hover:bg-[#f6e6d3]"
                    >
                      Copy link
                    </button>
                  </div>
                ) : null}

                {shareToast ? (
                  <p className="absolute right-0 z-30 mt-2 w-64 rounded-lg bg-[#4a2f20] px-3 py-2 text-xs text-[#f9e8d5]">{shareToast}</p>
                ) : null}
              </div>
            </nav>
          </div>
        </section>

        <section id="noi-dung-bai" className="py-12 sm:py-14">
          <div className="site-shell">
            <article className="mx-auto max-w-3xl rounded-[1.8rem] border border-[#d9ba9d] bg-[#fffaf4] p-6 shadow-soft sm:p-8 lg:p-10">
              <div className="whitespace-pre-wrap text-[18px] leading-9 text-[#51392b]">{post.content}</div>
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
                    {media.type === "audio" ? (
                      <InlineAudioPlayer
                        audioUrl={media.href}
                        queue={audioQueue}
                        currentSlug={post.slug}
                        routePrefix={routePrefix}
                        autoPlayOnMount={shouldAutoPlayOnMount}
                        labels={{
                          previousTrack: copy.previousTrack ?? "← Bài trước",
                          nextTrack: copy.nextTrack ?? "Bài tiếp →",
                          autoplayNext: copy.autoplayNext ?? "Tự phát bài tiếp",
                        }}
                      />
                    ) : (
                      <a
                        href={media.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                      >
                        {media.button}
                      </a>
                    )}
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
              {relatedPosts.map((item) => (
                <article key={item.slug} className="soft-panel overflow-hidden bg-white/85">
                  <div className="relative h-48">
                    <SafeImage
                      src={item.coverImage}
                      srcCandidates={spiritualFallbackCandidates}
                      fallbackSrc={getContentFallbackImage("spiritual")}
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

