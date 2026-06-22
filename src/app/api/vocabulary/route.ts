import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get words due for review
  const { data, error } = await supabase
    .from('user_vocabulary')
    .select(`
      *,
      vocabulary_words (*)
    `)
    .eq('user_id', user.id)
    .lte('next_review', new Date().toISOString())
    .order('next_review', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ due_words: data })
}

export async function POST(request: Request) {
  const { word_id, quality } = await request.json() // quality 0-5
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 1. Get existing SRS data
  const { data: srsData, error: fetchError } = await supabase
    .from('user_vocabulary')
    .select('*')
    .eq('user_id', user.id)
    .eq('word_id', word_id)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    return NextResponse.json({ error: fetchError.message }, { status: 400 })
  }

  // 2. SM-2 Algorithm Simplified
  let interval = 1
  let repetitions = 0
  let easeFactor = 2.5

  if (srsData) {
    interval = srsData.interval
    repetitions = srsData.repetitions
    easeFactor = srsData.ease_factor

    if (quality >= 3) {
      if (repetitions === 0) {
        interval = 1
      } else if (repetitions === 1) {
        interval = 6
      } else {
        interval = Math.round(interval * easeFactor)
      }
      repetitions++
    } else {
      repetitions = 0
      interval = 1
    }

    easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    if (easeFactor < 1.3) easeFactor = 1.3
  } else {
    // New word
    if (quality >= 3) {
      repetitions = 1
      interval = 1
    } else {
      repetitions = 0
      interval = 1
    }
  }

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  // 3. Upsert SRS data
  const { error: upsertError } = await supabase
    .from('user_vocabulary')
    .upsert({
      user_id: user.id,
      word_id,
      interval,
      repetitions,
      ease_factor: easeFactor,
      next_review: nextReview.toISOString(),
      last_reviewed: new Date().toISOString(),
      status: quality >= 4 ? 'mastered' : 'learning'
    })

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, nextReview })
}
