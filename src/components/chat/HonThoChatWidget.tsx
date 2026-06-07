"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";

export default function HonThoChatWidget() {
  const pathname = usePathname();
  const hide = useMemo(() => pathname?.startsWith("/admin") || pathname?.startsWith("/admin/login"), [pathname]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [reply, setReply] = useState("");

  if (hide) return null;

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!message.trim()) return;
    setReply("");
    setSending(true);

    try {
      const resp = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });
      const body = await resp.json();
      if (!resp.ok) {
        setReply("Không gửi được. Vui lòng thử lại sau.");
      } else {
        setReply(body?.reply || "Hồn Thơ đã nhận lời nhắn của anh/chị. Anh/chị có thể để lại email hoặc số điện thoại để chúng tôi phản hồi sớm.");
        setMessage("");
      }
    } catch (e) {
      setReply("Không gửi được. Vui lòng thử lại sau.");
    } finally {
      setSending(false);
    }
  }

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
        <div className="fixed right-4 bottom-4 z-50 w-[360px] max-w-[92vw] rounded-3xl bg-white border border-[#efe6db] shadow-lg">
          <div className="flex items-center gap-3 px-3 py-2 border-b border-[#f3efe8]">
            <Image src="/logo.jpg" alt="Hồn Thơ" width={34} height={34} className="rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-[#3f2b20]">Hồn Thơ</div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Đóng" className="text-sm text-[#7a4f32]">✕</button>
          </div>
          <form onSubmit={handleSend} className="p-3">
            <label className="sr-only" htmlFor="hontho-chat-input">
              Tin nhắn Hồn Thơ
            </label>
            <input
              id="hontho-chat-input"
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              enterKeyHint="send"
              autoComplete="off"
              className="w-full rounded-2xl border border-[#efecec] bg-[#fffdf9] px-3 py-3 text-sm text-[#3f2b20] outline-none transition focus:border-[#b58b65] focus:ring-2 focus:ring-[#f2e8dd]"
              placeholder="Nhập tin nhắn..."
            />
            <div className="mt-3 flex items-center gap-3">
              <button
                type="submit"
                disabled={sending}
                className="ml-auto inline-flex items-center justify-center rounded-full bg-[#8b5e3c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7a5234] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Đang gửi..." : "Gửi"}
              </button>
            </div>
            {reply ? <div className="mt-3 rounded-2xl bg-[#f8f1e8] px-3 py-3 text-sm text-[#4a2f20]">{reply}</div> : null}
          </form>
        </div>
      )}
    </div>
  );
}
