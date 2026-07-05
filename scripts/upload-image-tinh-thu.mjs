import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function loadDotEnvLocal() {
  const root = process.cwd();
  const envPath = resolve(root, ".env.local");
  try {
    const raw = readFileSync(envPath, "utf8");
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
  } catch {
    // ignore
  }
}

loadDotEnvLocal();

const localPathArg = process.argv[2];
if (!localPathArg) {
  console.error("Usage: node scripts/upload-image-tinh-thu.mjs <local-image-path>");
  process.exit(2);
}

const localFile = resolve(process.cwd(), localPathArg);
if (!existsSync(localFile)) {
  console.error(`Image file not found: ${localFile}`);
  process.exit(2);
}

const endpoint = (process.env.R2_S3_ENDPOINT ?? "").trim().replace(/\/+$/, "");
const bucket = (process.env.R2_BUCKET ?? "").trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID ?? "").trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY ?? "").trim();
const publicDevUrl = (process.env.R2_PUBLIC_DEV_URL ?? "").trim().replace(/\/+$/, "");
const key = `images/poems/tinh-thu-1.png`;

const missing = [
  ["R2_S3_ENDPOINT", endpoint],
  ["R2_BUCKET", bucket],
  ["R2_ACCESS_KEY_ID", accessKeyId],
  ["R2_SECRET_ACCESS_KEY", secretAccessKey],
  ["R2_PUBLIC_DEV_URL", publicDevUrl],
].filter(([, v]) => !v);

if (missing.length > 0) {
  console.error("Missing required environment variables:", missing.map(([k]) => k).join(", "));
  process.exit(2);
}

const s3 = new S3Client({ endpoint, region: "auto", forcePathStyle: true, credentials: { accessKeyId, secretAccessKey } });
const body = readFileSync(localFile);

function guessContentType(path) {
  if (path.toLowerCase().endsWith('.png')) return 'image/png';
  if (path.toLowerCase().endsWith('.jpg') || path.toLowerCase().endsWith('.jpeg')) return 'image/jpeg';
  if (path.toLowerCase().endsWith('.webp')) return 'image/webp';
  return 'application/octet-stream';
}

(async () => {
  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: guessContentType(localFile),
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } catch (err) {
    console.error("Upload failed:", String(err));
    process.exit(3);
  }

  const publicUrl = `${publicDevUrl}/${key}`;
  console.log("Upload successful.");
  console.log(publicUrl);
})();
