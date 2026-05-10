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
const publicDevUrl = (process.env.R2_PUBLIC_DEV_URL || "").trim().replace(/\/+$/, "");

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

const uploads = [
  {
    src: "F:/1_A_Disk_D/khuong-binh/hồn Thơ/audio-backup-20260507-222627/tam-linh/Đot-nhang-truoc-hien-nha.m4a",
    key: "audio/tam-linh/dot-nhang-truoc-hien-nha.m4a",
  },
  {
    src: "F:/1_A_Disk_D/khuong-binh/hồn Thơ/audio-backup-20260507-222627/tam-linh/Nhan-qua-khong-o-đau-xa.m4a",
    key: "audio/tam-linh/nhan-qua-khong-o-dau-xa.m4a",
  },
];

for (const item of uploads) {
  const abs = resolve(item.src);
  if (!existsSync(abs)) throw new Error(`Missing source: ${item.src}`);
  const body = readFileSync(abs);
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: item.key,
    Body: body,
    ContentType: "audio/mp4",
    CacheControl: "public, max-age=31536000, immutable",
  }));
  const url = `${publicDevUrl}/${item.key}`;
  const head = await fetch(url, { method: "HEAD" });
  console.log(JSON.stringify({ key: item.key, status: head.status, ok: head.ok, url }));
  if (!head.ok) throw new Error(`Verify failed: ${url}`);
}
