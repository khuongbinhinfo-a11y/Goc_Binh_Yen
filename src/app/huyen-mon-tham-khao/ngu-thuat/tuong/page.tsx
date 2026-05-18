import type { Metadata } from "next";

import { NguThuatGroupListing } from "../_components/NguThuatGroupListing";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Tướng · Ngũ thuật · Cổ học",
  description:
    "Nhánh Tướng trong Ngũ thuật: quan sát thần thái, phong thái và biểu hiện bên ngoài — đọc người theo tinh thần điềm tĩnh, không phán xét cứng.",
  path: "/huyen-mon-tham-khao/ngu-thuat/tuong",
  image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/tuong-card-bg.png",
});

export default function HuyenMonTuongListingPage() {
  return <NguThuatGroupListing group="tuong" />;
}
