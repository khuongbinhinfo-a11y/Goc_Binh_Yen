#!/usr/bin/env node

import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2] || "";

if (!password || password.length < 8) {
  console.error("Usage: npm run admin:hash -- <password>=8+ ký tự");
  process.exit(1);
}

const salt = randomBytes(16);
const derived = scryptSync(password.normalize("NFKC"), salt, 64);
const result = `scrypt$${salt.toString("base64")}$${derived.toString("base64")}`;

console.log("ADMIN_PASSWORD_HASH=");
console.log(result);
