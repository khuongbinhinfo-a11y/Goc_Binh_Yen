import { getTelegramConfig } from "@/lib/admin/integrations-store";

type TelegramNotificationKind = "website" | "donation" | "test";

export async function sendTelegramNotification(options: { chatId?: string; text: string; kind?: TelegramNotificationKind }) {
  try {
    const cfg = await getTelegramConfig();
    const token = cfg.token;
    const chatId = options.chatId || cfg.chatId;
    const kind = options.kind || "website";

    if (kind === "website" && !cfg.notifyOnWebsite) {
      console.info("[telegram] website notifications disabled, skipping notification");
      return false;
    }

    if (kind === "donation" && !cfg.notifyOnDonation) {
      console.info("[telegram] donation notifications disabled, skipping notification");
      return false;
    }

    if (!token || !chatId) {
      console.warn("[telegram] missing token or chatId, skipping notification");
      return false;
    }

    const url = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`;
    const body = {
      chat_id: chatId,
      text: options.text,
      disable_web_page_preview: true,
    } as Record<string, unknown>;

    const fetchFn = typeof fetch !== "undefined" ? fetch : (globalThis as any).fetch;
    const resp = await fetchFn(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const txt = await resp.text();
      console.error("[telegram] send failed:", resp.status, txt);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[telegram] send error:", error);
    return false;
  }
}
