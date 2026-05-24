import { getLocalizedContentBySlug, getLocalizedContentList } from "@/data/localizedContent";
import { notFound } from "next/navigation";
import KeChuyenDetailClient from "./KeChuyenDetailClient";

export async function generateStaticParams() {
  const items = getLocalizedContentList("story", "vi");
  return items.map((item) => ({
    slug: item.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const story = getLocalizedContentBySlug("story", slug, "vi");

  if (!story) {
    return {
      title: "Không tìm thấy bài viết | Hồn Thơ",
    };
  }

  const title = story.title;
  const description = story.excerpt || story.content.slice(0, 160).replace(/#/g, "").trim();
  const url = `https://www.hontho.com/ke-chuyen/${story.slug}`;
  const image = story.coverImage || "https://www.hontho.com/images/ke-chuyen/ke-chuyen-hero.png";

  return {
    title: `${title} | Kể Chuyện | Hồn Thơ`,
    description,
    openGraph: {
      title: `${title} | Kể Chuyện | Hồn Thơ`,
      description,
      url,
      siteName: "Hồn Thơ",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "vi_VN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Kể Chuyện | Hồn Thơ`,
      description,
      images: [image],
    },
  };
}

export default async function KeChuyenDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = getLocalizedContentBySlug("story", slug, "vi");

  if (!story) {
    notFound();
  }

  return <KeChuyenDetailClient story={story} />;
}

