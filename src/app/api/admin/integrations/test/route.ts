import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { requireAdminApiPermission } from "@/app/api/admin/_auth";
import { getIntegrationValue } from "@/lib/admin/integrations-store";
import { sendTelegramNotification } from "@/lib/integrations/telegram";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
}

async function getStoredChatbotValue(key: string) {
  return (await getIntegrationValue(key)) || "";
}

export async function POST(request: NextRequest) {
  const permission = await requireAdminApiPermission(request, "message:read");
  if (!permission.ok) {
    return permission.response;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const payload = body as Record<string, unknown>;
  const type = getStringValue(payload.type);

  if (type === "telegram") {
    const sent = await sendTelegramNotification({ text: "Kiểm tra Telegram Hồn Thơ", kind: "test" });
    if (!sent) {
      return NextResponse.json({ ok: false, error: "Không gửi được tin nhắn kiểm tra Telegram." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  if (type === "chatbot") {
    const chatbotPayload = (payload.chatbot as Record<string, unknown>) || {};
    const baseUrl = getStringValue(chatbotPayload.baseUrl) || (await getStoredChatbotValue("chatbot_base_url")) || "https://dialogflow.googleapis.com/v3";
    const projectId = getStringValue(chatbotPayload.projectId) || (await getStoredChatbotValue("chatbot_project_id"));
    const location = getStringValue(chatbotPayload.location) || (await getStoredChatbotValue("chatbot_location")) || "global";
    const agentId = getStringValue(chatbotPayload.agentId) || (await getStoredChatbotValue("chatbot_agent_id"));
    const serviceAccountJson = getStringValue(chatbotPayload.serviceAccountJson) || (await getStoredChatbotValue("chatbot_service_account_json"));

    if (!projectId) {
      return NextResponse.json({ ok: false, error: "Thiếu Project ID Chatbot." }, { status: 400 });
    }
    if (!location) {
      return NextResponse.json({ ok: false, error: "Thiếu Location Chatbot." }, { status: 400 });
    }
    if (!agentId) {
      return NextResponse.json({ ok: false, error: "Thiếu Agent ID Chatbot." }, { status: 400 });
    }
    if (!serviceAccountJson) {
      return NextResponse.json({ ok: false, error: "Thiếu Google Cloud service account JSON." }, { status: 400 });
    }

    try {
      let credentials: Record<string, unknown>;
      try {
        credentials = JSON.parse(serviceAccountJson);
      } catch {
        throw new Error("Google Cloud Credentials JSON không hợp lệ.");
      }

      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
      });

      const authClient = await auth.getClient();
      const tokenResponse = await authClient.getAccessToken();
      const accessToken = typeof tokenResponse === "string" ? tokenResponse : tokenResponse?.token;
      if (!accessToken) {
        throw new Error("Không lấy được access token Google.");
      }

      const agentUrl = `${normalizeUrl(baseUrl)}/projects/${encodeURIComponent(projectId)}/locations/${encodeURIComponent(location)}/agents/${encodeURIComponent(agentId)}`;
      const response = await fetch(agentUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Dialogflow trả lỗi ${response.status}: ${text}`);
      }

      return NextResponse.json({ ok: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Không kiểm tra được Chatbot.";
      return NextResponse.json({ ok: false, error: message }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: false, error: "Loại kiểm tra không hợp lệ." }, { status: 400 });
}
