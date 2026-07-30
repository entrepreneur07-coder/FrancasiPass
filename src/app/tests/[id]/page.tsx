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
  passageContent?: string;
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
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  useEffect(() => {
    async function fetchTestData() {
      setLoading(true)
      setFetchError(null)
      try {
        const response = await fetch(`/api/tests/${testId}`)
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}))
          throw new Error(errData.error || `Failed to fetch test (${response.status})`)
        }
        const data = await response.json()
        
        const formattedQuestions = data.questions.map((q: any) => ({
          ...q,
          options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options
        }))

        setTest(data.test)
        setQuestions(formattedQuestions)
        setTimeLeft(data.test.duration_minutes * 60)
      } catch (err: any) {
        console.error(err)
        setFetchError(err.message || "An unexpected error occurred")
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
  const answeredCount = Object.keys(answers).length

  const handleOptionSelect = useCallback((questionId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
    // Smoother auto-advance with a brief pause to show selection feedback
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQ((p) => Math.min(p + 1, totalQuestions - 1))
      }, 600)
    }
  }, [currentQ, totalQuestions])

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
  }, [router, testId, answers, submitting, test, questions])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading test...</p>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark">
        <div className="text-center max-w-md mx-auto px-4">
          {fetchError ? (
            <>
              <div className="h-16 w-16 rounded-full bg-error-light/20 dark:bg-error-dark/20 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-heading font-bold mb-2 text-gray-900 dark:text-white">Failed to load test</h2>
              <p className="text-body-sm text-gray-500 dark:text-gray-400 mb-2">{fetchError}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">The test may not exist or there was a connection issue.</p>
              <div className="flex gap-3 justify-center">
                <Button href="/tests" variant="outline">← Back to Test Library</Button>
                <Button variant="primary" onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-heading font-bold mb-2 text-gray-900 dark:text-white">Test not found</h2>
              <p className="text-body-sm text-gray-500 dark:text-gray-400 mb-4">This test doesn&apos;t exist or hasn&apos;t been created yet.</p>
              <Button href="/tests" variant="primary">← Back to Test Library</Button>
            </>
          )}
        </div>
      </div>
    )
  }

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
            {/* Mobile hamburger for question nav */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden h-8 w-8 rounded-lg bg-gray-100 dark:bg-surface-dark-muted flex items-center justify-center text-gray-600 dark:text-gray-400"
              aria-label="Open question navigator"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-[200px]">{test.title}</span>
            <Badge variant="outline" size="sm" className="hidden sm:inline-flex">{test.module}</Badge>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="h-1.5 w-24 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${(answeredCount / totalQuestions) * 100}%` }} />
              </div>
              <span>{answeredCount}/{totalQuestions}</span>
            </div>

            {/* Timer */}
            <div className={`flex items-center gap-1.5 font-mono text-sm font-semibold px-3 py-1 rounded-lg transition-colors duration-300 ${
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

      {/* Mobile Question Nav Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/40 z-[60]"
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-white dark:bg-surface-dark-muted z-[70] shadow-elevated overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-surface-border dark:border-surface-dark-border">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Questions</p>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="h-7 w-7 rounded-lg bg-gray-100 dark:bg-surface-dark-muted flex items-center justify-center"
                  aria-label="Close"
                >
                  <svg className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                  {answeredCount}/{totalQuestions} answered
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentQ(idx)
                        setMobileNavOpen(false)
                      }}
                      className={`h-10 w-full rounded-lg text-sm font-medium transition-all ${
                        idx === currentQ
                          ? "bg-primary-600 text-white shadow-soft ring-2 ring-primary-300"
                          : answers[q.id]
                          ? "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
                          : "bg-gray-50 dark:bg-surface-dark text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-border"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1">
        {/* Desktop Question Navigation Sidebar */}
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
                className="h-10 w-10 rounded-xl bg-white dark:bg-surface-dark-muted border border-surface-border dark:border-surface-dark-border flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1 h-1.5 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }} />
              </div>
              <button
                onClick={() => setCurrentQ(Math.min(totalQuestions - 1, currentQ + 1))}
                disabled={currentQ === totalQuestions - 1}
                className="h-10 w-10 rounded-xl bg-white dark:bg-surface-dark-muted border border-surface-border dark:border-surface-dark-border flex items-center justify-center disabled:opacity-30 active:scale-95 transition-transform"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Question Counter */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Question {currentQ + 1} of {totalQuestions}
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
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
  const [progress, setProgress] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const frenchVoiceRef = useRef<SpeechSynthesisVoice | null>(null)

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length > 0) {
        frenchVoiceRef.current = 
          voices.find(v => v.name.includes('Google') && v.lang.startsWith('fr')) ||
          voices.find(v => v.name.includes('Microsoft') && v.lang.startsWith('fr')) ||
          voices.find(v => v.name.includes('Amélie') || v.name.includes('Thomas') || v.name.includes('Hortense')) ||
          voices.find(v => v.lang.startsWith('fr-FR')) ||
          voices.find(v => v.lang.startsWith('fr')) ||
          null
      }
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => { window.speechSynthesis.onvoiceschanged = null }
  }, [])

  const hasAudio = !!question.audio_url

  const handleTTS = () => {
    if (!transcriptText) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(transcriptText)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.9
    utterance.pitch = 1.0
    if (frenchVoiceRef.current) {
      utterance.voice = frenchVoiceRef.current
    }
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  const handlePlay = () => {
    if (!hasAudio) return
    if (playing) {
      audioRef.current?.pause()
      setPlaying(false)
      return
    }
    if (!audioRef.current) {
      audioRef.current = new Audio(question.audio_url)
      audioRef.current.onended = () => {
        setPlaying(false)
        setProgress(0)
      }
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setProgress((audioRef.current.currentTime / (audioRef.current.duration || 30)) * 100)
        }
      }
    }
    audioRef.current.play()
    setPlaying(true)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
      setPlaying(false)
      setProgress(0)
    }
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [question.id])

  const qText = question.question_text || ""
  const hasQuestionSplit = qText.includes("Question :") || qText.includes("Question:")
  const transcriptText = hasQuestionSplit ? qText.split(/Question\s*:/i)[0].trim() : qText
  const questionOnly = hasQuestionSplit ? qText.split(/Question\s*:/i).slice(1).join("Question :").trim() : ""

  return (
    <Card glass>
      <CardContent className="p-4 sm:p-6">
        {hasAudio ? (
          <div className="mb-6">
            <div className="p-4 sm:p-6 bg-primary-50 dark:bg-primary-950/40 rounded-xl border border-primary-100 dark:border-primary-900">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handlePlay}
                  className="h-14 w-14 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-colors shrink-0 shadow-lg shadow-primary-500/30 active:scale-95"
                  aria-label={playing ? "Pause" : "Play audio"}
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
                  <div className="text-sm font-medium text-primary-700 dark:text-primary-300 mb-1">
                    {playing ? "Lecture en cours..." : "Extrait audio"}
                  </div>
                  <div className="text-xs text-primary-500 dark:text-primary-400">
                    {playing ? "Écoutez attentivement" : "Appuyez pour écouter"}
                  </div>
                </div>
              </div>

              <div className="flex items-end gap-0.5 h-12 mb-3">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-150"
                    style={{
                      height: playing
                        ? `${20 + Math.sin(i * 0.5 + Date.now() * 0.003) * 30 + Math.random() * 10}%`
                        : `${15 + Math.sin(i * 0.5) * 10}%`,
                      backgroundColor: playing
                        ? i < (progress / 100) * 40
                          ? "rgb(22, 72, 192)"
                          : "rgba(22, 72, 192, 0.2)"
                        : "rgba(22, 72, 192, 0.15)",
                      transition: playing ? "height 0.15s" : "none",
                    }}
                  />
                ))}
              </div>

              <div className="h-1 bg-primary-200 dark:bg-primary-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-accent-50 to-accent-100/50 dark:from-accent-950/30 dark:to-accent-900/20 rounded-xl border border-accent-200 dark:border-accent-800/40">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="accent" size="sm">🎧 Écoutez</Badge>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Audio généré</span>
                </div>
                <button
                  onClick={handleTTS}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
                    speaking
                      ? "bg-error-500 text-white shadow-lg shadow-error-500/30"
                      : "bg-accent-600 text-white hover:bg-accent-700 shadow-lg shadow-accent-500/30"
                  }`}
                  aria-label={speaking ? "Arrêter la lecture" : "Lire le texte"}
                >
                  {speaking ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {transcriptText}
              </div>
              {speaking && (
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                  </span>
                  <span className="text-xs text-accent-600 dark:text-accent-400 font-medium">Lecture en cours...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {questionOnly && (
          <h3 className="text-body font-medium text-gray-900 dark:text-white mb-4">
            {questionOnly}
          </h3>
        )}

        <div className="space-y-2.5">
          {question.options?.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(question.id, opt)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-sm transition-all active:scale-[0.99] ${
                selected === opt
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                  : "border-surface-border dark:border-surface-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-dark-muted"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selected === opt ? "border-primary-500" : "border-gray-300 dark:border-gray-600"
                }`}>
                  {selected === opt && <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />}
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
  const qText = question.question_text
  const hasEmbeddedPassage = qText.includes("Question :") || qText.includes("Question:")
  const passage = passageContent || (hasEmbeddedPassage ? qText.split(/Question\s*:/i)[0].trim() : "")
  const questionOnly = hasEmbeddedPassage ? qText.split(/Question\s*:/i).slice(1).join("Question :").trim() : qText

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {passage && (
        <div className="lg:order-1 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto">
          <Card glass>
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="accent" size="sm">📖 Texte</Badge>
                <span className="text-xs text-gray-400">Lisez attentivement</span>
              </div>
              <div className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-serif">
                {passage}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className={passage ? "lg:order-2" : ""}>
        <Card glass>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" size="sm">❓ Question {currentQuestionIndex !== undefined ? currentQuestionIndex + 1 : ""}</Badge>
            </div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-4 whitespace-pre-wrap">{questionOnly}</h3>
            <div className="space-y-2">
              {question.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => onSelect(question.id, opt)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl border text-sm transition-all active:scale-[0.99] ${
                    selected === opt
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium"
                      : "border-surface-border dark:border-surface-dark-border text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-surface-dark-muted"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selected === opt ? "border-primary-500" : "border-gray-300 dark:border-gray-600"
                    }`}>
                      {selected === opt && <div className="h-2.5 w-2.5 rounded-full bg-primary-500" />}
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
  const parts = question.question_text.split(/\n\n/)
  const sectionTitle = parts[0]?.replace(/^###\s*/, "") || "Section"
  const promptText = parts.slice(1).join("\n\n") || question.question_text

  const wordMatch = promptText.match(/(\d+)\s*mots/)
  const wordTarget = wordMatch ? parseInt(wordMatch[1]) : (promptText.toLowerCase().includes("section a") ? 80 : 200)

  return (
    <Card glass>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <Badge variant="accent" size="sm">{sectionTitle}</Badge>
          <Badge variant="outline" size="sm">{wordCount} / {wordTarget} mots</Badge>
        </div>

        <div className="mb-4 p-4 bg-primary-50 dark:bg-primary-950/30 rounded-xl border border-primary-100 dark:border-primary-900">
          <p className="text-sm font-medium text-primary-800 dark:text-primary-200 mb-1">📝 Sujet</p>
          <p className="text-sm text-primary-700 dark:text-primary-300 leading-relaxed">{promptText}</p>
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder="Écrivez votre réponse ici..."
          rows={12}
          className="w-full p-4 rounded-xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm leading-relaxed"
        />

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Minimum {wordTarget} mots requis
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 sm:w-40 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  wordCount >= wordTarget ? "bg-success" : wordCount >= wordTarget * 0.5 ? "bg-warning" : "bg-gray-300 dark:bg-gray-600"
                }`}
                style={{ width: `${Math.min(100, (wordCount / wordTarget) * 100)}%` }}
              />
            </div>
            <span className={`text-xs font-medium ${
              wordCount >= wordTarget ? "text-success" : wordCount >= wordTarget * 0.5 ? "text-warning" : "text-gray-400"
            }`}>
              {wordCount >= wordTarget ? "✓" : `${wordCount}/${wordTarget}`}
            </span>
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
  const [phase, setPhase] = useState<"ready" | "preparing" | "recording" | "done">("ready")
  const [prepTime, setPrepTime] = useState(60)
  const [recTime, setRecTime] = useState(120)
  const prepRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const recRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startPrep = () => {
    setPhase("preparing")
    setPrepTime(60)
    prepRef.current = setInterval(() => {
      setPrepTime((p) => {
        if (p <= 1) {
          clearInterval(prepRef.current!)
          startRecordingWithTimer()
          return 0
        }
        return p - 1
      })
    }, 1000)
  }

  const startRecordingWithTimer = () => {
    onStartRecording()
    setPhase("recording")
    setRecTime(120)
    recRef.current = setInterval(() => {
      setRecTime((p) => {
        if (p <= 1) {
          clearInterval(recRef.current!)
          stopRecordingWithCleanup()
          return 0
        }
        return p - 1
      })
    }, 1000)
  }

  const stopRecordingWithCleanup = () => {
    if (recRef.current) clearInterval(recRef.current)
    if (prepRef.current) clearInterval(prepRef.current)
    onStopRecording()
    setPhase("done")
  }

  const formatMins = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const parts = question.question_text.split(/\n\n/)
  const sectionTitle = parts[0]?.replace(/^###\s*/, "") || ""

  return (
    <Card glass>
      <CardContent className="p-4 sm:p-6 text-center">
        <div className="mb-6">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 flex items-center justify-center mx-auto mb-4 relative">
            <svg className="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
            {phase === "recording" && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-error animate-ping" />
            )}
          </div>

          {sectionTitle && (
            <Badge variant="accent" size="sm" className="mb-2">{sectionTitle}</Badge>
          )}

          <h3 className="text-body font-medium text-gray-900 dark:text-white mb-2 whitespace-pre-wrap">
            {parts.slice(1).join("\n\n") || question.question_text}
          </h3>
        </div>

        {phase === "preparing" && (
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="text-4xl font-mono font-bold text-warning">{formatMins(prepTime)}</span>
            </div>
            <p className="text-sm text-warning font-medium">Temps de préparation</p>
            <div className="h-1.5 w-48 mx-auto mt-2 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full transition-all" style={{ width: `${(prepTime / 60) * 100}%` }} />
            </div>
          </div>
        )}

        {phase === "recording" && (
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="h-3 w-3 rounded-full bg-error animate-pulse" />
              <span className="text-4xl font-mono font-bold text-error">{formatMins(recTime)}</span>
            </div>
            <p className="text-sm text-error font-medium">Enregistrement en cours...</p>
            <div className="h-1.5 w-48 mx-auto mt-2 bg-gray-200 dark:bg-surface-dark-border rounded-full overflow-hidden">
              <div className="h-full bg-error rounded-full transition-all" style={{ width: `${(recTime / 120) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          {phase === "ready" && (
            <Button variant="primary" size="lg" onClick={startPrep}>
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 6v6l4 2" />
              </svg>
              Commencer la préparation
            </Button>
          )}

          {phase === "preparing" && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (prepRef.current) clearInterval(prepRef.current)
                startRecordingWithTimer()
              }}
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="6" />
              </svg>
              Commencer l'enregistrement
            </Button>
          )}

          {phase === "recording" && (
            <Button
              variant="outline"
              size="lg"
              onClick={stopRecordingWithCleanup}
              className="border-error text-error hover:bg-error-light/20"
            >
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="2" />
              </svg>
              Arrêter l'enregistrement
            </Button>
          )}

          {phase === "done" && (
            <div className="flex flex-col items-center gap-3">
              <Badge variant="success" size="lg">✓ Enregistré</Badge>
              <Button variant="outline" size="sm" onClick={() => setPhase("ready")}>
                Réessayer
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
