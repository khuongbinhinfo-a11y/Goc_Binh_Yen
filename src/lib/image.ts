import { ContentType } from "@/data/contentLibrary";

export type ResolvedLocalImage = {
  basename: string;
  src: string;
  candidates: string[];
  fallback: string;
};

function uniqueStrings(values: string[]) {
  const seen = new Set<string>();
  const result: string[] = [];

  values.forEach((value) => {
    if (!value || seen.has(value)) return;
    seen.add(value);
    result.push(value);
  });

  return result;
}

const FALLBACK_GLOBAL = "/logo.jpg";
const FALLBACK_POEM = "/images/poems/ben-do.jpeg";
const FALLBACK_STORY = "/images/poems/ngang-ben-song-xua.jpeg";

function createResolvedLocalImage(basename: string, src: string, candidates: string[] = [], fallback: string = FALLBACK_GLOBAL): ResolvedLocalImage {
  const normalizedFallback = fallback.trim() || FALLBACK_GLOBAL;
  const normalizedSrc = src.trim() || normalizedFallback;
  const normalizedCandidates = uniqueStrings([normalizedSrc, ...candidates, normalizedFallback].map((value) => value.trim()));

  return {
    basename,
    src: normalizedSrc,
    candidates: normalizedCandidates,
    fallback: normalizedFallback,
  };
}

export const LOCAL_IMAGE_MAP = {
  heroHome: createResolvedLocalImage("hero-home", "/images/brand/hero-home.png"),
  heroPoetry: createResolvedLocalImage("hero-poetry", "/images/brand/hero-poetry.png", [FALLBACK_POEM], FALLBACK_POEM),
  heroStory: createResolvedLocalImage("hero-story", "/images/brand/hero-story.png", [FALLBACK_STORY], FALLBACK_STORY),
  heroSpiritual: createResolvedLocalImage("hero-spiritual", "/images/brand/hero-spiritual.png", ["/images/poems/hue-trang.jpeg", FALLBACK_STORY], FALLBACK_STORY),
  heroSupport: createResolvedLocalImage("hero-support", "/images/brand/hero-support.png"),
  footerOrnament: createResolvedLocalImage("footer-ornament", "/images/brand/footer-ornament.png"),
  fallbackPoem: createResolvedLocalImage("fallback-poem", "/images/brand/fallback-poem.png", [FALLBACK_POEM], FALLBACK_POEM),
  fallbackStorySpiritual: createResolvedLocalImage("fallback-story-spiritual", "/images/brand/fallback-story-spiritual.png", [FALLBACK_STORY], FALLBACK_STORY),
  supportQr: createResolvedLocalImage("qr-bank", "/images/support/qr-bank.jpg", [], FALLBACK_GLOBAL),
} as const;

export const IMAGE_FALLBACKS = {
  global: LOCAL_IMAGE_MAP.heroHome.fallback,
  poem: LOCAL_IMAGE_MAP.fallbackPoem.fallback,
  story: LOCAL_IMAGE_MAP.fallbackStorySpiritual.fallback,
  spiritual: LOCAL_IMAGE_MAP.fallbackStorySpiritual.fallback,
  bookcase: LOCAL_IMAGE_MAP.fallbackPoem.fallback,
  support: LOCAL_IMAGE_MAP.supportQr.fallback,
} as const;

function isRemoteImage(src: string) {
  return /^https?:\/\//i.test(src);
}

export function getSafeImageSrc(src: string | null | undefined, fallback: string = IMAGE_FALLBACKS.global) {
  const value = (src ?? "").trim();
  if (!value) return fallback;

  if (isRemoteImage(value)) return value;
  if (value.startsWith("/images/")) return value;

  return fallback;
}

export function getContentFallbackImage(contentType: ContentType) {
  if (contentType === "poem") return LOCAL_IMAGE_MAP.fallbackPoem.fallback;
  if (contentType === "story") return LOCAL_IMAGE_MAP.fallbackStorySpiritual.fallback;
  return LOCAL_IMAGE_MAP.fallbackStorySpiritual.fallback;
}

export function getContentFallbackCandidates(contentType: ContentType) {
  if (contentType === "poem") return LOCAL_IMAGE_MAP.fallbackPoem.candidates;
  if (contentType === "story") return LOCAL_IMAGE_MAP.fallbackStorySpiritual.candidates;
  return LOCAL_IMAGE_MAP.fallbackStorySpiritual.candidates;
}
