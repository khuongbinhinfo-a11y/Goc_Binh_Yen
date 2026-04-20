import Link from "next/link";
import Image from "next/image";

export default function HuyenMonTuongPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/ngu-thuat" className="hover:text-[#4a2f20]">
            Ngũ thuật
          </Link>{" "}
          / Tướng
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Tướng học nhập môn: quan sát con người hay áp đặt định kiến?</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Tướng học nhập môn cần bắt đầu từ một nguyên tắc đạo đức: quan sát để hiểu sâu hơn, không dùng dấu hiệu bề ngoài để
            áp đặt và phán xét con người.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/ngu-thuat/ngu-thuat-card-tuong.png"
              alt="Tướng học nhập môn"
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
                Tướng học quan sát hình thể, thần thái, khí sắc và biểu hiện để gợi mở trạng thái bên trong. Từ quan sát đến kết
                luận là quãng đường dài, không thể rút gọn bằng vài công thức nông cạn.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Ứng dụng thực tế</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Rèn quan sát tinh tế hơn trong tiếp xúc con người.</li>
                <li>Tăng độ nhạy với bối cảnh thay vì chốt kết luận vội.</li>
                <li>Hỗ trợ tự soi lại thần sắc và nếp sống của chính mình.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giới hạn cần giữ</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Không dùng tướng để miệt thị, gán nhãn hoặc khép án.</li>
                <li>Không tuyệt đối hóa một vài dấu hiệu đơn lẻ.</li>
                <li>Không tách biểu hiện khỏi tuổi tác, bệnh trạng, môi trường và thời điểm.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
