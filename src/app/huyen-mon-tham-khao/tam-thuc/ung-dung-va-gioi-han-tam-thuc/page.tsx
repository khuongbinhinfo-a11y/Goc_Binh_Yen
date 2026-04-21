import Link from "next/link";
import Image from "next/image";

export default function UngDungVaGioiHanPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Ứng dụng và giới hạn
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Ứng dụng và giới hạn</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Nguyên tắc sử dụng thận trọng, phân biệt tham khảo và khẳng định tuyệt đối, ranh giới giữa sáng hơn và lệ thuộc hơn.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/co-hoc/tam-thuc.jpeg"
              alt="Ứng dụng và giới hạn"
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
                Đặt gác ranh giới, cảnh báo nguy hiểm của lệ thuộc, hướng dẫn cách dùng Tam thức như công cụ tham khảo, chứ
                không phải công cụ quyết định thay con người.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Nội dung chính</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Có nên dùng Tam thức để quyết định việc lớn trong đời không?</li>
                <li>Tam thức nên được xem là công cụ tham khảo hay kim chỉ nam tuyệt đối?</li>
                <li>Ranh giới giữa tham khảo huyền học và lệ thuộc huyền học</li>
                <li>Vì sao người học Tam thức càng lâu càng cần giữ sự tỉnh táo?</li>
                <li>Hiểu đúng về "ứng" và "không ứng" trong các hệ dự đoán phương Đông</li>
                <li>Tam thức có thể soi sáng nhận thức, nhưng không thay con người sống hộ</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Tinh thần</h2>
              <p className="mt-3">
                Cảnh báo và hướng dẫn cách sử dụng có trách nhiệm, tôn trọng sự quyết định của con người trong cuộc sống.
              </p>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
