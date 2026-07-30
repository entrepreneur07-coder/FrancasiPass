"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, CardDescription, AnswerReviewSkeleton } from "@/components/ui"
import Link from "next/link"
import Confetti from "@/components/ui/Confetti"

interface ResultData {
  attempt_id: string;
  score: number;
  max_score: number;
  clb: number;
  module: string;
  title: string;
  answers: { 
    question_id: string; 
    question: string; 
    user_answer: string; 
    correct_answer: string | null; 
    is_correct: boolean;
    ai_feedback?: string;
  }[];
}

/* Count-up animation hook */
function useCountUp(target: number, duration: number = 1500, start: boolean = true) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!start || target === 0) {
      setValue(target)
      return
    }
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, start])

  return value
}

export default function ResultsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<ResultData | null>(null)
  const attemptId = params.id as string

  useEffect(() => {
    async function fetchResult() {
      const cached = localStorage.getItem(`test_result_${attemptId}`)
      if (cached) {
        try {
          const data = JSON.parse(cached)
          setResult({
            attempt_id: attemptId,
            score: data.score,
            max_score: data.max_score,
            clb: data.clb,
            module: data.module,
            title: data.title,
            answers: data.questions.map((q: any) => ({
              question_id: q.id,
              question: q.question_text,
              user_answer: data.answers[q.id] || "",
              correct_answer: q.correct_answer,
              is_correct: data.answers[q.id] === q.correct_answer,
            }))
          })
          setLoading(false)
          return
        } catch (e) {
          console.error("Error parsing cache", e)
        }
      }

      setLoading(true)
      try {
        const supabase = (await import("@/lib/supabase/client")).createClient()
        const { data: attempt, error: attemptError } = await supabase
          .from('test_attempts')
          .select('*')
          .eq('id', attemptId)
          .single()

        if (attemptError || !attempt) throw new Error("Attempt not found")

        const { data: test, error: testError } = await supabase
          .from('mock_tests')
          .select('*')
          .eq('id', attempt.test_id)
          .single()

        if (testError || !test) throw new Error("Test not found")

        const { data: questions, error: questionsError } = await supabase
          .from('test_questions')
          .select('*')
          .eq('test_id', attempt.test_id)
          .order('order_index', { ascending: true })

        if (questionsError) throw new Error("Questions not found")

        const { data: userAnswers, error: answersError } = await supabase
          .from('user_answers')
          .select('*')
          .eq('attempt_id', attemptId)

        if (answersError) throw new Error("Answers not found")

        const combinedAnswers = questions.map(q => {
          const userAnswer = userAnswers.find(ua => ua.question_id === q.id)
          return {
            question_id: q.id,
            question: q.question_text || "No question text",
            user_answer: userAnswer?.user_answer || "",
            correct_answer: q.correct_answer,
            is_correct: userAnswer?.is_correct ?? false,
            ai_feedback: userAnswer?.ai_feedback
          }
        })

        setResult({
          attempt_id: attemptId,
          score: attempt.score || 0,
          max_score: attempt.max_score || 0,
          clb: attempt.clb_level || 0,
          module: test.module,
          title: test.title,
          answers: combinedAnswers
        })
      } catch (err) {
        console.error("Error fetching results:", err)
      } finally {
        setLoading(false)
      }
    }

    if (attemptId) {
      fetchResult()
    }
  }, [attemptId])

  // --- After result is loaded, compute all derived values ---
  const percentage = result && result.max_score > 0 ? Math.round((result.score / result.max_score) * 100) : 0
  const isHighScore = percentage >= 80
  const animatedClb = useCountUp(result?.clb || 0, 1200, !loading)
  const animatedPct = useCountUp(percentage, 1500, !loading)

  const getScoreColor = (pct: number) => {
    if (pct >= 80) return "text-success"
    if (pct >= 60) return "text-warning"
    return "text-error"
  }

  const correctCount = result?.answers?.filter((a) => a.is_correct).length ?? 0
  const isSubjective = result?.module === "writing" || result?.module === "speaking"

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
        <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
          <div className="section-container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">FP</div>
              <span className="font-semibold text-lg text-gray-900 dark:text-white">FrancaisPass</span>
            </div>
          </div>
        </header>
        <main className="section-container py-8">
          <div className="max-w-4xl mx-auto">
            {/* Score hero skeleton */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center h-28 w-28 rounded-full bg-gray-200 dark:bg-surface-dark-border animate-pulse mb-4" />
              <div className="h-8 w-48 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded mx-auto mb-2" />
              <div className="h-4 w-64 bg-gray-100 dark:bg-surface-dark-muted animate-pulse rounded mx-auto" />
            </div>
            {/* Stat cards skeleton */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-2xl border border-surface-border dark:border-surface-dark-border p-5">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded mb-3" />
                  <div className="h-8 w-16 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded mb-1" />
                  <div className="h-3 w-24 bg-gray-100 dark:bg-surface-dark-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
            {/* Answer review skeletons */}
            <div className="space-y-3">
              {[1,2,3,4].map(i => <AnswerReviewSkeleton key={i} />)}
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-surface-dark flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle>Result not found</CardTitle>
            <CardDescription>We couldn&apos;t find the test attempt you&apos;re looking for.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard')} className="w-full">Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      {/* Confetti for high scores */}
      {isHighScore && <Confetti />}

      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">FrancaisPass</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white">
              <span className="text-xs font-medium opacity-90">CLB</span>
              <span className="text-xl font-bold">{result.clb}</span>
            </div>
            <Link href="/tests">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">← Test Library</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Score Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-10"
          >
            {/* CLB Score Circle — larger and count-up animated */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center justify-center h-32 w-32 rounded-full bg-white dark:bg-surface-dark-muted shadow-elevated mb-4 border-4 border-gray-100 dark:border-surface-dark-border relative"
            >
              {/* Circular progress */}
              <svg className="absolute inset-0 -rotate-90 h-32 w-32" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" 
                  className="text-gray-100 dark:text-surface-dark-border" strokeWidth="6" />
                <circle cx="64" cy="64" r="58" fill="none" stroke="currentColor" 
                  className={getScoreColor(percentage)} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 58}`}
                  strokeDashoffset={`${2 * Math.PI * 58 * (1 - animatedPct / 100)}`}
                  style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                />
              </svg>
              <div className="text-center relative z-10">
                <motion.div 
                  className={`text-display font-bold ${getScoreColor(percentage)}`}
                  key={animatedClb}
                >
                  {animatedClb}
                </motion.div>
                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">CLB</div>
              </div>
            </motion.div>

            <h1 className="text-display font-bold mb-2">
              {isHighScore ? "Excellent Work! 🎉" : percentage >= 60 ? "Good Effort! 💪" : "Keep Practicing! 📚"}
            </h1>
            <p className="text-body-lg text-gray-600 dark:text-gray-400">
              {result.title}
            </p>
          </motion.div>

          {/* Score Breakdown */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { 
                label: "Score", 
                value: isSubjective ? `${result.score}/10` : `${result.score}/${result.max_score}`, 
                sub: isSubjective ? "Avg CLB Score" : `${animatedPct}% correct`, 
                color: getScoreColor(percentage) 
              },
              { label: "Estimated CLB", value: `${animatedClb}`, sub: "Canadian Language Benchmark", color: "text-primary-600 dark:text-primary-400" },
              { 
                label: "Module", 
                value: result.module.charAt(0).toUpperCase() + result.module.slice(1), 
                sub: "Exam Section", 
                color: "text-accent-600 dark:text-accent-400" 
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent className="p-5">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className={`text-display font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.sub}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Answer Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Answer Review</CardTitle>
                <CardDescription>Review your responses and see {isSubjective ? "AI feedback" : "correct answers"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.answers.map((ans, i) => (
                  <motion.div
                    key={ans.question_id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08 }}
                    className={`p-4 rounded-xl border ${
                      isSubjective
                        ? "bg-white dark:bg-surface-dark-muted border-surface-border dark:border-surface-dark-border"
                        : ans.is_correct
                        ? "bg-success-light/30 dark:bg-success-dark/10 border-success/20 dark:border-success/30"
                        : "bg-error-light/30 dark:bg-error-dark/10 border-error/20 dark:border-error/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {!isSubjective && (
                        <div className={`mt-0.5 h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${
                          ans.is_correct ? "bg-success text-white" : "bg-error text-white"
                        }`}>
                          {ans.is_correct ? (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-gray-900 dark:text-white mb-2 font-medium"
                          dangerouslySetInnerHTML={{
                            __html: (ans.question.includes("Question :") || ans.question.includes("Question:")
                              ? ans.question.split(/Question\s*:/i).slice(1).join("Question :").trim()
                              : ans.question).replace(/\n/g, '<br/>')
                          }}
                        />

                        <div className="flex flex-col gap-2">
                          {/* User Answer — show dash if no answer */}
                          <div className="p-3 bg-gray-50 dark:bg-surface-dark rounded-lg">
                            <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Your response:</span>
                            {!ans.user_answer || ans.user_answer === "No answer" ? (
                              <span className="text-sm text-gray-400 dark:text-gray-500 italic flex items-center gap-1">
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                </svg>
                                No answer provided
                              </span>
                            ) : (
                              <span className={`text-sm ${!isSubjective ? (ans.is_correct ? "text-success font-medium" : "text-error font-medium") : "text-gray-700 dark:text-gray-300"}`}>
                                {ans.user_answer}
                              </span>
                            )}
                          </div>

                          {!isSubjective && !ans.is_correct && (
                            <div className="p-3 bg-success-light/10 dark:bg-success-dark/5 border border-success/10 rounded-lg">
                              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Correct answer:</span>
                              <span className="text-sm text-success font-medium">{ans.correct_answer}</span>
                            </div>
                          )}

                          {ans.ai_feedback && (
                            <div className="p-4 bg-primary-50 dark:bg-primary-950/20 border border-primary-100 dark:border-primary-900/30 rounded-lg mt-2">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="h-5 w-5 rounded bg-primary-500 flex items-center justify-center text-[10px] text-white font-bold">AI</div>
                                <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wider">AI Evaluation</span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic">
                                &quot;{ans.ai_feedback}&quot;
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href={`/tests/${searchParams.get("testId") || ""}`}>
              <Button variant="outline" size="xl" className="text-base w-full sm:w-auto">
                Retake This Test
              </Button>
            </Link>
            <Link href="/tests">
              <Button variant="outline" size="xl" className="text-base w-full sm:w-auto">
                More Practice Tests
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="xl" className="text-base w-full sm:w-auto">
                Back to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-gray-400 dark:text-gray-500 mb-8">
            CLB scores are estimates based on your performance and are for practice purposes only. 
            FrancaisPass is not affiliated with TEF, TCF, CCI Paris, or IRCC.
          </p>
        </div>
      </main>
    </div>
  )
}
