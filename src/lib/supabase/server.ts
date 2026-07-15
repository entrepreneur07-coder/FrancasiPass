import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = 'https://yqeyxmpuftcaujsuyyyj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZXl4bXB1ZnRjYXVqc3V5eXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNjgxNTQsImV4cCI6MjA5OTY0NDE1NH0.FZxFLS-sPtDGYWluowHGdF2-tJGGbd9ClnEMzlVokQc'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        )
      },
    },
  })
}
