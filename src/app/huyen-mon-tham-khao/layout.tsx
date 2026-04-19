import type { Metadata } from "next";

import SiteFooter from "@/components/layout/SiteFooter";
import SiteHeader from "@/components/layout/SiteHeader";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Cổ học",
  description:
    "Không gian Cổ học của Hồn Thơ: nhập môn, ngũ thuật, tam thức và ứng dụng trong tinh thần điềm tĩnh, sáng rõ.",
  path: "/huyen-mon-tham-khao",
  image: "/images/co-hoc/Co-hoc.jpeg",
});

export default function HuyenMonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#f3eadf] text-[#3d2a1f]">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
