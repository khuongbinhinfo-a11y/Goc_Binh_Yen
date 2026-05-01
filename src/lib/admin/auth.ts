import type { NextRequest } from "next/server";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const SESSION_VERSION = "v1";

export type AdminRole = "admin" | "support" | "editor" | "viewer";

export type AdminPermission =
  | "mail:read"
  | "mail:reply"
  | "message:read"
  | "message:update_status"
  | "content:read"
  | "content:write";

export type AdminSession = {
  email: string;
  role: AdminRole;
  permissions: AdminPermission[];
};

type SessionPayload = AdminSession & {
  version: typeof SESSION_VERSION;
  exp: number;
};

const PERMISSIONS_BY_ROLE: Record<AdminRole, AdminPermission[]> = {
  admin: ["mail:read", "mail:reply", "message:read", "message:update_status", "content:read", "content:write"],
  support: ["mail:read", "mail:reply", "message:read", "message:update_status"],
  editor: ["content:read", "content:write", "message:read"],
  viewer: ["message:read", "content:read"],
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function encodeBase64(value: Uint8Array) {
  if (typeof btoa !== "function") {
    throw new Error("btoa is not available in this runtime.");
  }

  let binary = "";
  value.forEach((item) => {
    binary += String.fromCharCode(item);
  });
  return btoa(binary);
}

function decodeBase64(value: string) {
  if (typeof atob !== "function") {
    throw new Error("atob is not available in this runtime.");
  }

  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function toBase64Url(value: Uint8Array) {
  return encodeBase64(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  return decodeBase64(`${base64}${padding}`);
}

function getCryptoOrThrow() {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Web Crypto is not available in the current runtime.");
  }
  return globalThis.crypto;
}

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function getAdminCookieName() {
  return process.env.ADMIN_COOKIE_NAME?.trim() || "hontho_admin_session";
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function getAdminRoleFromEnv(): AdminRole {
  const raw = process.env.ADMIN_ROLE?.trim().toLowerCase();
  if (raw === "support" || raw === "editor" || raw === "viewer" || raw === "admin") {
    return raw;
  }
  return "admin";
}

export function getRolePermissions(role: AdminRole): AdminPermission[] {
  return [...PERMISSIONS_BY_ROLE[role]];
}

export function hasPermission(session: AdminSession, permission: AdminPermission) {
  return session.permissions.includes(permission);
}

function getAdminSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is missing");
  }
  return secret;
}

async function importSigningKey(secret: string) {
  return getCryptoOrThrow().subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

async function signPayload(payloadText: string, secret: string) {
  const key = await importSigningKey(secret);
  const signature = await getCryptoOrThrow().subtle.sign("HMAC", key, encoder.encode(payloadText));
  return toBase64Url(new Uint8Array(signature));
}

export async function createAdminSessionToken(input: { email: string; role?: AdminRole }) {
  const role = input.role ?? getAdminRoleFromEnv();
  const payload: SessionPayload = {
    email: normalizeEmail(input.email),
    role,
    permissions: getRolePermissions(role),
    version: SESSION_VERSION,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const payloadText = JSON.stringify(payload);
  const encodedPayload = toBase64Url(encoder.encode(payloadText));
  const signature = await signPayload(payloadText, getAdminSessionSecret());
  return `${encodedPayload}.${signature}`;
}

export async function getVerifiedAdminSession(token: string | undefined | null): Promise<AdminSession | null> {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  try {
    const payloadText = decoder.decode(fromBase64Url(encodedPayload));
    const payload = JSON.parse(payloadText) as Partial<SessionPayload>;

    if (
      payload.version !== SESSION_VERSION ||
      typeof payload.exp !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string" ||
      !Array.isArray(payload.permissions)
    ) {
      return null;
    }

    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    const key = await importSigningKey(getAdminSessionSecret());
    const isValid = await getCryptoOrThrow().subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(payloadText));
    if (!isValid) {
      return null;
    }

    const normalizedRole = payload.role === "admin" || payload.role === "support" || payload.role === "editor" || payload.role === "viewer"
      ? payload.role
      : "admin";

    const typedPermissions = payload.permissions.filter(
      (item): item is AdminPermission =>
        item === "mail:read" ||
        item === "mail:reply" ||
        item === "message:read" ||
        item === "message:update_status" ||
        item === "content:read" ||
        item === "content:write",
    );

    return {
      email: normalizeEmail(payload.email),
      role: normalizedRole,
      permissions: typedPermissions,
    };
  } catch {
    return null;
  }
}

export async function getAdminSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(getAdminCookieName())?.value;
  return getVerifiedAdminSession(token);
}
