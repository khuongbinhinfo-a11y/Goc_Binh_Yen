import Link from "next/link";

const branches = [
  {
    title: "Thái Ất Thần Kinh",
    href: "/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh",
  },
  {
    title: "Kỳ Môn Độn Giáp",
    href: "/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap",
  },
  {
    title: "Lục Nhâm Thần Khóa",
    href: "/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa",
  },
];

export default function HuyenMonTamThucPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Huyền môn tham khảo
          </Link>{" "}
          / Tam thức
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Tam thức</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Phần này chỉ dựng khung điều hướng ba hệ quy chiếu lớn để thuận tiện tra cứu theo nhánh.
            Các trang con hiện là placeholder ngắn, chưa triển khai luận giải chuyên sâu.
          </p>
        </article>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {branches.map((item) => (
            <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
              <h2 className="text-xl font-semibold leading-tight text-[#4a2f20]">{item.title}</h2>
              <Link
                href={item.href}
                className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-sm font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
              >
                Xem khung
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
