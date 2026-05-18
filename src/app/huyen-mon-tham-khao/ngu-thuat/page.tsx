import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";

import { getSafeImageSrc } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";
import { AppHubBanner } from "@/components/huyen-mon/AppHubBanner";

export const metadata: Metadata = createRouteMetadata({
  title: "Ngũ thuật · Cổ học",
  description:
    "Khung Ngũ thuật phương Đông: Sơn, Y, Bốc, Mệnh, Tướng — giới thiệu phạm vi từng nhánh theo tinh thần điềm tĩnh, có ranh giới an toàn rõ ràng.",
  path: "/huyen-mon-tham-khao/ngu-thuat",
  image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/ngu-thuat-hero.png",
});

const HERO_IMAGE = "/images/articles/huyen-mon-tham-khao/ngu-thuat/ngu-thuat-hero.png";

const branches = [
  {
    title: "Sơn",
    href: "/huyen-mon-tham-khao/ngu-thuat/son",
    image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/son-card-bg.png",
  },
  {
    title: "Y",
    href: "/huyen-mon-tham-khao/ngu-thuat/y",
    image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/y-card-bg.png",
  },
  {
    title: "Bốc",
    href: "/huyen-mon-tham-khao/ngu-thuat/boc",
    image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/boc-card-bg.png",
  },
  {
    title: "Mệnh",
    href: "/huyen-mon-tham-khao/ngu-thuat/menh",
    image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/menh-card-bg.png",
  },
  {
    title: "Tướng",
    href: "/huyen-mon-tham-khao/ngu-thuat/tuong",
    image: "/images/articles/huyen-mon-tham-khao/ngu-thuat/tuong-card-bg.png",
  },
];

export default function HuyenMonNguThuatPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          / Ngũ thuật
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Ngũ thuật</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Khung Ngũ thuật dưới đây nhằm giúp phân biệt phạm vi từng nhánh và tránh trộn lẫn phương pháp.
            Mỗi nhánh có các bài đọc ngắn — điềm tĩnh, đời thường, có ranh giới an toàn rõ ràng.
          </p>
          <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#e9d8c6] bg-[#f7efe3] sm:aspect-[2/1]">
            <Image
              src={getSafeImageSrc(HERO_IMAGE)}
              alt="Ngũ thuật"
              fill
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-contain object-center"
              priority
            />
          </div>
        </article>

        <AppHubBanner
          title="Khu ứng dụng Ngũ thuật"
          description="Sơn · Y · Mệnh · Bốc · Tướng sẽ có khu ứng dụng riêng để tra cứu, lưu hồ sơ và mở rộng bản nâng cao."
          primaryLabel="Mở khu ứng dụng"
          primaryHref="https://app.hontho.com/nguthuat"
          secondaryLabel="Ở lại đọc nội dung"
          icon="compass"
        />

        <div className="mt-6 clear-both grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((item) => (
            <article key={item.href} className="soft-panel relative overflow-hidden bg-[#fffaf4] p-5">
              <div className="mb-4 overflow-hidden rounded-xl border border-[#dcc5ae] bg-[#f7efe3]">
                <div className="relative aspect-[3/1] w-full">
                  <Image
                    src={getSafeImageSrc(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain object-center"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">{item.title}</h2>
              <Link
                href={item.href}
                className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
              >
                Vào nhóm
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
