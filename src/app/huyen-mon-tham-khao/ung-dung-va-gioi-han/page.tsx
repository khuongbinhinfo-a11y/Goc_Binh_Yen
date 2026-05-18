import type { Metadata } from "next";

import Link from "next/link";
import Image from "next/image";

import { coHocUngDungGioiHanArticles } from "@/data/coHocUngDungGioiHanArticles";
import { getSafeImageSrc } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Ứng dụng và giới hạn · Cổ học",
  description:
    "Cụm bài giúp hiểu cổ học có thể ứng dụng vào đời sống thế nào và giới hạn nên giữ để không rơi vào mê tín, sợ hãi hay lệ thuộc.",
  path: "/huyen-mon-tham-khao/ung-dung-va-gioi-han",
  image: "/images/articles/huyen-mon-tham-khao/ung-dung-va-gioi-han/ung-dung-va-gioi-han-hero.png",
});

const HUB_DISCLAIMER =
  "Các bài trong mục này mang tinh thần tham khảo đời sống: giúp đọc cổ học với độ tỉnh táo, phân biệt giữa gợi mở và áp đặt. Nội dung không thay cho quyết định chuyên môn, pháp lý hay y tế khi bạn cần.";

export default function HuyenMonUngDungVaGioiHanHubPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          / Ứng dụng và giới hạn
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Ứng dụng và giới hạn</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Cụm bài này giúp bạn hiểu cổ học có thể ứng dụng vào đời sống thế nào — và giới hạn nên giữ ở đâu để khỏi rơi vào mê tín nặng, sợ hãi, phán xét hay lệ thuộc. Đọc chậm, đặt câu hỏi cho chính mình giữa các đoạn.
          </p>
          <aside className="mt-5 rounded-lg border border-[#e3d1be] bg-[#fff5eb] p-4 text-sm leading-7 text-[#5e4332] sm:text-base">
            {HUB_DISCLAIMER}
          </aside>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src={getSafeImageSrc("/images/articles/huyen-mon-tham-khao/ung-dung-va-gioi-han/ung-dung-va-gioi-han-hero.png")}
              alt="Ứng dụng và giới hạn"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>
        </article>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {coHocUngDungGioiHanArticles.map((article) => (
            <article key={article.slug} className="soft-panel overflow-hidden bg-[#fffaf4]">
              <Link href={`/huyen-mon-tham-khao/ung-dung-va-gioi-han/${article.slug}`} className="block">
                <div className="border-b border-[#e9d8c6]">
                  <Image
                    src={getSafeImageSrc(article.coverImage)}
                    alt={article.title}
                    width={800}
                    height={450}
                    className="h-auto w-full"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold leading-7 text-[#4a2f20]">{article.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#654939]">{article.description}</p>
                  <p className="mt-3 text-sm font-semibold text-[#7b5437]">Đọc bài →</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
