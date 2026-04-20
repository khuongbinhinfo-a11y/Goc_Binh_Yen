import Link from "next/link";
import Image from "next/image";

const branches = [
  {
    title: "Sơn",
    href: "/huyen-mon-tham-khao/ngu-thuat/son",
    image: "/images/sections/ngu-thuat/ngu-thuat-card-son.png",
  },
  {
    title: "Y",
    href: "/huyen-mon-tham-khao/ngu-thuat/y",
    image: "/images/sections/ngu-thuat/ngu-thuat-card-y.png",
  },
  {
    title: "Bốc",
    href: "/huyen-mon-tham-khao/ngu-thuat/boc",
    image: "/images/sections/ngu-thuat/ngu-thuat-card-boc.png",
  },
  {
    title: "Mệnh",
    href: "/huyen-mon-tham-khao/ngu-thuat/menh",
    image: "/images/sections/ngu-thuat/ngu-thuat-card-menh.png",
  },
  {
    title: "Tướng",
    href: "/huyen-mon-tham-khao/ngu-thuat/tuong",
    image: "/images/sections/ngu-thuat/ngu-thuat-card-tuong.png",
  },
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
            <Image
              src="/images/heroes/ngu-thuat-hero-main.png"
              alt="Ngũ thuật"
              width={1600}
              height={900}
              className="h-52 w-full object-cover object-center sm:h-[320px]"
              priority
            />
          </div>
        </article>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {branches.map((item) => (
            <article key={item.href} className="soft-panel relative overflow-hidden bg-[#fffaf4] p-5">
              <div className="mb-4 overflow-hidden rounded-xl border border-[#dcc5ae]">
                <div className="relative h-24">
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover object-center" />
                </div>
                <div
                  className="h-1.5 bg-cover bg-center opacity-70"
                  style={{ backgroundImage: "url(/images/co-hoc/ngu-thuat-tranh-co.svg)" }}
                />
              </div>
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
