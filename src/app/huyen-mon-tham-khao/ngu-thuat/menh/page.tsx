import Link from "next/link";
import Image from "next/image";

export default function HuyenMonMenhPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/ngu-thuat" className="hover:text-[#4a2f20]">
            Ngũ thuật
          </Link>{" "}
          / Mệnh
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Mệnh học nhập môn: mệnh dùng để hiểu gì, không dùng để hiểu gì?</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Mệnh học nên được dùng để soi khuynh hướng, nhận diện thiên lệch và gợi ý tự điều chỉnh, không phải bản án đóng kín
            tương lai của một con người.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/ngu-thuat/ngu-thuat-card-menh.png"
              alt="Mệnh học nhập môn"
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
                Ở tầng nhập môn, mệnh học là khung đọc xu hướng tính cách, điểm mạnh yếu tương đối và nhịp vận động đời sống.
                Đây là bản đồ tham khảo, không phải cơ chế định mệnh tuyệt đối.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Ứng dụng thực tế</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Tự hiểu thiên hướng nổi trội và vùng dễ lệch của bản thân.</li>
                <li>Tăng khả năng tự điều chỉnh thay vì buông xuôi theo nhãn mệnh.</li>
                <li>Đọc truyền thống phương Đông dưới góc nhìn cấu trúc nền và vận.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giới hạn cần giữ</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Không phán số cứng, không dùng mệnh để hù dọa.</li>
                <li>Không dùng mệnh làm cớ thoái thác trách nhiệm sống.</li>
                <li>Không gán nhãn toàn bộ giá trị con người chỉ bằng vài chỉ dấu.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
