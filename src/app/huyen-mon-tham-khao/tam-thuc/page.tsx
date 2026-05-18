import type { Metadata } from "next";

import Link from "next/link";

import SafeImage from "@/components/ui/SafeImage";
import {
  getTamThucImageProps,
  tamThucAdvancedSections,
  tamThucFoundationSections,
  tamThucSystemSections,
} from "@/data/tamThucData";
import { createRouteMetadata } from "@/lib/seo";
import { AppHubBanner } from "@/components/huyen-mon/AppHubBanner";

export const metadata: Metadata = createRouteMetadata({
  title: "Tam thức · Cổ học",
  description:
    "Khung tham chiếu ba hệ Thái Ất, Kỳ Môn, Lục Nhâm của huyền học phương Đông — trình bày theo tầng nhập môn và chuyên sâu, thái độ thận trọng.",
  path: "/huyen-mon-tham-khao/tam-thuc",
  image: "/images/sections/tam-thuc/hero-tam-thuc.jpg",
});

export default function HuyenMonTamThucPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          / Tam thức
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Tam thức</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Khung tham chiếu ba hệ (Thái Ất, Kỳ Môn, Lục Nhâm) của huyền học phương Đông, được trình bày ở tầng nhập môn và
            chuyên sâu. Mỗi hệ cung cấp lối quan sát khác nhau, và cần được sử dụng với thái độ thận trọng.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <SafeImage
              {...getTamThucImageProps("hero-tam-thuc")}
              alt="Tam thức"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>
        </article>

        <AppHubBanner
          title="Khu ứng dụng Tam thức"
          description="Các công cụ thực hành và tra cứu thuộc nhánh Tam thức sẽ được đặt trong khu ứng dụng riêng để dễ sử dụng, lưu hồ sơ và mở rộng tính năng sau này."
          primaryLabel="Mở khu ứng dụng Tam thức"
          primaryHref="https://app.hontho.com/tam-thuc"
          secondaryLabel="Ở lại đọc nội dung"
        />

        {/* Tầng nền */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#4a2f20] mb-4">Tầng nền: Tiếp cận Tam thức</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {tamThucFoundationSections.map((item) => (
              <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
                <h3 className="text-lg font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#654939]">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-xs font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Khám phá
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Ba hệ quy chiếu */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#4a2f20] mb-4">Ba hệ quy chiếu: Thái Ất, Kỳ Môn, Lục Nhâm</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {tamThucSystemSections.map((item) => (
              <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
                <h3 className="text-lg font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#654939]">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-xs font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Tìm hiểu
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Tầng ứng dụng và chuyên sâu */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#4a2f20] mb-4">Tầng ứng dụng và chuyên sâu</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tamThucAdvancedSections.map((item) => (
              <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
                <h3 className="text-lg font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#654939]">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-xs font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Đọc thêm
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
