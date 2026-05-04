import "server-only";

import { isR2MediaEnabled } from "@/lib/media/r2-config";
import { buildR2MediaUrlFromSlug, type MediaKind } from "@/lib/media/r2-paths";

export function resolveMediaUrlBySlug(input: {
  kind: MediaKind;
  slug: string;
  fallbackUrl: string;
}) {
  if (!isR2MediaEnabled()) return input.fallbackUrl;

  const r2Url = buildR2MediaUrlFromSlug(input.kind, input.slug);
  return r2Url ?? input.fallbackUrl;
}
