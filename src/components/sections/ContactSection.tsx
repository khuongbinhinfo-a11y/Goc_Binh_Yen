import { CONTACT_FORM_URL } from "@/data/homepageData";

const previewFields = ["Họ và tên", "Số điện thoại", "Email", "Chủ đề", "Nội dung"];

export default function ContactSection() {
  return (
    <section id="lien-he" className="scroll-mt-24 bg-[#f7efe6] py-20">
      <div className="site-shell">
        <div className="soft-panel overflow-hidden bg-gradient-to-br from-[#f8efe5] to-[#f3e7d9] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow">Lời mời tương tác</p>
              <h2 className="mb-4 text-4xl text-[#3f2b20] sm:text-5xl">Gửi lời nhắn, góp ý hoặc chia sẻ thơ và truyện của bạn</h2>
              <p className="text-sm leading-8 text-[#654939] sm:text-base">
                Nếu bạn muốn gửi lời nhắn, góp ý hoặc chia sẻ những nội dung ý nghĩa, hãy để lại thông tin qua biểu mẫu
                liên hệ. Chúng tôi sẽ ghi nhận và phản hồi khi phù hợp.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#d8b89b] bg-white p-5 shadow-soft sm:p-6">
              <div className="space-y-3">
                {previewFields.map((label, index) => (
                  <div key={label} className="grid gap-1">
                    <span className="text-sm font-medium text-[#6d4c38]">{label}</span>
                    {index === previewFields.length - 1 ? (
                      <div className="h-28 rounded-xl border border-[#d9b79a] bg-[#fbf6ef]" />
                    ) : (
                      <div className="h-11 rounded-xl border border-[#d9b79a] bg-[#fbf6ef]" />
                    )}
                  </div>
                ))}
              </div>

              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(74,47,32,0.2)] transition hover:bg-[#7b5234]"
              >
                Mở biểu mẫu liên hệ
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                  <path d="M7 5h8v8M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
              <p className="mt-3 text-xs text-[#8a6851]">Biểu mẫu sẽ mở ở tab mới để bạn điền thông tin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
