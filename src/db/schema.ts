import {
  pgTable,
  uuid,
  text,
  timestamp,
  numeric,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", [
  "SUPER_ADMIN",
  "COMPANY_ADMIN",
  "MARKETING_MANAGER",
  "FINANCE",
  "VIEWER",
]);

export const campaignStatusEnum = pgEnum("campaign_status", [
  "DRAFT",
  "PENDING_APPROVAL",
  "APPROVED",
  "RUNNING",
  "COMPLETED",
]);

export const influencerStatusEnum = pgEnum("influencer_status", [
  "PROPOSED",
  "ACCEPTED",
  "REJECTED",
  "CONTRACTED",
]);

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  industry: text("industry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(), // Matches Supabase Auth ID
  companyId: uuid("company_id")
    .references(() => companies.id)
    .notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum("role").default("VIEWER").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => companies.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  budget: numeric("budget", { precision: 15, scale: 2 }).notNull(),
  targetRevenue: numeric("target_revenue", {
    precision: 15,
    scale: 2,
  }).notNull(),
  status: campaignStatusEnum("status").default("DRAFT").notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  createdBy: uuid("created_by")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const influencers = pgTable("influencers", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => companies.id)
    .notNull(),
  name: text("name").notNull(),
  platform: text("platform").notNull(), // TikTok, Instagram, YouTube
  followers: integer("followers").notNull(),
  engagementRate: numeric("engagement_rate", {
    precision: 5,
    scale: 2,
  }).notNull(),
  fee: numeric("fee", { precision: 12, scale: 2 }).notNull(),
  voucherCode: text("voucher_code"),
  phone: text("phone"),
  email: text("email"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const campaignInfluencers = pgTable("campaign_influencers", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id")
    .references(() => campaigns.id)
    .notNull(),
  influencerId: uuid("influencer_id")
    .references(() => influencers.id)
    .notNull(),
  agreedFee: numeric("agreed_fee", { precision: 12, scale: 2 }).notNull(),
  status: influencerStatusEnum("status").default("PROPOSED").notNull(),
  assignedAt: timestamp("assigned_at").defaultNow().notNull(),
});

export const conversions = pgTable("conversions", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id")
    .references(() => campaigns.id)
    .notNull(),
  influencerId: uuid("influencer_id")
    .references(() => influencers.id)
    .notNull(),
  orders: integer("orders").notNull(),
  revenue: numeric("revenue", { precision: 15, scale: 2 }).notNull(),
  conversionDate: timestamp("conversion_date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const approvals = pgTable("approvals", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id")
    .references(() => campaigns.id)
    .notNull(),
  requestedBy: uuid("requested_by")
    .references(() => users.id)
    .notNull(),
  approvedBy: uuid("approved_by").references(() => users.id),
  status: text("status").notNull(), // PENDING, APPROVED, REJECTED
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contentSubmissions = pgTable("content_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  campaignId: uuid("campaign_id")
    .references(() => campaigns.id)
    .notNull(),
  influencerId: uuid("influencer_id")
    .references(() => influencers.id)
    .notNull(),
  contentUrl: text("content_url").notNull(),
  platform: text("platform").notNull(),
  views: integer("views").default(0),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

// Relations
export const companiesRelations = relations(companies, ({ many }) => ({
  users: many(users),
  campaigns: many(campaigns),
  influencers: many(influencers),
}));

export const campaignsRelations = relations(campaigns, ({ one, many }) => ({
  company: one(companies, {
    fields: [campaigns.companyId],
    references: [companies.id],
  }),
  createdBy: one(users, {
    fields: [campaigns.createdBy],
    references: [users.id],
  }),
  influencers: many(campaignInfluencers),
  conversions: many(conversions),
  approvals: many(approvals),
  contentSubmissions: many(contentSubmissions),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  company: one(companies, {
    fields: [users.companyId],
    references: [companies.id],
  }),
  campaignsCreated: many(campaigns),
  approvalsRequested: many(approvals, { relationName: "requestedBy" }),
  approvalsGiven: many(approvals, { relationName: "approvedBy" }),
}));
