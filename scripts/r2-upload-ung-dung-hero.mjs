import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const root = resolve(process.cwd());

const SOURCE_FILE = resolve(root, "ung-dung-va-gioi-han-hero.png");
const R2_KEY = "images/articles/huyen-mon-tham-khao/ung-dung-va-gioi-han/ung-dung-va-gioi-han-hero.png";

function loadDotEnvLocal() {
  const envPath = resolve(root, ".env.local");
  let raw = "";
  try { raw = readFileSync(envPath, "utf8"); } catch { return; }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index <= 0) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnvLocal();

const endpoint = (process.env.R2_S3_ENDPOINT ?? "").trim().replace(/\/+$/, "");
const bucket = (process.env.R2_BUCKET ?? "").trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID ?? "").trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY ?? "").trim();
const publicDevUrl = (process.env.R2_PUBLIC_DEV_URL ?? "").trim().replace(/\/+$/, "");

const missing = [
  ["R2_S3_ENDPOINT", endpoint],
  ["R2_BUCKET", bucket],
  ["R2_ACCESS_KEY_ID", accessKeyId],
  ["R2_SECRET_ACCESS_KEY", secretAccessKey],
  ["R2_PUBLIC_DEV_URL", publicDevUrl],
].filter(([, v]) => !v);

if (missing.length > 0) {
  throw new Error(`Missing env: ${missing.map(([k]) => k).join(", ")}`);
}

if (!existsSync(SOURCE_FILE)) {
  throw new Error(`Source file not found: ${SOURCE_FILE}`);
}

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

const body = readFileSync(SOURCE_FILE);

await s3.send(new PutObjectCommand({
  Bucket: bucket,
  Key: R2_KEY,
  Body: body,
  ContentType: "image/png",
  CacheControl: "public, max-age=31536000, immutable",
}));

const verifyUrl = `${publicDevUrl}/${R2_KEY}`;
const response = await fetch(verifyUrl, { method: "HEAD" });
if (!response.ok) {
  throw new Error(`HEAD verify failed: ${verifyUrl} => ${response.status}`);
}

console.log("OK", R2_KEY);
console.log("Verified:", verifyUrl);
