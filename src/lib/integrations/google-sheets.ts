import { google } from "googleapis";

const REQUIRED_HEADERS = {
  MESSAGES: [
    "id",
    "created_at",
    "status",
    "type",
    "full_name",
    "email",
    "phone",
    "subject",
    "message",
    "source",
    "assigned_to",
    "last_replied_at",
    "last_reply_by",
    "notes",
  ],
  MAIL_LOGS: [
    "id",
    "message_id",
    "sent_at",
    "sent_by",
    "to",
    "subject",
    "body_text",
    "resend_email_id",
    "status",
    "error_message",
  ],
  DONATIONS: [
    "donation_id",
    "created_at",
    "status",
    "display_name",
    "email",
    "phone",
    "amount_expected",
    "amount_paid",
    "bank_ref",
    "transfer_content",
  ],
} as const;

export type RequiredSheetName = keyof typeof REQUIRED_HEADERS;

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is missing`);
  }
  return value;
}

function normalizePrivateKey(rawValue: string) {
  const key = rawValue.replace(/\\n/g, "\n").trim();
  if (!key.includes("BEGIN PRIVATE KEY")) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY must be a valid PEM private key");
  }
  return key;
}

function getSpreadsheetId() {
  return requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
}

async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    key: normalizePrivateKey(requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  await auth.authorize();
  return google.sheets({ version: "v4", auth });
}

export type SheetRow = {
  rowIndex: number;
  values: Record<string, string>;
};

export async function getSheetRows(sheetName: string): Promise<{ headers: string[]; rows: SheetRow[] }> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:ZZ`,
  });

  const values = (response.data.values ?? []) as string[][];
  const headers = (values[0] ?? []).map((item: string) => `${item}`.trim());
  const rows = values.slice(1).map((row: string[], index: number) => {
    const mapped: Record<string, string> = {};
    headers.forEach((header: string, headerIndex: number) => {
      mapped[header] = `${row[headerIndex] ?? ""}`;
    });

    return {
      rowIndex: index + 2,
      values: mapped,
    };
  });

  return { headers, rows };
}

export async function assertSheetHeaders(sheetName: RequiredSheetName) {
  const { headers } = await getSheetRows(sheetName);
  const required = REQUIRED_HEADERS[sheetName];
  const missing = required.filter((header) => !headers.includes(header));

  if (missing.length > 0) {
    throw new Error(`Sheet ${sheetName} is missing required headers: ${missing.join(", ")}`);
  }

  return headers;
}

export async function appendSheetRow(sheetName: string, row: Record<string, string>) {
  const headers = await assertSheetHeaders(sheetName as RequiredSheetName);
  const values = headers.map((header) => row[header] ?? "");

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:ZZ`,
    valueInputOption: "RAW",
    requestBody: {
      values: [values],
    },
  });
}

export async function updateSheetRowById(sheetName: RequiredSheetName, id: string, patch: Record<string, string>) {
  const { headers, rows } = await getSheetRows(sheetName);
  const target = rows.find((item) => item.values.id === id);

  if (!target) {
    return false;
  }

  const merged: Record<string, string> = {};
  headers.forEach((header) => {
    merged[header] = patch[header] ?? target.values[header] ?? "";
  });

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A${target.rowIndex}:ZZ${target.rowIndex}`,
    valueInputOption: "RAW",
    requestBody: {
      values: [headers.map((header) => merged[header] ?? "")],
    },
  });

  return true;
}
