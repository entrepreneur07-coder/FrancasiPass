import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { calculateCLB } from '@/lib/utils/clb'
import { evaluateWriting, evaluateSpeaking } from '@/lib/openai/client'
import { transcribeAudioBuffer } from '@/lib/deepgram'

export async function POST(request: Request) {
  try {
    const { test_id, answers } = await request.json()
    const supabase = await createClient()
    
    // Get user if authenticated (optional — works for both logged-in and anonymous users)
    const { data: { user } } = await supabase.auth.getUser()

    // 0. Get test metadata
    const { data: test, error: testFetchError } = await supabase
      .from('mock_tests')
      .select('*')
      .eq('id', test_id)
      .single()

    if (testFetchError || !test) {
      return NextResponse.json({ error: 'Test not found' }, { status: 404 })
    }

    // 1. Create a test attempt (works for both authenticated and anonymous users)
    const { data: attempt, error: attemptError } = await supabase
      .from('test_attempts')
      .insert({
        user_id: user?.id || null,
        test_id,
        started_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (attemptError) {
      return NextResponse.json({ error: `Failed to create attempt: ${attemptError.message}` }, { status: 400 })
    }

    // 2. Fetch questions
    const { data: questions, error: questionsError } = await supabase
      .from('test_questions')
      .select('*')
      .eq('test_id', test_id)

    if (questionsError || !questions) {
      return NextResponse.json({ error: `Questions not found: ${questionsError?.message}` }, { status: 400 })
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
          user_answer: userAnswer || '',
          is_correct: isCorrect
        })
      }
    } else {
      // SUBJECTIVE SCORING (Writing/Speaking)
      const gradingPromises = questions.map(async (q) => {
        const userAnswer = answers[q.id]
        if (!userAnswer) return { questionId: q.id, points: q.points || 10, skipped: true }

        let aiFeedback = ''
        let score = 0
        let transcript = ''

        try {
          if (test.module === 'writing') {
            const evalRes = await evaluateWriting(userAnswer, q.question_text)
            const result = JSON.parse(evalRes.choices[0].message.content || '{}')
            aiFeedback = result.feedback
            score = Number(result.overall_clb) || 0
          } else {
            // SPEAKING - needs transcription
            try {
              // Extract base64 part
              const base64Data = userAnswer.includes(',') ? userAnswer.split(',')[1] : userAnswer
              const buffer = Buffer.from(base64Data, 'base64')
              transcript = await transcribeAudioBuffer(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength))
              
              const evalRes = await evaluateSpeaking(transcript, q.question_text)
              const result = JSON.parse(evalRes.choices[0].message.content || '{}')
              aiFeedback = result.feedback
              score = Number(result.overall_clb) || 0
            } catch (transcribeErr) {
              console.error('Transcription/Grading error:', transcribeErr)
              aiFeedback = 'Transcription ou évaluation indisponible.'
              score = 0
            }
          }
        } catch (err) {
          console.error('Grading error:', err)
          aiFeedback = 'Erreur lors de l\'évaluation AI.'
          score = 0
        }

        return {
          attempt_id: attempt.id,
          question_id: q.id,
          user_answer: test.module === 'speaking' ? (transcript || 'Audio submitted') : userAnswer,
          ai_feedback: aiFeedback,
          score, // temporary field to aggregate
          skipped: false,
          questionPoints: q.points || 10
        }
      })

      const gradedAnswers = await Promise.all(gradingPromises)

      // Calculate maxScore from ALL questions, not just answered ones
      for (const graded of gradedAnswers) {
        if (graded?.skipped) {
          maxScore += graded.points
          continue
        }
        if (!graded) continue
        totalScore += graded.score
        maxScore += graded.questionPoints || graded.points || 10

        const { score, skipped, questionPoints, ...answerData } = graded
        userAnswers.push(answerData)
      }
    }

    // 3. Save answers
    if (userAnswers.length > 0) {
      const { error: insertError } = await supabase.from('user_answers').insert(userAnswers)
      if (insertError) {
        console.error('Error inserting user answers:', insertError)
        // We continue even if saving answers fails, so the user gets their result
      }
    }

    // 4. Update attempt
    const clbEquivalent = test.module === 'reading' || test.module === 'listening' 
      ? calculateCLB(totalScore, maxScore)
      : Math.round(totalScore / (userAnswers.length || 1))

    const { data: updatedAttempt, error: updateError } = await supabase
      .from('test_attempts')
      .update({
        score: totalScore,
        max_score: maxScore,
        clb_level: clbEquivalent,
        completed_at: new Date().toISOString()
      })
      .eq('id', attempt.id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating test attempt:', updateError)
    }

    return NextResponse.json({ 
      attempt_id: attempt.id, 
      score: totalScore, 
      max_score: maxScore,
      clb: clbEquivalent,
      module: test.module,
      answers: userAnswers
    })
  } catch (error: any) {
    console.error('Submit API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


