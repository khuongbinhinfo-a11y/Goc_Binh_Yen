import Link from "next/link";

import SafeImage from "@/components/ui/SafeImage";
import { getTamThucImageProps } from "@/data/tamThucData";

export default function SoSanhVaDinhViPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / So sánh và định vị
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">So sánh và định vị</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Phân tích ba lối quan sát khác nhau (Thái Ất, Kỳ Môn, Lục Nhâm), so sánh mỗi hệ với nhau, và xác định mối quan hệ giữa
            Tam thức và Ngũ thuật.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <SafeImage
              {...getTamThucImageProps("tam-thuc-so-sanh")}
              alt="So sánh và định vị"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Mục tiêu tầng này</h2>
              <p className="mt-3">
                Làm sáng rõ sự khác biệt giữa ba hệ, giúp người học chọn lối tiếp cận phù hợp với mục đích riêng của mình.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Các bài so sánh</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Thái Ất, Kỳ Môn, Lục Nhâm: nên hiểu như ba lối quan sát khác nhau</li>
                <li>Tam thức và Ngũ thuật: quan hệ, giao thoa và khác biệt</li>
                <li>Kỳ Môn và Lục Nhâm khác nhau ở điểm nào trong cách nhìn sự việc</li>
                <li>Thái Ất khác Kỳ Môn ở tầm nhìn và mục tiêu quan sát</li>
                <li>Vì sao không nên hỏi môn nào "linh hơn", mà nên hỏi môn nào phù hợp hơn</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Hình thức</h2>
              <p className="mt-3">Bảng so sánh, phân tích theo góc độ mục tiêu, cấu trúc, và ứng dụng.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
