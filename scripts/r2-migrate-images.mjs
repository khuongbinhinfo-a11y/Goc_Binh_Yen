import { readFileSync, existsSync, writeFileSync, mkdirSync, readdirSync, statSync, cpSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const root = resolve(process.cwd());
const publicRoot = resolve(root, "public");
const publicImagesRoot = resolve(publicRoot, "images");
const sourceRoot = resolve(root, "src");
const contentExportsDir = resolve(root, "content_exports");
const cloudImageManifestPath = resolve(root, "src/data/cloudImageManifest.ts");
const backupRoot = "F:\\1_A_Disk_D\\Khương Bình\\hồn Thơ\\images-backup";
const backupImagesRoot = join(backupRoot, "images");

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".svg",
  ".gif",
  ".avif",
  ".bmp",
  ".ico",
]);

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

function toPosix(value) {
  return value.replace(/\\/g, "/");
}

function walkFiles(dirPath) {
  const output = [];

  for (const entry of readdirSync(dirPath)) {
    const absolutePath = join(dirPath, entry);
    const stats = statSync(absolutePath);
    if (stats.isDirectory()) {
      output.push(...walkFiles(absolutePath));
      continue;
    }

    output.push(absolutePath);
  }

  return output;
}

function imageMimeType(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".gif") return "image/gif";
  if (ext === ".avif") return "image/avif";
  if (ext === ".bmp") return "image/bmp";
  if (ext === ".ico") return "image/x-icon";
  return "application/octet-stream";
}

function lineSnippet(line) {
  return line.trim().slice(0, 220);
}

function buildUsageIndex() {
  const usageByImagePath = new Map();
  const dynamicReferences = [];
  const sourceFiles = walkFiles(sourceRoot).filter((filePath) => /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(filePath));

  for (const sourceFile of sourceFiles) {
    const relSourceFile = toPosix(relative(root, sourceFile));
    const raw = readFileSync(sourceFile, "utf8");
    const lines = raw.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (!line.includes("/images/")) return;

      const matches = line.match(/\/images\/[A-Za-z0-9._\-/]+\.[A-Za-z0-9]+/g) ?? [];
      if (matches.length > 0) {
        for (const localPath of matches) {
          const list = usageByImagePath.get(localPath) ?? [];
          list.push({
            file: relSourceFile,
            line: index + 1,
            snippet: lineSnippet(line),
          });
          usageByImagePath.set(localPath, list);
        }
      } else {
        dynamicReferences.push({
          file: relSourceFile,
          line: index + 1,
          snippet: lineSnippet(line),
        });
      }
    });
  }

  return { usageByImagePath, dynamicReferences };
}

function buildCloudImageManifestSource(publicDevUrl, uploadedLocalPaths) {
  const sortedPaths = [...uploadedLocalPaths].sort();

  return `export const CLOUD_IMAGE_BASE_URL = ${JSON.stringify(publicDevUrl)} as const;\n\n` +
    `export const CLOUD_IMAGE_PATHS = ${JSON.stringify(sortedPaths, null, 2)} as const;\n\n` +
    `const cloudImagePathSet = new Set<string>(CLOUD_IMAGE_PATHS);\n\n` +
    `function normalizeLocalImagePath(localPath: string) {\n` +
    `  const normalized = localPath.trim();\n` +
    `  if (!normalized) return \"\";\n` +
    `  if (normalized.startsWith(\"http://\") || normalized.startsWith(\"https://\")) return \"\";\n` +
    `  if (normalized.startsWith(\"/\")) return normalized;\n` +
    `  return \"/\" + normalized.replace(/^\\/+/, \"\");\n` +
    `}\n\n` +
    `export function hasCloudImage(localPath: string) {\n` +
    `  const normalized = normalizeLocalImagePath(localPath);\n` +
    `  if (!normalized) return false;\n` +
    `  return cloudImagePathSet.has(normalized);\n` +
    `}\n\n` +
    `export function getCloudImageUrl(localPath: string) {\n` +
    `  const normalized = normalizeLocalImagePath(localPath);\n` +
    `  if (!normalized) return undefined;\n` +
    `  if (!CLOUD_IMAGE_BASE_URL) return undefined;\n` +
    `  if (!hasCloudImage(normalized)) return undefined;\n` +
    `  return CLOUD_IMAGE_BASE_URL + normalized;\n` +
    `}\n\n` +
    `export function getCloudImageCandidates(localPath: string) {\n` +
    `  const normalized = normalizeLocalImagePath(localPath);\n` +
    `  if (!normalized) return [] as string[];\n` +
    `  const cloud = getCloudImageUrl(normalized);\n` +
    `  if (cloud && cloud !== normalized) return [cloud, normalized];\n` +
    `  return [normalized];\n` +
    `}\n`;
}

loadDotEnvLocal();

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

if (missingEnv.length > 0) {
  throw new Error(`Missing required env: ${missingEnv.map(([name]) => name).join(", ")}`);
}

if (!existsSync(publicImagesRoot)) {
  throw new Error(`Image root not found: ${publicImagesRoot}`);
}

const s3 = new S3Client({
  endpoint,
  region: "auto",
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

const publicRootImageFiles = readdirSync(publicRoot)
  .map((entry) => join(publicRoot, entry))
  .filter((filePath) => statSync(filePath).isFile())
  .filter((filePath) => IMAGE_EXTENSIONS.has(extname(filePath).toLowerCase()));

const imageFiles = [...publicRootImageFiles, ...walkFiles(publicImagesRoot)]
  .filter((filePath) => IMAGE_EXTENSIONS.has(extname(filePath).toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

const { usageByImagePath, dynamicReferences } = buildUsageIndex();

const inventory = [];
const uploaded = [];
const failedUpload = [];
const failedVerify = [];

for (const absoluteFilePath of imageFiles) {
  const relFromRoot = toPosix(relative(root, absoluteFilePath));
  const relFromPublic = toPosix(relative(publicRoot, absoluteFilePath));
  const localPath = `/${relFromPublic}`;
  const key = relFromPublic;
  const basename = absoluteFilePath.split(/[/\\]/).pop() ?? "";
  const ext = extname(absoluteFilePath).toLowerCase();

  const usageRefs = usageByImagePath.get(localPath) ?? [];

  inventory.push({
    relativePath: relFromRoot,
    localPath,
    basename,
    ext,
    calledFrom: usageRefs,
  });

  const body = readFileSync(absoluteFilePath);

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: imageMimeType(absoluteFilePath),
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  } catch (error) {
    failedUpload.push({ localPath, key, error: String(error) });
    continue;
  }

  const verifyUrl = `${publicDevUrl}/${key}`;
  try {
    const response = await fetch(verifyUrl, { method: "HEAD" });
    if (!response.ok) {
      failedVerify.push({ localPath, key, status: response.status });
      continue;
    }

    uploaded.push(localPath);
  } catch (error) {
    failedVerify.push({ localPath, key, status: String(error) });
  }
}

const referencedImagePaths = [...usageByImagePath.keys()].sort();
const uploadedSet = new Set(uploaded);
const localImageSet = new Set(inventory.map((item) => item.localPath));

const referencedButMissingInRepo = referencedImagePaths.filter((localPath) => !localImageSet.has(localPath));
const existingButNotReferenced = inventory
  .map((item) => item.localPath)
  .filter((localPath) => !usageByImagePath.has(localPath));

mkdirSync(contentExportsDir, { recursive: true });

const inventoryReportPath = resolve(contentExportsDir, "r2-image-inventory.json");
const migrationReportPath = resolve(contentExportsDir, "r2-image-migration-report.json");

writeFileSync(
  inventoryReportPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      totalImagesInRepo: inventory.length,
      inventory,
      dynamicReferences,
      referencedButMissingInRepo,
      existingButNotReferenced,
    },
    null,
    2,
  ),
  "utf8",
);

const manifestSource = buildCloudImageManifestSource(publicDevUrl, uploaded);
writeFileSync(cloudImageManifestPath, manifestSource, "utf8");

mkdirSync(backupImagesRoot, { recursive: true });
cpSync(publicImagesRoot, backupImagesRoot, { recursive: true, force: true });

for (const absoluteFilePath of publicRootImageFiles) {
  const fileName = absoluteFilePath.split(/[/\\]/).pop();
  if (!fileName) continue;
  cpSync(absoluteFilePath, join(backupRoot, fileName), { force: true });
}

const migrationReport = {
  generatedAt: new Date().toISOString(),
  totalImagesInRepo: inventory.length,
  totalUploaded: uploaded.length,
  totalUploadFailed: failedUpload.length,
  totalVerifyFailed: failedVerify.length,
  totalReferencedButMissingInRepo: referencedButMissingInRepo.length,
  totalExistingButNotReferenced: existingButNotReferenced.length,
  backupDestination: backupImagesRoot,
  reports: {
    inventory: toPosix(relative(root, inventoryReportPath)),
    manifest: toPosix(relative(root, cloudImageManifestPath)),
  },
  failedUpload,
  failedVerify,
  referencedButMissingInRepo,
};

writeFileSync(migrationReportPath, JSON.stringify(migrationReport, null, 2), "utf8");

console.log("R2 image migration completed.");
console.log(JSON.stringify(migrationReport, null, 2));
