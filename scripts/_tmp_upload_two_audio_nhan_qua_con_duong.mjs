import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

function loadDotEnvLocal() {
  try {
    const envPath = resolve(process.cwd(), '.env.local');
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const i = trimmed.indexOf('=');
      if (i <= 0) continue;
      const key = trimmed.slice(0, i).trim();
      let value = trimmed.slice(i + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch (e) {
    // ignore
  }
}

loadDotEnvLocal();

const endpoint = (process.env.R2_S3_ENDPOINT ?? '').trim().replace(/\/+$|^\/+/, '');
const bucket = (process.env.R2_BUCKET ?? '').trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID ?? '').trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY ?? '').trim();
const prefixAudio = ((process.env.R2_PREFIX_AUDIO ?? 'audio').trim().replace(/^\/+|\/+$/g, '')) || 'audio';

if (!endpoint || !bucket || !accessKeyId || !secretAccessKey) {
  console.error('Missing R2 env. Set R2_S3_ENDPOINT, R2_BUCKET, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY');
  process.exit(1);
}

const s3 = new S3Client({ endpoint, region: 'auto', forcePathStyle: true, credentials: { accessKeyId, secretAccessKey } });

const root = resolve(process.cwd());
const uploads = [
  {
    local: resolve(root, 'tmp_audio', 'nhan-qua-trong-mot-bua-com.mp3'),
    key: `${prefixAudio}/tam-linh/nhan-qua-trong-mot-bua-com.mp3`,
  },
  {
    local: resolve(root, 'tmp_audio', 'con-duong-dat-sau-mua-nuoc-noi.mp3'),
    key: `${prefixAudio}/ke-chuyen/con-duong-dat-sau-mua-nuoc-noi.mp3`,
  },
];

(async () => {
  for (const item of uploads) {
    try {
      const body = readFileSync(item.local);
      console.log('Uploading', item.key, 'size', body.length);
      await s3.send(new PutObjectCommand({ Bucket: bucket, Key: item.key, Body: body, ContentType: 'audio/mpeg', CacheControl: 'public, max-age=31536000, immutable' }));
      console.log('Uploaded', item.key);
    } catch (err) {
      console.error('Failed upload', item.key, String(err));
      process.exitCode = 2;
    }
  }
})();
