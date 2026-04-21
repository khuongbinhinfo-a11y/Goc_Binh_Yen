import Link from "next/link";

import SafeImage from "@/components/ui/SafeImage";
import { getTamThucImageProps } from "@/data/tamThucData";

export default function CachTiepCanPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Cách tiếp cận đúng
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Cách tiếp cận đúng</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Phân biệt điều gì là hệ thống nền, điều gì là diễn giải, ranh giới giữa tham khảo và khẳng định tuyệt đối. Tầng này
            cảnh báo những ngộ nhận phổ biến khi tiếp cận Tam thức.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <SafeImage
              {...getTamThucImageProps("tam-thuc-cach-tiep-can")}
              alt="Cách tiếp cận đúng"
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
                Xác lập thái độ học tập: cách hiểu Tam thức như tri thức nền để quan sát, chứ không phải bản án hay công cụ
                kiểm soát tuyệt đối.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Những vấn đề trọng tâm</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Tiếp cận Tam thức như tri thức nền, không phải niềm tin mù quáng</li>
                <li>Đọc Tam thức cần phân biệt điều gì là hệ thống, điều gì là diễn giải</li>
                <li>Vì sao cùng một vấn đề nhưng người luận Tam thức có thể cho góc nhìn khác nhau</li>
                <li>Giới hạn của Tam thức trong đời sống hiện đại</li>
                <li>Những ngộ nhận phổ biến khi mới bước vào Tam thức</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Định hướng</h2>
              <p className="mt-3">Cảnh báo, hướng dẫn, tăng cảnh giác trước những cách sử dụng không hợp lý.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
