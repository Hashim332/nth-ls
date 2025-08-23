import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Add this line

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
