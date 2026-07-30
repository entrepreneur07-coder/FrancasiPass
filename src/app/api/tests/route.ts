import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'tef' // Default to tef
    const module = searchParams.get('module') // reading, listening, writing, speaking
    const page = Number(searchParams.get('page')) || 1
    const limit = Number(searchParams.get('limit')) || 20
    const offset = (page - 1) * limit

    const supabase = await createClient()

    // Fetch tests with question counts
    let query = supabase
      .from('mock_tests')
      .select('*, test_questions(count)', { count: 'exact' })
      .eq('exam_type', type)
      .range(offset, offset + limit - 1)

    if (module) query = query.eq('module', module)

    const { data, error, count } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Transform to include question count
    const tests = data.map((test: any) => ({
      ...test,
      question_count: test.test_questions?.[0]?.count ?? 0,
    }))

    return NextResponse.json({ 
      tests,
      pagination: {
        page,
        limit,
        total: count
      }
    })
  } catch (error: any) {
    console.error('Tests API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST would be for adding tests (admin only)
export async function POST(request: Request) {
  try {
    const supabase = await createClient()
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
  } catch (error: any) {
    console.error('Tests POST API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
