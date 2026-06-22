import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { evaluateWriting, evaluateSpeaking } from '@/lib/openai/client'

export async function POST(request: Request) {
  const { type, content, prompt, attempt_id, question_id } = await request.json()
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let result
  try {
    if (type === 'writing') {
      const response = await evaluateWriting(content, prompt)
      result = JSON.parse(response.choices[0].message.content || '{}')
      
      // Save writing submission
      await supabase.from('writing_submissions').insert({
        user_id: user.id,
        prompt,
        user_content: content,
        grammar_score: result.grammar_score,
        coherence_score: result.coherence_score,
        vocabulary_score: result.vocabulary_score,
        task_response_score: result.task_response_score,
        feedback: result.feedback,
        overall_clb: result.overall_clb
      })
    } else if (type === 'speaking') {
      const response = await evaluateSpeaking(content, prompt)
      result = JSON.parse(response.choices[0].message.content || '{}')

      // Save speaking evaluation
      await supabase.from('speaking_evaluations').insert({
        user_id: user.id,
        audio_url: 'pending', // In a real app, you'd upload to Supabase Storage first
        transcript: content,
        pronunciation_score: result.pronunciation_score,
        fluency_score: result.fluency_score,
        grammar_score: result.grammar_score,
        vocabulary_score: result.vocabulary_score,
        feedback: result.feedback,
        overall_clb: result.overall_clb
      })
    } else {
      return NextResponse.json({ error: 'Invalid grading type' }, { status: 400 })
    }

    // Update user_answer feedback if linked to a test
    if (attempt_id && question_id) {
      await supabase.from('user_answers').update({
        ai_feedback: result.feedback
      }).eq('attempt_id', attempt_id).eq('question_id', question_id)
    }

    return NextResponse.json({ result })
  } catch (error: any) {
    console.error('Grading error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
