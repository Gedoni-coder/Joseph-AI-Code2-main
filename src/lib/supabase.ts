/**
 * Supabase client for the frontend.
 * Uses VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from .env.
 * Use for Supabase Auth, Realtime, or direct table access if you add those flows.
 */

import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase =
  url && anonKey
    ? createClient(url, anonKey)
    : (null as ReturnType<typeof createClient> | null);

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
