import type { Metadata } from "next";

import { NguThuatGroupListing } from "../_components/NguThuatGroupListing";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Y · Ngũ thuật · Cổ học",
  description:
    "Nhánh Y trong Ngũ thuật: hiểu cơ thể theo nhịp tự nhiên, dưỡng sinh đời thường và giới hạn khi áp y thuật cổ truyền vào sức khỏe hiện đại.",
  path: "/huyen-mon-tham-khao/ngu-thuat/y",
  image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/y-card-bg.png",
});

export default function HuyenMonYListingPage() {
  return <NguThuatGroupListing group="y" />;
}
