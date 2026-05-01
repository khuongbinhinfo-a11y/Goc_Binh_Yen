"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSubmitSchema, type ContactSubmitValues } from "@/lib/forms/form-schemas";

const contactTypeOptions: Array<{ value: NonNullable<ContactSubmitValues["type"]>; label: string }> = [
  { value: "contact", label: "Liên hệ" },
  { value: "feedback", label: "Góp ý" },
  { value: "poem", label: "Chia sẻ thơ" },
  { value: "donation", label: "Ủng hộ" },
];

const formCopyByType: Record<NonNullable<ContactSubmitValues["type"]>, {
  intro: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  submitLabel: string;
}> = {
  contact: {
    intro: "Mỗi điều anh/chị gửi đến đều được trân trọng và hồi âm sớm nhất có thể.",
    subjectPlaceholder: "Anh/chị muốn chia sẻ điều gì?",
    messagePlaceholder: "Viết đôi dòng chia sẻ của anh/chị...",
    submitLabel: "Gửi lời nhắn",
  },
  feedback: {
    intro: "Mỗi góp ý đều giúp Hồn Thơ hoàn thiện hơn theo một cách chân thành và bền vững.",
    subjectPlaceholder: "Điều anh/chị muốn góp ý là gì?",
    messagePlaceholder: "Anh/chị có thể chia sẻ điều mình mong Hồn Thơ cải thiện hoặc phát huy thêm...",
    submitLabel: "Gửi góp ý",
  },
  poem: {
    intro: "Nếu anh/chị muốn gửi một bài thơ, một đoạn viết hay một rung động riêng, Hồn Thơ luôn đón nhận bằng sự trân trọng.",
    subjectPlaceholder: "Tên bài thơ hoặc điều anh/chị muốn gửi",
    messagePlaceholder: "Anh/chị có thể chép bài thơ, đôi dòng tâm sự hoặc bối cảnh của bài viết tại đây...",
    submitLabel: "Gửi chia sẻ",
  },
  donation: {
    intro: "Mỗi sự ủng hộ là một sự tin tưởng quý giá, giúp Hồn Thơ giữ được không gian chữ nghĩa và giọng đọc dịu dàng này lâu hơn.",
    subjectPlaceholder: "Lời nhắn kèm sự ủng hộ của anh/chị",
    messagePlaceholder: "Anh/chị có thể để lại lời nhắn, lời chúc, hoặc điều anh/chị muốn Hồn Thơ tiếp tục gìn giữ và vun bồi...",
    submitLabel: "Gửi lời ủng hộ",
  },
};

export default function PublicContactForm() {
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactSubmitValues>({
    resolver: zodResolver(contactSubmitSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "contact",
    },
  });

  const selectedType = watch("type") ?? "contact";
  const formCopy = formCopyByType[selectedType];

  async function onSubmit(values: ContactSubmitValues) {
    setSubmitError("");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const payload: { ok?: boolean; message?: string; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        setSubmitError(payload.error ?? "Không thể gửi lời nhắn lúc này. Anh/chị vui lòng thử lại sau.");
        return;
      }

      setSubmitMessage(payload.message ?? "Hồn Thơ đã nhận được lời nhắn của anh/chị.");
      reset({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        type: "contact",
      });
    } catch {
      setSubmitError("Không thể kết nối tới hệ thống liên hệ. Anh/chị vui lòng thử lại sau.");
    }
  }

  return (
    <article className="soft-panel border-[#dfc3a8] bg-[#fbf3ea] p-5 sm:p-6">
      <h3 className="text-2xl font-semibold text-[#4a2f20]">Gửi lời nhắn cho Hồn Thơ</h3>
      <p className="mt-1 text-sm leading-6 text-[#6a4b38]">{formCopy.intro}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm text-[#5f4332]">
            <span>Họ và tên</span>
            <input
              {...register("fullName")}
              className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName ? <p className="text-xs text-red-700">{errors.fullName.message}</p> : null}
          </label>

          <label className="space-y-1.5 text-sm text-[#5f4332]">
            <span>Email</span>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
              placeholder="ten@email.com"
            />
            {errors.email ? <p className="text-xs text-red-700">{errors.email.message}</p> : null}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm text-[#5f4332]">
            <span>Số điện thoại (không bắt buộc)</span>
            <input
              {...register("phone")}
              className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
              placeholder="09xx xxx xxx"
            />
            {errors.phone ? <p className="text-xs text-red-700">{errors.phone.message}</p> : null}
          </label>

          <label className="space-y-1.5 text-sm text-[#5f4332]">
            <span>Phân loại</span>
            <select
              {...register("type")}
              className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
            >
              {contactTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.type ? <p className="text-xs text-red-700">{errors.type.message}</p> : null}
          </label>
        </div>

        <label className="space-y-1.5 text-sm text-[#5f4332]">
          <span>Tiêu đề</span>
          <input
            {...register("subject")}
            className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
            placeholder={formCopy.subjectPlaceholder}
          />
          {errors.subject ? <p className="text-xs text-red-700">{errors.subject.message}</p> : null}
        </label>

        <label className="space-y-1.5 text-sm text-[#5f4332]">
          <span>Nội dung</span>
          <textarea
            {...register("message")}
            rows={6}
            className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
            placeholder={formCopy.messagePlaceholder}
          />
          {errors.message ? <p className="text-xs text-red-700">{errors.message.message}</p> : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#8b5e3c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Đang gửi..." : formCopy.submitLabel}
        </button>

        {submitError ? <p className="text-sm text-red-700">{submitError}</p> : null}
        {submitMessage ? <p className="text-sm text-[#5f4332]">{submitMessage}</p> : null}
      </form>
    </article>
  );
}
