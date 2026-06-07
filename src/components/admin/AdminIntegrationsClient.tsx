"use client";

import { useEffect, useState, type ChangeEvent } from "react";

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

type AgentInfo = {
  id: string;
  displayName: string;
  name: string;
  location: string;
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

function redactServiceAccountJson(rawJson: unknown) {
  if (typeof rawJson !== "object" || rawJson === null) {
    return "";
  }

  const redacted = { ...(rawJson as Record<string, unknown>) };
  if (typeof redacted.private_key === "string") {
    redacted.private_key = "***Đã ẩn***";
  }

  return JSON.stringify(redacted, null, 2);
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
  const [serviceAccountJsonRaw, setServiceAccountJsonRaw] = useState("");
  const [serviceAccountJson, setServiceAccountJson] = useState("");
  const [agentList, setAgentList] = useState<AgentInfo[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
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

  function getServiceAccountJsonToSend() {
    return serviceAccountJsonRaw || serviceAccountJson.trim();
  }

  async function loadAgents(projectIdOverride?: string, locationOverride?: string) {
    setError("");
    setStatusMessage("");
    setLoadingAgents(true);
    setAgentList([]);

    const projectId = projectIdOverride || chatbotConfig.projectId;
    const location = locationOverride || chatbotConfig.location;

    try {
      const payload = {
        projectId,
        location,
        serviceAccountJson: getServiceAccountJsonToSend() || undefined,
      };

      const response = await fetch("/api/admin/integrations/chatbot/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Không tải được danh sách agent.");
      }
      setAgentList(Array.isArray(result.agents) ? result.agents : []);
      setStatusMessage("Danh sách Agent đã được tải.");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Không tải được danh sách agent.");
    } finally {
      setLoadingAgents(false);
    }
  }

  async function handleServiceAccountFile(event: ChangeEvent<HTMLInputElement>) {
    setError("");
    setStatusMessage("");
    setAgentList([]);

    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const trimmed = JSON.stringify(parsed, null, 2);
      const redacted = redactServiceAccountJson(parsed);

      setServiceAccountJsonRaw(trimmed);
      setServiceAccountJson(redacted);

      const parsedProjectId = chatbotConfig.projectId || (typeof parsed.project_id === "string" ? parsed.project_id : "");
      if (!chatbotConfig.projectId && parsedProjectId) {
        setChatbotConfig((current) => ({ ...current, projectId: parsedProjectId }));
      }

      setStatusMessage("Đã đọc file JSON. Project ID tự động điền nếu trống.");

      if (parsedProjectId) {
        await loadAgents(parsedProjectId, chatbotConfig.location);
      }
    } catch (parseError) {
      setError(parseError instanceof Error ? parseError.message : "Không đọc được file JSON.");
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

      const credentialsJson = getServiceAccountJsonToSend();
      if (credentialsJson) {
        payloadBody.chatbot.serviceAccountJson = credentialsJson;
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
      if (credentialsJson) {
        setChatbotConfig((current) => ({ ...current, hasServiceAccountJson: true }));
        setServiceAccountJson("");
        setServiceAccountJsonRaw("");
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
            serviceAccountJson: getServiceAccountJsonToSend() || undefined,
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
                  placeholder="my-project-id"
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
                <span>Chọn file JSON service account</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleServiceAccountFile}
                  className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition file:cursor-pointer file:border-0 file:bg-[#e7d5b9] file:px-3 file:py-2 file:text-sm file:text-[#4a2f20] focus:ring"
                />
              </label>
              <label className="block text-sm text-[#5f4332] lg:col-span-2">
                <span>Google Cloud Credentials JSON</span>
                <textarea
                  value={serviceAccountJson}
                  onChange={(event) => {
                    setServiceAccountJson(event.target.value);
                    setServiceAccountJsonRaw(event.target.value);
                  }}
                  placeholder="Dán JSON service account ở đây để lưu hoặc kiểm tra kết nối"
                  rows={6}
                  className="mt-2 w-full rounded-3xl border border-[#d9bea4] bg-white px-3 py-3 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                />
              </label>
              {agentList.length > 0 ? (
                <label className="block text-sm text-[#5f4332] lg:col-span-2">
                  <span>Chọn Agent</span>
                  <select
                    value={agentList.find((agent) => agent.id === chatbotConfig.agentId)?.name || ""}
                    onChange={(event) => {
                      const selectedName = event.target.value;
                      const selectedAgent = agentList.find((agent) => agent.name === selectedName);
                      if (selectedAgent) {
                        setChatbotConfig((current) => ({ ...current, agentId: selectedAgent.id }));
                      }
                    }}
                    className="mt-2 w-full rounded-2xl border border-[#d9bea4] bg-white px-3 py-2.5 text-sm text-[#3f2b20] outline-none ring-[#9f6b45] transition focus:ring"
                  >
                    <option value="">-- Chọn Agent --</option>
                    {agentList.map((agent) => (
                      <option key={agent.name} value={agent.name}>
                        {agent.displayName}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>

            {buildInfoRow(
              "Google Credentials",
              chatbotConfig.hasServiceAccountJson ? "Đã cấu hình" : "Chưa cấu hình",
            )}

            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => loadAgents()}
                disabled={loadingAgents || !chatbotConfig.projectId || !chatbotConfig.location || !(serviceAccountJsonRaw || chatbotConfig.hasServiceAccountJson)}
                className="inline-flex items-center justify-center rounded-full bg-[#8b5e3c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#764f33] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loadingAgents ? "Đang tải danh sách..." : "Tải danh sách Agent"}
              </button>
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
                disabled={testingChatbot || !chatbotConfig.projectId || !chatbotConfig.location || !chatbotConfig.agentId || !(serviceAccountJsonRaw || chatbotConfig.hasServiceAccountJson)}
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
