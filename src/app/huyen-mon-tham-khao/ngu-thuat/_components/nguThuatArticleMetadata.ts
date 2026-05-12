import type { Metadata } from "next";

import {
  getNguThuatArticle,
  nguThuatArticleHref,
  nguThuatGroupLabel,
  type NguThuatGroupId,
} from "@/data/coHocNguThuatArticles";
import { createRouteMetadata } from "@/lib/seo";

export function buildNguThuatArticleMetadata(group: NguThuatGroupId, slug: string): Metadata {
  const article = getNguThuatArticle(group, slug);
  if (!article) {
    return {};
  }

  return createRouteMetadata({
    title: `${article.title} · ${nguThuatGroupLabel(group)} · Ngũ thuật`,
    description: article.description,
    path: nguThuatArticleHref(group, slug),
    image: article.coverImage,
  });
}
