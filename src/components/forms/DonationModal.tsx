"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const donationModalSchema = z.object({
  email: z.string().trim().max(200, "Email quá dài").optional().or(z.literal("")),
  phone: z.string().trim().max(40, "Số điện thoại quá dài").optional().or(z.literal("")),
  message: z.string().trim().max(500, "Lời nhắn quá dài").optional().or(z.literal("")),
}).refine(
  (data) => {
    const email = data.email?.trim() || "";
    const phone = data.phone?.trim() || "";
    if (email && !z.string().email().safeParse(email).success) {
      return false;
    }
    return email.length > 0 || phone.length > 0;
  },
  {
    message: "Vui lòng cung cấp email hoặc số điện thoại",
    path: ["email"],
  }
);

type DonationModalValues = z.infer<typeof donationModalSchema>;

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess?: () => void;
}

export default function DonationModal({ isOpen, onClose, onSubmitSuccess }: DonationModalProps) {
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DonationModalValues>({
    resolver: zodResolver(donationModalSchema),
    defaultValues: {
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: DonationModalValues) {
    setSubmitError("");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/forms/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: "",
          email: values.email || "",
          phone: values.phone || "",
          subject: "Lời ủng hộ từ website",
          message: values.message || "Ủng hộ không lời nhắn",
          type: "donation",
        }),
      });

      const payload: { ok?: boolean; message?: string; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        setSubmitError(payload.error ?? "Không thể gửi lời ủng hộ lúc này. Anh/chị vui lòng thử lại sau.");
        return;
      }

      setSubmitMessage("Cảm ơn ủng hộ của anh/chị! Vui lòng hoàn tất chuyển khoản.");
      reset();
      
      setTimeout(() => {
        onClose();
        onSubmitSuccess?.();
      }, 1500);
    } catch {
      setSubmitError("Không thể kết nối tới hệ thống. Anh/chị vui lòng thử lại sau.");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-[#fbf4eb] p-6 shadow-xl sm:p-7">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[#8b6b54] transition hover:text-[#5f4332]"
          aria-label="Đóng"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-[#3f2b20]">Gửi lời ủng hộ</h2>
        <p className="mt-2 text-sm leading-6 text-[#654939]">
          Mỗi sự ủng hộ là một sự tin tưởng quý giá, giúp Hồn Thơ giữ được không gian chữ nghĩa lâu hơn.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <label className="space-y-1.5 text-sm text-[#5f4332]">
            <span>Email (không bắt buộc)</span>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
              placeholder="ten@email.com"
            />
            {errors.email ? <p className="text-xs text-red-700">{errors.email.message}</p> : null}
          </label>

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
            <span>Lời nhắn (không bắt buộc)</span>
            <textarea
              {...register("message")}
              rows={3}
              className="w-full rounded-xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
              placeholder="Lời chúc, lời nhắn cho Hồn Thơ..."
            />
            {errors.message ? <p className="text-xs text-red-700">{errors.message.message}</p> : null}
          </label>

          <p className="text-xs text-[#8b6b54]">
            Vui lòng cung cấp email hoặc số điện thoại để chúng tôi phản hồi cảm ơn.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#8b5e3c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Đang gửi..." : "Tiếp tục chuyển khoản"}
          </button>

          {submitError ? <p className="text-sm text-red-700">{submitError}</p> : null}
          {submitMessage ? <p className="text-sm text-[#5f4332]">{submitMessage}</p> : null}
        </form>
      </div>
    </div>
  );
}
