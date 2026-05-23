import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const keyFile = process.argv[2];
const audioFile = process.argv[3];

if (!keyFile || !audioFile) {
  throw new Error("Usage: node _tmp_upload_bat_canh_rau.mjs <keyFilePath> <audioFilePath>");
}

// Use Python script to parse credentials
const cfg = JSON.parse(execSync(`python scripts/.tmp_parse_r2_key.py`).toString().trim());

console.log('Parsed credentials:', JSON.stringify(cfg, null, 2));

if (!cfg.s3Api || !cfg.accessKeyId || !cfg.secretAccessKey || !cfg.publicDevUrl) {
  throw new Error("Missing required Cloudflare R2 credentials for Hồn Thơ section.");
}

const s3Url = new URL(cfg.s3Api);
const bucket = s3Url.pathname.replace(/^\/+/, "");
const endpoint = `${s3Url.protocol}//${s3Url.hostname}`;

const client = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
});

const body = readFileSync(audioFile);
const key = "audio/doc-tho/bat-canh-rau.mp3";

console.log("Uploading", key, "to bucket", bucket, "via endpoint", endpoint);

await client.send(
  new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: body,
    ContentType: "audio/mp4",
    CacheControl: "public, max-age=31536000, immutable",
  }),
);

console.log("Upload completed");

const publicUrl = cfg.publicDevUrl.replace(/\/+$/, "") + "/" + key;
console.log("Verify URL:", publicUrl);

const res = await fetch(publicUrl, { method: "HEAD" });
console.log("Verify status", res.status);
if (!res.ok) {
  throw new Error(`Remote verify failed: ${res.status}`);
}
console.log("Audio upload verified successfully.");

