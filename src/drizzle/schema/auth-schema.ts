import { pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", (t) => ({
  id: t.text("id").primaryKey(),

  email: t.varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: t.varchar("password_hash", { length: 255 }),
  emailVerified: t.boolean("email_verified").default(false).notNull(),
  image: t.text("image"),

  name: t.varchar("name", { length: 255 }).notNull(),
  firstName: t.varchar("first_name", { length: 255 }),
  lastName: t.varchar("last_name", { length: 255 }),

  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}));

export const session = pgTable("session", (t) => ({
  id: t.text("id").primaryKey(),
  expiresAt: t.timestamp("expires_at").notNull(),
  token: t.text("token").notNull().unique(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: t.text("ip_address"),
  userAgent: t.text("user_agent"),
  userId: t.text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}));

export const account = pgTable("account", (t) => ({
  id: t.text("id").primaryKey(),
  accountId: t.text("account_id").notNull(),
  providerId: t.text("provider_id").notNull(),
  userId: t.text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: t.text("access_token"),
  refreshToken: t.text("refresh_token"),
  idToken: t.text("id_token"),
  accessTokenExpiresAt: t.timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at"),
  scope: t.text("scope"),
  password: t.text("password"),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
}));

export const verification = pgTable("verification", (t) => ({
  id: t.text("id").primaryKey(),
  identifier: t.text("identifier").notNull(),
  value: t.text("value").notNull(),
  expiresAt: t.timestamp("expires_at").notNull(),
  createdAt: t.timestamp("created_at").defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
}));
