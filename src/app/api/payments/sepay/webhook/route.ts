import { NextRequest, NextResponse } from "next/server";
import { createIncomingMessage, ensureAdminSheetsReady, listMessages, updateMessageById } from "@/lib/admin/messages-store";
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

function parseRawWebhookPayload(rawBody: string) {
  if (!rawBody || rawBody === "(empty)") {
    return null;
  }

  try {
    return JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function flattenScalarEntries(input: unknown, output: Array<{ key: string; value: string }>, prefix = "") {
  if (input === null || input === undefined) {
    return;
  }

  if (typeof input === "string" || typeof input === "number" || typeof input === "boolean") {
    output.push({
      key: prefix.toLowerCase(),
      value: `${input}`,
    });
    return;
  }

  if (Array.isArray(input)) {
    input.forEach((item, index) => {
      const nextPrefix = prefix ? `${prefix}.${index}` : `${index}`;
      flattenScalarEntries(item, output, nextPrefix);
    });
    return;
  }

  if (typeof input === "object") {
    Object.entries(input as Record<string, unknown>).forEach(([key, value]) => {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      flattenScalarEntries(value, output, nextPrefix);
    });
  }
}

function pickFirstString(entries: Array<{ key: string; value: string }>, keyHints: string[]) {
  const normalizedHints = keyHints.map((hint) => hint.toLowerCase());

  const found = entries.find((entry) =>
    normalizedHints.some((hint) => entry.key.endsWith(hint) || entry.key.includes(`.${hint}`) || entry.key === hint),
  );

  return found?.value?.trim() || "";
}

function parseDonationTransferContent(transferContent: string) {
  const normalized = transferContent.trim();
  if (!normalized) {
    return null;
  }

  if (!/\bungho\b/i.test(normalized.replaceAll(/\s+/g, ""))) {
    return null;
  }

  const contact = normalized.match(/(?:^|\|)\s*CONTACT\s*:\s*([^|]+)/i)?.[1]?.trim() || "";
  const fullName = normalized.match(/(?:^|\|)\s*NAME\s*:\s*([^|]+)/i)?.[1]?.trim() || "";
  const legacyEmail = normalized.match(/(?:^|\|)\s*EMAIL\s*:\s*([^|]+)/i)?.[1]?.trim() || "";
  const legacyPhone = normalized.match(/(?:^|\|)\s*SDT\s*:\s*([^|]+)/i)?.[1]?.trim() || "";
  const message = normalized.match(/(?:^|\|)\s*MSG\s*:\s*([^|]+)/i)?.[1]?.trim() || "";
  const rid = normalized.match(/(?:^|\|)\s*RID\s*:\s*([^|]+)/i)?.[1]?.trim() || "";

  const normalizedContact = contact || legacyEmail || legacyPhone;
  const email = normalizedContact.includes("@") ? normalizedContact : legacyEmail;
  const phone = normalizedContact.length > 0 && !normalizedContact.includes("@") ? normalizedContact : legacyPhone;

  return {
    email,
    phone,
    fullName,
    message,
    rid,
  };
}

function normalizeAmount(value: string) {
  const digits = value.replaceAll(/[^0-9.-]/g, "");
  const amount = Number(digits);
  return Number.isFinite(amount) ? amount : 0;
}

function buildWebhookDonationMessage(input: {
  transferContent: string;
  transactionId: string;
  amountText: string;
  senderName: string;
  parsedMessage: string;
  rid: string;
}) {
  const lines = [
    "Webhook SePay xác nhận giao dịch có mã UNGHO.",
    `RID: ${input.rid || "Không rõ"}`,
    `Mã giao dịch: ${input.transactionId || "Không rõ"}`,
    `Số tiền: ${input.amountText || "Không rõ"}`,
    `Người chuyển: ${input.senderName || "Không rõ"}`,
    `Nội dung chuyển khoản: ${input.transferContent || "Không rõ"}`,
  ];

  if (input.parsedMessage) {
    lines.push(`Lời nhắn từ nội dung CK: ${input.parsedMessage}`);
  }

  return lines.join("\n");
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
  const payload = parseRawWebhookPayload(rawBody);

  const headerLines: string[] = [];
  request.headers.forEach((value, key) => {
    headerLines.push(`${key}: ${value}`);
  });

  const headersText = headerLines.length > 0 ? headerLines.join("\n") : "(no headers)";

  if (payload) {
    const entries: Array<{ key: string; value: string }> = [];
    flattenScalarEntries(payload, entries);

    const transferContent =
      pickFirstString(entries, [
        "transferContent",
        "transactionContent",
        "transaction_content",
        "content",
        "description",
        "remark",
        "notes",
      ]) || "";

    const donationInfo = parseDonationTransferContent(transferContent);
    if (donationInfo) {
      const transactionId =
        pickFirstString(entries, ["transactionId", "transaction_id", "id", "reference", "refNo", "ref_no"]) ||
        requestId;
      const senderName = pickFirstString(entries, ["senderName", "fromAccountName", "accountName", "payerName", "name"]);
      const amountRaw = pickFirstString(entries, ["transferAmount", "amountIn", "amount", "money", "creditAmount"]);
      const normalizedAmount = normalizeAmount(amountRaw);
      const amountText = normalizedAmount > 0 ? `${normalizedAmount.toLocaleString("vi-VN")} VND` : amountRaw;

      try {
        await ensureAdminSheetsReady();
        const messageBody = buildWebhookDonationMessage({
          transferContent,
          transactionId,
          amountText,
          senderName,
          parsedMessage: donationInfo.message,
          rid: donationInfo.rid,
        });

        const allMessages = await listMessages();
        const matchedByRid = donationInfo.rid
          ? allMessages.find(
              (item) =>
                item.type === "donation" &&
                (item.message.toLowerCase().includes(`rid:${donationInfo.rid.toLowerCase()}`) ||
                  item.message.toLowerCase().includes(`rid: ${donationInfo.rid.toLowerCase()}`)) &&
                item.source === "sepay-webhook",
            )
          : null;

        let storedMessageId = "";
        if (matchedByRid) {
          storedMessageId = matchedByRid.id;
          await updateMessageById(matchedByRid.id, {
            status: "closed",
            notes: `PAYMENT_CONFIRMED:${new Date().toISOString()} | TX:${transactionId}`,
          });
        } else {
          const created = await createIncomingMessage({
            type: "donation",
            fullName: donationInfo.fullName || senderName || "",
            email: donationInfo.email,
            phone: donationInfo.phone,
            subject: "Ủng hộ qua chuyển khoản (SePay webhook)",
            message: messageBody,
            source: "sepay-webhook",
          });

          storedMessageId = created.id;
          await updateMessageById(created.id, {
            status: "closed",
            notes: `PAYMENT_CONFIRMED:${new Date().toISOString()} | TX:${transactionId}`,
          });
        }

        if (donationInfo.email) {
          try {
            await sendMail({
              to: donationInfo.email,
              subject: "Hồn Thơ cảm ơn bạn đã ủng hộ",
              html: wrapMailBodyHtml(`
                <p>Hồn Thơ đã nhận được khoản ủng hộ của bạn. Xin cảm ơn sự đồng hành rất quý này.</p>
                <p><strong>Mã giao dịch:</strong> ${escapeHtml(transactionId || "Không rõ")}</p>
                <p><strong>Số tiền:</strong> ${escapeHtml(amountText || "Không rõ")}</p>
                <p>Chúc bạn một ngày an yên.</p>
                <p>Thân mến,<br/>Đội ngũ Hồn Thơ</p>
              `),
              text: [
                "Hồn Thơ đã nhận được khoản ủng hộ của bạn. Xin cảm ơn sự đồng hành rất quý này.",
                `Mã giao dịch: ${transactionId || "Không rõ"}`,
                `Số tiền: ${amountText || "Không rõ"}`,
                "Chúc bạn một ngày an yên.",
                "Thân mến,",
                "Đội ngũ Hồn Thơ",
              ].join("\n"),
              fromKind: "support",
            });
          } catch (error) {
            console.error("[sepay/webhook] failed to send donor thank-you mail:", error, storedMessageId);
          }
        }
      } catch (error) {
        console.error("[sepay/webhook] failed to store donation message:", error);
      }
    }
  }

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