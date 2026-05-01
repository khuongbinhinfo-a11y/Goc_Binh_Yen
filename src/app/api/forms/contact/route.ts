import { NextRequest, NextResponse } from "next/server";
import { createIncomingMessage, ensureAdminSheetsReady, logMailReply } from "@/lib/admin/messages-store";
import { contactSubmitSchema } from "@/lib/forms/form-schemas";
import { getInternalRecipient, sendMail, wrapMailBodyHtml } from "@/lib/forms/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactKind = "contact" | "feedback" | "poem" | "donation";

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

function getContactKindLabel(type: string | undefined) {
  switch (type) {
    case "feedback":
      return "Góp ý";
    case "poem":
      return "Chia sẻ thơ";
    case "donation":
      return "Ủng hộ";
    default:
      return "Liên hệ";
  }
}

function getNormalizedKind(type: string | undefined): ContactKind {
  return type === "feedback" || type === "poem" || type === "donation" ? type : "contact";
}

function formatInternalHtml(payload: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  type?: string;
}) {
  return wrapMailBodyHtml(`
    <h2>Lời nhắn mới từ website Hồn Thơ</h2>
    <p><strong>Họ tên:</strong> ${escapeHtml(payload.fullName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Số điện thoại:</strong> ${escapeHtml(normalizeOptional(payload.phone))}</p>
    <p><strong>Phân loại:</strong> ${escapeHtml(payload.type || "contact")}</p>
    <p><strong>Tiêu đề:</strong> ${escapeHtml(payload.subject)}</p>
    <p><strong>Nội dung:</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(payload.message)}</p>
  `);
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
  return wrapMailBodyHtml(`
    <p>Chào anh/chị ${escapeHtml(payload.fullName)},</p>
    <p>Hồn Thơ đã nhận được lời nhắn với tiêu đề <strong>${escapeHtml(payload.subject)}</strong>.</p>
    <p>Chúng tôi sẽ đọc thật kỹ và phản hồi trong thời gian sớm nhất, với sự trân trọng dành cho từng kỷ niệm và câu chữ anh/chị gửi tới.</p>
    <p>Cảm ơn anh/chị đã ghé lại Hồn Thơ.</p>
    <p>Thân mến,<br/>Đội ngũ Hồn Thơ</p>
  `);
}

function formatDonationReplyHtml(payload: { fullName: string; subject: string }) {
  return wrapMailBodyHtml(`
    <p>Chào anh/chị ${escapeHtml(payload.fullName)},</p>
    <p>Hồn Thơ đã nhận được lời nhắn ủng hộ của anh/chị với tiêu đề <strong>${escapeHtml(payload.subject)}</strong>.</p>
    <p>Sự đồng hành này không chỉ là một khoản ủng hộ, mà còn là sự gửi gắm niềm tin để Hồn Thơ có thể tiếp tục gìn giữ một không gian thơ, chuyện và giọng đọc thật yên, thật ấm cho những người hữu duyên ghé lại.</p>
    <p>Chúng tôi ghi nhận tấm lòng ấy bằng sự trân trọng sâu sắc, và sẽ dùng nguồn động viên này để chăm chút Hồn Thơ chỉn chu hơn mỗi ngày.</p>
    <p>Xin cảm ơn anh/chị vì đã chọn đồng hành cùng Hồn Thơ.</p>
    <p>Thân mến,<br/>Đội ngũ Hồn Thơ</p>
  `);
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

function formatDonationReplyText(payload: { fullName: string; subject: string }) {
  return [
    `Chào anh/chị ${payload.fullName},`,
    `Hồn Thơ đã nhận được lời nhắn ủng hộ với tiêu đề: ${payload.subject}.`,
    "Sự đồng hành của anh/chị là một niềm động viên rất quý, giúp Hồn Thơ tiếp tục gìn giữ không gian thơ, chuyện và giọng đọc một cách chỉn chu và bền bỉ hơn.",
    "Chúng tôi trân trọng tấm lòng ấy và xin chân thành cảm ơn anh/chị đã chọn đồng hành cùng Hồn Thơ.",
    "Thân mến,",
    "Đội ngũ Hồn Thơ",
  ].join("\n");
}

function getAutoReplyContent(payload: { fullName: string; subject: string; type?: string }) {
  const kind = getNormalizedKind(payload.type);

  if (kind === "donation") {
    return {
      subject: "Hồn Thơ trân trọng cảm ơn sự ủng hộ của anh/chị",
      html: formatDonationReplyHtml(payload),
      text: formatDonationReplyText(payload),
      successMessage: "Hồn Thơ đã nhận được lời ủng hộ của anh/chị và đã gửi thư cảm ơn xác nhận. Sự đồng hành này thật sự rất quý với chúng tôi.",
      fallbackMessage:
        "Hồn Thơ đã nhận được lời ủng hộ của anh/chị. Thư cảm ơn tự động tạm thời chưa gửi được, nhưng chúng tôi vẫn ghi nhận và trân trọng sự đồng hành này.",
    };
  }

  return {
    subject: "Hồn Thơ đã nhận được lời nhắn của anh/chị",
    html: formatAutoReplyHtml(payload),
    text: formatAutoReplyText(payload),
    successMessage: "Hồn Thơ đã nhận được lời nhắn của anh/chị. Chúng tôi sẽ sớm phản hồi.",
    fallbackMessage:
      "Hồn Thơ đã nhận được lời nhắn của anh/chị. Xác nhận tự động tạm thời chưa gửi được, nhưng đội ngũ vẫn sẽ phản hồi sớm.",
  };
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
  const kindLabel = getContactKindLabel(payload.type);
  const autoReplyContent = getAutoReplyContent(payload);

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
    const internalMail = await sendMail({
      to: getInternalRecipient(),
      subject: `[Hồn Thơ] ${kindLabel} mới - ${payload.fullName}`,
      html: formatInternalHtml(payload),
      text: formatInternalText(payload),
      replyTo: payload.email,
      fromKind: "support",
    });

    await logMailReply({
      messageId: stored.id,
      sentBy: "system:contact-form",
      to: Array.isArray(internalMail.to) ? internalMail.to.join(", ") : internalMail.to,
      subject: internalMail.subject,
      bodyText: formatInternalText(payload),
      resendEmailId: internalMail.resendEmailId,
      status: "sent",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không gửi được email nội bộ.";

    try {
      await logMailReply({
        messageId: stored.id,
        sentBy: "system:contact-form",
        to: getInternalRecipient(),
        subject: `[Hồn Thơ] ${kindLabel} mới - ${payload.fullName}`,
        bodyText: formatInternalText(payload),
        status: "failed",
        errorMessage: message,
      });
    } catch {
      // Ignore secondary logging errors to keep the primary error clear.
    }

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }

  let autoReplySent = true;
  try {
    const autoReply = await sendMail({
      to: payload.email,
      subject: autoReplyContent.subject,
      html: autoReplyContent.html,
      text: autoReplyContent.text,
      fromKind: "support",
    });

    await logMailReply({
      messageId: stored.id,
      sentBy: "system:auto-reply",
      to: Array.isArray(autoReply.to) ? autoReply.to.join(", ") : autoReply.to,
      subject: autoReply.subject,
      bodyText: autoReplyContent.text,
      resendEmailId: autoReply.resendEmailId,
      status: "sent",
    });
  } catch (error) {
    autoReplySent = false;
    const message = error instanceof Error ? error.message : "Không gửi được email xác nhận tự động.";

    try {
      await logMailReply({
        messageId: stored.id,
        sentBy: "system:auto-reply",
        to: payload.email,
        subject: autoReplyContent.subject,
        bodyText: autoReplyContent.text,
        status: "failed",
        errorMessage: message,
      });
    } catch {
      // Ignore secondary logging errors to keep the API response non-blocking.
    }

    console.error("[forms/contact] auto reply failed:", error);
  }

  return NextResponse.json({
    ok: true,
    messageId: stored.id,
    message: autoReplySent ? autoReplyContent.successMessage : autoReplyContent.fallbackMessage,
  });
}
