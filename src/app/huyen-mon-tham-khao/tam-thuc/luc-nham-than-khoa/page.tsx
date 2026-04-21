import Link from "next/link";
import Image from "next/image";

export default function LucNhamThanKhoaPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Lục Nhâm Thần Khóa
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Lục Nhâm Thần Khóa</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Hệ mô tả diễn biến sự việc thông qua né tránh, khóa chặn và vận động khí. Lục Nhâm có chiều sâu nhất nhưng cũng dễ bị
            hiểu sai; cần thái độ rất cẩn trọng khi tiếp cận.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/tam-thuc/tam-thuc-luc-nham.jpg"
              alt="Lục Nhâm Thần Khóa"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Mục tiêu nhánh Lục Nhâm</h2>
              <p className="mt-3">
                Giới thiệu hệ quy chiếu của Lục Nhâm, cách nhìn diễn biến, và cảnh báo mạnh về những hiểu lầm phổ biến và nguy
                hiểm của lạm dụng.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Bộ khung nội dung</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Lục Nhâm Thần Khóa là gì?</li>
                <li>Lục Nhâm giữ vai trò gì trong hệ Tam thức?</li>
                <li>Vì sao Lục Nhâm thường được xem là khó tiếp cận với người mới?</li>
                <li>Lục Nhâm hình thành hệ quy chiếu để quan sát sự việc như thế nào?</li>
                <li>Lục Nhâm có thể dùng để tham khảo việc gì?</li>
                <li>Những hiểu lầm thường gặp khi tiếp cận Lục Nhâm Thần Khóa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Điểm đặc trưng</h2>
              <p className="mt-3">Sâu, phức tạp, chứa nhiều cạm bẫy; chỉ dành cho những người đủ tỏ tường và có tâm thái rất thận trọng.</p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
  );
}
