import Image from "next/image";
import Link from "next/link";

const primaryBranches = [
  {
    title: "Nhập môn",
    href: "/huyen-mon-tham-khao/nhap-mon",
    description: "Nền tảng khái niệm, phạm vi đọc hiểu và cách tiếp cận theo từng tầng.",
    image: "/images/sections/co-hoc/co-hoc-card-nhap-mon.png",
  },
  {
    title: "Ngũ thuật",
    href: "/huyen-mon-tham-khao/ngu-thuat",
    description: "Khung tham khảo 5 nhánh Sơn, Y, Bốc, Mệnh, Tướng ở mức định hướng.",
    image: "/images/sections/co-hoc/co-hoc-card-ngu-thuat.png",
  },
  {
    title: "Tam thức",
    href: "/huyen-mon-tham-khao/tam-thuc",
    description: "Khung tham chiếu Thái Ất, Kỳ Môn, Lục Nhâm với góc nhìn hệ thống.",
    image: "/images/sections/co-hoc/co-hoc-card-tam-thuc.png",
  },
  {
    title: "Ứng dụng và giới hạn",
    href: "/huyen-mon-tham-khao/ung-dung-va-gioi-han",
    description: "Nguyên tắc sử dụng thận trọng, phân biệt tham khảo và khẳng định tuyệt đối.",
    image: "/images/sections/co-hoc/co-hoc-card-ung-dung-gioi-han.png",
  },
];

const writingGuide = {
  title: "Bài viết",
  href: "/huyen-mon-tham-khao/bai-viet",
  description: "Các bài nền được trình bày theo dạng tóm tắt dễ theo dõi.",
  image: "/images/sections/co-hoc/co-hoc-card-bai-viet.png",
};

const heroImage = "/images/heroes/co-hoc-hero-main.png";

export default function HuyenMonThamKhaoPage() {
  return (
    <>
      <section className="relative min-h-[360px] overflow-hidden border-b border-[#dec2a7] bg-[#e9d8c4] sm:min-h-0">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_38%] opacity-88 sm:opacity-72"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f4e3d0]/10 via-[#ead9c5]/6 to-[#e9d8c4]/30 sm:from-[#f4e3d0]/24 sm:via-[#ead9c5]/12 sm:to-[#e9d8c4]/42" />
        <div className="site-shell relative py-16 sm:py-14">
          <div className="relative z-10 max-w-3xl rounded-2xl bg-[#f6eadb]/18 p-4 backdrop-blur-[1px] sm:bg-[#f6eadb]/30 sm:p-5">
            <p className="eyebrow">Không gian tham khảo</p>
            <h1 className="text-4xl font-bold leading-[1.12] text-[#3f2b20] sm:text-5xl">Cổ học</h1>
            <p className="mt-4 text-sm leading-8 text-[#5f4331] sm:text-base">
              Đây là không gian giới thiệu có phân tầng: giải nghĩa khái niệm, định vị phương pháp và nhấn mạnh giới hạn áp dụng.
              Nội dung được trình bày theo tinh thần tĩnh, rõ và không thần bí hóa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="site-shell">
          <div className="grid gap-5 md:grid-cols-2">
            {primaryBranches.map((branch) => (
              <article key={branch.href} className="soft-panel relative overflow-hidden bg-[#fffaf4] p-6">
                <div className="relative z-10">
                  <div
                    className="mb-4 h-20 rounded-xl border border-[#dcc5ae] bg-cover bg-center"
                    style={{ backgroundImage: `url(${branch.image})` }}
                  />
                  <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20]">{branch.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#654939]">{branch.description}</p>
                  <Link
                    href={branch.href}
                    className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                  >
                    Khám phá mục
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 border-t border-[#e0d5ca] pt-8">
            <article className="soft-panel relative overflow-hidden border-2 border-[#d4a574] bg-gradient-to-br from-[#f5ead8] to-[#fef3e6] p-6">
              <div className="relative z-10">
                <div
                  className="mb-4 h-20 rounded-xl border border-[#dcc5ae] bg-cover bg-center"
                  style={{ backgroundImage: `url(${writingGuide.image})` }}
                />
                <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20]">{writingGuide.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#654939]">{writingGuide.description}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#8a6245]">Nội dung đang cập nhật</p>
                <Link
                  href={writingGuide.href}
                  className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Xem tóm tắt
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
