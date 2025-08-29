import crypto from "crypto";

// utils/logger.ts

export const logger = {
  info: (msg: string) =>
    console.log(`[INFO] ${new Date().toISOString()}: ${msg}`),

  error: (msg: string) =>
    console.error(`[ERROR] ${new Date().toISOString()}: ${msg}`),
};

// utils/constants.ts

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const SHORT_CODE_LENGTH = 6;

export const MAX_URL_LENGTH = 2048;

// utils/shorten.ts
export function generateShortCode() {
  // func goes here
  const allowedChars = "abcdefghijklmnopqrstuvwxyz0123456789";

  let shortCode = "";
  for (let i = 1; i <= 6; i++) {
    const randomIndex = crypto.randomInt(0, allowedChars.length);
    shortCode += allowedChars[randomIndex];
  }
  return shortCode;
}
