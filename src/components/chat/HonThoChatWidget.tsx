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

  return (
    <div>
      {open ? (
        <div className="fixed right-4 bottom-20 z-50 w-[340px] max-w-[90vw] rounded-lg border border-[#e7d5b9] bg-white shadow-lg">
          <div className="flex items-center gap-3 border-b border-[#efe1cf] px-4 py-3">
            <Image src="/logo.jpg" alt="Hồn Thơ" width={40} height={40} className="rounded-full object-cover" />
            <div>
              <div className="font-semibold">Hồn Thơ</div>
              <div className="text-xs text-[#6a4b38]">Bạn cần hỏi về thơ, bài viết, ủng hộ hoặc liên hệ?</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Đóng" className="ml-auto text-sm text-[#7a4f32]">Đóng</button>
          </div>
          <div className="p-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-gray-200 p-2 text-sm"
              placeholder="Nhập câu hỏi hoặc để lại lời nhắn..."
            />

            {status ? <div className="mt-2 text-xs text-[#4a2f20]">{status}</div> : null}

            <div className="mt-3 flex gap-2">
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
      ) : null}

      <button
        onClick={() => setOpen((s) => !s)}
        aria-label="Mở chat Hồn Thơ"
        className="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full bg-[#fffaf5] border border-[#e7d5b9] px-4 py-2 shadow-lg"
      >
        <Image src="/logo.jpg" alt="Hồn Thơ" width={36} height={36} className="rounded-full object-cover" />
        <span className="hidden sm:inline-block text-sm font-medium text-[#4a2f20]">Hỏi Hồn Thơ</span>
      </button>
    </div>
  );
}
