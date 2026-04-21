import Link from "next/link";
import Image from "next/image";

const primaryBranches = [
  {
    title: "Nhập môn Tam thức",
    href: "/huyen-mon-tham-khao/tam-thuc/nhap-mon-tam-thuc",
    description: "Nền tảng khái niệm, phạm vi đọc hiểu và cách tiếp cận Tam thức ở mức cơ bản.",
  },
  {
    title: "Cách tiếp cận đúng",
    href: "/huyen-mon-tham-khao/tam-thuc/cach-tiep-can",
    description: "Phân biệt điều gì là hệ thống nền, điều gì là diễn giải, ranh giới giữa tham khảo và khẳng định.",
  },
  {
    title: "So sánh và định vị",
    href: "/huyen-mon-tham-khao/tam-thuc/so-sanh-va-dinh-vi",
    description: "Phân tích ba lối quan sát khác nhau, so sánh mỗi hệ với nhau, và mối quan hệ với Ngũ thuật.",
  },
];

const systemBranches = [
  {
    title: "Thái Ất Thần Kinh",
    href: "/huyen-mon-tham-khao/tam-thuc/thai-at-than-kinh",
    description: "Hệ quan sát vĩ mô của thời cuộc và thế thượng.",
  },
  {
    title: "Kỳ Môn Độn Giáp",
    href: "/huyen-mon-tham-khao/tam-thuc/ky-mon-don-giap",
    description: "Hệ quan sát tình huống cụ thể, kết hợp thời, không gian và thế cục.",
  },
  {
    title: "Lục Nhâm Thần Khóa",
    href: "/huyen-mon-tham-khao/tam-thuc/luc-nham-than-khoa",
    description: "Hệ mô tả diễn biến sự việc thông qua né tránh, khóa chặn và vận động khí.",
  },
];

const advancedBranches = [
  {
    title: "Ứng dụng và giới hạn",
    href: "/huyen-mon-tham-khao/tam-thuc/ung-dung-va-gioi-han-tam-thuc",
    description: "Nguyên tắc sử dụng thận trọng, phân biệt tham khảo và khẳng định tuyệt đối.",
  },
  {
    title: "Chuyên sâu định hướng",
    href: "/huyen-mon-tham-khao/tam-thuc/chuyen-sau-dinh-huong",
    description: "Chiều sâu học thuật, hệ thống biểu tượng, dị bản và trường phái.",
  },
];

export default function HuyenMonTamThucPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <p className="text-sm text-[#7f5e49]">
          <Link href="/huyen-mon-tham-khao" className="hover:text-[#4a2f20]">
            Cổ học
          </Link>{" "}
          / Tam thức
        </p>

        <article className="soft-panel mt-4 bg-[#fffaf4] p-6 sm:p-7">
          <h1 className="text-3xl font-semibold leading-tight text-[#4a2f20] sm:text-4xl">Tam thức</h1>
          <p className="mt-4 text-sm leading-7 text-[#654939] sm:text-base">
            Khung tham chiếu ba hệ (Thái Ất, Kỳ Môn, Lục Nhâm) của huyền học phương Đông, được trình bày ở tầng nhập môn và
            chuyên sâu. Mỗi hệ cung cấp lối quan sát khác nhau, và cần được sử dụng với thái độ thận trọng.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-[#e9d8c6]">
            <Image
              src="/images/co-hoc/tam-thuc.jpeg"
              alt="Tam thức"
              width={1600}
              height={900}
              className="h-auto w-full"
              priority
            />
          </div>
        </article>

        {/* Tầng nền */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#4a2f20] mb-4">Tầng nền: Tiếp cận Tam thức</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {primaryBranches.map((item) => (
              <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
                <h3 className="text-lg font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#654939]">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-xs font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Khám phá
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Ba hệ quy chiếu */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#4a2f20] mb-4">Ba hệ quy chiếu: Thái Ất, Kỳ Môn, Lục Nhâm</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {systemBranches.map((item) => (
              <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
                <h3 className="text-lg font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#654939]">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-xs font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Tìm hiểu
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Tầng ứng dụng và chuyên sâu */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#4a2f20] mb-4">Tầng ứng dụng và chuyên sâu</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {advancedBranches.map((item) => (
              <article key={item.href} className="soft-panel bg-[#fffaf4] p-5">
                <h3 className="text-lg font-semibold leading-tight text-[#4a2f20]">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-[#654939]">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex rounded-full border border-[#c79f7d] px-3 py-1.5 text-xs font-semibold text-[#7d5439] transition hover:bg-[#f4e4d2]"
                >
                  Đọc thêm
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
