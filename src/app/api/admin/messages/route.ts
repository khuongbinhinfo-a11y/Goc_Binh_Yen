import { NextRequest, NextResponse } from "next/server";
import { requireAdminApiPermission } from "../_auth";
import { listMailLogs, listMessages } from "@/lib/admin/messages-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const permission = await requireAdminApiPermission(request, "message:read");
  if (!permission.ok) {
    return permission.response;
  }

  try {
    const [items, mailLogs] = await Promise.all([listMessages(), listMailLogs()]);
    return NextResponse.json({ ok: true, items, mailLogs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không đọc được danh sách lời nhắn.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
