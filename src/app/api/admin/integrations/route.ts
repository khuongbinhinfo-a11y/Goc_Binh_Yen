import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiPermission } from "@/app/api/admin/_auth";
import {
  getIntegrationValue,
  setIntegrationValue,
} from "@/lib/admin/integrations-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseBoolean(value: unknown) {
  return `${value ?? "false"}`.toLowerCase() === "true";
}

export async function GET(request: NextRequest) {
  const permission = await requireAdminApiPermission(request, "message:read");
  if (!permission.ok) {
    return permission.response;
  }

  try {
    const [baseUrl, projectId, location, languageCode, agentId, hasServiceAccountJson, botToken, defaultChatId, notifyOnWebsite, notifyOnDonation] = await Promise.all([
      getIntegrationValue("chatbot_base_url"),
      getIntegrationValue("chatbot_project_id"),
      getIntegrationValue("chatbot_location"),
      getIntegrationValue("chatbot_language_code"),
      getIntegrationValue("chatbot_agent_id"),
      getIntegrationValue("chatbot_service_account_json"),
      getIntegrationValue("telegram_bot_token"),
      getIntegrationValue("telegram_default_chat_id"),
      getIntegrationValue("telegram_notify_on_website_message"),
      getIntegrationValue("telegram_notify_on_donation_paid"),
    ]);

    return NextResponse.json({
      ok: true,
      chatbot: {
        baseUrl: baseUrl || "https://dialogflow.googleapis.com/v3",
        projectId: projectId || "",
        location: location || "global",
        languageCode: languageCode || "vi",
        agentId: agentId || "",
        hasServiceAccountJson: Boolean(hasServiceAccountJson),
      },
      telegram: {
        botToken: botToken || "",
        defaultChatId: defaultChatId || "",
        notifyOnWebsite: parseBoolean(notifyOnWebsite),
        notifyOnDonation: parseBoolean(notifyOnDonation),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không đọc được cấu hình tích hợp.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
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

  try {
    if (payload.telegram && typeof payload.telegram === "object") {
      const telegramPayload = payload.telegram as Record<string, unknown>;
      if (typeof telegramPayload.botToken === "string") {
        await setIntegrationValue("telegram_bot_token", telegramPayload.botToken.trim());
      }
      if (typeof telegramPayload.defaultChatId === "string") {
        await setIntegrationValue("telegram_default_chat_id", telegramPayload.defaultChatId.trim());
      }
      if (typeof telegramPayload.notifyOnWebsite !== "undefined") {
        await setIntegrationValue("telegram_notify_on_website_message", `${telegramPayload.notifyOnWebsite}`);
      }
      if (typeof telegramPayload.notifyOnDonation !== "undefined") {
        await setIntegrationValue("telegram_notify_on_donation_paid", `${telegramPayload.notifyOnDonation}`);
      }
    }

    if (payload.chatbot && typeof payload.chatbot === "object") {
      const chatbotPayload = payload.chatbot as Record<string, unknown>;
      if (typeof chatbotPayload.baseUrl === "string") {
        await setIntegrationValue("chatbot_base_url", chatbotPayload.baseUrl.trim());
      }
      if (typeof chatbotPayload.projectId === "string") {
        await setIntegrationValue("chatbot_project_id", chatbotPayload.projectId.trim());
      }
      if (typeof chatbotPayload.location === "string") {
        await setIntegrationValue("chatbot_location", chatbotPayload.location.trim());
      }
      if (typeof chatbotPayload.languageCode === "string") {
        await setIntegrationValue("chatbot_language_code", chatbotPayload.languageCode.trim());
      }
      if (typeof chatbotPayload.agentId === "string") {
        await setIntegrationValue("chatbot_agent_id", chatbotPayload.agentId.trim());
      }
      if (typeof chatbotPayload.serviceAccountJson === "string" && chatbotPayload.serviceAccountJson.trim().length > 0) {
        await setIntegrationValue("chatbot_service_account_json", chatbotPayload.serviceAccountJson.trim());
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không lưu được cấu hình tích hợp.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
