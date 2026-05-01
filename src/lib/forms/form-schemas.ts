import { z } from "zod";

export const contactSubmitSchema = z.object({
  fullName: z.string().trim().min(2, "Vui lòng nhập họ tên").max(120, "Họ tên quá dài"),
  email: z.string().trim().email("Vui lòng nhập email hợp lệ").max(200, "Email quá dài"),
  phone: z.string().trim().max(40, "Số điện thoại quá dài").optional(),
  subject: z.string().trim().min(2, "Vui lòng nhập tiêu đề").max(180, "Tiêu đề quá dài"),
  message: z.string().trim().min(5, "Vui lòng nhập nội dung").max(3000, "Nội dung quá dài"),
  type: z.enum(["contact", "feedback", "poem", "donation"]).optional(),
});

export type ContactSubmitValues = z.infer<typeof contactSubmitSchema>;
