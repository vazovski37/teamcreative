import { createClient } from '@supabase/supabase-js';

// Default to a dummy URL/Key to prevent crashing during build when env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
