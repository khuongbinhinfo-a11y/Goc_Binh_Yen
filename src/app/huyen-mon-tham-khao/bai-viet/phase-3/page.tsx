import Link from "next/link";

const phase3Articles = [
  {
    id: "thai-at-nhap-mon",
    title: "Thái Ất nhập môn: vị trí của Thái Ất trong hệ thức cổ",
    status: "draft",
    progress: 0,
    branch: "Thái Ất Thần Kinh",
  },
  {
    id: "thai-at-chuyen-sau",
    title: "Thái Ất chuyên sâu: cấu trúc, nguyên lý vận hành và giới hạn ứng dụng",
    status: "draft",
    progress: 0,
    branch: "Thái Ất Thần Kinh",
  },
  {
    id: "ky-mon-nhap-mon",
    title: "Kỳ Môn nhập môn: vì sao hấp dẫn nhưng dễ bị thần bí hóa?",
    status: "draft",
    progress: 0,
    branch: "Kỳ Môn Độn Giáp",
  },
  {
    id: "ky-mon-chuyen-sau",
    title: "Kỳ Môn chuyên sâu: bàn cục, cửa, tinh, thần và cách đọc thận trọng",
    status: "draft",
    progress: 0,
    branch: "Kỳ Môn Độn Giáp",
  },
  {
    id: "luc-nham-nhap-mon",
    title: "Lục Nhâm nhập môn: hệ thống tượng và logic lập khóa",
    status: "draft",
    progress: 0,
    branch: "Lục Nhâm Thần Khóa",
  },
  {
    id: "luc-nham-chuyen-sau",
    title: "Lục Nhâm chuyên sâu: cách luận, điểm khó và ranh giới giữa học thuật với niềm tin",
    status: "draft",
    progress: 0,
    branch: "Lục Nhâm Thần Khóa",
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

const branches = ["Thái Ất Thần Kinh", "Kỳ Môn Độn Giáp", "Lục Nhâm Thần Khóa"];

export default function Phase3Page() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/huyen-mon-tham-khao/bai-viet" className="text-sm text-[#7f5e49] hover:text-[#4a2f20]">
            ← Quay lại danh sách Phase
          </Link>
        </div>

        <div className="mb-8 rounded-2xl border-2 border-[#9b6ba8] bg-gradient-to-r from-[#e6d9f0] to-[#f5ecf8] p-6 sm:p-8">
          <p className="eyebrow">Phase 3 của 4</p>
          <h1 className="text-3xl font-bold leading-tight text-[#5a3e6b] sm:text-4xl">Tam thức</h1>
          <p className="mt-3 text-sm text-[#7a5a8b] sm:text-base">6 bài chi tiết về Thái Ất, Kỳ Môn, Lục Nhâm theo thứ tự xuất bản Đợt 3</p>
        </div>

        {branches.map((branch) => {
          const branchArticles = phase3Articles.filter((a) => a.branch === branch);
          return (
            <div key={branch} className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-[#5a3e6b]">{branch}</h2>
              <div className="space-y-3">
                {branchArticles.map((article) => {
                  const badge = getStatusBadge(article.status);
                  return (
                    <Link key={article.id} href={`/huyen-mon-tham-khao/bai-viet/${article.id}`}>
                      <article className="soft-panel cursor-pointer border border-[#e6d9f0] bg-[#faf7ff] p-4 transition hover:border-[#9b6ba8] hover:shadow-sm sm:p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#5a3e6b]">{article.title}</h3>
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

                        <div className="mt-3 h-1 w-full bg-[#e6d9f0]">
                          <div className="h-full bg-[#9b6ba8] transition" style={{ width: `${article.progress}%` }} />
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-10 rounded-2xl border border-[#d0d0d0] bg-[#f8f8f8] p-6">
          <h2 className="text-lg font-bold text-[#3d2a1f]">Lưu ý Phase 3</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#654939]">
            <li>• Tam thức là 3 hệ thống lớn: Thái Ất, Kỳ Môn, Lục Nhâm</li>
            <li>• Mỗi hệ thống có 2 bài: nhập môn + chuyên sâu</li>
            <li>• Đặc biệt chú ý các hiểu lầm phổ biến trong Phase này</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
