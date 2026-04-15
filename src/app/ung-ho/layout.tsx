import type { Metadata } from "next";

import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Ủng hộ Hồn Thơ",
  description:
    "Nếu bạn muốn góp một phần nhỏ để gìn giữ không gian này, Hồn Thơ luôn trân trọng từng lời đồng hành.",
  path: "/ung-ho",
  image: LOCAL_IMAGE_MAP.heroSupport.fallback,
});

export default function UngHoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
