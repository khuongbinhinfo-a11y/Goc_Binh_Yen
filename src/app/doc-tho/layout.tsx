import type { Metadata } from "next";

import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Đọc thơ",
  description:
    "Đọc thơ tại Hồn Thơ với những bài viết mang nhịp chiều quê, sông nước và ký ức dịu dàng.",
  path: "/doc-tho",
  image: "/images/poems/ben-do.jpeg",
});

export default function DocThoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
