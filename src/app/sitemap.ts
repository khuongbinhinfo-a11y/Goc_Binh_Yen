import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

const ROUTES = ["/", "/doc-tho", "/ke-chuyen", "/tam-linh", "/tu-sach", "/ung-ho"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
