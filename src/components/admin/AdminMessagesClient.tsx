"use client";

import { useMemo, useState } from "react";
import type { AdminMailLog, AdminMessage } from "@/lib/admin/messages-store";
import type { AdminPermission } from "@/lib/admin/auth";

type AdminMessagesClientProps = {
  initialItems: AdminMessage[];
  initialMailLogs: AdminMailLog[];
  sessionEmail: string;
  permissions: AdminPermission[];
};

type ReplyState = {
  to: string;
  subject: string;
  body: string;
};

const STATUS_OPTIONS = ["new", "in_progress", "replied", "closed"] as const;

const adminDateTimeFormatter = new Intl.DateTimeFormat("vi-VN", {
  dateStyle: "short",
  timeStyle: "medium",
  timeZone: "Asia/Ho_Chi_Minh",
});

function formatAdminDateTime(value: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return adminDateTimeFormatter.format(date);
}

export default function AdminMessagesClient({
  initialItems,
  initialMailLogs,
  sessionEmail,
  permissions,
}: AdminMessagesClientProps) {
  const [items, setItems] = useState<AdminMessage[]>(initialItems);
  const [mailLogs, setMailLogs] = useState<AdminMailLog[]>(initialMailLogs);
  const [selectedId, setSelectedId] = useState<string>(initialItems[0]?.id ?? "");
  const [statusText, setStatusText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const canReply = permissions.includes("mail:reply");
  const canUpdate = permissions.includes("message:update_status");

  const selectedMessage = useMemo(() => items.find((item) => item.id === selectedId) ?? null, [items, selectedId]);

  const [replyState, setReplyState] = useState<ReplyState>({
    to: selectedMessage?.email ?? "",
    subject: selectedMessage?.subject ? `Re: ${selectedMessage.subject}` : "",
    body: "",
  });

  function syncReplyState() {
    setReplyState({
      to: selectedMessage?.email ?? "",
      subject: selectedMessage?.subject ? `Re: ${selectedMessage.subject}` : "",
      body: "",
    });
  }

  async function refreshList() {
    const response = await fetch("/api/admin/messages", { cache: "no-store" });
    const payload: { ok?: boolean; items?: AdminMessage[]; mailLogs?: AdminMailLog[]; error?: string } = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) {
      throw new Error(payload.error ?? "Không tải lại được danh sách lời nhắn.");
    }

    const nextItems = payload.items ?? [];
    setItems(nextItems);
    setMailLogs(payload.mailLogs ?? []);

    if (selectedId && nextItems.some((item) => item.id === selectedId)) {
      return;
    }

    setSelectedId(nextItems[0]?.id ?? "");
  }

  async function handleUpdateMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedMessage || !canUpdate) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const status = `${formData.get("status") || ""}`.trim();
    const assignedTo = `${formData.get("assignedTo") || ""}`.trim();
    const notes = `${formData.get("notes") || ""}`.trim();

    setIsSaving(true);
    setStatusText("");
    setErrorText("");

    try {
      const response = await fetch(`/api/admin/messages/${encodeURIComponent(selectedMessage.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, assignedTo, notes }),
      });

      const payload: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        setErrorText(payload.error ?? "Không cập nhật được lời nhắn.");
        return;
      }

      await refreshList();
      setStatusText("Đã cập nhật trạng thái lời nhắn.");
    } catch {
      setErrorText("Không thể kết nối API cập nhật lời nhắn.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSendReply(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedMessage || !canReply) {
      return;
    }

    setIsSending(true);
    setStatusText("");
    setErrorText("");

    try {
      const response = await fetch("/api/admin/mail/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId: selectedMessage.id,
          to: replyState.to,
          subject: replyState.subject,
          body: replyState.body,
        }),
      });

      const payload: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        setErrorText(payload.error ?? "Không gửi được phản hồi email.");
        return;
      }

      await refreshList();
      setStatusText("Đã gửi phản hồi email và cập nhật trạng thái.");
      setShowReply(false);
      syncReplyState();
    } catch {
      setErrorText("Không thể kết nối API phản hồi email.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <section className="rounded-2xl border border-[#d8bea5] bg-white p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-[#4a2f20]">Danh sách lời nhắn</h2>
          <p className="mt-1 text-sm text-[#6a4b38]">Đăng nhập: {sessionEmail}</p>

          <div className="mt-4 max-h-[540px] space-y-2 overflow-y-auto pr-1">
            {items.map((item) => {
              const active = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(item.id);
                    setShowReply(false);
                    setStatusText("");
                    setErrorText("");
                  }}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    active
                      ? "border-[#b07a50] bg-[#f9efe3]"
                      : "border-[#ecdac7] bg-[#fffaf4] hover:border-[#cfac8f] hover:bg-[#fcf3ea]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#4a2f20]">{item.fullName || "Khách ẩn danh"}</p>
                  <p className="mt-1 text-xs text-[#7b5a44]">{item.email}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#5f4332]">{item.subject || "(Không có tiêu đề)"}</p>
                  <div className="mt-2 flex items-center justify-between text-xs text-[#8a6851]">
                    <span>{item.status}</span>
                    <span>{formatAdminDateTime(item.createdAt)}</span>
                  </div>
                </button>
              );
            })}
            {items.length === 0 ? <p className="text-sm text-[#7b5a44]">Chưa có lời nhắn nào.</p> : null}
          </div>
        </section>

        <section className="rounded-2xl border border-[#d8bea5] bg-white p-4 sm:p-5">
        {!selectedMessage ? (
          <p className="text-sm text-[#7b5a44]">Chọn một lời nhắn để xem chi tiết.</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-[#4a2f20]">Chi tiết lời nhắn</h2>
            <div className="mt-3 space-y-2 text-sm text-[#5f4332]">
              <p><strong>Họ tên:</strong> {selectedMessage.fullName || "-"}</p>
              <p><strong>Email:</strong> {selectedMessage.email || "-"}</p>
              <p><strong>Điện thoại:</strong> {selectedMessage.phone || "-"}</p>
              <p><strong>Phân loại:</strong> {selectedMessage.type || "contact"}</p>
              <p><strong>Tiêu đề:</strong> {selectedMessage.subject || "-"}</p>
              <p><strong>Trạng thái:</strong> {selectedMessage.status}</p>
              <p><strong>Gửi lúc:</strong> {formatAdminDateTime(selectedMessage.createdAt)}</p>
              <p><strong>Phản hồi gần nhất:</strong> {selectedMessage.lastRepliedAt ? formatAdminDateTime(selectedMessage.lastRepliedAt) : "Chưa phản hồi"}</p>
              <p><strong>Người phản hồi:</strong> {selectedMessage.lastReplyBy || "-"}</p>
              <p className="rounded-xl border border-[#ecdac7] bg-[#fffaf4] p-3 whitespace-pre-wrap"><strong>Nội dung:</strong>\n{selectedMessage.message || ""}</p>
            </div>

            <form onSubmit={handleUpdateMessage} className="mt-4 space-y-3 rounded-xl border border-[#ecdac7] bg-[#fffaf4] p-3">
              <h3 className="text-sm font-semibold text-[#4a2f20]">Cập nhật xử lý</h3>

              <label className="block space-y-1 text-xs text-[#6a4b38]">
                <span>Trạng thái</span>
                <select
                  name="status"
                  defaultValue={selectedMessage.status}
                  disabled={!canUpdate || isSaving}
                  className="w-full rounded-lg border border-[#d9bea4] bg-white px-3 py-2 text-sm text-[#3f2b20] outline-none"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1 text-xs text-[#6a4b38]">
                <span>Phân công (assigned_to)</span>
                <input
                  name="assignedTo"
                  defaultValue={selectedMessage.assignedTo}
                  disabled={!canUpdate || isSaving}
                  className="w-full rounded-lg border border-[#d9bea4] bg-white px-3 py-2 text-sm text-[#3f2b20] outline-none"
                  placeholder="Tên người phụ trách"
                />
              </label>

              <label className="block space-y-1 text-xs text-[#6a4b38]">
                <span>Ghi chú</span>
                <textarea
                  name="notes"
                  defaultValue={selectedMessage.notes}
                  rows={3}
                  disabled={!canUpdate || isSaving}
                  className="w-full rounded-lg border border-[#d9bea4] bg-white px-3 py-2 text-sm text-[#3f2b20] outline-none"
                  placeholder="Nội dung ghi chú nội bộ"
                />
              </label>

              <button
                type="submit"
                disabled={!canUpdate || isSaving}
                className="inline-flex items-center justify-center rounded-full bg-[#8b5e3c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? "Đang lưu..." : "Lưu cập nhật"}
              </button>

              {!canUpdate ? <p className="text-xs text-[#8a6851]">Tài khoản hiện tại không có quyền message:update_status.</p> : null}
            </form>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowReply((prev) => !prev);
                  syncReplyState();
                }}
                disabled={!canReply}
                className="inline-flex items-center justify-center rounded-full border border-[#b88763] px-4 py-2 text-xs font-semibold text-[#7a4f32] transition hover:bg-[#f3e4d4] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Trả lời email
              </button>
              {!canReply ? <p className="mt-2 text-xs text-[#8a6851]">Tài khoản hiện tại không có quyền mail:reply.</p> : null}
            </div>

            {showReply && canReply ? (
              <form onSubmit={handleSendReply} className="mt-3 space-y-3 rounded-xl border border-[#ecdac7] bg-[#fffaf4] p-3">
                <h3 className="text-sm font-semibold text-[#4a2f20]">Soạn phản hồi</h3>

                <label className="block space-y-1 text-xs text-[#6a4b38]">
                  <span>Người nhận</span>
                  <input
                    type="email"
                    value={replyState.to}
                    onChange={(event) => setReplyState((prev) => ({ ...prev, to: event.target.value }))}
                    className="w-full rounded-lg border border-[#d9bea4] bg-white px-3 py-2 text-sm text-[#3f2b20] outline-none"
                    required
                  />
                </label>

                <label className="block space-y-1 text-xs text-[#6a4b38]">
                  <span>Tiêu đề</span>
                  <input
                    value={replyState.subject}
                    onChange={(event) => setReplyState((prev) => ({ ...prev, subject: event.target.value }))}
                    className="w-full rounded-lg border border-[#d9bea4] bg-white px-3 py-2 text-sm text-[#3f2b20] outline-none"
                    required
                  />
                </label>

                <label className="block space-y-1 text-xs text-[#6a4b38]">
                  <span>Nội dung phản hồi</span>
                  <textarea
                    rows={7}
                    value={replyState.body}
                    onChange={(event) => setReplyState((prev) => ({ ...prev, body: event.target.value }))}
                    className="w-full rounded-lg border border-[#d9bea4] bg-white px-3 py-2 text-sm text-[#3f2b20] outline-none"
                    required
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center justify-center rounded-full bg-[#8b5e3c] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSending ? "Đang gửi phản hồi..." : "Gửi phản hồi"}
                </button>
              </form>
            ) : null}

            {statusText ? <p className="mt-3 text-sm text-[#4a6a3a]">{statusText}</p> : null}
            {errorText ? <p className="mt-3 text-sm text-red-700">{errorText}</p> : null}
          </>
        )}
        </section>
      </div>

      <section className="rounded-2xl border border-[#d8bea5] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-[#4a2f20]">Nhật ký gửi mail</h2>
            <p className="mt-1 text-sm text-[#6a4b38]">Hiển thị các mail gửi từ form và phản hồi trong admin.</p>
          </div>
          <p className="text-xs text-[#8a6851]">{mailLogs.length} bản ghi gần nhất</p>
        </div>

        <div className="mt-4 space-y-2">
          {mailLogs.map((log) => (
            <article key={log.id} className="rounded-xl border border-[#ecdac7] bg-[#fffaf4] p-3 text-sm text-[#5f4332]">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#8a6851]">
                <span>{log.status || "unknown"}</span>
                <span>{formatAdminDateTime(log.sentAt)}</span>
              </div>
              <p className="mt-2 font-semibold text-[#4a2f20]">{log.subject || "(Không có tiêu đề)"}</p>
              <p className="mt-1 text-xs text-[#7b5a44]">To: {log.to || "-"}</p>
              <p className="mt-1 text-xs text-[#7b5a44]">By: {log.sentBy || "-"}</p>
              <p className="mt-1 text-xs text-[#7b5a44]">Message ID: {log.messageId || "-"}</p>
              <p className="mt-1 text-xs text-[#7b5a44]">Resend ID: {log.resendEmailId || "-"}</p>
              {log.errorMessage ? <p className="mt-2 text-xs text-red-700">Lỗi: {log.errorMessage}</p> : null}
            </article>
          ))}
          {mailLogs.length === 0 ? <p className="text-sm text-[#7b5a44]">Chưa có log gửi mail nào.</p> : null}
        </div>
      </section>
    </div>
  );
}
