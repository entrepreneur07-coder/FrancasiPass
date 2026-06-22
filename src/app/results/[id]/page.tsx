"use client"

import { useParams, useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui"
import Link from "next/link"

// Mock result data — simulates response from POST /api/tests/submit
const mockResults: {
  attempt_id: number;
  score: number;
  max_score: number;
  clb: number;
  module: string;
  answers: { question_id: number; question: string; user_answer: string; correct_answer: string; is_correct: boolean }[];
  ai_feedback: { strengths: string[]; improvements: string[]; tips: string[] };
} = {
  attempt_id: 8472,
  score: 7,
  max_score: 9,
  clb: 7,
  module: "listening",
  answers: [
    { question_id: 1, question: "Audio: Conversation dans un restaurant. Que fait le client ?", user_answer: "Il commande un repas", correct_answer: "Il commande un repas", is_correct: true },
    { question_id: 2, question: "Audio: Bulletin météo. Quel temps fera-t-il demain ?", user_answer: "Pluvieux", correct_answer: "Ensoleillé", is_correct: false },
    { question_id: 3, question: "Audio: Entretien d'embauche. Quelle est la qualité principale du candidat ?", user_answer: "Sa flexibilité", correct_answer: "Sa flexibilité", is_correct: true },
  ],
  ai_feedback: {
    strengths: ["Good vocabulary range", "Clear pronunciation", "Strong grammatical foundation"],
    improvements: ["Focus on listening to fast-paced conversations", "Practice distinguishing similar-sounding words", "Work on understanding idiomatic expressions"],
    tips: ["Listen to French radio (France Info, RFI) for 15 min daily", "Practice with podcast transcripts", "Use subtitled French content"],
  },
}

export default function ResultsPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const result = mockResults
  const testId = searchParams.get("testId") || "1"

  const percentage = Math.round((result.score / result.max_score) * 100)

  const getScoreColor = (pct: number) => {
    if (pct >= 80) return "text-success"
    if (pct >= 60) return "text-warning"
    return "text-error"
  }

  const getScoreBg = (pct: number) => {
    if (pct >= 80) return "bg-success"
    if (pct >= 60) return "bg-warning"
    return "bg-error"
  }

  const correctCount = result.answers.filter((a) => a.is_correct).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">Test Results</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="accent">CLB {result.clb}</Badge>
            <Link href="/tests">
              <Button variant="ghost" size="sm">← Test Library</Button>
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
            <div className="inline-flex items-center justify-center h-28 w-28 rounded-full bg-white dark:bg-surface-dark-muted shadow-elevated mb-4 border-4 border-gray-100 dark:border-surface-dark-border">
              <div className="text-center">
                <div className={`text-display font-bold ${getScoreColor(percentage)}`}>
                  {result.clb}
                </div>
                <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">CLB</div>
              </div>
            </div>

            <h1 className="text-display font-bold mb-2">
              {percentage >= 80 ? "Excellent Work! 🎉" : percentage >= 60 ? "Good Effort! 💪" : "Keep Practicing! 📚"}
            </h1>
            <p className="text-body-lg text-gray-600 dark:text-gray-400">
              {result.module === "listening" && "Listening Comprehension"}
              {result.module === "reading" && "Reading Comprehension"}
              {result.module === "writing" && "Writing Expression"}
              {result.module === "speaking" && "Oral Expression"}
            </p>
          </motion.div>

          {/* Score Breakdown */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: "Score", value: `${result.score}/${result.max_score}`, sub: `${percentage}% correct`, color: getScoreColor(percentage) },
              { label: "Estimated CLB", value: result.clb.toString(), sub: "Canadian Language Benchmark", color: "text-primary-600 dark:text-primary-400" },
              { label: "Questions", value: `${correctCount}/${result.answers.length}`, sub: "answered correctly", color: "text-accent-600 dark:text-accent-400" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
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

          {/* CLB Progress Ring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glass className="mb-8">
              <CardHeader>
                <CardTitle>CLB Progression</CardTitle>
                <CardDescription>Your estimated Canadian Language Benchmark level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-xl">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Current CLB</span>
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">{result.clb}</span>
                    </div>
                    <div className="h-3 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full rounded-full ${getScoreBg(percentage)}`}
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-400">
                      <span>CLB 1</span>
                      <span>CLB 12</span>
                    </div>
                  </div>
                  <div className="text-center px-4 border-l border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Target</p>
                    <p className="text-2xl font-bold text-accent-600 dark:text-accent-400">9</p>
                    <p className="text-[10px] text-gray-400">{result.clb < 9 ? `${((9 - result.clb) / 2) * 10} CRS pts left` : "✓ Target"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Answer Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Answer Review</CardTitle>
                <CardDescription>Review your responses and see correct answers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.answers.map((ans, i) => (
                  <motion.div
                    key={ans.question_id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      ans.is_correct
                        ? "bg-success-light/30 dark:bg-success-dark/10 border-success/20 dark:border-success/30"
                        : "bg-error-light/30 dark:bg-error-dark/10 border-error/20 dark:border-error/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
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
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white mb-1">{ans.question}</p>
                        <div className="flex flex-col gap-0.5 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">Your answer:</span>
                            <span className={ans.is_correct ? "text-success font-medium" : "text-error font-medium"}>
                              {ans.user_answer}
                            </span>
                          </div>
                          {!ans.is_correct && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500 dark:text-gray-400">Correct:</span>
                              <span className="text-success font-medium">{ans.correct_answer}</span>
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

          {/* AI Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card glass className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-bold">
                    AI
                  </div>
                  <div>
                    <CardTitle>AI Feedback</CardTitle>
                    <CardDescription>Personalized insights from your FrancaisPass tutor</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Strengths */}
                <div>
                  <h4 className="text-sm font-semibold text-success mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {result.ai_feedback.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-success mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <h4 className="text-sm font-semibold text-warning mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Areas to Improve
                  </h4>
                  <ul className="space-y-2">
                    {result.ai_feedback.improvements.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-warning mt-0.5">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div className="p-4 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-100 dark:border-primary-900">
                  <h4 className="text-sm font-semibold text-primary-700 dark:text-primary-300 mb-3 flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Study Tips
                  </h4>
                  <ul className="space-y-2">
                    {result.ai_feedback.tips.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-primary-500 mt-0.5">→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href={`/tests/${testId}`}>
              <Button variant="primary" size="xl" className="text-base w-full sm:w-auto">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </Button>
            </Link>
            <Link href="/tests">
              <Button variant="outline" size="xl" className="text-base w-full sm:w-auto">
                More Practice Tests
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="xl" className="text-base w-full sm:w-auto">
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