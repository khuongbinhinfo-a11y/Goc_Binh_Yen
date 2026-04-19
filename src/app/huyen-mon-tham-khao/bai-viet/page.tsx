import Link from "next/link";

const phases = [
  {
    id: "phase-1",
    title: "Phase 1: Bài nền bắt buộc",
    description: "8 bài giới thiệu nền tảng cơ bản của Cổ học",
    color: "from-[#e8d5c4] to-[#f5ead8]",
    borderColor: "border-[#d4a574]",
    textColor: "text-[#5f4033]",
    articles: 8,
  },
  {
    id: "phase-2",
    title: "Phase 2: Ngũ thuật",
    description: "10 bài chi tiết về Sơn, Y, Bốc, Mệnh, Tướng",
    color: "from-[#d4e3f0] to-[#e8f1f8]",
    borderColor: "border-[#5fa5d3]",
    textColor: "text-[#2f5a7f]",
    articles: 10,
  },
  {
    id: "phase-3",
    title: "Phase 3: Tam thức",
    description: "6 bài về Thái Ất, Kỳ Môn, Lục Nhâm",
    color: "from-[#e6d9f0] to-[#f5ecf8]",
    borderColor: "border-[#9b6ba8]",
    textColor: "text-[#5a3e6b]",
    articles: 6,
  },
  {
    id: "phase-4",
    title: "Phase 4: Ứng dụng & giới hạn",
    description: "6 bài về thực hành an toàn và đạo đức",
    color: "from-[#dff0d8] to-[#f0f8e8]",
    borderColor: "border-[#7ba85f]",
    textColor: "text-[#4a6438]",
    articles: 6,
  },
];

export default function CoHocBaiVietPage() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <div className="mb-8 rounded-2xl border border-[#d4a574] bg-gradient-to-r from-[#f5ead8] to-[#fef3e6] p-6 sm:p-8">
          <p className="eyebrow">Kho bài viết</p>
          <h1 className="text-3xl font-bold leading-tight text-[#3f2b20] sm:text-4xl">Cổ học: Tủ bài nền nhập môn</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#654939] sm:text-base">
            Các chủ đề được trình bày ngắn gọn theo từng cụm để người đọc dễ theo dõi trước khi đi sâu.
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#8a6245]">Nội dung đang cập nhật</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {phases.map((phase) => (
            <Link key={phase.id} href={`/huyen-mon-tham-khao/bai-viet/${phase.id}`}>
              <article
                className={`soft-panel h-full cursor-pointer border-2 bg-gradient-to-br p-6 transition hover:shadow-lg ${phase.borderColor} ${phase.color}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`text-xs font-semibold uppercase tracking-wide ${phase.textColor}`}>{phase.title}</p>
                    <h2 className={`mt-2 text-xl font-semibold leading-tight ${phase.textColor}`}>{phase.title}</h2>
                    <p className={`mt-3 text-sm leading-6 ${phase.textColor}`}>{phase.description}</p>
                  </div>
                  <div
                    className={`ml-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 font-bold ${phase.borderColor} ${phase.textColor}`}
                  >
                    {phase.articles}
                  </div>
                </div>
                <div className="mt-4 text-xs font-semibold uppercase tracking-widest opacity-60">Xem chi tiết →</div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-[#d3d3d3] bg-[#f9f9f9] p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#3d2a1f]">Nguyên tắc toàn nhánh</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#654939]">
            <li>✓ Không giật gân mê tín</li>
            <li>✓ Không khẳng định tuyệt đối</li>
            <li>✓ Tách rõ tri thức nền / trường phái-dị bản / suy luận-quan điểm</li>
            <li>✓ Chỗ chưa chắc phải nói rõ là giả thuyết, hướng luận, hoặc một cách hiểu</li>
            <li>✓ Giọng văn tĩnh, sâu, rõ, có chất Đông phương nhưng dễ hiểu</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
