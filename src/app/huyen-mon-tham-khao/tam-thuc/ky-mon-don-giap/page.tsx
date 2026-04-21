import Link from "next/link";
import Image from "next/image";

export default function KyMonDonGiapPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Kỳ Môn Độn Giáp
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Kỳ Môn Độn Giáp</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Hệ quan sát tình huống cụ thể, kết hợp thời, không gian và thế cục. Kỳ Môn nhìn chi tiết hơn Thái Ất, linh hoạt hơn
            Lục Nhâm, thường được dùng để phân tích thời cơ và định hướng hành động.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/tam-thuc/tam-thuc-ky-mon.jpg"
              alt="Kỳ Môn Độn Giáp"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Mục tiêu nhánh Kỳ Môn</h2>
              <p className="mt-3">
                Giải thích cấu trúc thế cục, cách nhìn tình huống, nguyên lý phân tích, và cảnh báo nguy hiểm khi sử dụng như
                công cụ quyết định tuyệt đối.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Bộ khung nội dung</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Kỳ Môn Độn Giáp là gì?</li>
                <li>Vì sao Kỳ Môn thường được nhiều người biết đến hơn các hệ khác?</li>
                <li>Kỳ Môn nhìn một tình huống theo logic nào?</li>
                <li>Cấu trúc cơ bản của Kỳ Môn cho người mới</li>
                <li>Kỳ Môn có thể dùng để tham khảo điều gì trong đời sống?</li>
                <li>Giới hạn của Kỳ Môn khi bị dùng như công cụ quyết định thay con người</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Điểm đặc trưng</h2>
              <p className="mt-3">Linh hoạt, chi tiết, nhưng cần cẩn trọng với cách sử dụng; thích hợp cho những người muốn phân tích tình huống cụ thể.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
