import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  const isDemo = cookieStore.get("demo_mode")?.value === "true";

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );

  if (isDemo) {
    client.auth.getUser = async () => {
      return { 
        data: { 
          user: { 
            id: "00000000-0000-0000-0000-000000000001", 
            email: "admin@trackkol.demo",
            role: "authenticated",
            app_metadata: {},
            user_metadata: { full_name: "Admin Demo" },
            aud: "authenticated",
            created_at: new Date().toISOString(),
          } as any 
        }, 
        error: null 
      };
    };
  }

  return client;
}
