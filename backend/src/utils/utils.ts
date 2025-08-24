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
