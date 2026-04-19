import Link from "next/link";

const phase1Articles = [
  {
    id: "hoc-tro-dong-la-gi",
    title: "Cổ học phương Đông là gì?",
    status: "draft",
    progress: 0,
  },
  {
    id: "hoc-tro-khac-voi-me-tin",
    title: "Vì sao cổ học nghiêm túc khác với mê tín giật gân?",
    status: "draft",
    progress: 0,
  },
  {
    id: "ngu-thuat-la-gi",
    title: "Ngũ thuật là gì trong truyền thống phương Đông?",
    status: "draft",
    progress: 0,
  },
  {
    id: "tam-thuc-la-gi",
    title: "Tam thức là gì, vì sao thường bị hiểu sai?",
    status: "draft",
    progress: 0,
  },
  {
    id: "cach-doc-co-thu",
    title: "Cách đọc cổ thư: văn cảnh, dị bản và giới hạn diễn giải",
    status: "draft",
    progress: 0,
  },
  {
    id: "khi-nao-nen-hoc",
    title: "Khi nào nên học cổ học, khi nào không nên đi quá sâu?",
    status: "draft",
    progress: 0,
  },
  {
    id: "hieu-lam-pho-bien",
    title: "Những hiểu lầm phổ biến khi tiếp cận Bốc, Mệnh, Tướng",
    status: "draft",
    progress: 0,
  },
  {
    id: "ranh-gioi-bieu-tuong",
    title: "Ranh giới giữa biểu tượng, kinh nghiệm, và niềm tin tuyệt đối",
    status: "draft",
    progress: 0,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "draft":
      return { bg: "bg-[#f0f0f0]", text: "text-[#666]", label: "Nháp" };
    case "writing":
      return { bg: "bg-[#fff3cd]", text: "text-[#856404]", label: "Đang viết" };
    case "review":
      return { bg: "bg-[#cfe2ff]", text: "text-[#084298]", label: "Đánh giá" };
    case "published":
      return { bg: "bg-[#d1e7dd]", text: "text-[#0f5132]", label: "Đã xuất bản" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-600", label: "—" };
  }
};

export default function Phase1Page() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/huyen-mon-tham-khao/bai-viet" className="text-sm text-[#7f5e49] hover:text-[#4a2f20]">
            ← Quay lại danh sách Phase
          </Link>
        </div>

        <div className="mb-8 rounded-2xl border-2 border-[#d4a574] bg-gradient-to-r from-[#f5ead8] to-[#fef3e6] p-6 sm:p-8">
          <p className="eyebrow">Phase 1 của 4</p>
          <h1 className="text-3xl font-bold leading-tight text-[#3f2b20] sm:text-4xl">Bài nền bắt buộc</h1>
          <p className="mt-3 text-sm text-[#654939] sm:text-base">8 bài giới thiệu nền tảng cơ bản theo thứ tự xuất bản Đợt 1</p>
        </div>

        <div className="space-y-3">
          {phase1Articles.map((article) => {
            const badge = getStatusBadge(article.status);
            return (
              <Link key={article.id} href={`/huyen-mon-tham-khao/bai-viet/${article.id}`}>
                <article className="soft-panel cursor-pointer border border-[#e0d5ca] bg-white p-4 transition hover:border-[#d4a574] hover:shadow-sm sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#3f2b20]">{article.title}</h2>
                      <p className="mt-2 text-xs text-[#999]">{article.id}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <div className="text-right">
                        <div className="text-xs font-semibold text-[#666]">{article.progress}%</div>
                        <div className={`mt-1 rounded-full px-2 py-1 text-xs font-semibold ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 h-1 w-full bg-[#e8dcc8]">
                    <div
                      className="h-full bg-[#d4a574] transition"
                      style={{ width: `${article.progress}%` }}
                    />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-[#d0d0d0] bg-[#f8f8f8] p-6">
          <h2 className="text-lg font-bold text-[#3d2a1f]">Hướng dẫn tracking</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#654939]">
            <li>• Bấm vào bài viết để xem chi tiết và bắt đầu viết</li>
            <li>• Trạng thái tự động cập nhật: Nháp → Đang viết → Đánh giá → Đã xuất bản</li>
            <li>• Progress bar theo dõi độ hoàn thành mỗi bài</li>
            <li>• Danh sách đầy đủ được lưu trong file TRACKING.md</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
