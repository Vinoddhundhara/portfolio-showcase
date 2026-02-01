import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing. Check your .env file");
}

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./drizzle",
  driver: "pg",

  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
