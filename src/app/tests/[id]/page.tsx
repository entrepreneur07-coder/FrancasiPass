"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge, Button, Card, CardContent } from "@/components/ui"
import { useRouter, useParams } from "next/navigation"

// Mock test data — replaces API call to /api/tests/[id]
const mockTestData: Record<number, { name: string; exam: string; module: string; duration: number; questions: { id: number; question: string; options?: string[]; type: string }[] }> = {
  1: {
    name: "TCF Canada — Full Simulation",
    exam: "TCF Canada",
    module: "listening",
    duration: 170,
    questions: [
      { id: 1, question: "Audio: Conversation dans un restaurant. Que fait le client ?", options: ["Il commande un repas", "Il se plaint du service", "Il demande l'addition", "Il réserve une table"], type: "mcq" },
      { id: 2, question: "Audio: Bulletin météo. Quel temps fera-t-il demain ?", options: ["Ensoleillé", "Pluvieux", "Neigeux", "Nuageux"], type: "mcq" },
      { id: 3, question: "Audio: Entretien d'embauche. Quelle est la qualité principale du candidat ?", options: ["Son expérience", "Sa flexibilité", "Son diplôme", "Sa motivation"], type: "mcq" },
    ],
  },
  3: {
    name: "TCF — Listening Comp. Intensive",
    exam: "TCF Canada",
    module: "listening",
    duration: 35,
    questions: [
      { id: 1, question: "Audio: Conversation dans un restaurant. Que fait le client ?", options: ["Il commande un repas", "Il se plaint du service", "Il demande l'addition", "Il réserve une table"], type: "mcq" },
      { id: 2, question: "Audio: Bulletin météo. Quel temps fera-t-il demain ?", options: ["Ensoleillé", "Pluvieux", "Neigeux", "Nuageux"], type: "mcq" },
      { id: 3, question: "Audio: Entretien d'embauche. Quelle est la qualité principale du candidat ?", options: ["Son expérience", "Sa flexibilité", "Son diplôme", "Sa motivation"], type: "mcq" },
    ],
  },
  5: {
    name: "TCF — Reading Comprehension",
    exam: "TCF Canada",
    module: "reading",
    duration: 60,
    questions: [
      { id: 1, question: "Selon le texte, quelle est la principale cause du réchauffement climatique ?", options: ["Les activités humaines", "Les volcans", "Les cycles solaires", "La déforestation"], type: "mcq" },
      { id: 2, question: "Que signifie l'expression 'mettre en œuvre' dans le contexte ?", options: ["Expliquer", "Implémenter", "Ignorer", "Retarder"], type: "mcq" },
      { id: 3, question: "Quel est le ton général de l'article ?", options: ["Neutre et informatif", "Critique et alarmiste", "Optimiste et encourageant", "Sarcastique"], type: "mcq" },
    ],
  },
  7: {
    name: "TCF — Writing Tasks",
    exam: "TCF Canada",
    module: "writing",
    duration: 60,
    questions: [
      { id: 1, question: "Écrivez un courriel à votre maire pour proposer une initiative écologique dans votre quartier (120-150 mots).", type: "essay" },
      { id: 2, question: "Rédigez un article argumentatif sur les avantages et les inconvénients du télétravail (200-250 mots).", type: "essay" },
    ],
  },
  9: {
    name: "TCF — Speaking Simulation",
    exam: "TCF Canada",
    module: "speaking",
    duration: 15,
    questions: [
      { id: 1, question: "Parlez de votre expérience professionnelle pendant 2 minutes.", type: "speaking" },
      { id: 2, question: "Donnez votre opinion sur l'impact des réseaux sociaux. Justifiez votre réponse.", type: "speaking" },
    ],
  },
}

export default function TestTakingPage() {
  const params = useParams()
  const router = useRouter()
  const testId = Number(params.id)
  const test = mockTestData[testId] || mockTestData[1]

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(test.duration * 60)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const totalQuestions = test.questions.length
  const isMcq = test.module === "listening" || test.module === "reading"
  const isWriting = test.module === "writing"
  const isSpeaking = test.module === "speaking"

  // Countdown timer
  useEffect(() => {
    if (submitted) return
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [submitted])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  const progress = ((currentQ + 1) / totalQuestions) * 100
  const answeredCount = Object.keys(answers).length

  const handleOptionSelect = (questionId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }))
    // Auto-advance after a brief delay
    if (currentQ < totalQuestions - 1) {
      setTimeout(() => setCurrentQ((p) => p + 1), 400)
    }
  }

  const handleTextChange = (questionId: number, text: string) => {
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
          setAnswers((prev) => ({ ...prev, [test.questions[currentQ].id]: reader.result as string }))
        }
        reader.readAsDataURL(blob)
        stream.getTracks().forEach((t) => t.stop())
      }

      recorder.start()
      setIsListening(true)
    } catch (err) {
      console.error("Mic access denied:", err)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
    setIsListening(false)
  }

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    // Simulate API call to POST /api/tests/submit
    await new Promise((r) => setTimeout(r, 1500))
    const attemptId = Math.floor(Math.random() * 10000)
    setSubmitted(true)
    router.push(`/results/${attemptId}?testId=${testId}`)
  }, [router, testId])

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark flex flex-col">
      {/* Top Bar */}
      <header className="glass border-b border-surface-border dark:border-surface-dark-border sticky top-0 z-50">
        <div className="flex items-center justify-between h-14 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-[200px]">{test.name}</span>
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
            {test.questions.map((q, idx) => (
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
                    question={test.questions[currentQ]}
                    selected={answers[test.questions[currentQ].id]}
                    onSelect={handleOptionSelect}
                  />
                )}
                {test.module === "reading" && (
                  <ReadingQuestion
                    question={test.questions[currentQ]}
                    selected={answers[test.questions[currentQ].id]}
                    onSelect={handleOptionSelect}
                    passage="Le réchauffement climatique est l'un des plus grands défis de notre époque. Selon le Groupe d'experts intergouvernemental sur l'évolution du climat (GIEC), les activités humaines sont la cause principale de l'augmentation des températures mondiales depuis le début de l'ère industrielle. Les émissions de gaz à effet de serre, notamment le dioxyde de carbone et le méthane, ont atteint des niveaux sans précédent..."
                  />
                )}
                {test.module === "writing" && (
                  <WritingQuestion
                    question={test.questions[currentQ]}
                    value={answers[test.questions[currentQ].id] || ""}
                    onChange={handleTextChange}
                  />
                )}
                {test.module === "speaking" && (
                  <SpeakingQuestion
                    question={test.questions[currentQ]}
                    recorded={!!answers[test.questions[currentQ].id]}
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
  question: { id: number; question: string; options?: string[] }
  selected?: string
  onSelect: (id: number, option: string) => void
}) {
  return (
    <Card glass>
      <CardContent className="p-6">
        {/* Audio Player */}
        <div className="mb-6">
          <div className="flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-950/40 rounded-xl border border-primary-100 dark:border-primary-900">
            <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center text-white cursor-pointer hover:bg-primary-700 transition-colors">
              <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="h-1.5 bg-primary-200 dark:bg-primary-800 rounded-full">
                <div className="h-full w-0 bg-primary-500 rounded-full" />
              </div>
              <div className="flex justify-between mt-1 text-xs text-primary-600 dark:text-primary-400">
                <span>0:00</span>
                <span>0:45</span>
              </div>
            </div>
            <Badge variant="default" size="sm">A2 Level</Badge>
          </div>
        </div>

        {/* Question */}
        <h3 className="text-body font-medium text-gray-900 dark:text-white mb-4">{question.question}</h3>

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
  passage,
}: {
  question: { id: number; question: string; options?: string[] }
  selected?: string
  onSelect: (id: number, option: string) => void
  passage: string
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Passage Panel */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" size="sm">Extrait</Badge>
            <span className="text-xs text-gray-400">Document A</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{passage}</p>
        </CardContent>
      </Card>

      {/* Question Panel */}
      <Card glass>
        <CardContent className="p-5">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">{question.question}</h3>
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
                  <span className="text-xs">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WritingQuestion({
  question,
  value,
  onChange,
}: {
  question: { id: number; question: string }
  value: string
  onChange: (id: number, text: string) => void
}) {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0

  return (
    <Card glass>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body font-medium text-gray-900 dark:text-white">{question.question}</h3>
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
            Minimum 120 words recommended
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
  question: { id: number; question: string }
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
          <h3 className="text-body font-medium text-gray-900 dark:text-white mb-2">
            {question.question}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You will have 2 minutes to record your response
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