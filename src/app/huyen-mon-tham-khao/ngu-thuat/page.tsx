import Link from "next/link";
import Image from "next/image";

const branches = [
  { title: "Sơn", href: "/huyen-mon-tham-khao/ngu-thuat/son" },
  { title: "Y", href: "/huyen-mon-tham-khao/ngu-thuat/y" },
  { title: "Bốc", href: "/huyen-mon-tham-khao/ngu-thuat/boc" },
  { title: "Mệnh", href: "/huyen-mon-tham-khao/ngu-thuat/menh" },
  { title: "Tướng", href: "/huyen-mon-tham-khao/ngu-thuat/tuong" },
];

export default function HuyenMonNguThuatPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          / Ngũ thuật
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Ngũ thuật</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Khung Ngũ thuật dưới đây nhằm giúp phân biệt phạm vi từng nhánh và tránh trộn lẫn phương pháp.
            Mỗi mục hiện là trang khung ngắn, chưa triển khai bài dài.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image src="/images/co-hoc/ngu-thuat.jpeg" alt="Ngũ thuật" width={1600} height={900} className="h-auto w-full" priority />
          </div>
        </article>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((item) => (
            <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
              <h2 className="text-2xl font-semibold text-[#4a2f20]">{item.title}</h2>
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
