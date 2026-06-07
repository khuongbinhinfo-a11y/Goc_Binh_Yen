export default function AdminIndexPage() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[30px] border border-[#dcc3a8] bg-[#fffaf5] p-6">
          <h2 className="text-2xl font-semibold text-[#4a2f20]">Chào mừng đến Admin Hồn Thơ</h2>
          <p className="mt-3 text-sm leading-6 text-[#6a4b38]">
            Đây là trang chính của admin. Chọn tab <strong>Lời nhắn</strong>, <strong>Nội dung</strong> hoặc <strong>Tích hợp</strong> để
            quản lý hoạt động và cấu hình hệ thống.
          </p>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[30px] border border-[#dcc3a8] bg-[#f9f1e6] p-5">
            <h3 className="text-base font-semibold text-[#4a2f20]">Lời nhắn</h3>
            <p className="mt-2 text-sm text-[#6a4b38]">Xem và theo dõi các tin nhắn website.</p>
          </div>
          <div className="rounded-[30px] border border-[#dcc3a8] bg-[#f9f1e6] p-5">
            <h3 className="text-base font-semibold text-[#4a2f20]">Nội dung</h3>
            <p className="mt-2 text-sm text-[#6a4b38]">Quản lý bài viết và nội dung của Hồn Thơ.</p>
          </div>
          <div className="rounded-[30px] border border-[#dcc3a8] bg-[#f9f1e6] p-5">
            <h3 className="text-base font-semibold text-[#4a2f20]">Tích hợp</h3>
            <p className="mt-2 text-sm text-[#6a4b38]">Thiết lập Chatbot và Telegram thông báo.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
