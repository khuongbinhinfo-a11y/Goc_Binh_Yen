import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiPermission } from "@/app/api/admin/_auth";
import { getIntegrationValue } from "@/lib/admin/integrations-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getStringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

async function getStoredChatbotValue(key: string) {
  return (await getIntegrationValue(key)) || "";
}

function normalizeUrl(value: string) {
  return value.replace(/\/+$/g, "");
}

function parseServiceAccountJson(jsonString: string) {
  try {
    const credentials = JSON.parse(jsonString);
    if (typeof credentials !== "object" || credentials === null) {
      throw new Error("Google Cloud Credentials JSON không hợp lệ.");
    }
    return credentials;
  } catch {
    throw new Error("Google Cloud Credentials JSON không hợp lệ.");
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
  const projectId = getStringValue(payload.projectId) || (await getStoredChatbotValue("chatbot_project_id"));
  const location = getStringValue(payload.location) || (await getStoredChatbotValue("chatbot_location")) || "global";
  const baseUrl = normalizeUrl(getStringValue(payload.baseUrl) || (await getStoredChatbotValue("chatbot_base_url")) || "https://dialogflow.googleapis.com/v3");
  const serviceAccountJson = getStringValue(payload.serviceAccountJson) || (await getStoredChatbotValue("chatbot_service_account_json"));

  if (!projectId) {
    return NextResponse.json({ ok: false, error: "Thiếu Project ID Chatbot." }, { status: 400 });
  }

  if (!serviceAccountJson) {
    return NextResponse.json({ ok: false, error: "Thiếu Google Cloud Credentials JSON." }, { status: 400 });
  }

  try {
    const credentials = parseServiceAccountJson(serviceAccountJson);
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

    const agentsUrl = `${baseUrl}/projects/${encodeURIComponent(projectId)}/locations/${encodeURIComponent(location)}/agents`;
    const response = await fetch(agentsUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Dialogflow trả lỗi ${response.status}: ${text}`);
    }

    const data = await response.json();
    const agentsList = Array.isArray(data.agents) ? data.agents : [];

    return NextResponse.json({
      ok: true,
      agents: agentsList.map((agent: Record<string, unknown>) => {
        const name = typeof agent.name === "string" ? agent.name : "";
        const displayName = typeof agent.displayName === "string" ? agent.displayName : "";
        const segments = name.split("/");
        const id = segments[segments.length - 1] || "";
        const locationSegment = segments[3] || "";
        return { id, displayName, name, location: locationSegment };
      }),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không tải được danh sách agent.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
