import { Suspense } from "react";

import PoemDetailClient from "./PoemDetailClient";
import { getLocalizedContentBySlug, getLocalizedContentList } from "@/data/localizedContent";
import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { resolveMetadataImageUrl } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = getLocalizedContentList("poem", "vi");
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const poem = getLocalizedContentBySlug("poem", slug, "vi");

  if (!poem) {
    return {
      title: "Không tìm thấy bài viết | Hồn Thơ",
    };
  }

  const title = poem.title;
  const description = poem.excerpt || poem.content.slice(0, 160).replace(/#/g, "").trim();
  const url = `https://www.hontho.com/doc-tho/${poem.slug}`;
  const image = poem.coverImage ? resolveMetadataImageUrl(poem.coverImage) : LOCAL_IMAGE_MAP.heroPoetry.fallback;

  return {
    title: `${title} | Đọc Thơ | Hồn Thơ`,
    description,
    openGraph: {
      title: `${title} | Đọc Thơ | Hồn Thơ`,
      description,
      url,
      siteName: "Hồn Thơ",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "vi_VN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Đọc Thơ | Hồn Thơ`,
      description,
      images: [image],
    },
  };
}

export default function PoemDetailPage() {
  return (
    <Suspense fallback={null}>
      <PoemDetailClient />
    </Suspense>
  );
}
