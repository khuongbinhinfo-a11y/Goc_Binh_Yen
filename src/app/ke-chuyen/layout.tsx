import type { Metadata } from "next";

import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Kể chuyện",
  description:
    "Kể chuyện tại Hồn Thơ với nhịp đời thường miền sông nước, bến cũ, mưa chiều và tình người.",
  path: "/ke-chuyen",
  image: LOCAL_IMAGE_MAP.heroStory.fallback,
});

export default function KeChuyenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
