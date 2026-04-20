import Link from "next/link";
import Image from "next/image";

export default function HuyenMonBocPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/ngu-thuat" className="hover:text-[#4a2f20]">
            Ngũ thuật
          </Link>{" "}
          / Bốc
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Bốc là gì: từ dự đoán đến mô hình quan sát thời thế</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Bốc không chỉ là đoán điều chưa biết. Ở tầng nhập môn, đây là mô hình đặt câu hỏi, lập hình thế và đọc xu hướng để
            hỗ trợ suy xét có trách nhiệm trước bất định.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/ngu-thuat/ngu-thuat-card-boc.png"
              alt="Bốc học nhập môn"
              width={1600}
              height={900}
              className="h-52 w-full object-cover sm:h-[340px]"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giải thích dễ hiểu</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Đặt câu hỏi đúng trước một tình huống chưa rõ.</li>
                <li>Dùng hệ ký hiệu để lập hình thế quan sát.</li>
                <li>Đọc quan hệ thuận - nghịch, động - tĩnh, mạnh - yếu để ra hướng luận tham khảo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Ứng dụng thực tế</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Rèn cách đặt vấn đề rõ ràng hơn.</li>
                <li>Tập nhìn thế cục thay vì bám một sự kiện đơn lẻ.</li>
                <li>Hỗ trợ suy nghĩ, không thay thế dữ kiện và trách nhiệm cá nhân.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giới hạn cần giữ</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Không hứa độ chính xác tuyệt đối hay dùng để hù dọa.</li>
                <li>Không thay thế quyết định pháp lý, tài chính, y khoa bằng một kết luận quẻ tượng.</li>
                <li>Phải tách rõ dữ liệu hình thế và phần diễn giải của con người.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
