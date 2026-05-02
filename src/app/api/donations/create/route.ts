import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendSheetRow, assertSheetHeaders, getSheetRows, updateSheetRowByColumn } from "@/lib/integrations/google-sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const createDonationSchema = z.object({
  donationId: z.string().trim().regex(/^DON-HT-[A-Z0-9-]+$/i, "donationId không đúng định dạng DON-HT-...").max(80, "donationId quá dài"),
  transferContent: z.string().trim().min(3, "Nội dung chuyển khoản không hợp lệ").max(260, "Nội dung chuyển khoản quá dài"),
  fullName: z.string().trim().max(120, "Họ tên quá dài").optional().or(z.literal("")),
  email: z.string().trim().email("Email không đúng định dạng").max(180, "Email quá dài").optional().or(z.literal("")),
  message: z.string().trim().max(500, "Nội dung ghi chú quá dài").optional().or(z.literal("")),
});

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
  const fullName = (payload.fullName || "").trim();
  const email = (payload.email || "").trim().toLowerCase();
  const message = (payload.message || "").trim();

  try {
    await assertSheetHeaders("DONATIONS");

    const normalizedId = normalizeDonationId(payload.donationId);
    const { rows } = await getSheetRows("DONATIONS");
    const existing = rows.find((row) => normalizeDonationId(row.values.donation_id || "") === normalizedId);

    if (existing) {
      await updateSheetRowByColumn("DONATIONS", "donation_id", existing.values.donation_id || payload.donationId, {
        display_name: fullName || existing.values.display_name || "",
        email: email || existing.values.email || "",
        transfer_content: payload.transferContent,
        message: message || existing.values.message || "",
      });

      return NextResponse.json({ ok: true, created: false, updated: true, donationId: payload.donationId });
    }

    await appendSheetRow("DONATIONS", {
      donation_id: payload.donationId,
      created_at: new Date().toISOString(),
      status: "pending",
      display_name: fullName,
      email,
      phone: "",
      amount_expected: "",
      amount_paid: "",
      bank_ref: "",
      transfer_content: payload.transferContent,
      message,
    });

    return NextResponse.json({ ok: true, created: true, donationId: payload.donationId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tạo dòng ủng hộ trên Google Sheets.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}