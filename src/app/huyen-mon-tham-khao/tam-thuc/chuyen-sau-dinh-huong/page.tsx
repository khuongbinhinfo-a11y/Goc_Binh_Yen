import Link from "next/link";
import Image from "next/image";

export default function ChuyenSauDinhHuongPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Chuyên sâu định hướng
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Chuyên sâu định hướng nghiên cứu</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Chiều sâu học thuật, phân tích hệ thống biểu tượng, dị bản và trường phái, ranh giới giữa cổ pháp và diễn giải hiện
            đại.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/tam-thuc/tam-thuc-nghien-cuu.jpg"
              alt="Chuyên sâu định hướng"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Mục tiêu tầng chuyên sâu</h2>
              <p className="mt-3">
                Cung cấp nền tảng học thuật, tìm hiểu gốc rễ hệ thống Tam thức, khám phá dị bản và vấn đề truyền thừa tri thức
                qua các thế hệ.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Hướng nghiên cứu</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Tam thức dưới góc nhìn hệ thống biểu tượng của phương Đông</li>
                <li>Vai trò của thời, khí, tượng, thế trong tư duy Tam thức</li>
                <li>Vì sao Tam thức có nhiều dị bản và cách truyền khác nhau</li>
                <li>Đọc Tam thức nên tôn trọng cổ thư đến mức nào?</li>
                <li>Giữa cổ pháp và diễn giải hiện đại, đâu là điều cần giữ?</li>
                <li>Học Tam thức để hiểu đời hay để kiểm soát đời?</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Đối tượng</h2>
              <p className="mt-3">Dành cho những người muốn đi sâu vào nghiên cứu, so sánh trường phái, và hiểu rõ hơn nền tảng lịch sử và triết học.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
