import { NextRequest, NextResponse } from "next/server";
import { createIncomingMessage, ensureAdminSheetsReady } from "@/lib/admin/messages-store";
import { contactSubmitSchema } from "@/lib/forms/form-schemas";
import { buildMailBrandHeaderHtml, getInternalRecipient, sendMail } from "@/lib/forms/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeOptional(value: string | undefined) {
  const normalized = `${value || ""}`.trim();
  return normalized.length > 0 ? normalized : "Không cung cấp";
}

function formatInternalHtml(payload: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type?: string;
}) {
  return `
    ${buildMailBrandHeaderHtml()}
    <h2>Lời nhắn mới từ website Hồn Thơ</h2>
    <p><strong>Họ tên:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Số điện thoại:</strong> ${escapeHtml(normalizeOptional(payload.phone))}</p>
    <p><strong>Phân loại:</strong> ${escapeHtml(payload.type || "contact")}</p>
    <p><strong>Tiêu đề:</strong> ${escapeHtml(payload.subject)}</p>
    <p><strong>Nội dung:</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
  `;
}

function formatInternalText(payload: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type?: string;
}) {
  return [
    "Lời nhắn mới từ website Hồn Thơ",
    `Họ tên: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Số điện thoại: ${normalizeOptional(payload.phone)}`,
    `Phân loại: ${payload.type || "contact"}`,
    `Tiêu đề: ${payload.subject}`,
    "Nội dung:",
    payload.message,
  ].join("\n");
}

function formatAutoReplyHtml(payload: { fullName: string; subject: string }) {
  return `
    ${buildMailBrandHeaderHtml()}
    <p>Chào anh/chị ${escapeHtml(payload.fullName)},</p>
    <p>Hồn Thơ đã nhận được lời nhắn với tiêu đề <strong>${escapeHtml(payload.subject)}</strong>.</p>
    <p>Chúng tôi sẽ đọc thật kỹ và phản hồi trong thời gian sớm nhất, với sự trân trọng dành cho từng kỷ niệm và câu chữ anh/chị gửi tới.</p>
    <p>Cảm ơn anh/chị đã ghé lại Hồn Thơ.</p>
    <p>Thân mến,<br/>Đội ngũ Hồn Thơ</p>
  `;
}

function formatAutoReplyText(payload: { fullName: string; subject: string }) {
  return [
    `Chào anh/chị ${payload.fullName},`,
    `Hồn Thơ đã nhận được lời nhắn với tiêu đề: ${payload.subject}.`,
    "Chúng tôi sẽ đọc thật kỹ và phản hồi trong thời gian sớm nhất.",
    "Cảm ơn anh/chị đã ghé lại Hồn Thơ.",
    "Thân mến,",
    "Đội ngũ Hồn Thơ",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const parsed = contactSubmitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? "Thông tin liên hệ chưa hợp lệ.",
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  try {
    await ensureAdminSheetsReady();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Google Sheets chưa được cấu hình đúng.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  const stored = await createIncomingMessage({
    type: payload.type,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    subject: payload.subject,
    message: payload.message,
    source: "hontho.com",
  });

  try {
    await sendMail({
      to: getInternalRecipient(),
      subject: `[Hồn Thơ] Lời nhắn mới - ${payload.fullName}`,
      html: formatInternalHtml(payload),
      text: formatInternalText(payload),
      replyTo: payload.email,
      fromKind: "support",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không gửi được email nội bộ.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  let autoReplySent = true;
  try {
    await sendMail({
      to: payload.email,
      subject: "Hồn Thơ đã nhận được lời nhắn của anh/chị",
      html: formatAutoReplyHtml(payload),
      text: formatAutoReplyText(payload),
      fromKind: "support",
    });
  } catch (error) {
    autoReplySent = false;
    console.error("[forms/contact] auto reply failed:", error);
  }

  return NextResponse.json({
    ok: true,
    messageId: stored.id,
    message: autoReplySent
      ? "Hồn Thơ đã nhận được lời nhắn của anh/chị. Chúng tôi sẽ sớm phản hồi."
      : "Hồn Thơ đã nhận được lời nhắn của anh/chị. Xác nhận tự động tạm thời chưa gửi được, nhưng đội ngũ vẫn sẽ phản hồi sớm.",
  });
}
