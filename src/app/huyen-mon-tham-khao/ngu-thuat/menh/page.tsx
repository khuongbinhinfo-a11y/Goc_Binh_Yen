import Link from "next/link";

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
          <h1 className="text-3xl font-semibold text-[#4a2f20]">Mệnh</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Trang khung Mệnh phục vụ điều hướng và tách bạch phạm vi tham khảo. Nội dung dài chưa triển khai.
          </p>
        </article>
      </div>
    </section>
  );
}
