import type { Metadata } from "next";

import { NguThuatGroupListing } from "../_components/NguThuatGroupListing";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Bốc · Ngũ thuật · Cổ học",
  description:
    "Nhánh Bốc trong Ngũ thuật: tham khảo phương pháp xem thời cơ và dấu hiệu theo cổ truyền, giữ tinh thần cẩn trọng và không áp đặt kết quả.",
  path: "/huyen-mon-tham-khao/ngu-thuat/boc",
  image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/boc-card-bg.png",
});

export default function HuyenMonBocListingPage() {
  return <NguThuatGroupListing group="boc" />;
}
