import { pgTable, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable("users", (t) => ({
  id: t.serial("id").primaryKey(),
  firstName: t.varchar("first_name", { length: 255 }).notNull(),
  lastName: t.varchar("last_name", { length: 255 }).notNull(),
  email: t.varchar("email", { length: 255 }).notNull().unique(),
  password: t.varchar("password_hash", { length: 255 }).notNull(),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}));

export const leadStatus = pgEnum("lead_status", [
  "Pending",
  "Contacted",
  "Responded",
  "Converted",
]);

export const leads = pgTable("leads", (t) => ({
  id: t.serial("id").primaryKey(),
  leadName: t.varchar("lead_name", { length: 255 }).notNull(),
  contact: t.varchar("contact", { length: 255 }),
  email: t.varchar("email", { length: 255 }).notNull(),
  company: t.varchar("company", { length: 255 }),
  campaignName: t.varchar("campaign_name", { length: 255 }),
  status: leadStatus("status").default("Pending").notNull(),
  lastContactDate: t.timestamp("last_contact_date", { withTimezone: true }),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}));

export const campaignStatus = pgEnum("campaign_status", [
  "Draft",
  "Active",
  "Paused",
  "Completed",
]);

export const campaignActions = pgEnum("campaign_actions", [
  "Edit",
  "Pause",
  "Resume",
  "Delete",
]);

export const campaigns = pgTable("campaigns", (t) => ({
  id: t.serial("id").primaryKey(),
  campaignName: t.varchar("campaign_name", { length: 255 }).notNull(),
  status: campaignStatus("status").default("Draft").notNull(),
  totalLeads: t.integer("total_leads").default(0).notNull(),
  successfulLeads: t.integer("successful_leads").default(0).notNull(),
  responseRate: t.real("response_rate").default(0).notNull(),
  progressBar: t.real("progress").default(0).notNull(),
  actions: campaignActions("actions").default("Edit").notNull(),
  createdAt: t.timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}));
