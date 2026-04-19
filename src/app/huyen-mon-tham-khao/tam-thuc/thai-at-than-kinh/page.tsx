import Link from "next/link";

export default function ThaiAtThanKinhPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao/tam-thuc" className="hover:text-[#4a2f20]">
            Tam thức
          </Link>{" "}
          / Thái Ất Thần Kinh
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold text-[#4a2f20]">Thái Ất Thần Kinh</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Trang khung này chỉ dùng để định vị nhánh và phạm vi tham khảo ban đầu, chưa triển khai luận giải dài.
          </p>
        </article>
      </div>
    </section>
  );
}
