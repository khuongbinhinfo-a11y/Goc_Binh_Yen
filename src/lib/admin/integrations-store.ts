import { google } from "googleapis";

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is missing`);
  }
  return value;
}

function normalizePrivateKey(rawValue: string) {
  return rawValue.replace(/\\n/g, "\n").trim();
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

function getSpreadsheetId() {
  return requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
}

const SHEET_NAME = "INTEGRATIONS";

export async function ensureIntegrationsSheetReady() {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const read = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_NAME}!A:Z` });
  const values = (read.data.values ?? []) as string[][];

  if (values.length === 0) {
    // create header row: key, value
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: "RAW",
      requestBody: { values: [["key", "value"]] },
    });
  }
}

export async function listIntegrationRows(): Promise<Array<{ key: string; value: string }>> {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_NAME}!A:Z` });
  const values = (resp.data.values ?? []) as string[][];
  if (values.length <= 1) return [];
  const rows = values.slice(1).map((r) => ({ key: `${r[0] ?? ""}`.trim(), value: `${r[1] ?? ""}`.trim() }));
  return rows.filter((r) => r.key !== "");
}

export async function getIntegrationValue(key: string) {
  const rows = await listIntegrationRows();
  const found = rows.find((r) => r.key === key);
  return found ? found.value : null;
}

export async function setIntegrationValue(key: string, value: string) {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_NAME}!A:Z` });
  const values = (resp.data.values ?? []) as string[][];

  if (values.length === 0) {
    // create header and append
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: "RAW",
      requestBody: { values: [["key", "value"], [key, value]] },
    });
    return;
  }

  const rows = values.slice(1);
  const foundIndex = rows.findIndex((r) => `${r[0] ?? ""}`.trim() === key);
  if (foundIndex === -1) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: "RAW",
      requestBody: { values: [[key, value]] },
    });
    return;
  }

  const rowIndex = foundIndex + 2; // header + 1-based
  const newRow = [key, value];
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_NAME}!A${rowIndex}:B${rowIndex}`,
    valueInputOption: "RAW",
    requestBody: { values: [newRow] },
  });
}

export async function getTelegramConfig() {
  // returns token, defaultChatId, notifyOnWebsiteMessage, notifyOnDonationPaid
  const token = (await getIntegrationValue("telegram_bot_token")) || process.env.TELEGRAM_BOT_TOKEN || "";
  const chatId = (await getIntegrationValue("telegram_default_chat_id")) || process.env.TELEGRAM_DEFAULT_CHAT_ID || "";
  const notifyOnWebsite = ((await getIntegrationValue("telegram_notify_on_website_message")) || "false") === "true";
  const notifyOnDonation = ((await getIntegrationValue("telegram_notify_on_donation_paid")) || "false") === "true";

  return {
    token,
    chatId,
    notifyOnWebsite,
    notifyOnDonation,
  };
}
