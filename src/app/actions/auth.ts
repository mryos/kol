"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAsDemo() {
  const cookieStore = await cookies();
  
  // Set demo mode cookie for 1 day
  cookieStore.set("demo_mode", "true", {
    path: "/",
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  });

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("demo_mode");
  redirect("/login");
}
