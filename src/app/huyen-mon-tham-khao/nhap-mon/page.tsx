import Link from "next/link";
import Image from "next/image";

import { coHocIntroArticles } from "@/data/coHocIntroArticles";

export default function HuyenMonNhapMonPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          / Nhập môn
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Nhập môn</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Trang này đặt nền cho người mới: thuật ngữ cơ bản, mục tiêu học đúng tầng và cách đọc tài liệu có kiểm chứng.
            Đây là khung định hướng, chưa đi vào bài chuyên sâu.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/co-hoc/Nhap-mon.jpeg"
              alt="Nhập môn Cổ học"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>
        </article>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {coHocIntroArticles.map((article) => (
            <article key={article.slug} className="soft-panel overflow-hidden bg-[#fffaf4]">
              <Link href={`/huyen-mon-tham-khao/nhap-mon/${article.slug}`} className="block">
                <div className="border-b border-[#e9d8c6]">
                  <Image src={article.coverImage} alt={article.title} width={800} height={450} className="h-auto w-full" />
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold leading-7 text-[#4a2f20]">{article.title}</h2>
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
