import type { Metadata } from "next";

import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Tâm linh",
  description:
    "Tâm linh tại Hồn Thơ là khoảng lắng sâu để thở chậm, chiêm nghiệm và tìm lại bình an.",
  path: "/tam-linh",
  image: LOCAL_IMAGE_MAP.heroSpiritual.fallback,
});

export default function TamLinhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
