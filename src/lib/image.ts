import { ContentType } from "@/data/contentLibrary";

export const IMAGE_FALLBACKS = {
  global: "/images/4.webp",
  poem: "/images/poems/ben-do.jpeg",
  story: "/images/poems/ngang-ben-song-xua.jpeg",
  spiritual: "/images/poems/hue-trang.jpeg",
  bookcase: "/images/poems/em-mua-xuan-ve.jpeg",
  support: "/images/support/qr-bank.jpg",
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
  if (contentType === "poem") return IMAGE_FALLBACKS.poem;
  if (contentType === "story") return IMAGE_FALLBACKS.story;
  return IMAGE_FALLBACKS.spiritual;
}
