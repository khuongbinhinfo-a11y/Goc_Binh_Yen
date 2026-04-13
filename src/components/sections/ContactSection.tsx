import { CONTACT_FORM_URL } from "@/data/homepageData";

const previewFields = [
  { label: "Họ và tên", multiline: false },
  { label: "Số điện thoại", multiline: false },
  { label: "Email", multiline: false },
  { label: "Nội dung", multiline: true },
];

export default function ContactSection() {
  return (
    <section id="lien-he" className="scroll-mt-24 bg-[#f7efe6] py-20">
      <div className="site-shell">
        <div className="soft-panel overflow-hidden bg-gradient-to-br from-[#f8efe5] to-[#f3e7d9] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow">Lời mời tương tác</p>
              <h2 className="mb-4 text-4xl leading-tight text-[#3f2b20] sm:text-5xl sm:leading-tight">
                Gửi lời nhắn, góp ý hoặc chia sẻ thơ và truyện của bạn
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[#654939] sm:text-base">
                Nếu bạn muốn gửi lời nhắn, góp ý hoặc chia sẻ những nội dung ý nghĩa, hãy để lại thông tin qua biểu mẫu
                liên hệ. Chúng tôi sẽ ghi nhận và phản hồi khi phù hợp.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-[#d8b89b] bg-[#fffdf9] p-4 shadow-soft sm:p-5">
              <p className="mb-3 text-sm font-semibold text-[#5f4332]">Biểu mẫu liên hệ</p>
              <p className="mb-4 text-xs leading-6 text-[#866552]">Để lại thông tin qua biểu mẫu liên hệ</p>

              <div className="space-y-2.5">
                {previewFields.map((item) => (
                  <div key={item.label} className="grid gap-1">
                    <span className="text-xs font-medium text-[#6d4c38]">{item.label}</span>
                    {item.multiline ? (
                      <div className="h-14 rounded-xl border border-[#d9b79a] bg-[#fbf6ef]" />
                    ) : (
                      <div className="h-9 rounded-xl border border-[#d9b79a] bg-[#fbf6ef]" />
                    )}
                  </div>
                ))}
              </div>

              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#8b5e3c] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(74,47,32,0.2)] transition hover:bg-[#7b5234] sm:w-auto"
              >
                Mở biểu mẫu liên hệ
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="none">
                  <path d="M7 5h8v8M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
              <p className="mt-2 text-xs text-[#8a6851]">Biểu mẫu sẽ mở ở tab mới để bạn điền thông tin.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
