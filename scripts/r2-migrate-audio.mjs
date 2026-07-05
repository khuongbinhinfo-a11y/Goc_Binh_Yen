import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, extname } from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

function extractQuotedValue(line) {
  const match = line.match(/"([\s\S]*?)"/);
  if (!match?.[1]) return "";

  const raw = match[1].trim();
  try {
    return JSON.parse(`"${raw.replace(/"/g, '\\"')}"`);
  } catch {
    return raw;
  }
}

function parsePoemsAudio(raw) {
  const lines = raw.split(/\r?\n/);
  const items = [];
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("slug: \"")) {
      if (current?.slug && current.audioCurrent && current.hasAudio) items.push(current);
      current = {
        slug: extractQuotedValue(trimmed),
        audioCurrent: "",
        hasAudio: false,
      };
      continue;
    }

    if (!current) continue;

    if (!current.audioCurrent && trimmed.startsWith("audioUrl:")) {
      current.audioCurrent = extractQuotedValue(trimmed);
      continue;
    }

    if (trimmed.startsWith("hasAudio:")) {
      current.hasAudio = trimmed.includes("true");
      continue;
    }
  }

  if (current?.slug && current.audioCurrent && current.hasAudio) items.push(current);
  return items;
}

function parseContentLibraryAudio(raw) {
  const lines = raw.split(/\r?\n/);
  const items = [];
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("slug: \"")) {
      if (current?.slug && current.type && current.audioUrl && current.hasAudio) items.push(current);
      current = {
        slug: extractQuotedValue(trimmed),
        type: "",
        audioUrl: "",
        hasAudio: false,
      };
      continue;
    }

    if (!current) continue;

    if (!current.type && trimmed.startsWith("contentType:")) {
      current.type = extractQuotedValue(trimmed);
      continue;
    }

    if (!current.audioUrl && trimmed.startsWith("audioUrl:")) {
      current.audioUrl = extractQuotedValue(trimmed);
      continue;
    }

    if (trimmed.startsWith("hasAudio:")) {
      current.hasAudio = trimmed.includes("true");
      continue;
    }
  }

  if (current?.slug && current.type && current.audioUrl && current.hasAudio) items.push(current);
  return items;
}

function normalizeLocalPath(urlLike) {
  if (!urlLike.startsWith("/")) return urlLike;
  return urlLike.slice(1);
}

function contentTypeFromRawType(rawType) {
  if (rawType === "poem") return "doc-tho";
  if (rawType === "story") return "ke-chuyen";
  return "tam-linh";
}

function sourceMimeType(sourcePath) {
  const lower = sourcePath.toLowerCase();
  if (lower.endsWith(".m4a")) return "audio/mp4";
  if (lower.endsWith(".mp3")) return "audio/mpeg";
  if (lower.endsWith(".wav")) return "audio/wav";
  return "application/octet-stream";
}

loadDotEnvLocal();

const endpoint = (process.env.R2_S3_ENDPOINT ?? "").trim().replace(/\/+$/, "");
const bucket = (process.env.R2_BUCKET ?? "").trim();
const accessKeyId = (process.env.R2_ACCESS_KEY_ID ?? "").trim();
const secretAccessKey = (process.env.R2_SECRET_ACCESS_KEY ?? "").trim();
const publicDevUrl = (process.env.R2_PUBLIC_DEV_URL ?? "").trim().replace(/\/+$/, "");
const prefixAudio = ((process.env.R2_PREFIX_AUDIO ?? "audio").trim().replace(/^\/+|\/+$/g, "")) || "audio";

const missingEnv = [
  ["R2_S3_ENDPOINT", endpoint],
  ["R2_BUCKET", bucket],
  ["R2_ACCESS_KEY_ID", accessKeyId],
  ["R2_SECRET_ACCESS_KEY", secretAccessKey],
  ["R2_PUBLIC_DEV_URL", publicDevUrl],
].filter(([, v]) => !v);

if (missingEnv.length > 0) {
  const names = missingEnv.map(([k]) => k).join(", ");
  throw new Error(`Missing required env: ${names}`);
}

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

const poemsRaw = readFileSync(resolve(root, "src/data/poems.ts"), "utf8");
const libraryRaw = readFileSync(resolve(root, "src/data/contentLibrary.ts"), "utf8");

const poemItems = parsePoemsAudio(poemsRaw).map((item) => ({
  type: "poem",
  slug: item.slug,
  localAudioPath: normalizeLocalPath(item.audioCurrent),
}));

const libraryItems = parseContentLibraryAudio(libraryRaw)
  .filter((item) => item.type === "story" || item.type === "spiritual")
  .map((item) => ({
    type: item.type,
    slug: item.slug,
    localAudioPath: normalizeLocalPath(item.audioUrl),
  }));

const allMappings = [...poemItems, ...libraryItems];

const uploaded = {
  poem: [],
  story: [],
  spiritual: [],
};

// keep track of uploaded file extensions per type/slug
const uploadedExts = {
  poem: {},
  story: {},
  spiritual: {},
};

const missingLocal = [];
const failedUpload = [];
const failedVerify = [];

for (const item of allMappings) {
  const localFile = resolve(root, "public", item.localAudioPath.replace(/^public\//, ""));
  if (!existsSync(localFile)) {
    missingLocal.push({ type: item.type, slug: item.slug, source: item.localAudioPath });
    continue;
  }

  const branch = contentTypeFromRawType(item.type);
  const ext = extname(localFile).toLowerCase() || ".mp3";
  const key = `${prefixAudio}/${branch}/${item.slug}${ext}`;
  const body = readFileSync(localFile);

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: sourceMimeType(localFile),
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } catch (error) {
    failedUpload.push({ type: item.type, slug: item.slug, key, error: String(error) });
    continue;
  }

  const publicUrl = `${publicDevUrl}/${key}`;
  try {
    const response = await fetch(publicUrl, { method: "HEAD" });
    if (!response.ok) {
      failedVerify.push({ type: item.type, slug: item.slug, key, status: response.status });
      continue;
    }
  } catch (error) {
    failedVerify.push({ type: item.type, slug: item.slug, key, status: String(error) });
    continue;
  }

  uploaded[item.type].push(item.slug);
  uploadedExts[item.type][item.slug] = ext.replace(/^\./, "");
}

uploaded.poem.sort();
uploaded.story.sort();
uploaded.spiritual.sort();

const poemM4a = Object.entries(uploadedExts.poem)
  .filter(([, e]) => e === "m4a")
  .map(([s]) => s);
const spiritualM4a = Object.entries(uploadedExts.spiritual)
  .filter(([, e]) => e === "m4a")
  .map(([s]) => s);

const manifestSource = `export const CLOUD_AUDIO_BASE_URL = ${JSON.stringify(publicDevUrl)} as const;

export const CLOUD_AUDIO_SLUGS = {
  poem: ${JSON.stringify(uploaded.poem, null, 2)},
  story: ${JSON.stringify(uploaded.story, null, 2)},
  spiritual: ${JSON.stringify(uploaded.spiritual, null, 2)},
} as const;

export type CloudAudioType = keyof typeof CLOUD_AUDIO_SLUGS;

const slugSets: Record<CloudAudioType, Set<string>> = {
  poem: new Set(CLOUD_AUDIO_SLUGS.poem),
  story: new Set(CLOUD_AUDIO_SLUGS.story),
  spiritual: new Set(CLOUD_AUDIO_SLUGS.spiritual),
};

function branchByType(type: CloudAudioType) {
  if (type === "poem") return "doc-tho";
  if (type === "story") return "ke-chuyen";
  return "tam-linh";
}

const spiritualM4aSlugs = new Set<string>(${JSON.stringify(spiritualM4a, null, 2)});

const poemM4aSlugs = new Set<string>(${JSON.stringify(poemM4a, null, 2)});

function extBySlug(type: CloudAudioType, slug: string) {
  if (type === "spiritual" && spiritualM4aSlugs.has(slug)) return "m4a";
  if (type === "poem" && poemM4aSlugs.has(slug)) return "m4a";
  return "mp3";
}

export function hasCloudAudio(type: CloudAudioType, slug: string) {
  return slugSets[type].has(slug);
}

export function getCloudAudioUrl(type: CloudAudioType, slug: string) {
  if (!hasCloudAudio(type, slug)) return undefined;
  return CLOUD_AUDIO_BASE_URL + "/${prefixAudio}/" + branchByType(type) + "/" + slug + "." + extBySlug(type, slug);
}
`;

const manifestPath = resolve(root, "src/data/cloudAudioManifest.ts");
writeFileSync(manifestPath, manifestSource, "utf8");

const report = {
  uploadedCounts: {
    poem: uploaded.poem.length,
    story: uploaded.story.length,
    spiritual: uploaded.spiritual.length,
  },
  missingLocal,
  failedUpload,
  failedVerify,
};

mkdirSync(resolve(root, "content_exports"), { recursive: true });
writeFileSync(resolve(root, "content_exports/r2-audio-migration-report.json"), JSON.stringify(report, null, 2), "utf8");

console.log("R2 audio migration completed.");
console.log(JSON.stringify(report, null, 2));
console.log(`Manifest written: ${manifestPath}`);
