# Link Shortener (nth-ls)

A clean, lightweight link shortener application built with React, TypeScript, and Express.js. Perfect for small to medium-scale deployments without heavy infrastructure requirements.

## 🚀 API Setup Guide

Follow these steps in order to set up your link shortener API from scratch:

### 1. **Database Setup & Schema Design**

First, design your database schema. Here's a recommended lightweight schema for PostgreSQL with Drizzle ORM:

```typescript
// backend/src/db/schema.ts
import {
  pgTable,
  varchar,
  timestamp,
  integer,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const linksTable = pgTable(
  "links",
  {
    id: varchar("id", { length: 21 }).primaryKey(), // Custom UUID/KSUID
    shortCode: varchar("short_code", { length: 10 }).notNull().unique(),
    originalUrl: varchar("original_url", { length: 2048 }).notNull(),
    title: varchar("title", { length: 500 }), // Optional: page title
    createdAt: timestamp("created_at").defaultNow().notNull(),
    expiresAt: timestamp("expires_at"), // Optional: TTL
    isActive: boolean("is_active").default(true).notNull(),
    clickCount: integer("click_count").default(0).notNull(),
    createdBy: varchar("created_by", { length: 50 }), // Optional: user tracking
  },
  (table) => ({
    shortCodeIdx: index("short_code_idx").on(table.shortCode),
    createdAtIdx: index("created_at_idx").on(table.createdAt),
  })
);

export const clicksTable = pgTable(
  "clicks",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    linkId: varchar("link_id", { length: 21 }).references(() => linksTable.id),
    ipAddress: varchar("ip_address", { length: 45 }), // IPv6 compatible
    userAgent: varchar("user_agent", { length: 500 }),
    referer: varchar("referer", { length: 500 }),
    clickedAt: timestamp("clicked_at").defaultNow().notNull(),
  },
  (table) => ({
    linkIdIdx: index("link_id_idx").on(table.linkId),
    clickedAtIdx: index("clicked_at_idx").on(table.clickedAt),
  })
);
```

### 2. **Core Utilities - UUID Generator**

Create your custom UUID generator utility:

```typescript
// backend/src/utils/id-generator.ts
export function generateId(): string {
  // Your custom implementation here
  // See resources below for implementation approaches
}

export function generateShortCode(length: number = 6): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
```

### 3. **API Structure Setup**

Create your API structure without a services directory:

```
backend/src/
├── index.ts              # Server entry point
├── db/
│   ├── schema.ts         # Database schema
│   └── connection.ts     # DB connection setup
├── api/
│   ├── routes/           # Route handlers
│   │   ├── links.ts      # Link CRUD operations
│   │   └── analytics.ts  # Click tracking & stats
│   ├── middleware/       # Express middleware
│   │   ├── cors.ts
│   │   ├── rateLimit.ts
│   │   └── validation.ts
│   └── helpers/          # Domain-specific utilities
│       ├── url-validator.ts
│       └── link-resolver.ts
└── utils/               # App-wide utilities
    ├── id-generator.ts
    ├── logger.ts
    └── constants.ts
```

### 4. **Route Implementation Order**

Implement routes in this order for logical development flow:

1. **POST /api/links** - Create short links
2. **GET /:shortCode** - Redirect to original URL
3. **GET /api/links/:id** - Get link details
4. **GET /api/links** - List links (with pagination)
5. **DELETE /api/links/:id** - Delete/deactivate links
6. **GET /api/analytics/:id** - Get click analytics

### 5. **Essential Middleware Setup**

```typescript
// backend/src/index.ts
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

// Basic middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Rate limiting for link creation
const createLinkLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many links created, try again later.",
});

app.use("/api/links", createLinkLimiter);
```

### 6. **Environment Configuration**

```bash
# .env
DATABASE_URL="postgresql://username:password@localhost:5432/linkshortener"
PORT=3001
BASE_URL="http://localhost:3001"
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

### 7. **Testing Strategy**

Set up basic testing for core functionality:

- URL validation
- Short code generation (uniqueness)
- Link creation and retrieval
- Analytics tracking

## 🔧 Custom UUID Generator Resources

Since you'll be building your own UUID generator utility, here are essential resources:

### **Algorithm Options:**

1. **KSUID (K-Sortable Unique Identifier)**

   - [KSUID Specification](https://github.com/segmentio/ksuid)
   - Time-ordered, collision-resistant
   - Good for distributed systems

2. **Snowflake ID (Twitter's approach)**

   - [Snowflake ID explained](https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake)
   - Timestamp + machine ID + sequence
   - Excellent performance at scale

3. **NanoID Alternative**
   - [NanoID GitHub](https://github.com/ai/nanoid)
   - Study the algorithm for custom implementation
   - URL-safe, compact

### **Implementation Resources:**

- **[High-Performance ID Generation](https://instagram-engineering.com/sharding-ids-at-instagram-1cf5a71e5a5c)** - Instagram's approach
- **[UUID Performance Comparison](https://sudhir.io/uuids-ulids)** - Benchmarks and trade-offs
- **[Collision Probability Calculator](https://zelark.github.io/nano-id-cc/)** - For testing your implementation

### **Security Considerations:**

- **[Timing Attack Prevention](https://codahale.com/a-lesson-in-timing-attacks/)** - Important for secure ID generation
- **[Cryptographically Secure Random](https://nodejs.org/api/crypto.html#crypto_crypto_randomuuid_options)** - Node.js crypto module

### **Testing Your Implementation:**

```typescript
// Test for uniqueness and performance
function testIdGenerator() {
  const ids = new Set();
  const iterations = 1000000;

  console.time("Generation Time");
  for (let i = 0; i < iterations; i++) {
    const id = generateId();
    if (ids.has(id)) {
      console.error("Collision detected!", id);
    }
    ids.add(id);
  }
  console.timeEnd("Generation Time");
  console.log(`Generated ${ids.size} unique IDs`);
}
```

## 🏗️ Next Steps

1. Set up your database and run migrations
2. Implement the UUID generator using the resources above
3. Build the core API endpoints
4. Add basic analytics tracking
5. Implement frontend integration
6. Deploy with your preferred hosting solution

This setup gives you a solid foundation for a lightweight but robust link shortener that can handle moderate traffic without complex infrastructure.
