import Link from "next/link";

const primaryBranches = [
  {
    title: "Nhập môn",
    href: "/huyen-mon-tham-khao/nhap-mon",
    description: "Nền tảng khái niệm, phạm vi đọc hiểu và cách tiếp cận theo từng tầng.",
  },
  {
    title: "Ngũ thuật",
    href: "/huyen-mon-tham-khao/ngu-thuat",
    description: "Khung tham khảo 5 nhánh Sơn, Y, Bốc, Mệnh, Tướng ở mức định hướng.",
  },
  {
    title: "Tam thức",
    href: "/huyen-mon-tham-khao/tam-thuc",
    description: "Khung tham chiếu Thái Ất, Kỳ Môn, Lục Nhâm với góc nhìn hệ thống.",
  },
  {
    title: "Ứng dụng và giới hạn",
    href: "/huyen-mon-tham-khao/ung-dung-va-gioi-han",
    description: "Nguyên tắc sử dụng thận trọng, phân biệt tham khảo và khẳng định tuyệt đối.",
  },
];

export default function HuyenMonThamKhaoPage() {
  return (
    <>
      <section className="border-b border-[#dec2a7] bg-[#e9d8c4]">
        <div className="site-shell py-12 sm:py-14">
          <p className="eyebrow">Không gian tham khảo</p>
          <h1 className="text-4xl font-bold leading-[1.12] text-[#3f2b20] sm:text-5xl">Huyền môn tham khảo</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#5f4331] sm:text-base">
            Đây là không gian giới thiệu có phân tầng: giải nghĩa khái niệm, định vị phương pháp và nhấn mạnh giới hạn áp dụng.
            Nội dung được trình bày theo tinh thần tĩnh, rõ và không thần bí hóa.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className="site-shell">
          <div className="grid gap-5 md:grid-cols-2">
            {primaryBranches.map((branch) => (
              <article key={branch.href} className="soft-panel bg-[#fffaf4] p-6">
                <h2 className="text-2xl font-semibold leading-tight text-[#4a2f20]">{branch.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#654939]">{branch.description}</p>
                <Link
                  href={branch.href}
                  className="mt-5 inline-flex rounded-full border border-[#c79f7d] px-4 py-2 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Mở nhánh
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
