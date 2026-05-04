/**
 * Xóa toàn bộ object smoke test đã tạo bởi r2-smoke-test.mjs
 * Chạy: node scripts/r2-smoke-cleanup.mjs
 */
import { S3Client, DeleteObjectsCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Parse .env.local
function loadEnv() {
  const content = readFileSync(join(root, ".env.local"), "utf8");
  const env = {};
  for (const line of content.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const env = loadEnv();

const required = ["R2_S3_ENDPOINT", "R2_BUCKET", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY"];
for (const k of required) {
  if (!env[k]) { console.error(`Missing env: ${k}`); process.exit(1); }
}

const BUCKET = env.R2_BUCKET;
const SLUG = env.R2_SMOKE_SAMPLE_SLUG || "mau-noi-bo";

const client = new S3Client({
  region: "auto",
  endpoint: env.R2_S3_ENDPOINT,
  forcePathStyle: true,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

const toDelete = [
  { Key: "audio/.keep" },
  { Key: `audio/${SLUG}.mp3` },
  { Key: "images/.keep" },
  { Key: "covers/.keep" },
  { Key: "video/.keep" },
  // folder placeholder objects
  { Key: "audio/" },
  { Key: "images/" },
  { Key: "covers/" },
  { Key: "video/" },
];

console.log("Deleting smoke test objects from bucket:", BUCKET);
console.log("Objects:", toDelete.map((o) => o.Key).join(", "));

const result = await client.send(
  new DeleteObjectsCommand({
    Bucket: BUCKET,
    Delete: { Objects: toDelete, Quiet: false },
  })
);

if (result.Deleted?.length) {
  console.log("Deleted:", result.Deleted.map((d) => d.Key).join(", "));
}
if (result.Errors?.length) {
  console.error("Errors:", JSON.stringify(result.Errors));
}

// Verify
const list = await client.send(new ListObjectsV2Command({ Bucket: BUCKET, MaxKeys: 50 }));
const remaining = list.Contents ?? [];
if (remaining.length === 0) {
  console.log("Bucket is now empty. Cleanup complete.");
} else {
  console.log("Remaining objects:", remaining.map((o) => o.Key).join(", "));
}
