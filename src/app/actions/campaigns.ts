"use server";

import { db } from "@/db";
import { campaigns } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";

export async function createCampaign(formData: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // Get user's company ID (In real app, fetch from users table)
  // For demo, we'll assume the user is linked to a company
  const companyId = "00000000-0000-0000-0000-000000000001"; // Placeholder

  await db.insert(campaigns).values({
    companyId,
    name: formData.name,
    description: formData.description,
    budget: formData.budget,
    targetRevenue: formData.targetRevenue,
    startDate: new Date(formData.startDate),
    endDate: new Date(formData.endDate),
    createdBy: user.id,
    status: "DRAFT",
  });

  revalidatePath("/campaigns");
}

export async function updateCampaignStatus(id: string, status: any) {
  await db.update(campaigns)
    .set({ status })
    .where(eq(campaigns.id, id));

  revalidatePath("/campaigns");
  revalidatePath(`/campaigns/${id}`);
}
