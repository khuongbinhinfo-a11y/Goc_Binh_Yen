"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function HonThoChatWidget() {
  const pathname = usePathname();
  const hide = useMemo(() => pathname?.startsWith("/admin") || pathname?.startsWith("/admin/login"), [pathname]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  if (hide) return null;

  async function sendMessage() {
    setStatus("");
    if (!message.trim()) return;
    setSending(true);
    try {
      const resp = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });
      const body = await resp.json();
      if (!resp.ok) {
        setStatus(body?.error || "Có lỗi khi gửi tin nhắn.");
      } else {
        setStatus(body?.reply || "Cảm ơn, Hồn Thơ đã nhận tin nhắn của bạn.");
        setMessage("");
      }
    } catch (e) {
      setStatus("Không gửi được. Vui lòng thử lại sau.");
    } finally {
      setSending(false);
    }
  }

  // Collapsed button only shows when closed; when open, show popup only.
  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          aria-label="Mở chat Hồn Thơ"
          className="fixed right-4 bottom-4 z-50 h-14 w-14 rounded-full bg-white border border-[#efe6db] shadow-md overflow-hidden flex items-center justify-center"
          style={{ boxShadow: "0 6px 18px rgba(63,43,32,0.12)" }}
        >
          <Image src="/logo.jpg" alt="Hồn Thơ" width={52} height={52} className="rounded-full object-cover" />
        </button>
      ) : (
        <div className="fixed right-4 bottom-4 z-50 w-[360px] max-w-[92vw] rounded-lg bg-white border border-[#efe6db] shadow-lg">
          <div className="flex items-center gap-3 px-3 py-2 border-b border-[#f3efe8]">
            <Image src="/logo.jpg" alt="Hồn Thơ" width={36} height={36} className="rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#3f2b20]">Hồn Thơ</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Đóng" className="text-sm text-[#7a4f32]">✕</button>
          </div>
          <div className="p-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-[#efecec] p-2 text-sm resize-none"
              placeholder="Nhập câu hỏi hoặc để lại lời nhắn..."
            />
            {status ? <div className="mt-2 text-xs text-[#4a2f20]">{status}</div> : null}
            <div className="mt-3 flex items-center">
              <button
                onClick={sendMessage}
                disabled={sending}
                className="ml-auto inline-flex items-center rounded-full bg-[#8b5e3c] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
              >
                {sending ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
