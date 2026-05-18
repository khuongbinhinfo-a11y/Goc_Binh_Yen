import type { Metadata } from "next";

import { NguThuatGroupListing } from "../_components/NguThuatGroupListing";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Sơn · Ngũ thuật · Cổ học",
  description:
    "Nhánh Sơn trong Ngũ thuật: các bài thực hành điều dưỡng tâm thân, sống chậm và gìn giữ nội lực theo truyền thống phương Đông.",
  path: "/huyen-mon-tham-khao/ngu-thuat/son",
  image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/son-card-bg.png",
});

export default function HuyenMonSonListingPage() {
  return <NguThuatGroupListing group="son" />;
}
