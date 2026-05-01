import { z } from "zod";

export const contactSubmitSchema = z.object({
  fullName: z.string().trim().max(120, "Họ tên quá dài").optional().or(z.literal("")),
  email: z.string().trim().max(200, "Email quá dài").optional().or(z.literal("")),
  phone: z.string().trim().max(40, "Số điện thoại quá dài").optional().or(z.literal("")),
  subject: z.string().trim().min(2, "Vui lòng nhập tiêu đề").max(180, "Tiêu đề quá dài"),
  message: z.string().trim().min(5, "Vui lòng nhập nội dung").max(3000, "Nội dung quá dài"),
  type: z.enum(["contact", "feedback", "poem", "donation"]).optional(),
}).refine(
  (data) => {
    const email = data.email?.trim() || "";
    const phone = data.phone?.trim() || "";
    // Email phải hợp lệ nếu được cung cấp
    if (email && !z.string().email().safeParse(email).success) {
      return false;
    }
    // Yêu cầu ít nhất email hoặc phone
    return email.length > 0 || phone.length > 0;
  },
  {
    message: "Vui lòng cung cấp email hoặc số điện thoại để chúng tôi phản hồi",
    path: ["email"],
  }
);

export type ContactSubmitValues = z.infer<typeof contactSubmitSchema>;
