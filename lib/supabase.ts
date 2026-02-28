import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { createClient } from "@supabase/supabase-js";

const extra = Constants.expoConfig?.extra as { supabaseUrl?: string; supabaseAnonKey?: string } | undefined;
const supabaseUrl = extra?.supabaseUrl ?? process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = extra?.supabaseAnonKey ?? process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

/** Only use when backend is configured; otherwise calls will fail. */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
