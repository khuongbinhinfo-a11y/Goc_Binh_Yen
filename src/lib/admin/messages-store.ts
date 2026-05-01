import {
  appendSheetRow,
  assertSheetHeaders,
  getSheetRows,
  updateSheetRowById,
  type RequiredSheetName,
} from "@/lib/integrations/google-sheets";

const MESSAGES_SHEET: RequiredSheetName = "MESSAGES";
const MAIL_LOGS_SHEET: RequiredSheetName = "MAIL_LOGS";

export type AdminMessageStatus = "new" | "in_progress" | "replied" | "closed";

export type AdminMessage = {
  id: string;
  createdAt: string;
  status: string;
  type: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string;
  assignedTo: string;
  lastRepliedAt: string;
  lastReplyBy: string;
  notes: string;
};

export type AdminMailLog = {
  id: string;
  messageId: string;
  sentAt: string;
  sentBy: string;
  to: string;
  subject: string;
  bodyText: string;
  resendEmailId: string;
  status: string;
  errorMessage: string;
};

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function toAdminMessage(record: Record<string, string>): AdminMessage {
  return {
    id: record.id || "",
    createdAt: record.created_at || "",
    status: record.status || "new",
    type: record.type || "contact",
    fullName: record.full_name || "",
    email: record.email || "",
    phone: record.phone || "",
    subject: record.subject || "",
    message: record.message || "",
    source: record.source || "website",
    assignedTo: record.assigned_to || "",
    lastRepliedAt: record.last_replied_at || "",
    lastReplyBy: record.last_reply_by || "",
    notes: record.notes || "",
  };
}

function toAdminMailLog(record: Record<string, string>): AdminMailLog {
  return {
    id: record.id || "",
    messageId: record.message_id || "",
    sentAt: record.sent_at || "",
    sentBy: record.sent_by || "",
    to: record.to || "",
    subject: record.subject || "",
    bodyText: record.body_text || "",
    resendEmailId: record.resend_email_id || "",
    status: record.status || "",
    errorMessage: record.error_message || "",
  };
}

export async function ensureAdminSheetsReady() {
  await assertSheetHeaders(MESSAGES_SHEET);
  await assertSheetHeaders(MAIL_LOGS_SHEET);
}

export async function createIncomingMessage(input: {
  type?: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  source?: string;
}) {
  const id = createId("msg");
  const createdAt = new Date().toISOString();

  await appendSheetRow(MESSAGES_SHEET, {
    id,
    created_at: createdAt,
    status: "new",
    type: input.type || "contact",
    full_name: input.fullName,
    email: input.email,
    phone: input.phone || "",
    subject: input.subject,
    message: input.message,
    source: input.source || "hontho.com",
    assigned_to: "",
    last_replied_at: "",
    last_reply_by: "",
    notes: "",
  });

  return { id, createdAt };
}

export async function listMessages() {
  const { rows } = await getSheetRows(MESSAGES_SHEET);
  return rows
    .map((item) => toAdminMessage(item.values))
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function listMailLogs(limit = 50) {
  const { rows } = await getSheetRows(MAIL_LOGS_SHEET);
  return rows
    .map((item) => toAdminMailLog(item.values))
    .sort((a, b) => (a.sentAt < b.sentAt ? 1 : -1))
    .slice(0, limit);
}

export async function getMessageById(id: string) {
  const { rows } = await getSheetRows(MESSAGES_SHEET);
  const found = rows.find((row) => row.values.id === id);
  return found ? toAdminMessage(found.values) : null;
}

export async function updateMessageById(
  id: string,
  patch: {
    status?: AdminMessageStatus;
    assignedTo?: string;
    notes?: string;
    lastRepliedAt?: string;
    lastReplyBy?: string;
  },
) {
  return updateSheetRowById(MESSAGES_SHEET, id, {
    ...(patch.status ? { status: patch.status } : {}),
    ...(patch.assignedTo !== undefined ? { assigned_to: patch.assignedTo } : {}),
    ...(patch.notes !== undefined ? { notes: patch.notes } : {}),
    ...(patch.lastRepliedAt !== undefined ? { last_replied_at: patch.lastRepliedAt } : {}),
    ...(patch.lastReplyBy !== undefined ? { last_reply_by: patch.lastReplyBy } : {}),
  });
}

export async function logMailReply(input: {
  messageId: string;
  sentBy: string;
  to: string;
  subject: string;
  bodyText: string;
  resendEmailId?: string;
  status: "sent" | "failed";
  errorMessage?: string;
}) {
  await appendSheetRow(MAIL_LOGS_SHEET, {
    id: createId("mail"),
    message_id: input.messageId,
    sent_at: new Date().toISOString(),
    sent_by: input.sentBy,
    to: input.to,
    subject: input.subject,
    body_text: input.bodyText,
    resend_email_id: input.resendEmailId || "",
    status: input.status,
    error_message: input.errorMessage || "",
  });
}
