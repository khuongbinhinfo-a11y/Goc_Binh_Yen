import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

function toBase64(value: Uint8Array) {
  return Buffer.from(value).toString("base64");
}

function fromBase64(value: string) {
  return Buffer.from(value, "base64");
}

export function isPasswordHashFormat(value: string) {
  return value.startsWith("scrypt$");
}

export async function createPasswordHash(password: string) {
  const normalized = `${password || ""}`.normalize("NFKC");
  if (normalized.length < 8) {
    throw new Error("Mật khẩu phải có ít nhất 8 ký tự.");
  }

  const salt = randomBytes(16);
  const derived = (await scrypt(normalized, salt, KEY_LENGTH)) as Buffer;
  return `scrypt$${toBase64(salt)}$${toBase64(derived)}`;
}

export async function verifyPasswordHash(password: string, storedHash: string) {
  if (!isPasswordHashFormat(storedHash)) {
    throw new Error("ADMIN_PASSWORD_HASH không đúng định dạng scrypt$...");
  }

  const chunks = storedHash.split("$");
  if (chunks.length !== 3) {
    throw new Error("ADMIN_PASSWORD_HASH không đúng định dạng scrypt$... ");
  }

  const [, saltText, hashText] = chunks;
  const salt = fromBase64(saltText);
  const expected = fromBase64(hashText);
  const actual = (await scrypt(`${password || ""}`.normalize("NFKC"), salt, expected.length)) as Buffer;

  if (actual.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(actual, expected);
}
