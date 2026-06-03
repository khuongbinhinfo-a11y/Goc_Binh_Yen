import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const root = resolve(process.cwd());

function loadEnv() {
  try {
    const envRaw = require('fs').readFileSync(resolve(root, '.env.local'), 'utf8');
    for (const line of envRaw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i <= 0) continue;
      const k = t.slice(0, i);
      let v = t.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!process.env[k]) process.env[k] = v;
    }
  } catch (e) {}
}

loadEnv();

const endpoint = (process.env.R2_S3_ENDPOINT ?? '').trim().replace(/\/+$|^\/+/, '');
const bucket = (process.env.R2_BUCKET ?? '').trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID ?? '').trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY ?? '').trim();
const publicDevUrl = (process.env.R2_PUBLIC_DEV_URL ?? '').trim().replace(/\/+$/, '');

if (!endpoint || !bucket || !accessKeyId || !secretAccessKey || !publicDevUrl) {
  console.error('Missing R2 env. Set R2_S3_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_PUBLIC_DEV_URL');
  process.exit(2);
}

const s3 = new S3Client({ endpoint, region: 'auto', forcePathStyle: true, credentials: { accessKeyId, secretAccessKey } });

const uploads = [
  { local: 'tmp_uploads/nguoi-dua-thu-qua-nhung-xom-nho.mp3', key: 'audio/ke-chuyen/nguoi-dua-thu-qua-nhung-xom-nho.mp3', contentType: 'audio/mpeg' },
  { local: 'tmp_uploads/cua-thien.mp3', key: 'audio/doc-tho/cua-thien.mp3', contentType: 'audio/mpeg' },
  { local: 'tmp_uploads/cua-thien.png', key: 'images/poems/cua-thien.png', contentType: 'image/png' },
];

(async function main() {
  const results = [];
  for (const u of uploads) {
    const full = resolve(root, u.local);
    let body;
    try {
      body = readFileSync(full);
    } catch (e) {
      console.error('Missing local file', full);
      process.exit(3);
    }

    try {
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: u.key, Body: body, ContentType: u.contentType, CacheControl: 'public, max-age=31536000, immutable' }));
    } catch (e) {
      console.error('Upload failed', u.key, String(e));
      process.exit(4);
    }

    const url = `${publicDevUrl}/${u.key}`;
    // verify HEAD
    try {
      const res = await fetch(url, { method: 'HEAD' });
      results.push({ key: u.key, url, ok: res.ok, status: res.status });
    } catch (e) {
      results.push({ key: u.key, url, ok: false, status: String(e) });
    }
  }

  console.log(JSON.stringify(results, null, 2));
})();
