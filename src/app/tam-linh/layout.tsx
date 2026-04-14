import type { Metadata } from "next";

import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Tâm linh",
  description:
    "Tâm linh tại Hồn Thơ là khoảng lắng sâu để thở chậm, chiêm nghiệm và tìm lại bình an.",
  path: "/tam-linh",
  image: "https://images.unsplash.com/photo-1508022713622-df2d8fb7b4cd?auto=format&fit=crop&w=1600&q=80",
});

export default function TamLinhLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
