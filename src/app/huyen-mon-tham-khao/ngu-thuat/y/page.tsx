import Link from "next/link";
import Image from "next/image";

export default function HuyenMonYPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/ngu-thuat" className="hover:text-[#4a2f20]">
            Ngũ thuật
          </Link>{" "}
          / Y
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Y trong Ngũ thuật: vì sao không nên đồng nhất với y học hiện đại?</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Chữ Y trong Ngũ thuật là vùng tri thức truyền thống về thân thể, nhịp sống và cân bằng theo hệ quy chiếu Đông
            phương. Bài này nhấn mạnh ranh giới: không thần thánh hóa, không đồng nhất với y học hiện đại.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/ngu-thuat/ngu-thuat-card-y.png"
              alt="Y trong Ngũ thuật"
              width={1600}
              height={900}
              className="h-52 w-full object-cover sm:h-[340px]"
              priority
            />
          </div>

          <div className="mt-8 space-y-6 text-sm leading-7 text-[#654939] sm:text-base">
            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giải thích dễ hiểu</h2>
              <p className="mt-3">
                Y trong Ngũ thuật liên quan tới cách nhìn cơ thể như chỉnh thể, mối liên hệ giữa thân thể với mùa tiết, khí hậu,
                ăn ngủ, cảm xúc và nhịp sống. Phần này không nên bị rút gọn thành một nhãn chữa bệnh theo nghĩa hẹp.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giá trị thực tế</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Gợi mở tư duy chỉnh thể về sức khỏe và tổn hao.</li>
                <li>Nhắc lại vai trò của điều độ, dự phòng và điều chỉnh lối sống.</li>
                <li>Hỗ trợ đọc văn hóa và cổ thư phương Đông có nền tảng hơn.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giới hạn bắt buộc</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Không đồng nhất Y trong Ngũ thuật với y học hiện đại.</li>
                <li>Không dùng nội dung dưỡng sinh thay cho tư vấn y khoa bắt buộc.</li>
                <li>Không thần bí hóa cơ thể hoặc biến khái niệm cổ thành chân lý tuyệt đối.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
