import TamLinhListingClient from "./TamLinhListingClient";
import { getLocalizedContentList } from "@/data/localizedContent";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Tâm Linh | Hồn Thơ",
  description: "Những bài viết về tâm linh, triết lý sống, và những suy ngẫm sâu sắc về cuộc đời.",
  path: "/tam-linh",
  image: "/images/tam-linh/hero-tam-linh.png",
});

export default function TamLinhPage() {
  const listingItems = {
    vi: getLocalizedContentList("spiritual", "vi").map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      publishedAt: item.publishedAt,
      hasAudio: item.hasAudio,
      coverImage: item.coverImage,
      isFeatured: item.isFeatured,
      contentType: item.contentType,
      tag: item.tag,
      author: item.author,
    })),
    en: getLocalizedContentList("spiritual", "en").map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      category: item.category,
      publishedAt: item.publishedAt,
      hasAudio: item.hasAudio,
      coverImage: item.coverImage,
      isFeatured: item.isFeatured,
      contentType: item.contentType,
      tag: item.tag,
      author: item.author,
    })),
  };
  const hasFallbackContent = getLocalizedContentList("spiritual", "en").some((item) => item.i18nStatus.hasFallback);

  return <TamLinhListingClient itemsByLocale={listingItems} hasFallbackContent={hasFallbackContent} />;
}
