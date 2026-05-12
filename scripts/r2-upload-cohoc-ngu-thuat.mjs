import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const root = resolve(process.cwd());

/** Mỗi mục: thư mục con trong COHOC_NGU_THUAT_DIR, tên file, R2 key (không có bucket prefix) */
const UPLOAD_PLAN = [
  { dir: "son", file: "hoc-tho-cham-giua-ngay-dai.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/son/hoc-tho-cham-giua-ngay-dai.png" },
  { dir: "son", file: "ngoi-yen-truoc-hien-nha.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/son/ngoi-yen-truoc-hien-nha.png" },
  { dir: "son", file: "song-cham-khong-phai-song-lui.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/son/song-cham-khong-phai-song-lui.png" },
  { dir: "son", file: "di-cham-qua-mot-con-gian.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/son/di-cham-qua-mot-con-gian.png" },
  { dir: "y", file: "giu-gio-ngu-deu-nhu-giu-mot-ben-neo.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/y/giu-gio-ngu-deu-nhu-giu-mot-ben-neo.png" },
  { dir: "y", file: "an-cham-de-nghe-co-the.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/y/an-cham-de-nghe-co-the.png" },
  { dir: "y", file: "di-bo-sau-mot-ngay-nhieu-tieng-dong.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/y/di-bo-sau-mot-ngay-nhieu-tieng-dong.png" },
  { dir: "y", file: "duong-sinh-khong-bat-dau-tu-thuoc.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/y/duong-sinh-khong-bat-dau-tu-thuoc.png" },
  { dir: "menh", file: "menh-khong-phai-ban-an.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/menh/menh-khong-phai-ban-an.png" },
  { dir: "menh", file: "can-chi-nhu-chiec-lich-cua-thoi-gian.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/menh/can-chi-nhu-chiec-lich-cua-thoi-gian.png" },
  { dir: "menh", file: "ngu-hanh-de-soi-thien-huong-khong-de-dong-khung.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/menh/ngu-hanh-de-soi-thien-huong-khong-de-dong-khung.png" },
  { dir: "menh", file: "dung-dung-menh-de-buong-xuoi.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/menh/dung-dung-menh-de-buong-xuoi.png" },
  { dir: "boc", file: "khi-long-roi-que-chi-nen-la-cau-hoi-mo.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/boc/khi-long-roi-que-chi-nen-la-cau-hoi-mo.png" },
  { dir: "boc", file: "doc-mot-que-nhu-soi-lai-chinh-minh.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/boc/doc-mot-que-nhu-soi-lai-chinh-minh.png" },
  { dir: "boc", file: "que-khong-thay-ban-song-ho.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/boc/que-khong-thay-ban-song-ho.png" },
  { dir: "boc", file: "mot-cau-hoi-dung-da-la-nua-cau-tra-loi.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/boc/mot-cau-hoi-dung-da-la-nua-cau-tra-loi.png" },
  { dir: "tuong", file: "than-thai-di-truoc-guong-mat.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/than-thai-di-truoc-guong-mat.png" },
  { dir: "tuong", file: "dung-voi-doc-nguoi-qua-khuon-mat.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/dung-voi-doc-nguoi-qua-khuon-mat.png" },
  { dir: "tuong", file: "phong-thai-hien-lanh-khong-pho-truong.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/phong-thai-hien-lanh-khong-pho-truong.png" },
  { dir: "tuong", file: "mot-nu-cuoi-co-hoc-tu-nam-thang.png", key: "images/articles/huyen-mon-tham-khao/ngu-thuat/tuong/mot-nu-cuoi-co-hoc-tu-nam-thang.png" },
];

const DEFAULT_BASE_DIR =
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
const baseDir = (process.env.COHOC_NGU_THUAT_DIR ?? DEFAULT_BASE_DIR).trim();

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

if (!existsSync(baseDir)) {
  throw new Error(`COHOC base folder not found: ${baseDir}`);
}

const missingFiles = [];
for (const item of UPLOAD_PLAN) {
  const abs = join(baseDir, item.dir, item.file);
  if (!existsSync(abs)) {
    missingFiles.push(`${item.dir}\\${item.file}`);
  }
}

if (missingFiles.length > 0) {
  throw new Error(`Missing source files (${missingFiles.length}):\n${missingFiles.join("\n")}`);
}

if (dryRun) {
  console.log("Dry run: COHOC_NGU_THUAT_DIR =", baseDir);
  for (const item of UPLOAD_PLAN) {
    console.log(`  ${join(item.dir, item.file)} -> ${item.key}`);
  }
  process.exit(0);
}

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

for (const item of UPLOAD_PLAN) {
  const abs = join(baseDir, item.dir, item.file);
  const body = readFileSync(abs);

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: item.key,
      Body: body,
      ContentType: imageMimeType(abs),
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  const verifyUrl = `${publicDevUrl}/${item.key}`;
  const response = await fetch(verifyUrl, { method: "HEAD" });
  if (!response.ok) {
    throw new Error(`HEAD failed for ${verifyUrl}: ${response.status}`);
  }

  console.log("OK", item.key);
}

console.log("Ngũ thuật (20 ảnh): upload completed.");
