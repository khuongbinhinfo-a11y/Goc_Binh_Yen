import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function loadDotEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  let raw = "";
  try { raw = readFileSync(envPath, "utf8"); } catch { return; }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadDotEnvLocal();

const endpoint = (process.env.R2_S3_ENDPOINT || "").trim().replace(/\/+$/, "");
const bucket = (process.env.R2_BUCKET || "").trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID || "").trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY || "").trim();

if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
  console.error("Missing R2 credentials in .env.local");
  process.exit(1);
}

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

const uploads = [
  {
    src: "tmp_audio/mui-rom-moi-sau-ngay-gat.mp3",
    key: "audio/ke-chuyen/mui-rom-moi-sau-ngay-gat.mp3",
  },
  {
    src: "tmp_audio/dem-mua-trong-can-nha-la.mp3",
    key: "audio/ke-chuyen/dem-mua-trong-can-nha-la.mp3",
  },
];

async function run() {
  for (const item of uploads) {
    const abs = resolve(item.src);
    if (!existsSync(abs)) {
      console.error(`File not found: ${abs}`);
      continue;
    }
    
    console.log(`Uploading ${item.src} to ${item.key}...`);
    const fileContent = readFileSync(abs);
    
    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: item.key,
          Body: fileContent,
          ContentType: "audio/mpeg",
          CacheControl: "public, max-age=31536000, immutable"
        })
      );
      console.log(`Successfully uploaded ${item.key}`);
    } catch (e) {
      console.error(`Error uploading ${item.key}:`, e);
    }
  }
}

run();