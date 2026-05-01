import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendSheetRow, assertSheetHeaders, getSheetRows } from "@/lib/integrations/google-sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createDonationSchema = z.object({
  donationId: z.string().trim().min(4, "donationId không hợp lệ").max(80, "donationId quá dài"),
  transferContent: z.string().trim().min(3, "Nội dung chuyển khoản không hợp lệ").max(260, "Nội dung chuyển khoản quá dài"),
  contactIdentity: z.string().trim().max(180, "Thông tin liên hệ quá dài").optional().or(z.literal("")),
  message: z.string().trim().max(500, "Nội dung ghi chú quá dài").optional().or(z.literal("")),
});

function splitContactIdentity(identity: string) {
  const value = identity.trim();
  if (!value) {
    return { email: "", phone: "" };
  }

  if (value.includes("@")) {
    return { email: value, phone: "" };
  }

  return { email: "", phone: value };
}

function normalizeDonationId(value: string) {
  return value.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const parsed = createDonationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message || "Thiếu dữ liệu tạo ủng hộ." }, { status: 400 });
  }

  const payload = parsed.data;
  const { email, phone } = splitContactIdentity(payload.contactIdentity || "");
  const note = (payload.message || "").trim();

  try {
    await assertSheetHeaders("DONATIONS");

    const normalizedId = normalizeDonationId(payload.donationId);
    const { rows } = await getSheetRows("DONATIONS");
    const existing = rows.find((row) => normalizeDonationId(row.values.donation_id || "") === normalizedId);

    if (existing) {
      return NextResponse.json({ ok: true, created: false, donationId: payload.donationId });
    }

    await appendSheetRow("DONATIONS", {
      donation_id: payload.donationId,
      created_at: new Date().toISOString(),
      status: "pending",
      display_name: "",
      email,
      phone,
      amount_expected: "",
      amount_paid: "",
      bank_ref: "",
      transfer_content: note ? `${payload.transferContent} | MSG:${note}` : payload.transferContent,
    });

    return NextResponse.json({ ok: true, created: true, donationId: payload.donationId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo dòng ủng hộ trên Google Sheets.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}