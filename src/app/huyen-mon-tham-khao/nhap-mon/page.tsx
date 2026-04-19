import Link from "next/link";

export default function HuyenMonNhapMonPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Huyền môn tham khảo
          </Link>{" "}
          / Nhập môn
        </p>
        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Nhập môn</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Trang này đặt nền cho người mới: thuật ngữ cơ bản, mục tiêu học đúng tầng và cách đọc tài liệu có kiểm chứng.
            Đây là khung định hướng, chưa đi vào bài chuyên sâu.
          </p>
        </article>
      </div>
    </section>
  );
}
