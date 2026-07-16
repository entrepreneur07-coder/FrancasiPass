"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge, Button, Card, CardContent } from "@/components/ui"
import { useRouter, useParams } from "next/navigation"

interface Question {
  id: string;
  question_text: string;
  audio_url?: string;
  options?: string[];
  points: number;
}

interface Test {
  id: string;
  title: string;
  exam_type: string;
  module: string;
  duration_minutes: number;
  passageContent?: string; // Reading passage content for TEF/TCF reading tests
}

// Reading passages for TCF/TEF reading comprehension tests
const readingPassages: Record<string, string> = {
  // We can add some default ones or fetch from the test description/meta if needed
  // For now, we'll use a generic one if not found
}

export default function TestTakingPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string

  const [test, setTest] = useState<Test | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    async function fetchTestData() {
      try {
        const response = await fetch(`/api/tests/${testId}`)
        if (!response.ok) throw new Error("Failed to fetch test")
        const data = await response.json()
        
        // Parse options if they are stored as JSON string
        const formattedQuestions = data.questions.map((q: any) => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }))

        setTest(data.test)
        setQuestions(formattedQuestions)
        setTimeLeft(data.test.duration_minutes * 60)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (testId) {
      fetchTestData()
    }
  }, [testId])

  // Countdown timer
  useEffect(() => {
    if (submitted || !test) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [submitted, test])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const totalQuestions = questions.length
  const progress = totalQuestions > 0 ? ((currentQ + 1) / totalQuestions) * 100 : 0
  const answeredCount = Object.keys(answers).length

  const handleOptionSelect = (questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
    // Auto-advance after a brief delay for MCQs
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ((p) => p + 1), 400)
    }
  }

  const handleTextChange = (questionId: string, text: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text }))
  }

  // Speaking recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      audioChunksRef.current = []

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const reader = new FileReader()
        reader.onloadend = () => {
          setAnswers((prev) => ({ ...prev, [questions[currentQ].id]: reader.result as string }))
        }
        reader.readAsDataURL(blob)
        stream.getTracks().forEach((t) => t.stop())
      }

      recorder.start()
      setIsListening(true)
    } catch (err) {
      console.error("Mic access denied:", err)
      alert("Microphone access is required for the speaking module.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
    setIsListening(false)
  }

  const handleSubmit = useCallback(async () => {
    if (submitting || !test) return
    setSubmitting(true)
    try {
      const response = await fetch('/api/tests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          test_id: testId,
          answers: answers
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
      }
      
      const data = await response.json()
      setSubmitted(true)
      
      // Save results to localStorage for instant access on results page
      localStorage.setItem(`test_result_${data.attempt_id}`, JSON.stringify({
        test_id: testId,
        questions: questions,
        answers: answers,
        score: data.score,
        max_score: data.max_score,
        clb: data.clb,
        module: test!.module,
        title: test!.title
      }))

      router.push(`/results/${data.attempt_id}?testId=${testId}`)
    } catch (err: any) {
      console.error(err)
      alert(`Failed to submit test: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }, [router, testId, answers, submitting, test])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark">
        <div className="text-center">
          <h2 className="text-heading font-bold mb-2 text-gray-900 dark:text-white">Test not found</h2>
          <p className="text-body-sm text-gray-500 dark:text-gray-400 mb-4">This test doesn&apos;t exist or hasn&apos;t been created yet.</p>
          <Button href="/tests" variant="primary">← Back to Test Library</Button>
        </div>
      </div>
    )
  }

  // If already submitted, don't render the test
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full bg-success-light dark:bg-success-dark/30 flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-heading font-bold mb-2">Test Submitted!</h2>
          <p className="text-body-sm text-gray-500 dark:text-gray-400 mb-4">Redirecting to results...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark flex flex-col">
      {/* Top Bar */}
      <header className="glass border-b border-surface-border dark:border-surface-dark-border sticky top-0 z-50">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-[200px]">{test.title}</span>
            <Badge variant="outline" size="sm" className="hidden sm:inline-flex">{test.module}</Badge>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="h-1.5 w-24 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
              </div>
              <span>{answeredCount}/{totalQuestions}</span>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1 rounded-lg ${
              timeLeft < 300 ? "bg-error-light text-error dark:bg-error-dark/30 dark:text-error-light animate-pulse-soft" : "bg-gray-100 dark:bg-surface-dark-muted text-gray-700 dark:text-gray-300"
            }`}>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              {formatTime(timeLeft)}
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              loading={submitting}
              disabled={answeredCount === 0}
            >
              Submit
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Question Navigation Sidebar */}
        <aside className="hidden md:flex flex-col w-20 lg:w-24 bg-white dark:bg-surface-dark-muted border-r border-surface-border dark:border-surface-dark-border p-3 overflow-y-auto">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3 text-center">Questions</p>
          <div className="flex flex-col gap-1.5">
            {questions.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setCurrentQ(idx)}
                className={`h-9 w-full rounded-lg text-xs font-medium transition-all ${
                  idx === currentQ
                    ? "bg-primary-600 text-white shadow-soft"
                    : answers[q.id]
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                    : "bg-gray-50 dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-border"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {/* Mini progress */}
          <div className="mt-auto pt-3 border-t border-surface-border dark:border-surface-dark-border">
            <div className="text-[10px] text-center text-gray-400">
              <div className="font-medium">{answeredCount}/{totalQuestions}</div>
              <div className="text-[9px]">done</div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-8">
            {/* Mobile progress bar */}
            <div className="md:hidden flex items-center gap-3 mb-4">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-surface-dark-muted flex items-center justify-center disabled:opacity-30"
              >
                ←
              </button>
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <button
                onClick={() => setCurrentQ(Math.min(totalQuestions - 1, currentQ + 1))}
                disabled={currentQ === totalQuestions - 1}
                className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-surface-dark-muted flex items-center justify-center disabled:opacity-30"
              >
                →
              </button>
            </div>

            {/* Question Counter */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Question {currentQ + 1} of {totalQuestions}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.2 }}
              >
                {test.module === "listening" && (
                  <ListeningQuestion
                    question={currentQuestion}
                    selected={answers[currentQuestion.id]}
                    onSelect={handleOptionSelect}
                  />
                )}
                {test.module === "reading" && (
                  <ReadingQuestion
                    question={currentQuestion}
                    selected={answers[currentQuestion.id]}
                    onSelect={handleOptionSelect}
                    passageContent={test.passageContent}
                    currentQuestionIndex={currentQ}
                  />
                )}
                {test.module === "writing" && (
                  <WritingQuestion
                    question={currentQuestion}
                    value={answers[currentQuestion.id] || ""}
                    onChange={handleTextChange}
                  />
                )}
                {test.module === "speaking" && (
                  <SpeakingQuestion
                    question={currentQuestion}
                    recorded={!!answers[currentQuestion.id]}
                    isRecording={isListening}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
              >
                ← Previous
              </Button>

              {currentQ < totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  onClick={() => setCurrentQ((p) => p + 1)}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  Submit Test
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

/* ---- Module-Specific Question Components ---- */

function ListeningQuestion({
  question,
  selected,
  onSelect,
}: {
  question: Question
  selected?: string
  onSelect: (id: string, option: string) => void
}) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlay = () => {
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      return
    }

    if (!audioRef.current) {
      audioRef.current = new Audio(question.audio_url)
      audioRef.current.onended = () => setPlaying(false)
    }
    audioRef.current.play()
    setPlaying(true)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      setPlaying(false)
    }
  }, [question.id])

  return (
    <Card glass>
      <CardContent className="p-6">
        {/* Audio Player */}
        <div className="mb-6">
          <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-950/40 rounded-xl border border-primary-100 dark:border-primary-900">
            <button
              onClick={handlePlay}
              className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-colors shrink-0"
            >
              {playing ? (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <div className="flex-1">
              <div className="h-1.5 bg-primary-200 dark:bg-primary-800 rounded-full overflow-hidden">
                <div className={`h-full bg-primary-500 rounded-full transition-all duration-300 ${playing ? "w-full animate-pulse" : "w-0"}`} />
              </div>
              <div className="flex justify-between mt-1 text-xs text-primary-600 dark:text-primary-400">
                <span>{playing ? "Playing French dialogue..." : "Click to hear the conversation"}</span>
                <span>{playing ? "●" : "▶"}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-primary-500 dark:text-primary-400 mt-2 text-center">
            {playing ? "🔊 Listen carefully, then answer the question below" : "▶ Press play to hear the audio"}
          </p>
        </div>

        {/* Question */}
        <h3 className="text-body font-medium text-gray-900 dark:text-white mb-4">
          {question.question_text}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {question.options?.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(question.id, opt)}
              className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                selected === opt
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                  : "border-surface-border dark:border-surface-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-dark-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selected === opt ? "border-primary-500" : "border-gray-300 dark:border-gray-600"
                }`}>
                  {selected === opt && <div className="h-2 w-2 rounded-full bg-primary-500" />}
                </div>
                <span>{opt}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ReadingQuestion({
  question,
  selected,
  onSelect,
  passageContent,
  currentQuestionIndex,
}: {
  question: Question
  selected?: string
  onSelect: (id: string, option: string) => void
  passageContent?: string
  currentQuestionIndex?: number
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Passage Panel — shown at the top or side depending on screen size */}
      {passageContent && (
        <div className="lg:order-1">
          <Card glass>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="accent" size="sm">📖 Texte</Badge>
                <span className="text-xs text-gray-400">Lisez attentivement le texte ci-dessous</span>
              </div>
              <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-serif">
                {passageContent}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Question Panel */}
      <div className={passageContent ? "lg:order-2" : ""}>
        <Card glass>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" size="sm">❓ Question {currentQuestionIndex !== undefined ? currentQuestionIndex + 1 : ""}</Badge>
            </div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4 whitespace-pre-wrap">{question.question_text}</h3>
            <div className="space-y-2">
              {question.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onSelect(question.id, opt)}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all ${
                    selected === opt
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                      : "border-surface-border dark:border-surface-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-dark-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selected === opt ? "border-primary-500" : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {selected === opt && <div className="h-2 w-2 rounded-full bg-primary-500" />}
                    </div>
                    <span className="text-sm">{opt}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function WritingQuestion({
  question,
  value,
  onChange,
}: {
  question: Question
  value: string
  onChange: (id: string, text: string) => void
}) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0

  return (
    <Card glass>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body font-medium text-gray-900 dark:text-white whitespace-pre-wrap">{question.question_text}</h3>
          <Badge variant="outline" size="sm">{wordCount} words</Badge>
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder="Écrivez votre réponse ici..."
          rows={12}
          className="w-full p-4 rounded-xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm leading-relaxed"
        />

        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Respectez le nombre de mots demandé.
          </p>
          <div className="h-1 w-32 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                wordCount >= 120 ? "bg-success" : wordCount >= 60 ? "bg-warning" : "bg-gray-300 dark:bg-gray-600"
              }`}
              style={{ width: `${Math.min(100, (wordCount / 120) * 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SpeakingQuestion({
  question,
  recorded,
  isRecording,
  onStartRecording,
  onStopRecording,
}: {
  question: Question
  recorded: boolean
  isRecording: boolean
  onStartRecording: () => void
  onStopRecording: () => void
}) {
  return (
    <Card glass>
      <CardContent className="p-6 text-center">
        <div className="mb-6">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </div>
          <h3 className="text-body font-medium text-gray-900 dark:text-white mb-2 whitespace-pre-wrap">
            {question.question_text}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vous avez 2 minutes pour enregistrer votre réponse.
          </p>
        </div>

        {/* Recording Controls */}
        <div className="flex flex-col items-center gap-4">
          {isRecording ? (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-error animate-pulse" />
                <span className="text-sm font-medium text-error">Recording...</span>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={onStopRecording}
                className="border-error text-error hover:bg-error-light/20"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
                Stop Recording
              </Button>
            </div>
          ) : recorded ? (
            <div className="flex flex-col items-center gap-3">
              <Badge variant="success" size="lg">✓ Recorded</Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={onStartRecording}
              >
                Re-record
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              onClick={onStartRecording}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" />
              </svg>
              Start Recording
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
