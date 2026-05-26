import TamLinhListingClient from "./TamLinhListingClient";
import { getLocalizedContentList } from "@/data/localizedContent";

export const metadata = {
  title: "Tâm Linh | Hồn Thơ",
  description: "Những bài viết về tâm linh, triết lý sống, và những suy ngẫm sâu sắc về cuộc đời.",
  openGraph: {
    title: "Tâm Linh | Hồn Thơ",
    description: "Những bài viết về tâm linh, triết lý sống, và những suy ngẫm sâu sắc về cuộc đời.",
    url: "https://www.hontho.com/tam-linh",
    siteName: "Hồn Thơ",
    images: [{ url: "https://www.hontho.com/images/tam-linh/hero-tam-linh.png", width: 1200, height: 630, alt: "Tâm Linh | Hồn Thơ" }],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tâm Linh | Hồn Thơ",
    description: "Những bài viết về tâm linh, triết lý sống, và những suy ngẫm sâu sắc về cuộc đời.",
    images: ["https://www.hontho.com/images/tam-linh/hero-tam-linh.png"],
  },
};

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
