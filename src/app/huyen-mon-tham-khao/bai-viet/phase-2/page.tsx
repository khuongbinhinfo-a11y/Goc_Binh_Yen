import Link from "next/link";

const phase2Articles = [
  {
    id: "son-nhap-mon",
    title: "Sơn học nhập môn: dưỡng thân, dưỡng khí, dưỡng tâm",
    status: "draft",
    progress: 0,
    branch: "Sơn",
  },
  {
    id: "son-phap-chuyen-sau",
    title: "Sơn pháp trong truyền thống: cấu trúc, ứng dụng và giới hạn",
    status: "draft",
    progress: 0,
    branch: "Sơn",
  },
  {
    id: "y-trong-ngu-thuat",
    title: "Y trong Ngũ thuật: vì sao không nên đồng nhất với y học hiện đại?",
    status: "draft",
    progress: 0,
    branch: "Y",
  },
  {
    id: "y-tu-duy-chinh-the",
    title: "Tư duy chỉnh thể trong Y học phương Đông: cách hiểu và ngộ nhận",
    status: "draft",
    progress: 0,
    branch: "Y",
  },
  {
    id: "boc-la-gi",
    title: "Bốc là gì: từ dự đoán đến mô hình quan sát thời thế",
    status: "draft",
    progress: 0,
    branch: "Bốc",
  },
  {
    id: "boc-chuyen-sau",
    title: "Bốc học chuyên sâu: hệ thống ký hiệu, cách luận và ranh giới đúng sai",
    status: "draft",
    progress: 0,
    branch: "Bốc",
  },
  {
    id: "menh-nhap-mon",
    title: "Mệnh học nhập môn: mệnh dùng để hiểu gì, không dùng để hiểu gì?",
    status: "draft",
    progress: 0,
    branch: "Mệnh",
  },
  {
    id: "menh-chuyen-sau",
    title: "Mệnh học chuyên sâu: cấu trúc hệ thống và những điểm dễ bị lạm dụng",
    status: "draft",
    progress: 0,
    branch: "Mệnh",
  },
  {
    id: "tuong-nhap-mon",
    title: "Tướng học nhập môn: quan sát con người hay áp đặt định kiến?",
    status: "draft",
    progress: 0,
    branch: "Tướng",
  },
  {
    id: "tuong-chuyen-sau",
    title: "Tướng học chuyên sâu: trường phái, dị bản và cảnh báo ngộ nhận",
    status: "draft",
    progress: 0,
    branch: "Tướng",
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

const branches = ["Sơn", "Y", "Bốc", "Mệnh", "Tướng"];

export default function Phase2Page() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/huyen-mon-tham-khao/bai-viet" className="text-sm text-[#7f5e49] hover:text-[#4a2f20]">
            ← Quay lại danh sách Phase
          </Link>
        </div>

        <div className="mb-8 rounded-2xl border-2 border-[#5fa5d3] bg-gradient-to-r from-[#d4e3f0] to-[#e8f1f8] p-6 sm:p-8">
          <p className="eyebrow">Phase 2 của 4</p>
          <h1 className="text-3xl font-bold leading-tight text-[#2f5a7f] sm:text-4xl">Ngũ thuật</h1>
          <p className="mt-3 text-sm text-[#4a6b8d] sm:text-base">10 bài chi tiết về Sơn, Y, Bốc, Mệnh, Tướng theo thứ tự xuất bản Đợt 2</p>
        </div>

        {branches.map((branch) => {
          const branchArticles = phase2Articles.filter((a) => a.branch === branch);
          return (
            <div key={branch} className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-[#2f5a7f]">{branch}</h2>
              <div className="space-y-3">
                {branchArticles.map((article) => {
                  const badge = getStatusBadge(article.status);
                  return (
                    <Link key={article.id} href={`/huyen-mon-tham-khao/bai-viet/${article.id}`}>
                      <article className="soft-panel cursor-pointer border border-[#c8ddf1] bg-[#f8fbff] p-4 transition hover:border-[#5fa5d3] hover:shadow-sm sm:p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-[#2f5a7f]">{article.title}</h3>
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

                        <div className="mt-3 h-1 w-full bg-[#d4e3f0]">
                          <div className="h-full bg-[#5fa5d3] transition" style={{ width: `${article.progress}%` }} />
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
          <h2 className="text-lg font-bold text-[#3d2a1f]">Lưu ý Phase 2</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#654939]">
            <li>• Mỗi nhánh Ngũ thuật có 2 bài: nhập môn + chuyên sâu</li>
            <li>• Bấm vào bài viết để xem chi tiết và bắt đầu viết</li>
            <li>• Cập nhật periodically trạng thái và progress</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
