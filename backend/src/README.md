# Express.js Project Structure Guide

This document explains the different layers and folders in a typical Express.js application, specifically for a link shortener project.

## Project Architecture Overview

```
src/
├── index.ts          # Main server entry point
├── config/           # Configuration files
├── api/
│   ├── routes/       # HTTP route handlers
│   ├── middleware/   # Express middleware
│   └── helpers/      # Domain-specific utilities
├── models/           # Data models/schemas
├── services/         # Business logic layer
└── utils/            # App-wide utilities
```

## Layer Responsibilities

### **Utils** - Foundation Layer

**Purpose**: Generic, app-wide utilities used everywhere

**Examples:**

```typescript
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
```

### **Helpers** - Domain-Specific Tools

**Purpose**: Simple utilities for specific domains (API operations)

**Examples:**

```typescript
// api/helpers/shortener.ts
export function generateShortCode(): string {
  return nanoid(6); // Just generates random string
}

// api/helpers/url-validator.ts
export function isValidUrl(url: string): boolean {
  return /^https?:\/\//.test(url); // Just validates format
}
```

### **Services** - Business Logic

**Purpose**: Orchestrate complex workflows using helpers, models, and utils

**Examples:**

```typescript
// services/linkService.ts
export async function createShortLink(originalUrl: string) {
  // 1. Validate using helper
  if (!isValidUrl(originalUrl)) {
    logger.warn(`Invalid URL: ${originalUrl}`); // Uses util
    throw new Error("Invalid URL");
  }

  // 2. Check existing links
  const existing = await Link.findByUrl(originalUrl);
  if (existing) return existing;

  // 3. Generate unique code
  let shortCode = generateShortCode(); // Uses helper
  while (await Link.findByCode(shortCode)) {
    shortCode = generateShortCode();
  }

  // 4. Create and save
  const link = await Link.create({ originalUrl, shortCode });
  logger.info(`Created link: ${shortCode}`); // Uses util

  return {
    shortCode,
    originalUrl,
    shortUrl: `${BASE_URL}/${shortCode}`, // Uses util constant
  };
}
```

### **Routes** - HTTP Interface

**Purpose**: Handle HTTP requests/responses, delegate to services

**Examples:**

```typescript
// api/routes/links.ts
export const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
    const result = await linkService.createShortLink(req.body.url);
    res.json(result);
  } catch (error) {
    logger.error(`Shorten failed: ${error.message}`);
    res.status(400).json({ error: error.message });
  }
});

router.get("/:code", async (req, res) => {
  const originalUrl = await linkService.getOriginalUrl(req.params.code);
  if (!originalUrl) return res.status(404).json({ error: "Link not found" });

  // Track click
  await analyticsService.recordClick(req.params.code, req.ip);
  res.redirect(originalUrl);
});
```

## Key Principles

### **Separation of Concerns**

- **Routes**: Handle HTTP only
- **Services**: Business logic only
- **Helpers**: Simple utilities only
- **Utils**: Generic tools only

### **Dependency Flow**

```
Routes → Services → Helpers/Models/Utils
```

### **Example Usage Chain**

```typescript
// 1. Route receives request
app.post("/shorten", async (req, res) => {
  const result = await linkService.createShortLink(req.body.url); // Calls service
  res.json(result);
});

// 2. Service orchestrates business logic
export async function createShortLink(url: string) {
  if (!isValidUrl(url)) throw new Error("Invalid"); // Uses helper
  const code = generateShortCode(); // Uses helper
  logger.info(`Creating: ${code}`); // Uses util
  return await Link.create({ url, code }); // Uses model
}
```

## Benefits

- **Testability**: Each layer can be tested independently
- **Reusability**: Utils and helpers can be used anywhere
- **Maintainability**: Business logic is centralized in services
- **Scalability**: Easy to add new features without affecting existing code
- **Clean Code**: Routes stay simple, complex logic lives in services

## When to Use Each Layer

| **Use Utils for** | **Use Helpers for** | **Use Services for** |
| ----------------- | ------------------- | -------------------- |
| Logging           | URL validation      | Creating short links |
| Constants         | Code generation     | User authentication  |
| Date formatting   | Data sanitization   | Complex workflows    |
| Generic functions | Domain utilities    | Business rules       |

This structure scales from small projects to large applications while keeping code organized and maintainable.
