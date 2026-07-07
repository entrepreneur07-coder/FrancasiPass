import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://yiztfufqcrkayyptapsn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpenRmdWZxY3JrYXl5cHRhcHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNTg2NjcsImV4cCI6MjA5NzgzNDY2N30.p7lTVt-zjN7ciHx3R0_ulV7eh3CUUQ1Xq8jGWJNZ4uA'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
