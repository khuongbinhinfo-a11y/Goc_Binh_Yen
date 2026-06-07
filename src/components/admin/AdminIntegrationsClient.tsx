"use client";

import { useEffect, useState } from "react";

type ChatbotConfig = {
  baseUrl: string;
  projectId: string;
  location: string;
  languageCode: string;
  agentId: string;
  hasServiceAccountJson: boolean;
};

type TelegramConfig = {
  botToken: string;
  defaultChatId: string;
  notifyOnWebsite: boolean;
  notifyOnDonation: boolean;
};

type IntegrationsResponse = {
  ok: boolean;
  chatbot: ChatbotConfig;
  telegram: TelegramConfig;
  error?: string;
};

function buildInfoRow(label: string, value: string) {
  return (
    <div className="mt-2 flex items-center justify-between rounded-2xl bg-[#fff4e7] px-4 py-3 text-sm text-[#6a4b38]">
      <span>{label}</span>
      <span className="font-semibold text-[#4a2f20]">{value}</span>
    </div>
  );
}

export default function AdminIntegrationsClient() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>({
    botToken: "",
    defaultChatId: "",
    notifyOnWebsite: false,
    notifyOnDonation: false,
  });
  const [chatbotConfig, setChatbotConfig] = useState<ChatbotConfig>({
    baseUrl: "https://dialogflow.googleapis.com/v3",
    projectId: "",
    location: "global",
    languageCode: "vi",
    agentId: "",
    hasServiceAccountJson: false,
  });
  const [serviceAccountJson, setServiceAccountJson] = useState("");
  const [savingTelegram, setSavingTelegram] = useState(false);
  const [testingTelegram, setTestingTelegram] = useState(false);
  const [savingChatbot, setSavingChatbot] = useState(false);
  const [testingChatbot, setTestingChatbot] = useState(false);

  useEffect(() => {
    async function loadConfig() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/integrations");
        const payload = (await response.json()) as IntegrationsResponse;
        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || "Không tải được cấu hình.");
        }

        setTelegramConfig(payload.telegram);
        setChatbotConfig(payload.chatbot);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Không tải được cấu hình.");
      } finally {
        setIsLoading(false);
      }
    }

    loadConfig();
  }, []);

  async function saveTelegramConfig() {
    setError("");
    setStatusMessage("");
    setSavingTelegram(true);

    try {
      const response = await fetch("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegram: {
            botToken: telegramConfig.botToken,
            defaultChatId: telegramConfig.defaultChatId,
            notifyOnWebsite: telegramConfig.notifyOnWebsite,
            notifyOnDonation: telegramConfig.notifyOnDonation,
          },
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Không lưu cấu hình Telegram.");
      }

      setStatusMessage("Cấu hình Telegram đã được lưu.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không lưu được cấu hình Telegram.");
    } finally {
      setSavingTelegram(false);
    }
  }

  async function testTelegram() {
    setError("");
    setStatusMessage("");
    setTestingTelegram(true);

    try {
      const response = await fetch("/api/admin/integrations/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "telegram" }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Không gửi được kiểm tra Telegram.");
      }
      setStatusMessage("Tin nhắn kiểm tra Telegram đã gửi thành công.");
    } catch (testError) {
      setError(testError instanceof Error ? testError.message : "Kiểm tra Telegram không thành công.");
    } finally {
      setTestingTelegram(false);
    }
  }

  async function saveChatbotConfig() {
    setError("");
    setStatusMessage("");
    setSavingChatbot(true);

    try {
      const payloadBody: any = {
        chatbot: {
          baseUrl: chatbotConfig.baseUrl,
          projectId: chatbotConfig.projectId,
          location: chatbotConfig.location,
          languageCode: chatbotConfig.languageCode,
          agentId: chatbotConfig.agentId,
        },
      };

      if (serviceAccountJson.trim()) {
        payloadBody.chatbot.serviceAccountJson = serviceAccountJson.trim();
      }

      const response = await fetch("/api/admin/integrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Không lưu cấu hình Chatbot.");
      }
      setStatusMessage("Cấu hình Chatbot đã được lưu.");
      if (serviceAccountJson.trim()) {
        setChatbotConfig((current) => ({ ...current, hasServiceAccountJson: true }));
        setServiceAccountJson("");
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Không lưu được cấu hình Chatbot.");
    } finally {
      setSavingChatbot(false);
    }
  }

  async function testChatbot() {
    setError("");
    setStatusMessage("");
    setTestingChatbot(true);

    try {
      const response = await fetch("/api/admin/integrations/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "chatbot",
          chatbot: {
            baseUrl: chatbotConfig.baseUrl,
            projectId: chatbotConfig.projectId,
            location: chatbotConfig.location,
            languageCode: chatbotConfig.languageCode,
            agentId: chatbotConfig.agentId,
            serviceAccountJson: serviceAccountJson.trim() || undefined,
          },
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Không kiểm tra được Chatbot.");
      }
      setStatusMessage("Kiểm tra cấu hình Chatbot thành công.");
    } catch (testError) {
      setError(testError instanceof Error ? testError.message : "Kiểm tra Chatbot không thành công.");
    } finally {
      setTestingChatbot(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-[#dcc3a8] bg-[#fffaf5] p-6">
        <h2 className="text-xl font-semibold text-[#4a2f20]">Cấu hình Tích hợp</h2>
        <p className="mt-2 text-sm text-[#6a4b38]">Thiết lập Chatbot tư vấn và Telegram thông báo cho Admin Hồn Thơ.</p>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-[#dcc3a8] bg-[#fffaf5] p-6 text-sm text-[#6a4b38]">Đang tải cấu hình...</div>
      ) : (
        <div className="space-y-6">
          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          ) : null}
          {statusMessage ? (
            <div className="rounded-3xl border border-green-200 bg-emerald-50 p-4 text-sm text-emerald-700">{statusMessage}</div>
          ) : null}

          <section className="rounded-3xl border border-[#dcc3a8] bg-[#fffaf5] p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#4a2f20]">Chatbot tư vấn Hồn Thơ</h3>
                <p className="mt-1 text-sm text-[#6a4b38]">Lưu thông tin Dialogflow và kiểm tra kết nối.</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="block text-sm text-[#5f4332]">
                <span>Dialogflow Base URL</span>
                <input
                  value={chatbotConfig.baseUrl}
                  onChange={(event) => setChatbotConfig((current) => ({ ...current, baseUrl: event.target.value }))}
                  placeholder="https://dialogflow.googleapis.com/v3"
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              <label className="block text-sm text-[#5f4332]">
                <span>Project ID</span>
                <input
                  value={chatbotConfig.projectId}
                  onChange={(event) => setChatbotConfig((current) => ({ ...current, projectId: event.target.value }))}
                  placeholder="support-498415"
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              <label className="block text-sm text-[#5f4332]">
                <span>Location</span>
                <input
                  value={chatbotConfig.location}
                  onChange={(event) => setChatbotConfig((current) => ({ ...current, location: event.target.value }))}
                  placeholder="global"
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              <label className="block text-sm text-[#5f4332]">
                <span>Language Code</span>
                <input
                  value={chatbotConfig.languageCode}
                  onChange={(event) => setChatbotConfig((current) => ({ ...current, languageCode: event.target.value }))}
                  placeholder="vi"
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              <label className="block text-sm text-[#5f4332] lg:col-span-2">
                <span>Agent ID</span>
                <input
                  value={chatbotConfig.agentId}
                  onChange={(event) => setChatbotConfig((current) => ({ ...current, agentId: event.target.value }))}
                  placeholder="agent-id"
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              <label className="block text-sm text-[#5f4332] lg:col-span-2">
                <span>Google Cloud Credentials JSON</span>
                <textarea
                  value={serviceAccountJson}
                  onChange={(event) => setServiceAccountJson(event.target.value)}
                  placeholder="Dán JSON service account ở đây để lưu hoặc kiểm tra kết nối"
                  rows={6}
                  className="mt-2 w-full rounded-3xl border border-[#d9bea4] bg-white px-3 py-3 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
            </div>

            {buildInfoRow(
              "Google Credentials",
              chatbotConfig.hasServiceAccountJson ? "Đã cấu hình" : "Chưa cấu hình",
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={saveChatbotConfig}
                disabled={savingChatbot}
                className="inline-flex items-center justify-center rounded-full bg-[#8b5e3c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {savingChatbot ? "Đang lưu..." : "Lưu Chatbot"}
              </button>
              <button
                type="button"
                onClick={testChatbot}
                disabled={testingChatbot}
                className="inline-flex items-center justify-center rounded-full border border-[#b88763] bg-white px-5 py-3 text-sm font-semibold text-[#7a4f32] transition hover:bg-[#f3e4d4] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {testingChatbot ? "Đang kiểm tra..." : "Kiểm tra Chatbot"}
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-[#dcc3a8] bg-[#fffaf5] p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#4a2f20]">Telegram thông báo Hồn Thơ</h3>
                <p className="mt-1 text-sm text-[#6a4b38]">Nhận cảnh báo lời nhắn và ủng hộ trực tiếp vào Telegram.</p>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="block text-sm text-[#5f4332]">
                <span>Bot Token</span>
                <input
                  value={telegramConfig.botToken}
                  onChange={(event) => setTelegramConfig((current) => ({ ...current, botToken: event.target.value }))}
                  placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              <label className="block text-sm text-[#5f4332]">
                <span>Chat/Channel ID</span>
                <input
                  value={telegramConfig.defaultChatId}
                  onChange={(event) => setTelegramConfig((current) => ({ ...current, defaultChatId: event.target.value }))}
                  placeholder="-1001234567890"
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              <label className="flex items-center gap-3 rounded-3xl border border-[#d9bea4] bg-[#fffaf4] px-4 py-4 text-sm text-[#5f4332]">
                <input
                  type="checkbox"
                  checked={telegramConfig.notifyOnWebsite}
                  onChange={(event) => setTelegramConfig((current) => ({ ...current, notifyOnWebsite: event.target.checked }))}
                  className="h-5 w-5 rounded border border-[#d9bea4] bg-white text-[#8b5e3c] focus:ring-[#8b5e3c]"
                />
                <span>Thông báo khi có lời nhắn website</span>
              </label>
              <label className="flex items-center gap-3 rounded-3xl border border-[#d9bea4] bg-[#fffaf4] px-4 py-4 text-sm text-[#5f4332]">
                <input
                  type="checkbox"
                  checked={telegramConfig.notifyOnDonation}
                  onChange={(event) => setTelegramConfig((current) => ({ ...current, notifyOnDonation: event.target.checked }))}
                  className="h-5 w-5 rounded border border-[#d9bea4] bg-white text-[#8b5e3c] focus:ring-[#8b5e3c]"
                />
                <span>Thông báo khi ủng hộ được xác nhận</span>
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={saveTelegramConfig}
                disabled={savingTelegram}
                className="inline-flex items-center justify-center rounded-full bg-[#8b5e3c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {savingTelegram ? "Đang lưu..." : "Lưu Telegram"}
              </button>
              <button
                type="button"
                onClick={testTelegram}
                disabled={testingTelegram}
                className="inline-flex items-center justify-center rounded-full border border-[#b88763] bg-white px-5 py-3 text-sm font-semibold text-[#7a4f32] transition hover:bg-[#f3e4d4] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {testingTelegram ? "Đang kiểm tra..." : "Test Telegram"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
