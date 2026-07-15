import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = 'https://yqeyxmpuftcaujsuyyyj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZXl4bXB1ZnRjYXVqc3V5eXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNjgxNTQsImV4cCI6MjA5OTY0NDE1NH0.FZxFLS-sPtDGYWluowHGdF2-tJGGbd9ClnEMzlVokQc'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
