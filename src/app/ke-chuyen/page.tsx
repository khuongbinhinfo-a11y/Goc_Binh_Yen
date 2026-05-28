import KeChuyenListingClient from "./KeChuyenListingClient";
import { createRouteMetadata } from "@/lib/seo";

export const metadata = createRouteMetadata({
  title: "Kể Chuyện | Hồn Thơ",
  description: "Những câu chuyện nhỏ về miền Tây, về quê hương, về tình người - được kể bằng giọng văn giản dị và ấm áp.",
  path: "/ke-chuyen",
  image: "/images/ke-chuyen/ke-chuyen-hero.png",
});

export default function KeChuyenPage() {
  return <KeChuyenListingClient />;
}

