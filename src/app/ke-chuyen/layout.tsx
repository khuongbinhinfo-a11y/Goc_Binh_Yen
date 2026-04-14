import type { Metadata } from "next";

import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Kể chuyện",
  description:
    "Kể chuyện tại Hồn Thơ với nhịp đời thường miền sông nước, bến cũ, mưa chiều và tình người.",
  path: "/ke-chuyen",
  image: "https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?auto=format&fit=crop&w=1600&q=80",
});

export default function KeChuyenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
