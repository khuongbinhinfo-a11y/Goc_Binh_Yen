import { NextRequest, NextResponse } from "next/server";
import { listMessages } from "@/lib/admin/messages-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeRid(value: string) {
  return value.trim().toLowerCase();
}

export async function GET(request: NextRequest) {
  const ridRaw = request.nextUrl.searchParams.get("rid") || "";
  const rid = normalizeRid(ridRaw);

  if (!rid) {
    return NextResponse.json({ ok: false, error: "RID is required" }, { status: 400 });
  }

  try {
    const items = await listMessages();
    const matched = items.find(
      (item) =>
        item.type === "donation" &&
        item.source === "sepay-webhook" &&
        item.message.toLowerCase().includes(`rid: ${rid}`),
    );

    if (!matched) {
      return NextResponse.json({ ok: true, paid: false, rid: ridRaw });
    }

    const paid = matched.status === "closed" || matched.notes.toUpperCase().includes("PAYMENT_CONFIRMED");

    return NextResponse.json({
      ok: true,
      paid,
      rid: ridRaw,
      email: matched.email || "",
      messageId: matched.id,
      confirmedAt: matched.notes || "",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cannot check payment status.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
