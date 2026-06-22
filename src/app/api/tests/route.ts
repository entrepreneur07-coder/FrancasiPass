import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') // tef or tcf
  const module = searchParams.get('module') // reading, listening, writing, speaking

  const supabase = createClient()
  let query = supabase.from('mock_tests').select('*')

  if (type) query = query.eq('exam_type', type)
  if (module) query = query.eq('module', module)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ tests: data })
}

// POST would be for adding tests (admin only)
export async function POST(request: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Simplified admin check - in production you'd use a role field or metadata
  if (!user || user.email !== 'admin@francaispass.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const testData = await request.json()
  const { data, error } = await supabase.from('mock_tests').insert(testData).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ test: data[0] })
}
