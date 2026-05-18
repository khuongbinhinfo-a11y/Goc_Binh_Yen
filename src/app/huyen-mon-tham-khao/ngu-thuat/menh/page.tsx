import type { Metadata } from "next";

import { NguThuatGroupListing } from "../_components/NguThuatGroupListing";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Mệnh · Ngũ thuật · Cổ học",
  description:
    "Nhánh Mệnh trong Ngũ thuật: đọc hiểu can chi, ngũ hành như lăng kính thiên hướng — không phải bản án, không dùng để quyết định thay cuộc đời.",
  path: "/huyen-mon-tham-khao/ngu-thuat/menh",
  image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/menh-card-bg.png",
});

export default function HuyenMonMenhListingPage() {
  return <NguThuatGroupListing group="menh" />;
}
