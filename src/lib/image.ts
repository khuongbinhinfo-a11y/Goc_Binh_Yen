import { ContentType } from "@/data/contentLibrary";
import { getCloudImageCandidates } from "@/data/cloudImageManifest";

export type ResolvedLocalImage = {
  basename: string;
  src: string;
  candidates: string[];
  fallback: string;
};

export type SearchImageContentType = ContentType | "doc-tho" | "ke-chuyen" | "tam-linh";

export type SearchCardImageInput = {
  contentType?: SearchImageContentType | string | null;
  image?: string | null;
  coverImage?: string | null;
  cardImage?: string | null;
  heroImage?: string | null;
};

export type ResolvedSearchCardImage = {
  src: string;
  srcCandidates: string[];
  fallbackSrc: string;
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

function normalizeSearchContentType(contentType?: SearchImageContentType | string | null): ContentType | undefined {
  const value = (contentType ?? "").trim().toLowerCase();
  if (!value) return undefined;

  if (value === "poem" || value === "doc-tho") return "poem";
  if (value === "story" || value === "ke-chuyen") return "story";
  if (value === "spiritual" || value === "tam-linh") return "spiritual";

  return undefined;
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
  heroStory: createResolvedLocalImage("ke-chuyen-hero", "/images/ke-chuyen/ke-chuyen-hero.png", ["/images/brand/hero-story.png", FALLBACK_STORY], FALLBACK_STORY),
  heroSpiritual: createResolvedLocalImage(
    "hero-tam-linh",
    "/images/tam-linh/hero-tam-linh.png",
    ["/images/brand/hero-spiritual.png", "/images/poems/hue-trang.jpeg", FALLBACK_STORY],
    FALLBACK_STORY,
  ),
  heroSupport: createResolvedLocalImage("hero-support", "/images/brand/hero-support.png"),
  chatAvatar: createResolvedLocalImage("chat-avatar", "/hoa-luc-binh.jpeg", ["/images/poems/hoa-luc-binh.jpeg"], "/hoa-luc-binh.jpeg"),
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
  return getSafeImageCandidates(src, fallback)[0] ?? fallback;
}

export function getSafeImageCandidates(src: string | null | undefined, fallback: string = IMAGE_FALLBACKS.global) {
  const value = (src ?? "").trim();
  if (!value) return [fallback];

  if (isRemoteImage(value)) return [value];
  if (value.startsWith("/")) {
    return getCloudImageCandidates(value);
  }

  return [fallback];
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

export function getSearchBranchFallbackCandidates(contentType?: SearchImageContentType | string | null) {
  const normalizedType = normalizeSearchContentType(contentType);

  if (normalizedType === "poem") return LOCAL_IMAGE_MAP.heroPoetry.candidates;
  if (normalizedType === "story") return LOCAL_IMAGE_MAP.heroStory.candidates;
  if (normalizedType === "spiritual") return LOCAL_IMAGE_MAP.heroSpiritual.candidates;

  return LOCAL_IMAGE_MAP.heroHome.candidates;
}

export function resolveSearchCardImage(item: SearchCardImageInput): ResolvedSearchCardImage {
  const globalFallback = LOCAL_IMAGE_MAP.heroHome.fallback;
  const branchCandidates = getSearchBranchFallbackCandidates(item.contentType);
  const branchFallback = branchCandidates[0] ?? globalFallback;

  const itemPrimaryImage = [item.image, item.coverImage, item.cardImage, item.heroImage]
    .map((value) => (value ?? "").trim())
    .find(Boolean);

  const itemCandidates = getSafeImageCandidates(itemPrimaryImage, branchFallback);
  const src = itemCandidates[0] ?? branchFallback;
  const srcCandidates = uniqueStrings([...itemCandidates, ...branchCandidates, ...LOCAL_IMAGE_MAP.heroHome.candidates]);

  return {
    src,
    srcCandidates,
    fallbackSrc: globalFallback,
  };
}
