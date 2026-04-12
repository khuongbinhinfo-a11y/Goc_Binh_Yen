"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import ToastNotice from "@/components/ui/ToastNotice";
import { contactTypeOptions } from "@/data/homepageData";

type FieldErrors = {
  full_name?: string;
  email?: string;
  message?: string;
};

type ToastType = "success" | "error";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [pageUrl, setPageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState<ToastType>("success");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);

    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const normalizeEmail = (value: string) =>
    value
      .normalize("NFKC")
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/\s+/g, "")
      .trim()
      .toLowerCase();

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const showToast = (type: ToastType, message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    setToastType(type);
    setToastMessage(message);
    setToastVisible(true);

    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formElement = event.currentTarget;
    const data = new FormData(formElement);

    const full_name = String(data.get("full_name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = normalizeEmail(String(data.get("email") || ""));
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();
    const contact_type = String(data.get("contact_type") || "").trim();
    const website = String(data.get("website") || "").trim();

    const nextErrors: FieldErrors = {};
    if (!full_name) {
      nextErrors.full_name = "Vui lòng nhập họ và tên.";
    }
    if (!message) {
      nextErrors.message = "Vui lòng nhập nội dung.";
    }
    if (email && !validateEmail(email)) {
      nextErrors.email = "Email chưa đúng định dạng.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setSubmitStatus("error");
      setSubmitMessage("Vui lòng kiểm tra lại thông tin bắt buộc.");
      showToast("error", "Thông tin chưa hợp lệ, vui lòng kiểm tra lại.");
      return;
    }

    if (website) {
      setFieldErrors({});
      setSubmitStatus("error");
      setSubmitMessage("Không thể gửi thông tin. Vui lòng thử lại.");
      showToast("error", "Không thể gửi thông tin. Vui lòng thử lại.");
      return;
    }

    const currentUrl = window.location.href;
    setPageUrl(currentUrl);
    setFieldErrors({});
    setIsSubmitting(true);
    setSubmitStatus("sending");
    setSubmitMessage("Đang gửi...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name,
          phone,
          email,
          subject,
          message,
          contact_type,
          page_url: currentUrl,
          website,
        }),
      });

      let result: { ok?: boolean; message?: string } | null = null;
      try {
        result = (await response.json()) as { ok?: boolean; message?: string };
      } catch {
        result = null;
      }

      if (response.ok && result?.ok === true) {
        setSubmitStatus("success");
        setSubmitMessage("Gửi thành công. Cảm ơn bạn đã để lại lời nhắn.");
        formRef.current?.reset();
        showToast("success", "Gửi thành công. Cảm ơn bạn đã để lại lời nhắn.");
        statusRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }

      const errorMessage = result?.message || "Gửi thất bại, vui lòng thử lại.";
      setSubmitStatus("error");
      setSubmitMessage(errorMessage);
      showToast("error", errorMessage);
    } catch {
      const networkErrorMessage = "Có lỗi kết nối, vui lòng thử lại.";
      setSubmitStatus("error");
      setSubmitMessage(networkErrorMessage);
      showToast("error", networkErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 soft-button disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
              </button>

              {submitStatus !== "idle" && (
                <div className="mt-4" ref={statusRef}>
                  <div
                    className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm font-medium leading-6 ${
                      submitStatus === "success"
                        ? "border-[#9ad0b0] bg-[#e8f7ee] text-[#2b6d44]"
                        : submitStatus === "sending"
                          ? "border-[#e4c7a7] bg-[#f8ebdc] text-[#825a3f]"
                          : "border-[#efb8b0] bg-[#fdeeed] text-[#903022]"
                    }`}
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/65">
                      {submitStatus === "success" ? (
                        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="none">
                          <path
                            d="m5 10 3.1 3.1L15 6.2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : submitStatus === "error" ? (
                        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="none">
                          <path d="M10 5.5v4.8M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3 animate-spin" fill="none">
                          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.8" strokeDasharray="20 20" />
                        </svg>
                      )}
                    </span>
                    <p>{submitMessage}</p>
                  </div>

                  {submitStatus === "error" && (
                    <p className="mt-2 text-sm text-[#8f4a34]">
                      Chưa thể gửi thông tin tới hệ thống tiếp nhận. Vui lòng thử lại sau.
                    </p>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <ToastNotice visible={toastVisible} type={toastType} message={toastMessage} />
    </section>
  );
}
