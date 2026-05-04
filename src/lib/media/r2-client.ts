import "server-only";

import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";

import { r2Config, requireR2ServerConfig } from "@/lib/media/r2-config";

let client: S3Client | null = null;

function getR2Client() {
  if (client) return client;

  const cfg = requireR2ServerConfig();

  client = new S3Client({
    endpoint: cfg.endpoint,
    region: "auto",
    credentials: {
      accessKeyId: cfg.accessKeyId,
      secretAccessKey: cfg.secretAccessKey,
    },
    forcePathStyle: true,
  });

  return client;
}

export async function uploadR2Object(input: {
  key: string;
  body: PutObjectCommandInput["Body"];
  contentType?: string;
  cacheControl?: string;
}) {
  const cfg = requireR2ServerConfig();
  const r2 = getR2Client();

  await r2.send(
    new PutObjectCommand({
      Bucket: cfg.bucket,
      Key: input.key,
      Body: input.body,
      ContentType: input.contentType,
      CacheControl: input.cacheControl,
    }),
  );

  return {
    bucket: cfg.bucket,
    key: input.key,
  };
}

export async function listR2Objects(prefix: string, maxKeys = 100) {
  const cfg = requireR2ServerConfig();
  const r2 = getR2Client();

  const response = await r2.send(
    new ListObjectsV2Command({
      Bucket: cfg.bucket,
      Prefix: prefix,
      MaxKeys: maxKeys,
    }),
  );

  return response.Contents ?? [];
}

export async function bootstrapR2MediaStructure() {
  const prefixes = [
    r2Config.prefixes.audio,
    r2Config.prefixes.images,
    r2Config.prefixes.covers,
    r2Config.prefixes.video,
  ];

  for (const prefix of prefixes) {
    const markerKey = `${prefix}/.keep`;
    await uploadR2Object({
      key: markerKey,
      body: "",
      contentType: "text/plain",
      cacheControl: "no-store",
    });
  }

  return prefixes;
}
