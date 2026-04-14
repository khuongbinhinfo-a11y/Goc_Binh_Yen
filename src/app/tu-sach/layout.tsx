import type { Metadata } from "next";

import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Tủ sách",
  description:
    "Tủ sách của Hồn Thơ giới thiệu những tập thơ và ấn phẩm in mang theo hơi thở ký ức quê nhà.",
  path: "/tu-sach",
  image: "/images/poems/em-mua-xuan-ve.jpeg",
});

export default function TuSachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
