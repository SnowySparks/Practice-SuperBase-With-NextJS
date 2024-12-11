"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "types_db";

export async function createServerSupabaseClient(
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin: boolean = false
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = admin
    ? process.env.SUPABASE_SERVICE_ROLE_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const cookieInstance = await cookieStore;

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieInstance.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieInstance.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        cookieInstance.delete({ name, ...options });
      },
    },
  });
}

export async function createServerSupabaseAdminClient(
  cookieStore: ReturnType<typeof cookies> = cookies()
) {
  return createServerSupabaseClient(cookieStore, true);
}
