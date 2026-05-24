import { getLocalizedContentBySlug, getLocalizedContentList } from "@/data/localizedContent";
import { notFound } from "next/navigation";
import TamLinhDetailClient from "./TamLinhDetailClient";

export async function generateStaticParams() {
  const items = getLocalizedContentList("spiritual", "vi");
  return items.map((item) => ({
    slug: item.slug,
  }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getLocalizedContentBySlug("spiritual", slug, "vi");

  if (!post) {
    return {
      title: "Không tìm thấy bài viết | Hồn Thơ",
    };
  }

  const title = post.title;
  const description = post.excerpt || post.content.slice(0, 160).replace(/#/g, "").trim();
  const url = `https://www.hontho.com/tam-linh/${post.slug}`;
  const image = post.coverImage || "https://www.hontho.com/images/tam-linh/hero-tam-linh.png";

  return {
    title: `${title} | Tâm Linh | Hồn Thơ`,
    description,
    openGraph: {
      title: `${title} | Tâm Linh | Hồn Thơ`,
      description,
      url,
      siteName: "Hồn Thơ",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "vi_VN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Tâm Linh | Hồn Thơ`,
      description,
      images: [image],
    },
  };
}

export default async function TamLinhDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getLocalizedContentBySlug("spiritual", slug, "vi");

  if (!post) {
    notFound();
  }

  return <TamLinhDetailClient post={post} />;
}
