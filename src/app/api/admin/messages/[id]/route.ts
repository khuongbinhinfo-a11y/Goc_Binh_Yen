import { NextRequest, NextResponse } from "next/server";
import { getMessageById, updateMessageById, type AdminMessageStatus } from "@/lib/admin/messages-store";
import { requireAdminApiPermission } from "../../_auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_STATUS: AdminMessageStatus[] = ["new", "in_progress", "replied", "closed"];

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const permission = await requireAdminApiPermission(request, "message:read");
  if (!permission.ok) {
    return permission.response;
  }

  const params = await context.params;
  const id = `${params.id || ""}`.trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "Thiếu message id." }, { status: 400 });
  }

  try {
    const item = await getMessageById(id);
    if (!item) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy lời nhắn." }, { status: 404 });
    }

    return NextResponse.json({ ok: true, item });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không đọc được chi tiết lời nhắn.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const permission = await requireAdminApiPermission(request, "message:update_status");
  if (!permission.ok) {
    return permission.response;
  }

  const params = await context.params;
  const id = `${params.id || ""}`.trim();
  if (!id) {
    return NextResponse.json({ ok: false, error: "Thiếu message id." }, { status: 400 });
  }

  let body: {
    status?: AdminMessageStatus;
    assignedTo?: string;
    notes?: string;
  };

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "Payload cập nhật không hợp lệ." }, { status: 400 });
  }

  const status = body.status && ALLOWED_STATUS.includes(body.status) ? body.status : undefined;
  const assignedTo = body.assignedTo !== undefined ? `${body.assignedTo}`.trim().slice(0, 200) : undefined;
  const notes = body.notes !== undefined ? `${body.notes}`.trim().slice(0, 2000) : undefined;

  if (status === undefined && assignedTo === undefined && notes === undefined) {
    return NextResponse.json({ ok: false, error: "Không có dữ liệu cập nhật hợp lệ." }, { status: 400 });
  }

  try {
    const updated = await updateMessageById(id, {
      ...(status ? { status } : {}),
      ...(assignedTo !== undefined ? { assignedTo } : {}),
      ...(notes !== undefined ? { notes } : {}),
    });

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Không tìm thấy lời nhắn." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không cập nhật được lời nhắn.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
