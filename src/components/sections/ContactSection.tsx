"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { contactTypeOptions } from "@/data/homepageData";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbysc5ICahR4FZ52E1SY4CRWGjLbS0on_1MQ8QUqKkFgfl4bVLlStZsF3WrFVO3Wk79n/exec";

type FieldErrors = {
  full_name?: string;
  email?: string;
  message?: string;
};

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const hasSubmittedRef = useRef(false);

  const [pageUrl, setPageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [submitMessage, setSubmitMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formElement = event.currentTarget;
    if (isSubmitting) {
      event.preventDefault();
      return;
    }

    const data = new FormData(formElement);
    const fullName = String(data.get("full_name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || "").trim();

    const nextErrors: FieldErrors = {};
    if (!fullName) {
      nextErrors.full_name = "Vui lòng nhập họ và tên.";
    }
    if (!message) {
      nextErrors.message = "Vui lòng nhập nội dung.";
    }
    if (email && !validateEmail(email)) {
      nextErrors.email = "Email chưa đúng định dạng.";
    }

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      setFieldErrors(nextErrors);
      setSubmitStatus("error");
      setSubmitMessage("Vui lòng kiểm tra lại thông tin bắt buộc.");
      return;
    }

    // Honeypot có giá trị thì dừng submit thật.
    if (website) {
      event.preventDefault();
      setFieldErrors({});
      setSubmitStatus("error");
      setSubmitMessage("Không thể gửi thông tin. Vui lòng thử lại.");
      return;
    }

    const currentUrl = window.location.href;
    setPageUrl(currentUrl);
    const pageUrlInput = formElement.elements.namedItem("page_url") as HTMLInputElement | null;
    if (pageUrlInput) {
      pageUrlInput.value = currentUrl;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitStatus("sending");
    setSubmitMessage("Đang gửi...");
    hasSubmittedRef.current = true;
  };

  const handleFrameLoad = () => {
    // Iframe load lần đầu được bỏ qua; chỉ xử lý khi submit vừa diễn ra.
    if (!hasSubmittedRef.current) {
      return;
    }

    setIsSubmitting(false);
    setSubmitStatus("success");
    setSubmitMessage("Gửi thành công. Cảm ơn bạn đã để lại lời nhắn.");
    formRef.current?.reset();
    hasSubmittedRef.current = false;
  };

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

            <form
              ref={formRef}
              method="POST"
              action={APPS_SCRIPT_URL}
              target="contact-submit-frame"
              onSubmit={handleSubmit}
              className="rounded-[1.5rem] border border-[#d8b89b] bg-white p-5 shadow-soft sm:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-medium text-[#6d4c38]">
                  Họ và tên
                  <input
                    type="text"
                    name="full_name"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                  <span className="min-h-4 text-xs text-[#a45035]">{fieldErrors.full_name || ""}</span>
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38]">
                  Số điện thoại
                  <input
                    type="tel"
                    name="phone"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                  <span className="min-h-4 text-xs text-transparent">.</span>
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38]">
                  Email
                  <input
                    type="email"
                    name="email"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                  <span className="min-h-4 text-xs text-[#a45035]">{fieldErrors.email || ""}</span>
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
                  <span className="min-h-4 text-xs text-transparent">.</span>
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38] sm:col-span-2">
                  Chủ đề
                  <input
                    type="text"
                    name="subject"
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                  <span className="min-h-4 text-xs text-transparent">.</span>
                </label>

                <label className="grid gap-1 text-sm font-medium text-[#6d4c38] sm:col-span-2">
                  Nội dung
                  <textarea
                    name="message"
                    rows={5}
                    className="rounded-xl border border-[#d9b79a] px-3 py-2.5 text-sm text-[#3f2c20] outline-none transition focus:border-[#a56e47] focus:ring-2 focus:ring-[#a56e47]/20"
                  />
                  <span className="min-h-4 text-xs text-[#a45035]">{fieldErrors.message || ""}</span>
                </label>
              </div>

              <input type="hidden" name="page_url" value={pageUrl} readOnly />
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <button type="submit" disabled={isSubmitting} className="mt-5 soft-button disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
              </button>

              {submitStatus !== "idle" && (
                <p
                  className={`mt-4 rounded-xl border px-4 py-2 text-sm ${
                    submitStatus === "success"
                      ? "border-[#b6d9bc] bg-[#edf8ef] text-[#2e6a3d]"
                      : submitStatus === "sending"
                        ? "border-[#e4c7a7] bg-[#f8ebdc] text-[#825a3f]"
                        : "border-[#efb8b0] bg-[#fdeeed] text-[#903022]"
                  }`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <iframe
        id="contact-submit-frame"
        name="contact-submit-frame"
        onLoad={handleFrameLoad}
        style={{ display: "none" }}
      />
    </section>
  );
}
