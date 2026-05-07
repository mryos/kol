import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Check for demo_mode cookie on the client
  if (typeof document !== "undefined" && document.cookie.includes("demo_mode=true")) {
    client.auth.getUser = async () => {
      return { 
        data: { 
          user: { 
            id: "00000000-0000-0000-0000-000000000001", 
            email: "admin@trackkol.demo",
            user_metadata: { full_name: "Admin Demo" },
          } as any 
        }, 
        error: null 
      };
    };
  }

  return client;
}
