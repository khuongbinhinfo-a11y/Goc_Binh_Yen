const DEFAULT_INTERNAL_RECIPIENT = "gustavjung01@gmail.com";
const DEFAULT_FROM = "Hồn Thơ <noreply@hontho.com>";
const DEFAULT_ASSET_BASE_URL = "https://hontho.com";

const MAIL_FROM_ENV_BY_KIND = {
  default: "FORM_MAIL_FROM",
  support: "FORM_MAIL_FROM_SUPPORT",
} as const;

export type MailFromKind = keyof typeof MAIL_FROM_ENV_BY_KIND;

export type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  from?: string;
  fromKind?: MailFromKind;
};

export type SendMailResult = {
  from: string;
  to: string | string[];
  subject: string;
  resendEmailId?: string;
};

function readNonEmptyEnv(name: string) {
  const value = process.env[name]?.trim();
  return value && value.length > 0 ? value : null;
}

function normalizeAssetBaseUrl(rawUrl: string) {
  const trimmed = rawUrl.trim().replace(/\/+$/, "");
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is missing");
  }
  return apiKey;
}

export function getInternalRecipient() {
  return readNonEmptyEnv("FORM_MAIL_TO") ?? DEFAULT_INTERNAL_RECIPIENT;
}

export function getMailFromAddress(kind: MailFromKind = "default") {
  const configured = readNonEmptyEnv(MAIL_FROM_ENV_BY_KIND[kind]) ?? readNonEmptyEnv("FORM_MAIL_FROM");

  if (configured) {
    return configured;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${MAIL_FROM_ENV_BY_KIND[kind]} or FORM_MAIL_FROM is missing`);
  }

  return DEFAULT_FROM;
}

export function getMailAssetBaseUrl() {
  const configured = readNonEmptyEnv("FORM_ASSET_BASE_URL");
  return normalizeAssetBaseUrl(configured ?? DEFAULT_ASSET_BASE_URL);
}

export function buildMailBrandHeaderHtml() {
  const baseUrl = getMailAssetBaseUrl();
  const logo = `${baseUrl}/images/brand/logo-hon-tho.png`;

  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;margin:0 0 18px 0;">
      <tr>
        <td style="padding:14px;border:1px solid #e9d7c4;border-radius:12px;background:#faf4ed;">
          <div style="padding:10px;border:1px solid #dcc3a8;border-radius:10px;background:#fffaf5;text-align:center;">
            <img src="${logo}" alt="Hồn Thơ" style="height:42px;width:auto;max-width:220px;display:inline-block;" />
          </div>
        </td>
      </tr>
    </table>
  `;
}

export async function sendMail(input: SendMailInput): Promise<SendMailResult> {
  const apiKey = getResendApiKey();
  const fromAddress = input.from?.trim() || getMailFromAddress(input.fromKind);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | { id?: string; error?: { message?: string } }
    | null;

  if (!response.ok) {
    const message = payload?.error?.message ?? `Resend request failed with status ${response.status}`;
    throw new Error(message);
  }

  if (payload?.error?.message) {
    throw new Error(payload.error.message);
  }

  return {
    from: fromAddress,
    to: input.to,
    subject: input.subject,
    resendEmailId: payload?.id,
  };
}
