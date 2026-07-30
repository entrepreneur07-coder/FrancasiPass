import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number(searchParams.get('limit')) || 10
    const difficulty = searchParams.get('difficulty')

    const supabase = await createClient()
    let query = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (difficulty) {
      query = query.eq('difficulty_level', difficulty)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ articles: data })
  } catch (error: any) {
    console.error('News GET Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Admin check
    if (user.email !== 'admin@francaispass.com') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const articleData = await request.json()
    const { data, error } = await supabase
      .from('news_articles')
      .insert(articleData)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ article: data[0] })
  } catch (error: any) {
    console.error('News POST Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

