import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  
  // Get test metadata
  const { data: test, error: testError } = await supabase
    .from('mock_tests')
    .select('*')
    .eq('id', params.id)
    .single()

  if (testError) {
    return NextResponse.json({ error: testError.message }, { status: 400 })
  }

  // Get test questions
  const { data: questions, error: questionsError } = await supabase
    .from('test_questions')
    .select('*')
    .eq('test_id', params.id)
    .order('order_index', { ascending: true })

  if (questionsError) {
    return NextResponse.json({ error: questionsError.message }, { status: 400 })
  }

  return NextResponse.json({ test, questions })
}
