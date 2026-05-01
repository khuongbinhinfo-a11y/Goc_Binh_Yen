import { NextRequest, NextResponse } from "next/server";
import { getInternalRecipient, sendMail, wrapMailBodyHtml } from "@/lib/forms/mailer";

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

function formatRawText(value: string) {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "(empty)";
}

function buildWebhookMailHtml(input: {
  requestId: string;
  receivedAt: string;
  method: string;
  contentType: string;
  rawBody: string;
  headersText: string;
}) {
  return wrapMailBodyHtml(`
    <h2>Webhook SePay da duoc ghi nhan</h2>
    <p><strong>Request ID:</strong> ${escapeHtml(input.requestId)}</p>
    <p><strong>Received at:</strong> ${escapeHtml(input.receivedAt)}</p>
    <p><strong>Method:</strong> ${escapeHtml(input.method)}</p>
    <p><strong>Content-Type:</strong> ${escapeHtml(input.contentType)}</p>
    <p><strong>Headers:</strong></p>
    <pre style="white-space:pre-wrap;background:#fffaf5;border:1px solid #e9d7c4;border-radius:10px;padding:12px;">${escapeHtml(input.headersText)}</pre>
    <p><strong>Raw payload:</strong></p>
    <pre style="white-space:pre-wrap;background:#fffaf5;border:1px solid #e9d7c4;border-radius:10px;padding:12px;">${escapeHtml(input.rawBody)}</pre>
  `);
}

function buildWebhookMailText(input: {
  requestId: string;
  receivedAt: string;
  method: string;
  contentType: string;
  rawBody: string;
  headersText: string;
}) {
  return [
    "Webhook SePay da duoc ghi nhan",
    `Request ID: ${input.requestId}`,
    `Received at: ${input.receivedAt}`,
    `Method: ${input.method}`,
    `Content-Type: ${input.contentType}`,
    "Headers:",
    input.headersText,
    "Raw payload:",
    input.rawBody,
  ].join("\n\n");
}

export async function GET() {
  return NextResponse.json({ ok: true, provider: "sepay", route: "/api/payments/sepay/webhook" });
}

export async function POST(request: NextRequest) {
  const requestId = `sepay_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const receivedAt = new Date().toISOString();
  const contentType = request.headers.get("content-type") || "unknown";
  const rawBody = formatRawText(await request.text());

  const headerLines: string[] = [];
  request.headers.forEach((value, key) => {
    headerLines.push(`${key}: ${value}`);
  });

  const headersText = headerLines.length > 0 ? headerLines.join("\n") : "(no headers)";

  try {
    await sendMail({
      to: getInternalRecipient(),
      subject: `[SePay webhook] ${requestId}`,
      html: buildWebhookMailHtml({
        requestId,
        receivedAt,
        method: request.method,
        contentType,
        rawBody,
        headersText,
      }),
      text: buildWebhookMailText({
        requestId,
        receivedAt,
        method: request.method,
        contentType,
        rawBody,
        headersText,
      }),
      fromKind: "support",
    });
  } catch (error) {
    console.error("[sepay/webhook] failed to notify admin:", error);
  }

  return NextResponse.json({ ok: true, accepted: true, requestId });
}