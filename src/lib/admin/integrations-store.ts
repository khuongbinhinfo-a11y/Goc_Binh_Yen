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

type SheetsClient = Awaited<ReturnType<typeof google.sheets>>;

let sheetsClientPromise: Promise<SheetsClient> | null = null;

async function getSheetsClient() {
  if (sheetsClientPromise) {
    return sheetsClientPromise;
  }

  sheetsClientPromise = (async () => {
    const auth = new google.auth.JWT({
      email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      key: normalizePrivateKey(requireEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    await auth.authorize();
    return google.sheets({ version: "v4", auth });
  })().catch((error) => {
    sheetsClientPromise = null;
    throw error;
  });

  return sheetsClientPromise;
}

function getSpreadsheetId() {
  return requireEnv("GOOGLE_SHEETS_SPREADSHEET_ID");
}

const SHEET_NAME = "INTEGRATIONS";
const INTEGRATIONS_HEADERS = ["key", "value"] as const;

type IntegrationHeader = typeof INTEGRATIONS_HEADERS[number];

type IntegrationRow = { key: string; value: string };

let cachedIntegrationRows: IntegrationRow[] | null = null;
let cachedIntegrationRowsAt = 0;
let inFlightIntegrationRowsPromise: Promise<IntegrationRow[]> | null = null;

function clearIntegrationRowsCache() {
  cachedIntegrationRows = null;
  cachedIntegrationRowsAt = 0;
  inFlightIntegrationRowsPromise = null;
}

function cacheIntegrationRows(rows: IntegrationRow[]) {
  cachedIntegrationRows = rows;
  cachedIntegrationRowsAt = Date.now();
}

function getCachedIntegrationRows(ttlMs = 10_000) {
  if (!cachedIntegrationRows) return null;
  if (Date.now() - cachedIntegrationRowsAt > ttlMs) return null;
  return cachedIntegrationRows;
}

async function ensureSheetExists(sheetName: string) {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();
  const workbook = await sheets.spreadsheets.get({ spreadsheetId, includeGridData: false });
  const existingSheet = workbook.data.sheets?.find((item) => item.properties?.title === sheetName);
  if (existingSheet) {
    return;
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: sheetName,
            },
          },
        },
      ],
    },
  });
}

export async function ensureIntegrationsSheetReady() {
  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  await ensureSheetExists(SHEET_NAME);

  const read = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_NAME}!A:Z` });
  const values = (read.data.values ?? []) as string[][];

  if (values.length === 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: "RAW",
      requestBody: { values: [["key", "value"]] },
    });
  }
}

export async function listIntegrationRows(): Promise<Array<{ key: string; value: string }>> {
  const cachedRows = getCachedIntegrationRows();
  if (cachedRows) {
    return cachedRows;
  }

  if (inFlightIntegrationRowsPromise) {
    return inFlightIntegrationRowsPromise;
  }

  inFlightIntegrationRowsPromise = (async () => {
    await ensureIntegrationsSheetReady();

    const sheets = await getSheetsClient();
    const spreadsheetId = getSpreadsheetId();
    const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_NAME}!A:Z` });
    const values = (resp.data.values ?? []) as string[][];
    if (values.length <= 1) {
      const emptyRows: IntegrationRow[] = [];
      cacheIntegrationRows(emptyRows);
      return emptyRows;
    }

    const rows = values
      .slice(1)
      .map((r) => ({ key: `${r[0] ?? ""}`.trim(), value: `${r[1] ?? ""}`.trim() }))
      .filter((r) => r.key !== "");

    cacheIntegrationRows(rows);
    return rows;
  })();

  try {
    return await inFlightIntegrationRowsPromise;
  } finally {
    inFlightIntegrationRowsPromise = null;
  }
}

export async function getIntegrationValue(key: string) {
  const rows = await listIntegrationRows();
  const found = rows.find((r) => r.key === key);
  return found ? found.value : null;
}

export async function setIntegrationValue(key: string, value: string) {
  await ensureIntegrationsSheetReady();

  const sheets = await getSheetsClient();
  const spreadsheetId = getSpreadsheetId();

  const resp = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${SHEET_NAME}!A:Z` });
  const values = (resp.data.values ?? []) as string[][];

  if (values.length === 0) {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${SHEET_NAME}!A:Z`,
      valueInputOption: "RAW",
      requestBody: { values: [["key", "value"], [key, value]] },
    });
    clearIntegrationRowsCache();
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
    clearIntegrationRowsCache();
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
  clearIntegrationRowsCache();
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
