import { NextRequest, NextResponse } from "next/server";
import { listMessages } from "@/lib/admin/messages-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeDonationId(value: string) {
  return value.trim().toLowerCase();
}

export async function GET(request: NextRequest) {
  const donationIdRaw = request.nextUrl.searchParams.get("donationId") || request.nextUrl.searchParams.get("rid") || "";
  const donationId = normalizeDonationId(donationIdRaw);

  if (!donationId) {
    return NextResponse.json({ ok: false, error: "donationId is required" }, { status: 400 });
  }

  try {
    const items = await listMessages();
    const matched = items.find(
      (item) =>
        item.type === "donation" &&
        item.source === "sepay-webhook" &&
        item.message.toLowerCase().includes(donationId),
    );

    if (!matched) {
      return NextResponse.json({ ok: true, paid: false, donationId: donationIdRaw });
    }

    const paid = matched.status === "closed" || matched.notes.toUpperCase().includes("PAYMENT_CONFIRMED");

    return NextResponse.json({
      ok: true,
      paid,
      donationId: donationIdRaw,
      email: matched.email || "",
      messageId: matched.id,
      confirmedAt: matched.notes || "",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cannot check payment status.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
