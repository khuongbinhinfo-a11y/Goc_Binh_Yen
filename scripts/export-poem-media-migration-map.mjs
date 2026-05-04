import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = resolve(process.cwd());
const sourceFile = resolve(projectRoot, "src/data/poems.ts");
const outputFile = resolve(projectRoot, "content_exports/hon-tho-media-migration-map.csv");

function escapeCsv(value) {
  const raw = `${value ?? ""}`;
  if (raw.includes(",") || raw.includes("\n") || raw.includes("\"")) {
    return `"${raw.replace(/\"/g, '""')}"`;
  }
  return raw;
}

function extractQuotedValue(line) {
  const match = line.match(/"([\s\S]*?)"/);
  return match?.[1]?.trim() ?? "";
}

function extractAssignedExpression(line) {
  return line.replace(/^[a-zA-Z_][a-zA-Z0-9_]*:\s*/, "").replace(/,$/, "").trim();
}

function parsePoems(raw) {
  const lines = raw.split(/\r?\n/);
  const items = [];
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("slug: \"")) {
      if (current?.slug) items.push(current);
      current = {
        slug: extractQuotedValue(trimmed),
        title: "",
        imageCurrent: "",
        audioCurrent: "",
      };
      continue;
    }

    if (!current) continue;

    if (!current.title && trimmed.startsWith("title: \"")) {
      current.title = extractQuotedValue(trimmed);
      continue;
    }

    if (!current.imageCurrent && trimmed.startsWith("cardImage:")) {
      const expression = extractAssignedExpression(trimmed);
      if (expression.startsWith("\"")) {
        current.imageCurrent = extractQuotedValue(trimmed);
      } else {
        current.imageCurrent = expression;
      }
      continue;
    }

    if (!current.audioCurrent && trimmed.startsWith("audioUrl:")) {
      current.audioCurrent = extractQuotedValue(trimmed);
      continue;
    }
  }

  if (current?.slug) items.push(current);
  return items;
}

function buildRows(items) {
  return items.map((item) => {
    const slug = item.slug;
    return {
      slug,
      title: item.title,
      image_current: item.imageCurrent,
      audio_current: item.audioCurrent,
      image_r2_future: `images/${slug}.webp`,
      audio_r2_future: `audio/${slug}.mp3`,
    };
  });
}

function toCsv(rows) {
  const columns = [
    "slug",
    "title",
    "image_current",
    "audio_current",
    "image_r2_future",
    "audio_r2_future",
  ];

  const header = columns.join(",");
  const body = rows
    .map((row) => columns.map((column) => escapeCsv(row[column])).join(","))
    .join("\n");

  return `${header}\n${body}\n`;
}

const source = readFileSync(sourceFile, "utf8");
const poems = parsePoems(source);
const rows = buildRows(poems);
const csv = toCsv(rows);

mkdirSync(resolve(projectRoot, "content_exports"), { recursive: true });
writeFileSync(outputFile, csv, "utf8");

console.log(`Exported ${rows.length} rows to ${outputFile}`);
