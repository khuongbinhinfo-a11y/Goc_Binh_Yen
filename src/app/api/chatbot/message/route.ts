import { NextRequest, NextResponse } from "next/server";
import { createIncomingMessage } from "@/lib/admin/messages-store";
import { getIntegrationValue } from "@/lib/admin/integrations-store";
import { sendTelegramNotification } from "@/lib/integrations/telegram";
import { google } from "googleapis";

export const runtime = "nodejs";

function getString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function normalizeUrl(value: string) {
  return value.replace(/\/+$/, "");
}

async function callDialogflow(params: {
  baseUrl: string;
  projectId: string;
  location: string;
  agentId: string;
  sessionId?: string;
  languageCode?: string;
  serviceAccountJson: string;
  message: string;
}) {
  const { baseUrl, projectId, location, agentId, sessionId, languageCode = "vi", serviceAccountJson, message } = params;

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

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const accessToken = typeof tokenResponse === "string" ? tokenResponse : tokenResponse?.token;
  if (!accessToken) throw new Error("Không lấy được access token Google.");

  const usedSessionId = sessionId || `web-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const url = `${normalizeUrl(baseUrl)}/projects/${encodeURIComponent(projectId)}/locations/${encodeURIComponent(location)}/agents/${encodeURIComponent(agentId)}/sessions/${encodeURIComponent(usedSessionId)}:detectIntent`;

  const controller = new AbortController();
  const timeoutMs = 10000; // 10s timeout
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  let resp;
  try {
    resp = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        queryInput: {
          text: { text: message },
          languageCode,
        },
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Dialogflow trả lỗi ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  const reply =
    data?.queryResult?.responseMessages?.find((m: any) => m.text)?.text?.text?.[0] ||
    data?.queryResult?.fulfillmentText ||
    "";

  return reply;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const payload = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const message = getString(payload.message);
  const clientSessionId = getString(payload.sessionId) || "";
  const fullName = getString(payload.name) || "";
  const email = getString(payload.email) || "";

  if (!message) {
    return NextResponse.json({ ok: false, error: "Tin nhắn không được để trống." }, { status: 400 });
  }

  try {
    await createIncomingMessage({
      fullName: fullName || "Khách",
      email,
      subject: "Tin nhắn từ chat popup",
      message,
      source: "hontho_chat_widget",
    });
  } catch (err) {
    console.error("createIncomingMessage failed:", err);
  }

  const baseUrl = (await getIntegrationValue("chatbot_base_url")) || "https://dialogflow.googleapis.com/v3";
  const projectId = (await getIntegrationValue("chatbot_project_id")) || "";
  const location = (await getIntegrationValue("chatbot_location")) || "global";
  const agentId = (await getIntegrationValue("chatbot_agent_id")) || "";
  const serviceAccountJson = (await getIntegrationValue("chatbot_service_account_json")) || "";
  const languageCode = (await getIntegrationValue("chatbot_language_code")) || "vi";

  const fallbackReply =
    "Hồn Thơ đã nhận lời nhắn của anh/chị. Anh/chị có thể để lại email hoặc số điện thoại để chúng tôi phản hồi sớm.";

  if (!projectId || !location || !agentId || !serviceAccountJson) {
    // not configured for Dialogflow/AI
    try {
      await sendTelegramNotification({ text: `Tin nhắn website: ${message.slice(0, 200)}`, kind: "website" });
    } catch (e) {
      console.error("Telegram notification failed:", e);
    }
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  if (projectId && location && agentId && serviceAccountJson) {
    try {
      const reply = await callDialogflow({
        baseUrl,
        projectId,
        location,
        agentId,
        sessionId: clientSessionId || undefined,
        languageCode,
        serviceAccountJson,
        message,
      });
      try {
        await sendTelegramNotification({ text: `Tin nhắn website: ${message.slice(0, 200)}`, kind: "website" });
      } catch (e) {
        console.error("Telegram notification failed:", e);
      }
      return NextResponse.json({ ok: true, reply: reply || fallbackReply });
    } catch (err) {
      console.error("Dialogflow call failed:", err instanceof Error ? err.message : err);
      try {
        await sendTelegramNotification({ text: `Tin nhắn website: ${message.slice(0, 200)}`, kind: "website" });
      } catch (e) {
        console.error("Telegram notification failed:", e);
      }
      return NextResponse.json({ ok: true, reply: fallbackReply });
    }
  }

  try {
    await sendTelegramNotification({ text: `Tin nhắn website: ${message.slice(0, 200)}`, kind: "website" });
  } catch (e) {
    console.error("Telegram notification failed:", e);
  }

  return NextResponse.json({ ok: true, reply: fallbackReply });
}
