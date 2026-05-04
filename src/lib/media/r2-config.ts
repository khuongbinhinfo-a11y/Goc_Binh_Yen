import "server-only";

export type MediaProvider = "local" | "r2";

export type R2RuntimeConfig = {
  provider: MediaProvider;
  useR2Media: boolean;
  accountId?: string;
  bucket?: string;
  endpoint?: string;
  publicDevUrl?: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  prefixes: {
    audio: string;
    images: string;
    covers: string;
    video: string;
  };
};

type RequiredR2ServerConfig = {
  bucket: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
};

function normalizePrefix(value: string | undefined, fallback: string) {
  const cleaned = (value ?? fallback).trim().replace(/^\/+|\/+$/g, "");
  return cleaned || fallback;
}

function normalizeMediaProvider(value?: string): MediaProvider {
  const normalized = (value ?? "local").trim().toLowerCase();
  if (normalized === "r2") return "r2";
  return "local";
}

function toBool(value?: string) {
  const normalized = (value ?? "").trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

const provider = normalizeMediaProvider(process.env.MEDIA_PROVIDER);
const useR2Media = toBool(process.env.USE_R2_MEDIA) || provider === "r2";

const rawEndpoint = process.env.R2_S3_ENDPOINT?.trim();
const endpoint = rawEndpoint?.replace(/\/+$/, "");

const rawPublicDevUrl = process.env.R2_PUBLIC_DEV_URL?.trim();
const publicDevUrl = rawPublicDevUrl?.replace(/\/+$/, "");

export const r2Config: R2RuntimeConfig = {
  provider,
  useR2Media,
  accountId: process.env.R2_ACCOUNT_ID?.trim(),
  bucket: process.env.R2_BUCKET?.trim(),
  endpoint,
  publicDevUrl,
  accessKeyId: process.env.R2_ACCESS_KEY_ID?.trim(),
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY?.trim(),
  prefixes: {
    audio: normalizePrefix(process.env.R2_PREFIX_AUDIO, "audio"),
    images: normalizePrefix(process.env.R2_PREFIX_IMAGES, "images"),
    covers: normalizePrefix(process.env.R2_PREFIX_COVERS, "covers"),
    video: normalizePrefix(process.env.R2_PREFIX_VIDEO, "video"),
  },
};

export function isR2MediaEnabled() {
  return r2Config.useR2Media;
}

export function requireR2ServerConfig() {
  const bucket = r2Config.bucket?.trim();
  const endpoint = r2Config.endpoint?.trim();
  const accessKeyId = r2Config.accessKeyId?.trim();
  const secretAccessKey = r2Config.secretAccessKey?.trim();

  const required: RequiredR2ServerConfig = {
    bucket: requireR2EnvValue("R2_BUCKET", bucket),
    endpoint: requireR2EnvValue("R2_S3_ENDPOINT", endpoint),
    accessKeyId: requireR2EnvValue("R2_ACCESS_KEY_ID", accessKeyId),
    secretAccessKey: requireR2EnvValue("R2_SECRET_ACCESS_KEY", secretAccessKey),
  };

  return required;
}

function requireR2EnvValue(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing R2 configuration: ${name}`);
  }

  return value;
}
