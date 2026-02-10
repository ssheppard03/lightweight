import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log("Key Check:", supabaseKey ? "Key Found" : "Key MISSING");

export const supabase = createClient(supabaseUrl, supabaseKey);