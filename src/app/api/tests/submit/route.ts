import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { calculateCLB } from '@/lib/utils/clb'
import { evaluateWriting, evaluateSpeaking } from '@/lib/openai/client'

export async function POST(request: Request) {
  const { test_id, answers } = await request.json()
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 0. Get test metadata
  const { data: test } = await supabase
    .from('mock_tests')
    .select('*')
    .eq('id', test_id)
    .single()

  if (!test) {
    return NextResponse.json({ error: 'Test not found' }, { status: 404 })
  }

  // 1. Create a test attempt
  const { data: attempt, error: attemptError } = await supabase
    .from('test_attempts')
    .insert({
      user_id: user.id,
      test_id,
      started_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (attemptError) {
    return NextResponse.json({ error: attemptError.message }, { status: 400 })
  }

  // 2. Fetch questions
  const { data: questions } = await supabase
    .from('test_questions')
    .select('*')
    .eq('test_id', test_id)

  if (!questions) {
    return NextResponse.json({ error: 'Questions not found' }, { status: 400 })
  }

  let totalScore = 0
  let maxScore = 0
  const userAnswers = []

  if (test.module === 'reading' || test.module === 'listening') {
    // OBJECTIVE SCORING
    for (const q of questions) {
      const userAnswer = answers[q.id]
      const isCorrect = userAnswer === q.correct_answer
      if (isCorrect) totalScore += q.points
      maxScore += q.points

      userAnswers.push({
        attempt_id: attempt.id,
        question_id: q.id,
        selected_answer: userAnswer,
        is_correct: isCorrect
      })
    }
  } else {
    // SUBJECTIVE SCORING (Writing/Speaking)
    const gradingPromises = questions.map(async (q) => {
      const userAnswer = answers[q.id]
      if (!userAnswer) return null

      let aiFeedback = ''
      let score = 0

      try {
        if (test.module === 'writing') {
          const evalRes = await evaluateWriting(userAnswer, q.question_text)
          const result = JSON.parse(evalRes.choices[0].message.content || '{}')
          aiFeedback = result.feedback
          score = Number(result.overall_clb) || 0
        } else {
          const evalRes = await evaluateSpeaking(userAnswer, q.question_text)
          const result = JSON.parse(evalRes.choices[0].message.content || '{}')
          aiFeedback = result.feedback
          score = Number(result.overall_clb) || 0
        }
      } catch (err) {
        console.error('Grading error:', err)
        aiFeedback = 'Error during AI grading.'
      }

      return {
        attempt_id: attempt.id,
        question_id: q.id,
        selected_answer: userAnswer,
        ai_feedback: aiFeedback,
        score // temporary field to aggregate
      }
    })

    const gradedAnswers = await Promise.all(gradingPromises)
    
    for (const graded of gradedAnswers) {
      if (!graded) continue
      totalScore += graded.score
      maxScore += 10
      
      const { score, ...answerData } = graded
      userAnswers.push(answerData)
    }
  }

  // 3. Save answers
  await supabase.from('user_answers').insert(userAnswers)

  // 4. Update attempt
  const clbEquivalent = test.module === 'reading' || test.module === 'listening' 
    ? calculateCLB(totalScore, maxScore)
    : Math.round(totalScore / (userAnswers.length || 1))

  const { data: updatedAttempt } = await supabase
    .from('test_attempts')
    .update({
      score: totalScore,
      max_score: maxScore,
      clb_equivalent: clbEquivalent,
      completed_at: new Date().toISOString()
    })
    .eq('id', attempt.id)
    .select()
    .single()

  return NextResponse.json({ 
    attempt_id: attempt.id, 
    score: totalScore, 
    max_score: maxScore,
    clb: clbEquivalent,
    module: test.module,
    answers: userAnswers
  })
}
