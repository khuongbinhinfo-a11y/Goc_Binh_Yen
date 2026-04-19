import Link from "next/link";

const phase4Articles = [
  {
    id: "ung-dung-chon-ngay-gio",
    title: "Có nên ứng dụng cổ học vào chọn ngày giờ không?",
    status: "draft",
    progress: 0,
  },
  {
    id: "tuan-sat-ban-than",
    title: "Cổ học có thể hỗ trợ tự quan sát bản thân đến đâu?",
    status: "draft",
    progress: 0,
  },
  {
    id: "khong-dung-hu-doa",
    title: "Vì sao không nên dùng cổ học để hù dọa người khác?",
    status: "draft",
    progress: 0,
  },
  {
    id: "loi-khuyen-vs-phan-doan",
    title: "Giữa lời khuyên thực tế và lời phán đoán cổ học, nên đặt trọng tâm ở đâu?",
    status: "draft",
    progress: 0,
  },
  {
    id: "dao-duc-nguoi-hoc",
    title: "Vai trò của đạo đức người học cổ học",
    status: "draft",
    progress: 0,
  },
  {
    id: "sang-hay-le-thuoc",
    title: "Học cổ học để sáng hơn hay để lệ thuộc hơn?",
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

export default function Phase4Page() {
  return (
    <section className="py-12 sm:py-14">
      <div className="site-shell">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/huyen-mon-tham-khao/bai-viet" className="text-sm text-[#7f5e49] hover:text-[#4a2f20]">
            ← Quay lại danh sách Phase
          </Link>
        </div>

        <div className="mb-8 rounded-2xl border-2 border-[#7ba85f] bg-gradient-to-r from-[#dff0d8] to-[#f0f8e8] p-6 sm:p-8">
          <p className="eyebrow">Phase 4 của 4</p>
          <h1 className="text-3xl font-bold leading-tight text-[#4a6438] sm:text-4xl">Ứng dụng & Giới hạn</h1>
          <p className="mt-3 text-sm text-[#6a8048] sm:text-base">6 bài về thực hành an toàn, đạo đức và đúng sai</p>
        </div>

        <div className="space-y-3">
          {phase4Articles.map((article) => {
            const badge = getStatusBadge(article.status);
            return (
              <Link key={article.id} href={`/huyen-mon-tham-khao/bai-viet/${article.id}`}>
                <article className="soft-panel cursor-pointer border border-[#d4e3b8] bg-[#fafff5] p-4 transition hover:border-[#7ba85f] hover:shadow-sm sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-[#4a6438]">{article.title}</h2>
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

                  <div className="mt-3 h-1 w-full bg-[#dff0d8]">
                    <div className="h-full bg-[#7ba85f] transition" style={{ width: `${article.progress}%` }} />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-[#d0d0d0] bg-[#f8f8f8] p-6">
          <h2 className="text-lg font-bold text-[#3d2a1f]">Lưu ý Phase 4</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#654939]">
            <li>• Đây là Phase cuối, tập trung vào ứng dụng thực tế và giới hạn</li>
            <li>• Nhấn mạnh đạo đức, trách nhiệm và không lạm dụng kiến thức</li>
            <li>• Giúp người học tìm được cân bằng trong học tập cổ học</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
