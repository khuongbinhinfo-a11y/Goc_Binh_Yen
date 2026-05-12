import { getNguThuatArticlesByGroup } from "@/data/coHocNguThuatArticles";

import { buildNguThuatArticleMetadata } from "../../_components/nguThuatArticleMetadata";
import { NguThuatArticleView } from "../../_components/NguThuatArticleView";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getNguThuatArticlesByGroup("menh").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return buildNguThuatArticleMetadata("menh", slug);
}

export default async function HuyenMonMenhArticlePage({ params }: PageProps) {
  const { slug } = await params;
  return <NguThuatArticleView group="menh" slug={slug} />;
}
