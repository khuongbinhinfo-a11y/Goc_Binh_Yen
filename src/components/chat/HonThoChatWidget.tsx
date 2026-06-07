"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

import { LOCAL_IMAGE_MAP } from "@/lib/image";

type ChatRole = "assistant" | "user";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  pending?: boolean;
};

const CHAT_TITLE = "Trợ lý Hồn Thơ";
const CHAT_SUBTITLE = "";
const CHAT_GREETING =
  "Xin chào, mình là trợ lý của Hồn Thơ. Anh/chị cứ nhắn ngắn gọn điều mình cần nhé.";
const CHAT_FALLBACK =
  "Cảm ơn anh/chị đã nhắn. Nếu cần, anh/chị có thể để lại số điện thoại hoặc email, chúng tôi sẽ phản hồi sớm.";
const QUICK_PROMPTS = [
  "Mình muốn hỏi thêm về nội dung trên website",
  "Mình cần để lại lời nhắn cho quản trị",
  "Mình muốn được hỗ trợ nhanh",
];

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-0.5">
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#b78662]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#b78662]" style={{ animationDelay: "120ms" }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-[#b78662]" style={{ animationDelay: "240ms" }} />
    </span>
  );
}

function AvatarCircle({
  size,
  alt,
  src,
  fallbackLabel,
  avatarError,
  onError,
  className = "",
}: {
  size: number;
  alt: string;
  src: string;
  fallbackLabel: string;
  avatarError: boolean;
  onError: () => void;
  className?: string;
}) {
  return (
    <span
      className={`relative shrink-0 overflow-hidden rounded-full bg-[#8b5e3c] ${className}`}
      style={{ width: size, height: size }}
    >
      {!avatarError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover object-center"
          onError={onError}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
          {fallbackLabel}
        </span>
      )}
    </span>
  );
}

export default function HonThoChatWidget() {
  const pathname = usePathname();
  const hide = useMemo(() => pathname?.startsWith("/admin") || pathname?.startsWith("/admin/login"), [pathname]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "welcome", role: "assistant", text: CHAT_GREETING },
  ]);
  const [avatarError, setAvatarError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const sessionId = useMemo(() => `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  if (hide) return null;

  function replaceAssistantMessage(id: string, text: string) {
    setMessages((current) =>
      current.map((item) =>
        item.id === id ? { ...item, text, pending: false } : item,
      ),
    );
  }

  async function submitMessage(rawText: string) {
    const trimmed = rawText.trim();
    if (!trimmed || sending) return;

    if (!open) setOpen(true);
    setMessage("");

    const userId = createMessageId();
    const assistantId = createMessageId();

    setMessages((current) => [
      ...current,
      { id: userId, role: "user", text: trimmed },
      { id: assistantId, role: "assistant", text: "Đang trả lời...", pending: true },
    ]);
    setSending(true);

    try {
      const resp = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId }),
      });

      const body = await resp.json().catch(() => ({} as Record<string, unknown>));
      const replyText =
        resp.ok && typeof body.reply === "string" && body.reply.trim()
          ? body.reply.trim()
          : CHAT_FALLBACK;

      replaceAssistantMessage(assistantId, replyText);
    } catch {
      replaceAssistantMessage(assistantId, CHAT_FALLBACK);
    } finally {
      setSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(message);
  }

  function handlePrompt(prompt: string) {
    void submitMessage(prompt);
  }

  const avatarSrc = LOCAL_IMAGE_MAP.chatAvatar.src;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Mở chat Hồn Thơ"
          className="group flex items-center gap-3 rounded-full border border-[#ead7c4] bg-white/95 px-3 py-2.5 shadow-[0_18px_50px_rgba(78,50,33,0.18)] backdrop-blur transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(78,50,33,0.22)]"
        >
          <AvatarCircle
            size={48}
            alt={CHAT_TITLE}
            src={avatarSrc}
            fallbackLabel="HT"
            avatarError={avatarError}
            onError={() => setAvatarError(true)}
          />
            <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#a07b62]">
              Chat hỗ trợ
            </span>
            <span className="block truncate text-sm font-semibold text-[#4a2f20]">{CHAT_TITLE}</span>
          </span>
        </button>
      ) : (
        <div className="w-[calc(100vw-1.5rem)] max-w-[420px] overflow-hidden rounded-[28px] border border-[#ead7c4] bg-[#fffaf6] shadow-[0_28px_80px_rgba(78,50,33,0.24)]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#5f371f] via-[#7d5135] to-[#a26d46] px-4 py-4 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_40%)]" />
            <div className="relative flex items-start gap-3">
              <AvatarCircle
                size={48}
                alt={CHAT_TITLE}
                src={avatarSrc}
                fallbackLabel="HT"
                avatarError={avatarError}
                onError={() => setAvatarError(true)}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-sm font-semibold">{CHAT_TITLE}</h2>
                  <span className="inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white/90">
                    Hoạt động
                  </span>
                </div>
                {CHAT_SUBTITLE ? <p className="mt-1 text-xs leading-5 text-white/80">{CHAT_SUBTITLE}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Đóng chat"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition hover:bg-white/18"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex max-h-[min(78vh,640px)] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <div className="rounded-3xl border border-[#ecd9c7] bg-white px-4 py-3 text-xs leading-5 text-[#6a4b38]">
                Gửi tin nhắn để trò chuyện nhanh. Khi cần, nội dung vẫn được chuyển qua Telegram nội bộ để đội hỗ trợ theo dõi.
              </div>

              {messages.map((item) => (
                <div key={item.id} className={`flex items-end gap-2 ${item.role === "user" ? "justify-end" : "justify-start"}`}>
                  {item.role === "assistant" ? (
                    <AvatarCircle
                      size={28}
                      alt={CHAT_TITLE}
                      src={avatarSrc}
                      fallbackLabel="HT"
                      avatarError={avatarError}
                      onError={() => setAvatarError(true)}
                      className="mb-1"
                    />
                  ) : null}
                  <div
                    className={[
                      "max-w-[82%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm",
                      item.role === "user"
                        ? "rounded-br-md bg-[#8b5e3c] text-white"
                        : "rounded-bl-md border border-[#ecd8c5] bg-white text-[#4a2f20]",
                    ].join(" ")}
                  >
                    {item.pending ? <TypingDots /> : <span className="whitespace-pre-wrap">{item.text}</span>}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handlePrompt(prompt)}
                    disabled={sending}
                    className="rounded-full border border-[#e2c7ad] bg-[#fff8f0] px-3 py-2 text-left text-xs font-medium text-[#6a4b38] transition hover:bg-[#f8eadb] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div ref={endRef} />
            </div>

            <form onSubmit={handleSubmit} className="border-t border-[#eddcca] bg-white/85 p-3 backdrop-blur">
              <label className="sr-only" htmlFor="hontho-chat-input">
                Tin nhắn cho trợ lý Hồn Thơ
              </label>
              <div className="flex items-end gap-2">
                <input
                  ref={inputRef}
                  id="hontho-chat-input"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  enterKeyHint="send"
                  autoComplete="off"
                  placeholder="Nhập tin nhắn..."
                  className="h-12 flex-1 rounded-2xl border border-[#dcc4ae] bg-[#fffdf9] px-4 text-sm text-[#3f2b20] outline-none transition placeholder:text-[#b4937e] focus:border-[#b78662] focus:ring-2 focus:ring-[#f1e2d5]"
                />
                <button
                  type="submit"
                  disabled={sending || !message.trim()}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#8b5e3c] text-white transition hover:bg-[#7b5135] disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Gửi tin nhắn"
                >
                  {sending ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13" />
                      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-5 text-[#9a7a63]">
                AI trả lời tự động theo cấu hình admin. Nếu cần, nội dung sẽ được chuyển qua Telegram nội bộ.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
