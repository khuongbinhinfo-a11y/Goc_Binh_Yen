import { contactTypeOptions } from "@/data/homepageData";

export default function ContactSection() {
  return (
    <section id="lien-he" className="scroll-mt-24 bg-[#f7efe6] py-20">
      <div className="site-shell">
        <div className="soft-panel overflow-hidden bg-gradient-to-br from-[#f8efe5] to-[#f3e7d9] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="eyebrow">Lời mời tương tác</p>
              <h2 className="mb-4 text-4xl text-[#3f2b20] sm:text-5xl">
                Gửi lời nhắn, góp ý hoặc chia sẻ thơ và truyện của bạn
              </h2>
              <p className="text-sm leading-8 text-[#654939] sm:text-base">
                Góc Bình Yên luôn mở ra để đón những câu chữ chân thành. Bạn có thể để lại thông tin để đội ngũ phản
                hồi, hoặc gửi những sáng tác muốn chia sẻ cùng cộng đồng yêu sự bình yên.
              </p>
            </div>

            <form className="rounded-[1.5rem] border border-[#d8b89b] bg-white p-5 shadow-soft sm:p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-[#6d4c38]">
                  Họ và tên
                  <input
                    type="text"
                    name="full_name"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38]">
                  Số điện thoại
                  <input
                    type="tel"
                    name="phone"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38]">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38]">
                  Loại liên hệ
                  <select
                    name="contact_type"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  >
                    {contactTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38] sm:col-span-2">
                  Chủ đề
                  <input
                    type="text"
                    name="subject"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38] sm:col-span-2">
                  Nội dung
                  <textarea
                    name="message"
                    rows={5}
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                </label>
              </div>

              <button type="button" className="mt-5 soft-button">
                Gửi thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
