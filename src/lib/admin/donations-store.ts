import { appendSheetRow, getSheetRows, updateSheetRowByColumn } from "@/lib/integrations/google-sheets";

export type DonationRow = {
  donationId: string;
  createdAt: string;
  status: string;
  displayName: string;
  email: string;
  phone: string;
  amountExpected: string;
  amountPaid: string;
  bankRef: string;
  transferContent: string;
};

function normalizeDonationId(value: string) {
  return value.trim().toLowerCase().replaceAll(/[^a-z0-9]/g, "");
}

function toDonationRow(record: Record<string, string>): DonationRow {
  return {
    donationId: record.donation_id || "",
    createdAt: record.created_at || "",
    status: record.status || "pending",
    displayName: record.display_name || "",
    email: record.email || "",
    phone: record.phone || "",
    amountExpected: record.amount_expected || "",
    amountPaid: record.amount_paid || "",
    bankRef: record.bank_ref || "",
    transferContent: record.transfer_content || "",
  };
}

export async function getDonationById(donationId: string) {
  const target = normalizeDonationId(donationId);
  if (!target) {
    return null;
  }

  const { rows } = await getSheetRows("DONATIONS");
  const found = rows.find((item) => normalizeDonationId(item.values.donation_id || "") === target);
  return found ? toDonationRow(found.values) : null;
}

export async function markDonationPaidById(input: {
  donationId: string;
  amountPaid: string;
  bankRef: string;
}) {
  const donation = await getDonationById(input.donationId);
  if (!donation?.donationId) {
    // Không có row → tạo mới với status=paid ngay lập tức
    await appendSheetRow("DONATIONS", {
      donation_id: input.donationId,
      created_at: new Date().toISOString(),
      status: "paid",
      display_name: "",
      email: "",
      phone: "",
      amount_expected: "",
      amount_paid: input.amountPaid,
      bank_ref: input.bankRef,
      transfer_content: "",
    });
    return true;
  }

  return updateSheetRowByColumn("DONATIONS", "donation_id", donation.donationId, {
    status: "paid",
    amount_paid: input.amountPaid,
    bank_ref: input.bankRef,
  });
}

export function isDonationPaid(donation: DonationRow | null) {
  if (!donation) {
    return false;
  }

  const status = donation.status.trim().toLowerCase();
  const amountPaid = Number((donation.amountPaid || "").replaceAll(/[^0-9.-]/g, ""));
  return status === "paid" || status === "closed" || (Number.isFinite(amountPaid) && amountPaid > 0) || donation.bankRef.trim().length > 0;
}
