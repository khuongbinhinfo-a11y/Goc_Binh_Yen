import "server-only";

import { r2Config } from "@/lib/media/r2-config";

export type MediaKind = "audio" | "images" | "covers" | "video";
export type AudioBranch = "doc-tho" | "ke-chuyen" | "tam-linh";

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "");
}

function resolvePrefix(kind: MediaKind) {
  if (kind === "audio") return r2Config.prefixes.audio;
  if (kind === "images") return r2Config.prefixes.images;
  if (kind === "covers") return r2Config.prefixes.covers;
  return r2Config.prefixes.video;
}

export function buildR2ObjectKey(kind: MediaKind, filename: string) {
  const prefix = resolvePrefix(kind);
  const normalizedFilename = cleanSlug(filename);
  return `${prefix}/${normalizedFilename}`;
}

export function buildR2MediaKeyFromSlug(
  kind: MediaKind,
  slug: string,
  options?: { audioBranch?: AudioBranch },
) {
  const normalizedSlug = cleanSlug(slug);

  if (kind === "audio") {
    const normalizedBranch = cleanSlug(options?.audioBranch ?? "");
    if (normalizedBranch) {
      return buildR2ObjectKey(kind, `${normalizedBranch}/${normalizedSlug}.mp3`);
    }

    return buildR2ObjectKey(kind, `${normalizedSlug}.mp3`);
  }
  if (kind === "images") return buildR2ObjectKey(kind, `${normalizedSlug}.webp`);
  if (kind === "covers") return buildR2ObjectKey(kind, `${normalizedSlug}-cover.webp`);
  return buildR2ObjectKey(kind, `${normalizedSlug}.mp4`);
}

export function buildR2PublicUrlFromKey(key: string) {
  if (!r2Config.publicDevUrl) return undefined;
  return `${r2Config.publicDevUrl}/${key.replace(/^\/+/, "")}`;
}

export function buildR2MediaUrlFromSlug(
  kind: MediaKind,
  slug: string,
  options?: { audioBranch?: AudioBranch },
) {
  const key = buildR2MediaKeyFromSlug(kind, slug, options);
  return buildR2PublicUrlFromKey(key);
}
