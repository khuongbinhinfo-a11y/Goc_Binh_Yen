import KeChuyenListingClient from "./KeChuyenListingClient";
import { LOCAL_IMAGE_MAP } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Kể Chuyện | Hồn Thơ",
  description: "Những câu chuyện nhỏ về miền Tây, về quê hương, về tình người - được kể bằng giọng văn giản dị và ấm áp.",
  path: "/ke-chuyen",
  image: LOCAL_IMAGE_MAP.heroStory.fallback,
});

export default function KeChuyenPage() {
  return <KeChuyenListingClient />;
}

