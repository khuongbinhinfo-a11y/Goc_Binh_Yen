import Link from "next/link";
import Image from "next/image";

export default function NhapMonTamThucPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Nhập môn Tam thức
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Nhập môn Tam thức</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Nền tảng khái niệm, phạm vi đọc hiểu và cách tiếp cận Tam thức ở mức cơ bản. Tầng này tạo điều kiện để người mới
            hiểu Tam thức là gì, khác với Ngũ thuật ở đâu, và nên bắt đầu từ đâu.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/tam-thuc/tam-thuc-nhap-mon.jpg"
              alt="Nhập môn Tam thức"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Mục tiêu tầng nhập môn</h2>
              <p className="mt-3">
                Cung cấp khái niệm rõ ràng về Tam thức, giải thích vì sao ba hệ này được gọi chung là một bộ, tách biệt ranh
                giới giữa tri thức nền và niềm tin mù quáng.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Những câu hỏi trung tâm</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Tam thức là gì trong huyền học phương Đông?</li>
                <li>Vì sao Thái Ất, Kỳ Môn, Lục Nhâm được gọi chung là Tam thức?</li>
                <li>Tam thức khác Ngũ thuật ở đâu?</li>
                <li>Tam thức dùng để tham khảo điều gì, và không dùng để làm gì?</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Hình thức trình bày</h2>
              <p className="mt-3">Tầng này có kết cấu ngắn, dạng giới thiệu, tránh sâu vào hệ thống kỹ thuật.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
