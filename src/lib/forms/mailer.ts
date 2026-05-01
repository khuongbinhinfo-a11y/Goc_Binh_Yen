const DEFAULT_INTERNAL_RECIPIENT = "gustavjung01@gmail.com";
const DEFAULT_FROM = "Hon Tho <noreply@hontho.com>";
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

function stripDiacritics(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function normalizeMailFromAddress(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/^\s*"?([^"<]*)"?\s*<([^>]+)>\s*$/);

  if (!match) {
    return trimmed;
  }

  const displayName = match[1].trim();
  const email = match[2].trim();
  if (!displayName) {
    return email;
  }

  const safeName = /^[\x00-\x7F]+$/.test(displayName) ? displayName : stripDiacritics(displayName);
  return `${safeName} <${email}>`;
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
    return normalizeMailFromAddress(configured);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${MAIL_FROM_ENV_BY_KIND[kind]} or FORM_MAIL_FROM is missing`);
  }

  return normalizeMailFromAddress(DEFAULT_FROM);
}

export function getMailAssetBaseUrl() {
  const configured = readNonEmptyEnv("FORM_ASSET_BASE_URL");
  return normalizeAssetBaseUrl(configured ?? DEFAULT_ASSET_BASE_URL);
}

export function buildMailBrandHeaderHtml() {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;margin:0 0 18px 0;">
      <tr>
        <td style="padding:14px;border:1px solid #e9d7c4;border-radius:12px;background:#faf4ed;">
          <div style="padding:18px 12px;border:1px solid #dcc3a8;border-radius:10px;background:#fffaf5;text-align:center;">
            <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1;letter-spacing:0.18em;font-weight:700;color:#7a4f32;text-transform:uppercase;">Hon Tho</div>
            <div style="margin-top:10px;font-family:Georgia,'Times New Roman',serif;font-size:13px;line-height:1.6;color:#6a4b38;">Nơi câu chữ và giọng đọc cất lên giữa sắc chiều quê hương.</div>
          </div>
        </td>
      </tr>
    </table>
  `;
}

export function wrapMailBodyHtml(contentHtml: string) {
  return `${buildMailBrandHeaderHtml()}<div style="font-family:Georgia,'Times New Roman',serif;line-height:1.8;color:#3f2b20;font-size:16px;">${contentHtml}</div>`;
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
