import { ContentType } from "@/data/contentLibrary";

const LOCAL_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"] as const;

type ResolveLocalImageOptions = {
  directories?: string[];
  fallback?: string;
  fallbackName?: string;
  fallbackDirectories?: string[];
};

export type ResolvedLocalImage = {
  basename: string;
  src: string;
  candidates: string[];
  fallback: string;
};

function normalizeDir(directory: string) {
  const value = directory.trim();
  if (!value) return "/images/brand";
  if (value.startsWith("/")) return value.replace(/\/+$/, "") || "/images/brand";
  return `/${value.replace(/\/+$/, "")}`;
}

function normalizeBasename(name: string) {
  return name.trim().replace(/^\/+/, "").replace(/\.(jpg|jpeg|png|webp)$/i, "");
}

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

function buildCandidates(name: string, directories: string[]) {
  const baseName = normalizeBasename(name);
  if (!baseName) return [];

  return directories.flatMap((directory) => {
    const dir = normalizeDir(directory);
    return LOCAL_IMAGE_EXTENSIONS.map((extension) => `${dir}/${baseName}${extension}`);
  });
}

export function resolveLocalImage(name: string, options: ResolveLocalImageOptions = {}): ResolvedLocalImage {
  const baseName = normalizeBasename(name);
  const directories = options.directories?.length ? options.directories : ["/images/brand", "/images"];

  const primaryCandidates = buildCandidates(baseName, directories);
  const fallbackCandidates = options.fallbackName
    ? buildCandidates(options.fallbackName, options.fallbackDirectories?.length ? options.fallbackDirectories : directories)
    : [];

  const candidates = uniqueStrings([...primaryCandidates, ...fallbackCandidates]);
  const fallback = options.fallback?.trim() || "/images/logo-4.jpg";

  return {
    basename: baseName,
    src: candidates[0] ?? fallback,
    candidates,
    fallback,
  };
}

const LEGACY_GLOBAL_IMAGE = resolveLocalImage("4");
const LEGACY_POEM_IMAGE = resolveLocalImage("ben-do", {
  directories: ["/images/poems"],
  fallback: LEGACY_GLOBAL_IMAGE.fallback,
});
const LEGACY_STORY_IMAGE = resolveLocalImage("ngang-ben-song-xua", {
  directories: ["/images/poems"],
  fallback: LEGACY_POEM_IMAGE.fallback,
});
const LEGACY_SUPPORT_QR_IMAGE = resolveLocalImage("qr-bank", {
  directories: ["/images/support", "/images"],
  fallback: LEGACY_GLOBAL_IMAGE.fallback,
});

export const LOCAL_IMAGE_MAP = {
  heroHome: resolveLocalImage("hero-home", {
    fallbackName: "4",
    fallbackDirectories: ["/images"],
    fallback: LEGACY_GLOBAL_IMAGE.fallback,
  }),
  heroPoetry: resolveLocalImage("hero-poetry", {
    fallbackName: "ben-do",
    fallbackDirectories: ["/images/poems"],
    fallback: LEGACY_POEM_IMAGE.fallback,
  }),
  heroStory: resolveLocalImage("hero-story", {
    fallbackName: "ngang-ben-song-xua",
    fallbackDirectories: ["/images/poems"],
    fallback: LEGACY_STORY_IMAGE.fallback,
  }),
  heroSpiritual: resolveLocalImage("hero-spiritual", {
    fallbackName: "hue-trang",
    fallbackDirectories: ["/images/poems"],
    fallback: LEGACY_STORY_IMAGE.fallback,
  }),
  heroSupport: resolveLocalImage("hero-support", {
    fallbackName: "4",
    fallbackDirectories: ["/images"],
    fallback: LEGACY_GLOBAL_IMAGE.fallback,
  }),
  footerOrnament: resolveLocalImage("footer-ornament", {
    fallbackName: "4",
    fallbackDirectories: ["/images"],
    fallback: LEGACY_GLOBAL_IMAGE.fallback,
  }),
  fallbackPoem: resolveLocalImage("fallback-poem", {
    fallbackName: "ben-do",
    fallbackDirectories: ["/images/poems"],
    fallback: LEGACY_POEM_IMAGE.fallback,
  }),
  fallbackStorySpiritual: resolveLocalImage("fallback-story-spiritual", {
    fallbackName: "ngang-ben-song-xua",
    fallbackDirectories: ["/images/poems"],
    fallback: LEGACY_STORY_IMAGE.fallback,
  }),
  supportQr: resolveLocalImage("qr-bank", {
    directories: ["/images/support", "/images"],
    fallback: LEGACY_SUPPORT_QR_IMAGE.fallback,
  }),
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
