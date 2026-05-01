import { NextRequest, NextResponse } from "next/server";
import { listMessages } from "@/lib/admin/messages-store";
import { getDonationById, isDonationPaid } from "@/lib/admin/donations-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeDonationId(value: string) {
  return value.trim().toLowerCase();
}

function normalizeSearchToken(value: string) {
  return value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}

export async function GET(request: NextRequest) {
  const donationIdRaw = request.nextUrl.searchParams.get("donationId") || request.nextUrl.searchParams.get("rid") || "";
  const donationId = normalizeDonationId(donationIdRaw);

  if (!donationId) {
    return NextResponse.json({ ok: false, error: "donationId is required" }, { status: 400 });
  }

  try {
    const donation = await getDonationById(donationIdRaw);
    const paidFromDonation = isDonationPaid(donation);
    if (donation && paidFromDonation) {
      return NextResponse.json({
        ok: true,
        paid: true,
        donationId: donationIdRaw,
        email: donation.email || "",
        messageId: donation.bankRef || "",
        confirmedAt: donation.bankRef || donation.amountPaid || "",
      });
    }

    const items = await listMessages();
    const expectedToken = normalizeSearchToken(donationId);
    const matched = items.find(
      (item) => {
        if (item.type !== "donation" || item.source !== "sepay-webhook") {
          return false;
        }

        const messageToken = normalizeSearchToken(item.message || "");
        return messageToken.includes(expectedToken);
      },
    );

    if (!matched) {
      return NextResponse.json({
        ok: true,
        paid: paidFromDonation,
        donationId: donationIdRaw,
        email: donation?.email || "",
        messageId: donation?.bankRef || "",
        confirmedAt: donation?.bankRef || donation?.amountPaid || "",
      });
    }

    const paid = matched.status === "closed" || matched.notes.toUpperCase().includes("PAYMENT_CONFIRMED");

    return NextResponse.json({
      ok: true,
      paid: paid || paidFromDonation,
      donationId: donationIdRaw,
      email: matched.email || donation?.email || "",
      messageId: matched.id,
      confirmedAt: matched.notes || "",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Cannot check payment status.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
