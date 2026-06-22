import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 1. Get stats from daily_stats
  const { data: stats, error: statsError } = await supabase
    .from('daily_stats')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })
    .limit(30)

  if (statsError) {
    return NextResponse.json({ error: statsError.message }, { status: 400 })
  }

  // 2. Get recent test attempts
  const { data: attempts, error: attemptsError } = await supabase
    .from('test_attempts')
    .select(`
      *,
      mock_tests (title, exam_type, module)
    `)
    .eq('user_id', user.id)
    .order('completed_at', { ascending: false })
    .limit(10)

  if (attemptsError) {
    return NextResponse.json({ error: attemptsError.message }, { status: 400 })
  }

  // 3. Aggregate totals
  const totalMinutes = stats.reduce((acc, curr) => acc + (curr.total_minutes || 0), 0)
  const totalTests = stats.reduce((acc, curr) => acc + (curr.tests_completed || 0), 0)
  const wordsLearned = stats.reduce((acc, curr) => acc + (curr.words_learned || 0), 0)

  return NextResponse.json({
    summary: {
      total_minutes: totalMinutes,
      total_tests: totalTests,
      words_learned: wordsLearned,
    },
    daily_stats: stats,
    recent_attempts: attempts
  })
}
