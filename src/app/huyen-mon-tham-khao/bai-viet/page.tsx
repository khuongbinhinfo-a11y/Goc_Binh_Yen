import type { Metadata } from "next";
import Link from "next/link";

import { getSafeImageSrc } from "@/lib/image";
import { createRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = createRouteMetadata({
  title: "Cổ học: Khẳng định và hướng dẫn",
  description:
    "Một trang nhỏ để bước vào Cổ học bằng sự tỉnh táo, lòng khiêm tốn và tinh thần tham khảo.",
  path: "/huyen-mon-tham-khao/bai-viet",
  image: getSafeImageSrc("/images/co-hoc/Co-hoc.jpeg"),
});

const reminders = [
  {
    title: "Cổ học là lớp tham khảo mềm",
    text: "Nó có thể gợi một góc nhìn, một nhịp quan sát, một cách soi lại hoàn cảnh. Nhưng nó không thay thế dữ kiện thực tế, trách nhiệm cá nhân, y học, pháp lý hay lời khuyên chuyên môn.",
  },
  {
    title: "Không dùng để phán xét người khác",
    text: "Người học cổ học cần giữ sự kín lời và lòng nhân. Một lời nói thiếu chừng mực có thể khiến người khác sợ hãi, lệ thuộc hoặc mất bình tĩnh.",
  },
  {
    title: "Học để sáng hơn",
    text: "Nếu càng học càng bình tĩnh, rộng lòng và biết sống có trách nhiệm hơn, đó là hướng tốt. Nếu càng học càng sợ, càng chờ lời phán, càng né tránh hành động, cần dừng lại để nhìn lại cách học.",
  },
];

const pathways = [
  {
    title: "Nhập môn",
    description:
      "Những bài nền giúp người đọc hiểu cổ học là gì, khác mê tín giật gân ở đâu và nên giữ ranh giới nào khi tiếp cận.",
    href: "/huyen-mon-tham-khao/nhap-mon",
    cta: "Đọc nhập môn",
  },
  {
    title: "Ngũ thuật",
    description:
      "Tìm hiểu năm nhánh Sơn, Y, Mệnh, Bốc, Tướng theo tinh thần tham khảo, biểu tượng và tự quan sát — không phán tuyệt đối.",
    href: "/huyen-mon-tham-khao/ngu-thuat",
    cta: "Xem Ngũ thuật",
  },
  {
    title: "Ứng dụng và giới hạn",
    description:
      "Những bài viết giúp đưa cổ học về đời sống: giữ mình, sống chậm, tự soi lại, biết khi nào nên tham khảo và khi nào cần gặp chuyên gia.",
    href: "/huyen-mon-tham-khao/ung-dung-va-gioi-han",
    cta: "Xem ứng dụng và giới hạn",
  },
];

const principles = [
  "Không giật gân mê tín",
  "Không khẳng định tuyệt đối",
  "Không dùng nỗi sợ để giữ người đọc",
  "Không thay quyết định thực tế bằng cổ học",
  "Tách rõ tri thức nền, biểu tượng, suy luận và quan điểm",
  "Chỗ chưa chắc phải nói rõ là giả thuyết, hướng luận hoặc một cách hiểu",
  "Giọng văn tĩnh, sâu, rõ, có chất Đông phương nhưng dễ hiểu",
];

export default function CoHocBaiVietPage() {
  return (
    <section className="py-12 sm:py-16">
      <div className="site-shell space-y-10">
        <nav className="text-sm text-[#7a5d45]" aria-label="Breadcrumb">
          <Link href="/huyen-mon-tham-khao" className="font-medium text-[#7a5d45] transition hover:text-[#4a2f20]">
            Cổ học
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[#3f2b20]">Khẳng định và hướng dẫn</span>
        </nav>

        <article className="overflow-hidden rounded-[2rem] border border-[#d4b59b] bg-gradient-to-br from-[#f7ede2] via-[#fbf3eb] to-[#f8efdd] p-8 shadow-soft sm:p-10">
          <p className="eyebrow text-[#7b5c45]">Cổ học định hướng</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#3f2b20] sm:text-4xl">
            Cổ học: Khẳng định và hướng dẫn
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#5d4536] sm:text-lg">
            Một trang nhỏ để người đọc bước vào Cổ học bằng sự tỉnh táo, lòng khiêm tốn và tinh thần tham khảo.
            Cổ học có thể giúp ta soi lại mình, nhưng không nên trở thành nỗi sợ, lời phán tuyệt đối hay sợi dây trói buộc đời sống.
          </p>
        </article>

        <section className="space-y-6">
          <div className="rounded-[2rem] border border-[#e0d1c1] bg-[#fff8f0] p-6 sm:p-8">
            <p className="eyebrow text-[#8f6f52]">Ba điều cần nhớ</p>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {reminders.map((item) => (
                <article key={item.title} className="rounded-[1.75rem] border border-[#ecd7c4] bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-semibold text-[#3d2a1f]">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#6a5240]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#e0d1c1] bg-[#fff8f0] p-6 sm:p-8">
            <p className="eyebrow text-[#8f6f52]">Nên đọc theo lộ trình nào?</p>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {pathways.map((item) => (
                <article key={item.title} className="flex h-full flex-col justify-between rounded-[1.75rem] border border-[#e2d0bf] bg-white p-6 shadow-sm">
                  <div>
                    <h3 className="text-xl font-semibold text-[#3f2b20]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#6a5240]">{item.description}</p>
                  </div>
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex items-center justify-center rounded-full border border-[#c79f7d] bg-[#f8efe2] px-4 py-2 text-sm font-semibold text-[#7a573c] transition hover:bg-[#f3e5d4]"
                  >
                    {item.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#e1d2c3] bg-[#fff8f3] p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow text-[#8f6f52]">Nguyên tắc toàn nhánh</p>
              <h2 className="mt-2 text-2xl font-semibold text-[#3f2b20]">Hướng dẫn giọng văn và tư duy chung</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[#6a5240] sm:text-right">
              Những nguyên tắc này giúp giữ Cổ học ở mức tham khảo, không trở thành lời phán tuyệt đối hay công cụ gây sợ hãi.
            </p>
          </div>

          <ul className="mt-6 grid gap-3 text-sm text-[#6a5240] sm:grid-cols-2">
            {principles.map((line) => (
              <li key={line} className="rounded-2xl border border-[#f0e2d7] bg-[#fffaf5] p-4">
                <span className="font-medium text-[#4b3628]">•</span> {line}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
