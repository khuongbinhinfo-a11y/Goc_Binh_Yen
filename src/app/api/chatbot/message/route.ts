import { NextRequest, NextResponse } from "next/server";
import { createIncomingMessage } from "@/lib/admin/messages-store";
import { getIntegrationValue } from "@/lib/admin/integrations-store";
import { sendTelegramNotification } from "@/lib/integrations/telegram";
import { google } from "googleapis";

export const runtime = "nodejs";

function getString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

async function callDialogflow(params: { projectId: string; location: string; agentId: string; languageCode?: string; serviceAccountJson: string; message: string; }) {
  const { projectId, location, agentId, languageCode = "vi", serviceAccountJson, message } = params;

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

  const sessionId = `web-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;
  const url = `https://dialogflow.googleapis.com/v3/projects/${encodeURIComponent(projectId)}/locations/${encodeURIComponent(location)}/agents/${encodeURIComponent(agentId)}/sessions/${encodeURIComponent(sessionId)}:detectIntent`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      queryInput: { text: { text: message, languageCode } },
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`Dialogflow lỗi ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  const reply = data?.queryResult?.responseMessages?.find((m: any) => m.text)?.text?.text?.[0] || data?.queryResult?.fulfillmentText || "";
  return reply;
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const payload = (body && typeof body === "object") ? (body as Record<string, unknown>) : {};
  const message = getString(payload.message);
  const fullName = getString(payload.name) || "";
  const email = getString(payload.email) || "";

  if (!message) {
    return NextResponse.json({ ok: false, error: "Tin nhắn không được để trống." }, { status: 400 });
  }

  // store message for admin
  try {
    await createIncomingMessage({ fullName: fullName || "Khách", email, subject: "Tin nhắn từ chat popup", message, source: "hontho_chat_widget" });
  } catch (err) {
    // don't fail public API if storage fails; log server-side only
    console.error("createIncomingMessage failed:", err);
  }

  // load chatbot config
  const projectId = (await getIntegrationValue("chatbot_project_id")) || "";
  const location = (await getIntegrationValue("chatbot_location")) || "global";
  const agentId = (await getIntegrationValue("chatbot_agent_id")) || "";
  const serviceAccountJson = (await getIntegrationValue("chatbot_service_account_json")) || "";
  const languageCode = (await getIntegrationValue("chatbot_language_code")) || "vi";

  // attempt to call Dialogflow if configured
  if (projectId && location && agentId && serviceAccountJson) {
    try {
      const reply = await callDialogflow({ projectId, location, agentId, languageCode, serviceAccountJson, message });
      // optionally notify Telegram of the incoming message
      try {
        await sendTelegramNotification({ text: `Tin nhắn website: ${message.slice(0,200)}` });
      } catch (e) {
        // swallow telegram errors
      }

      return NextResponse.json({ ok: true, reply: reply || "Hôn Thơ đã nhận, sẽ phản hồi sớm." });
    } catch (err) {
      // if dialogflow fails, fallback gracefully
      console.error("Dialogflow call failed:", err instanceof Error ? err.message : err);
      try { await sendTelegramNotification({ text: `Tin nhắn website (Dialogflow lỗi): ${message.slice(0,200)}` }); } catch {}
      return NextResponse.json({ ok: true, reply: "Hồn Thơ chưa bật trợ lý tự động. Anh/chị có thể để lại lời nhắn, chúng tôi sẽ phản hồi sớm." });
    }
  }

  // fallback when not configured
  try { await sendTelegramNotification({ text: `Tin nhắn website: ${message.slice(0,200)}` }); } catch {}
  return NextResponse.json({ ok: true, reply: "Hồn Thơ chưa bật trợ lý tự động. Anh/chị có thể để lại lời nhắn, chúng tôi sẽ phản hồi sớm." });
}
