import { supabase, isSupabaseConfigured } from "./supabase";

/** Shape of a quest row in Supabase (matches migration in BACKEND-AND-USERS.md). */
export type QuestRow = {
  id: string;
  created_at: string;
  created_by: string | null;
  title: string;
  tag_ids: string[];
  spots: number;
  when_at: string | null;
  location_name: string | null;
};

/** Payload to create a new quest (from Add screen). */
export type CreateQuestInput = {
  title: string;
  tagIds: string[];
  spots: number;
  whenAt: Date | null;
  locationName?: string | null;
};

/**
 * Insert a new quest. Requires auth when RLS is enabled (created_by = auth.uid()).
 * Returns the new row or an error. No-op if Supabase is not configured.
 */
export async function createQuest(input: CreateQuestInput): Promise<{ data: QuestRow | null; error: Error | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: null, error: new Error("Backend not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to .env") };
  }

  const { data, error } = await supabase
    .from("quests")
    .insert({
      title: input.title.trim(),
      tag_ids: input.tagIds,
      spots: input.spots,
      when_at: input.whenAt?.toISOString() ?? null,
      location_name: input.locationName ?? null,
    })
    .select("id, created_at, created_by, title, tag_ids, spots, when_at, location_name")
    .single();

  if (error) return { data: null, error };
  return { data: data as QuestRow, error: null };
}

/**
 * Fetch recent quests for feed/map. Returns empty array if backend not configured or error.
 */
export async function fetchQuests(limit = 50): Promise<{ data: QuestRow[]; error: Error | null }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("quests")
    .select("id, created_at, created_by, title, tag_ids, spots, when_at, location_name")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) return { data: [], error };
  return { data: (data ?? []) as QuestRow[], error: null };
}
