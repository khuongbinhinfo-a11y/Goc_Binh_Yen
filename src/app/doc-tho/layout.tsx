import type { Metadata } from "next";

import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Đọc thơ",
  description:
    "Đọc thơ tại Hồn Thơ với những bài viết mang nhịp chiều quê, sông nước và ký ức dịu dàng.",
  path: "/doc-tho",
  image: LOCAL_IMAGE_MAP.heroPoetry.fallback,
});

export default function DocThoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
