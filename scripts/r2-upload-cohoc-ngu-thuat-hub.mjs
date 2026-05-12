import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const root = resolve(process.cwd());

const FILES = [
  "ngu-thuat-hero.png",
  "son-card-bg.png",
  "y-card-bg.png",
  "boc-card-bg.png",
  "menh-card-bg.png",
  "tuong-card-bg.png",
];

const R2_KEY_PREFIX = "images/articles/huyen-mon-tham-khao/ngu-thuat";

/** Thư mục chứa đúng 6 file PNG (trên máy hiện tại các file nằm cùng cấp `co-hoc/`, không phải `co-hoc/ngu-thuat/`). */
const DEFAULT_SOURCE_DIR =
  "F:\\1_A_Disk_D\\khuong-binh\\hồn Thơ\\audio-backup-20260507-222627\\co-hoc";

function loadDotEnvLocal() {
  const envPath = resolve(root, ".env.local");
  let raw = "";
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    return;
  }

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

function imageMimeType(filePath) {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

loadDotEnvLocal();

const dryRun = process.argv.includes("--dry-run");
const sourceDir = (process.env.COHOC_NGU_THUAT_HUB_DIR ?? DEFAULT_SOURCE_DIR).trim();

const endpoint = (process.env.R2_S3_ENDPOINT ?? "").trim().replace(/\/+$/, "");
const bucket = (process.env.R2_BUCKET ?? "").trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID ?? "").trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY ?? "").trim();
const publicDevUrl = (process.env.R2_PUBLIC_DEV_URL ?? "").trim().replace(/\/+$/, "");

const missingEnv = [
  ["R2_S3_ENDPOINT", endpoint],
  ["R2_BUCKET", bucket],
  ["R2_ACCESS_KEY_ID", accessKeyId],
  ["R2_SECRET_ACCESS_KEY", secretAccessKey],
  ["R2_PUBLIC_DEV_URL", publicDevUrl],
].filter(([, value]) => !value);

if (!dryRun && missingEnv.length > 0) {
  throw new Error(`Missing required env: ${missingEnv.map(([name]) => name).join(", ")}`);
}

if (!existsSync(sourceDir)) {
  throw new Error(`Source folder not found: ${sourceDir}`);
}

for (const name of FILES) {
  const abs = join(sourceDir, name);
  if (!existsSync(abs)) {
    throw new Error(`Missing file: ${abs}`);
  }
}

if (dryRun) {
  console.log("Dry run: COHOC_NGU_THUAT_HUB_DIR =", sourceDir);
  for (const name of FILES) {
    console.log(`  ${R2_KEY_PREFIX}/${name}`);
  }
  process.exit(0);
}

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

for (const name of FILES) {
  const abs = join(sourceDir, name);
  const key = `${R2_KEY_PREFIX}/${name}`;
  const body = readFileSync(abs);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: imageMimeType(abs),
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  const verifyUrl = `${publicDevUrl}/${key}`;
  const response = await fetch(verifyUrl, { method: "HEAD" });
  if (!response.ok) {
    throw new Error(`HEAD failed for ${verifyUrl}: ${response.status}`);
  }

  console.log("OK", key);
}

console.log("Ngũ thuật hub (hero + 5 card): upload completed.");
