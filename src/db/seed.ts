import { db } from "./index";
import { companies, users, campaigns, influencers } from "./schema";
import { v4 as uuidv4 } from "uuid";

async function main() {
  console.log("Seeding started...");

  // 1. Create Company
  const companyId = uuidv4();
  await db.insert(companies).values({
    id: companyId,
    name: "PT Maju Jaya FMCG",
    industry: "Food & Beverage",
  });

  // 2. Create Users
  // Using fixed UUIDs for demo purposes (these would normally come from Supabase Auth)
  const adminId = "00000000-0000-0000-0000-000000000001"; 
  const managerId = "00000000-0000-0000-0000-000000000002";
  
  await db.insert(users).values([
    {
      id: adminId,
      companyId,
      fullName: "Admin TrackKOL",
      email: "admin@trackkol.demo",
      role: "COMPANY_ADMIN",
    },
    {
      id: managerId,
      companyId,
      fullName: "Marketing Manager",
      email: "manager@trackkol.demo",
      role: "MARKETING_MANAGER",
    },
  ]);

  // 3. Create Influencers
  const influencersData = await db.insert(influencers).values([
    {
      companyId,
      name: "Sarah Johnson",
      platform: "Instagram",
      followers: 125000,
      engagementRate: "4.2",
      fee: "1200",
      email: "sarah@influencer.com",
    },
    {
      companyId,
      name: "Mark Tuan",
      platform: "YouTube",
      followers: 500000,
      engagementRate: "3.5",
      fee: "3500",
      email: "mark@vlogs.com",
    },
    {
      companyId,
      name: "Alica Keys",
      platform: "TikTok",
      followers: 850000,
      engagementRate: "5.8",
      fee: "5000",
      email: "alica@tiktok.com",
    },
    {
      companyId,
      name: "Chef Arnold",
      platform: "Instagram",
      followers: 2500000,
      engagementRate: "2.1",
      fee: "15000",
      email: "chef@arnold.com",
    },
  ]).returning();

  // 4. Create Campaigns
  const campaignData = await db.insert(campaigns).values([
    {
      id: uuidv4(),
      companyId,
      name: "Ramadan Flash Sale 2026",
      budget: "15000",
      targetRevenue: "45000",
      status: "RUNNING",
      startDate: new Date("2026-03-10"),
      endDate: new Date("2026-04-10"),
      createdBy: managerId,
    },
    {
      id: uuidv4(),
      companyId,
      name: "New Product Launch: Healthy Snack",
      budget: "25000",
      targetRevenue: "100000",
      status: "APPROVED",
      startDate: new Date("2026-06-01"),
      endDate: new Date("2026-07-01"),
      createdBy: managerId,
    },
  ]).returning();

  // 5. Create Conversions (Dummy ROI Data)
  await db.insert(conversions).values([
    {
      campaignId: campaignData[0].id,
      influencerId: influencersData[0].id,
      orders: 450,
      revenue: "5400",
      conversionDate: new Date("2026-03-15"),
    },
    {
      campaignId: campaignData[0].id,
      influencerId: influencersData[1].id,
      orders: 1200,
      revenue: "18500",
      conversionDate: new Date("2026-03-16"),
    },
  ]);

  console.log("Seeding finished!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
