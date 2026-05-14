import type { MetadataRoute } from "next";

import { coHocIntroArticles } from "@/data/coHocIntroArticles";
import { coHocNguThuatArticles } from "@/data/coHocNguThuatArticles";
import { coHocUngDungGioiHanArticles } from "@/data/coHocUngDungGioiHanArticles";
import { poetryPosts, storyPosts, spiritualPosts } from "@/data/contentLibrary";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/doc-tho", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/ke-chuyen", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/tam-linh", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/tu-sach", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/ung-ho", changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/huyen-mon-tham-khao", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/huyen-mon-tham-khao/bai-viet", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/huyen-mon-tham-khao/nhap-mon", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/huyen-mon-tham-khao/ngu-thuat", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/huyen-mon-tham-khao/ngu-thuat/son", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/huyen-mon-tham-khao/ngu-thuat/y", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/huyen-mon-tham-khao/ngu-thuat/menh", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/huyen-mon-tham-khao/ngu-thuat/boc", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/huyen-mon-tham-khao/ngu-thuat/tuong", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/huyen-mon-tham-khao/ung-dung-va-gioi-han", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/huyen-mon-tham-khao/tam-thuc", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/huyen-mon-tham-khao/tam-thuc/nhap-mon-tam-thuc", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/huyen-mon-tham-khao/tam-thuc/cach-tiep-can", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/huyen-mon-tham-khao/tam-thuc/so-sanh-va-dinh-vi", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/huyen-mon-tham-khao/tam-thuc/chuyen-sau-dinh-huong", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/huyen-mon-tham-khao/tam-thuc/ung-dung-va-gioi-han-tam-thuc", changeFrequency: "monthly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const poemEntries: MetadataRoute.Sitemap = poetryPosts.map((item) => ({
    url: `${SITE_URL}/doc-tho/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const storyEntries: MetadataRoute.Sitemap = storyPosts.map((item) => ({
    url: `${SITE_URL}/ke-chuyen/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const spiritualEntries: MetadataRoute.Sitemap = spiritualPosts.map((item) => ({
    url: `${SITE_URL}/tam-linh/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const nhapMonEntries: MetadataRoute.Sitemap = coHocIntroArticles.map((item) => ({
    url: `${SITE_URL}/huyen-mon-tham-khao/nhap-mon/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const nguThuatEntries: MetadataRoute.Sitemap = coHocNguThuatArticles.map((item) => ({
    url: `${SITE_URL}/huyen-mon-tham-khao/ngu-thuat/${item.group}/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const ungDungEntries: MetadataRoute.Sitemap = coHocUngDungGioiHanArticles.map((item) => ({
    url: `${SITE_URL}/huyen-mon-tham-khao/ung-dung-va-gioi-han/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...poemEntries,
    ...storyEntries,
    ...spiritualEntries,
    ...nhapMonEntries,
    ...nguThuatEntries,
    ...ungDungEntries,
  ];
}
