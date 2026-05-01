import { NextRequest, NextResponse } from "next/server";
import { logMailReply, updateMessageById } from "@/lib/admin/messages-store";
import { sendMail, wrapMailBodyHtml } from "@/lib/forms/mailer";
import { requireAdminApiPermission } from "../../_auth";

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

function ensureReplySubject(subject: string) {
  const normalized = subject.trim();
  if (/^re\s*:/i.test(normalized)) {
    return normalized;
  }
  return `Re: ${normalized}`;
}

export async function POST(request: NextRequest) {
  const permission = await requireAdminApiPermission(request, "mail:reply");
  if (!permission.ok) {
    return permission.response;
  }

  let body: {
    messageId?: string;
    to?: string;
    subject?: string;
    body?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Payload phản hồi không hợp lệ." }, { status: 400 });
  }

  const messageId = `${body.messageId || ""}`.trim();
  const to = `${body.to || ""}`.trim();
  const subjectRaw = `${body.subject || ""}`.trim();
  const content = `${body.body || ""}`.trim();

  if (!messageId || !to || !subjectRaw || !content) {
    return NextResponse.json({ ok: false, error: "Thiếu messageId, người nhận, tiêu đề hoặc nội dung." }, { status: 400 });
  }

  const subject = ensureReplySubject(subjectRaw);

  try {
    const sent = await sendMail({
      to,
      subject,
      text: content,
      html: wrapMailBodyHtml(`<div style="white-space:pre-wrap;">${escapeHtml(content)}</div>`),
      fromKind: "support",
      replyTo: permission.session.email,
    });

    await logMailReply({
      messageId,
      sentBy: permission.session.email,
      to,
      subject,
      bodyText: content,
      resendEmailId: sent.resendEmailId,
      status: "sent",
    });

    await updateMessageById(messageId, {
      status: "replied",
      lastRepliedAt: new Date().toISOString(),
      lastReplyBy: permission.session.email,
    });

    return NextResponse.json({ ok: true, resendEmailId: sent.resendEmailId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không gửi được phản hồi email.";

    try {
      await logMailReply({
        messageId,
        sentBy: permission.session.email,
        to,
        subject,
        bodyText: content,
        status: "failed",
        errorMessage: message,
      });
    } catch {
      // Ignore secondary logging errors to keep response consistent.
    }

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
