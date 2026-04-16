const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://tanogzslikoogfswmtvd.supabase.co'
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhbm9nenNsaWtvb2dmc3dtdHZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTcwMjQ0NiwiZXhwIjoyMDg3Mjc4NDQ2fQ.vbECFWwxGqPMm8oA-4Rg2ik31Ilh8uTYHC7AmMniViI'

async function test() {
  console.log('Testing connection to:', supabaseUrl)
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
    const { data, error } = await supabase.from('participants').select('*').limit(1)
    
    if (error) {
      console.error('Error Code:', error.code)
      console.error('Error Message:', error.message)
      if (error.code === 'PGRST116' || error.message.includes('relation "participants" does not exist')) {
        console.log('\n!!! HINT: The table "participants" does NOT exist in your Supabase database.')
        console.log('Go to Supabase Dashboard -> SQL Editor and run the SQL provided previously.')
      }
    } else {
      console.log('Success! Connection works and table exists.')
    }
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

test()
