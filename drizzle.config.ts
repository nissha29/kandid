import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: "./drizzle/migrations",
    schema: "./src/drizzle/schema/index.ts",
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
