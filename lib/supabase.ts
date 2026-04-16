import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("CRITICAL: Supabase environment variables are missing!")
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co", 
  supabaseServiceRoleKey || "placeholder"
)
