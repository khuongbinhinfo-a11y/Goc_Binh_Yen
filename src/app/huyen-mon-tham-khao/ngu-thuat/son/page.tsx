import Link from "next/link";
import Image from "next/image";

export default function HuyenMonSonPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/ngu-thuat" className="hover:text-[#4a2f20]">
            Ngũ thuật
          </Link>{" "}
          / Sơn
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20] sm:text-4xl">Sơn học nhập môn: dưỡng thân, dưỡng khí, dưỡng tâm</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Trong khung Ngũ thuật, Sơn là trục tu dưỡng thân - khí - tâm. Bài này giữ tinh thần điềm tĩnh: không thần bí hóa,
            không giản lược Sơn thành vài động tác rời rạc.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/sections/ngu-thuat/ngu-thuat-card-son.png"
              alt="Sơn học nhập môn"
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
                Sơn học chú trọng điều thân, điều tức, điều tâm và nếp sống điều độ. Cách hiểu cân bằng là chỉnh thân để an tâm,
                chỉnh tâm để giữ khí, và chỉnh khí để nuôi sức sống.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Cấu trúc nhập môn</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Dưỡng thân: sinh hoạt, ngủ nghỉ, ăn uống và vận động có chừng mực.</li>
                <li>Dưỡng khí: giữ nhịp thở ổn, giảm hao tổn do căng thẳng và thất điều.</li>
                <li>Dưỡng tâm: bớt hấp tấp, tăng tự quan sát, giữ tâm không bị kéo đi liên tục.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Ứng dụng thực tế</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Chỉnh lại nếp sống trước khi bàn tới điều lớn lao.</li>
                <li>Nuôi khả năng tự quan sát thân - tâm trong đời sống hằng ngày.</li>
                <li>Tạo nền cho các nhánh khác của Ngũ thuật theo hướng tỉnh táo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#4a2f20]">Giới hạn cần giữ</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Không thần bí hóa mọi trải nghiệm thân tâm.</li>
                <li>Không dùng Sơn học để phủ nhận chăm sóc y khoa và trị liệu khi cần.</li>
                <li>Không áp đặt một lối sống duy nhất cho mọi người.</li>
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
