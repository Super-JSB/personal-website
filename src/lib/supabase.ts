import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Server-only client using the service role key. Never import this from a
// client component — the `server-only` guard above will fail the build if
// something tries to bundle it into browser JS.
export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  client = createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
    global: {
      // Prevent Next.js from caching Supabase responses so admin edits and
      // new posts show up immediately, not just after the next build.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });

  return client;
}
