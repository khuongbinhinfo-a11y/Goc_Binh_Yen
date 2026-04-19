import Link from "next/link";
import Image from "next/image";

export default function HuyenMonUngDungVaGioiHanPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          / Ứng dụng và giới hạn
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Ứng dụng và giới hạn</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Trang này nhấn mạnh nguyên tắc: dùng như nguồn tham khảo có điều kiện, không thay thế tư duy phản biện,
            không thay thế quyết định chuyên môn và không khẳng định tuyệt đối.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/co-hoc/ung-dung-va-gioi-han.jpeg"
              alt="Ứng dụng và giới hạn"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>
        </article>
      </div>
    </section>
  );
}
