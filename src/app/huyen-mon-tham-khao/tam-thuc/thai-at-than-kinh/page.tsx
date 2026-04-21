import Link from "next/link";

import SafeImage from "@/components/ui/SafeImage";
import { getTamThucImageProps } from "@/data/tamThucData";

export default function ThaiAtThanKinhPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Thái Ất Thần Kinh
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Thái Ất Thần Kinh</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Hệ quan sát vĩ mô của thời cuộc và thế thượng. Thái Ất nhìn từ chiều rộng và chiều dài của sự vận động lịch sử, cung cấp
            bối cảnh rộng cho việc hiểu nhịp vành đai thời gian.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <SafeImage
              {...getTamThucImageProps("tam-thuc-thai-at")}
              alt="Thái Ất Thần Kinh"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Mục tiêu nhánh Thái Ất</h2>
              <p className="mt-3">
                Giải thích khung nhìn vĩ mô của Thái Ất, cách vận hành trên nền thời-tượng-thế, và giới hạn khi áp vào đời sống
                cá nhân.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Bộ khung nội dung</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Thái Ất Thần Kinh là gì?</li>
                <li>Vị trí của Thái Ất trong hệ Tam thức</li>
                <li>Người xưa nhìn Thái Ất như một hệ quan sát thời cuộc ra sao?</li>
                <li>Thái Ất phù hợp với người học ở giai đoạn nào?</li>
                <li>Thái Ất có thể ứng dụng vào việc gì trong thực tế?</li>
                <li>Giới hạn của Thái Ất khi đem áp vào đời sống cá nhân</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Điểm đặc trưng</h2>
              <p className="mt-3">Tầm nhìn rộng, tĩnh sâu, phù hợp với những người muốn hiểu bối cảnh lớn chứ không theo đuổi dự báo chi tiết.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
