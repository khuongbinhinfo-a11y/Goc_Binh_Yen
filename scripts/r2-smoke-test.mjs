import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { S3Client, ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";

const root = resolve(process.cwd());

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

loadDotEnvLocal();

const endpoint = (process.env.R2_S3_ENDPOINT ?? "").trim().replace(/\/+$/, "");
const bucket = (process.env.R2_BUCKET ?? "").trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID ?? "").trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY ?? "").trim();

const required = [
  ["R2_S3_ENDPOINT", endpoint],
  ["R2_BUCKET", bucket],
  ["R2_ACCESS_KEY_ID", accessKeyId],
  ["R2_SECRET_ACCESS_KEY", secretAccessKey],
].filter(([, value]) => !value);

if (required.length > 0) {
  const names = required.map(([name]) => name).join(", ");
  throw new Error(`Missing required env in server context: ${names}`);
}

const prefixAudio = (process.env.R2_PREFIX_AUDIO ?? "audio").trim().replace(/^\/+|\/+$/g, "") || "audio";
const prefixImages = (process.env.R2_PREFIX_IMAGES ?? "images").trim().replace(/^\/+|\/+$/g, "") || "images";
const prefixCovers = (process.env.R2_PREFIX_COVERS ?? "covers").trim().replace(/^\/+|\/+$/g, "") || "covers";
const prefixVideo = (process.env.R2_PREFIX_VIDEO ?? "video").trim().replace(/^\/+|\/+$/g, "") || "video";

const prefixes = [prefixAudio, prefixImages, prefixCovers, prefixVideo];
const sampleSlug = (process.env.R2_SMOKE_SAMPLE_SLUG ?? "mau-noi-bo").trim();

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

for (const prefix of prefixes) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: `${prefix}/.keep`,
      Body: "",
      ContentType: "text/plain",
      CacheControl: "no-store",
    }),
  );
}

const sampleAudioKey = `${prefixAudio}/${sampleSlug}.mp3`;
await s3.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: sampleAudioKey,
    Body: Buffer.from("HON_THO_R2_SMOKE_TEST", "utf8"),
    ContentType: "audio/mpeg",
    CacheControl: "no-store",
  }),
);

for (const prefix of prefixes) {
  const listed = await s3.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: `${prefix}/`,
      MaxKeys: 20,
    }),
  );

  const keys = (listed.Contents ?? []).map((item) => item.Key).filter(Boolean);
  console.log(`[${prefix}] ${keys.length} objects`);
  for (const key of keys) {
    console.log(`  - ${key}`);
  }
}

console.log(`Smoke test complete. Sample uploaded: ${sampleAudioKey}`);
