"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import Link from "next/link"

type Section = "listening" | "reading" | "writing" | "speaking"

const sections: { id: Section; label: string; duration: string; questions: string }[] = [
  { id: "listening", label: "Compréhension orale", duration: "35 min", questions: "39 questions" },
  { id: "reading", label: "Compréhension écrite", duration: "60 min", questions: "39 questions" },
  { id: "writing", label: "Expression écrite", duration: "60 min", questions: "3 tasks" },
  { id: "speaking", label: "Expression orale", duration: "15 min", questions: "3 tasks" },
]

export default function TCFPage() {
  const [activeSection, setActiveSection] = useState<Section>("listening")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">TCF Canada</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="outline">CLB Target: 7+</Badge>
            <Link href="/exams">
              <Button variant="ghost" size="sm">← All Exams</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        <div className="max-w-5xl mx-auto">
          {/* Exam Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">IRCC Approved</Badge>
              <Badge variant="default">Express Entry</Badge>
            </div>
            <h1 className="text-heading-xl font-bold mb-2">TCF Canada</h1>
            <p className="text-body-sm text-gray-500 dark:text-gray-400">
              Test de connaissance du français pour le Canada · ~2h50 total duration
            </p>
          </motion.div>

          {/* Section Navigation */}
          <div className="flex overflow-x-auto gap-2 mb-8 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === section.id
                    ? "bg-primary-600 text-white shadow-soft"
                    : "bg-white dark:bg-surface-dark-muted text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-surface-dark-border border border-surface-border dark:border-surface-dark-border"
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{section.label}</div>
                  <div className={`text-xs mt-0.5 ${activeSection === section.id ? "text-primary-200" : "text-gray-400"}`}>
                    {section.duration} · {section.questions}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Section Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeSection === "listening" && <ListeningSection />}
              {activeSection === "reading" && <ReadingSection />}
              {activeSection === "writing" && <WritingSection />}
              {activeSection === "speaking" && <SpeakingSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

/* ---- Section Placeholder Components ---- */

function ListeningSection() {
  return (
    <div className="space-y-6">
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white">
              🎧
            </div>
            <div>
              <CardTitle>Compréhension orale</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">39 questions · 35 minutes · Audio-based</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
            Listen to audio recordings of conversations, news reports, and announcements. 
            Answer multiple-choice questions about what you heard.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { level: "A1–A2", desc: "Simple conversations", questions: 12, time: "8 min" },
              { level: "B1", desc: "Radio extracts, interviews", questions: 12, time: "12 min" },
              { level: "B2–C1", desc: "Complex debates, lectures", questions: 15, time: "15 min" },
            ].map((item) => (
              <div key={item.level} className="p-3 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">{item.level}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.desc}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.questions} questions · {item.time}</p>
              </div>
            ))}
          </div>
          <Link href="/tests">
            <Button variant="primary" size="lg">
              Start Listening Practice
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Sample Questions Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gray-50 dark:bg-surface-dark-muted rounded-xl mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center">
                <svg className="h-4 w-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Audio: Conversation in a restaurant</span>
              <Badge variant="outline" size="sm">B1 Level</Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">Click play to hear the audio (simulated)</p>
          </div>
          <div className="space-y-3">
            {["A: The customer is ordering a meal", "B: The customer is complaining about service", "C: The customer is asking for the bill", "D: The customer is reserving a table"].map((opt, i) => (
              <label
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg border border-surface-border dark:border-surface-dark-border cursor-pointer hover:bg-gray-50 dark:hover:bg-surface-dark-muted transition-colors"
              >
                <input type="radio" name="sample" className="h-4 w-4 text-primary-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReadingSection() {
  return (
    <div className="space-y-6">
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white">
              📖
            </div>
            <div>
              <CardTitle>Compréhension écrite</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">39 questions · 60 minutes · Text-based</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
            Read documents, articles, emails, and administrative texts. 
            Answer comprehension questions about content, structure, and vocabulary.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {[
              { level: "A1–A2", desc: "Simple notices, emails", questions: 12, time: "15 min" },
              { level: "B1", desc: "News articles, letters", questions: 12, time: "20 min" },
              { level: "B2–C1", desc: "Complex reports, analyses", questions: 15, time: "25 min" },
            ].map((item) => (
              <div key={item.level} className="p-3 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
                <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">{item.level}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.desc}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.questions} questions · {item.time}</p>
              </div>
            ))}
          </div>
          <Link href="/tests">
            <Button variant="primary" size="lg">
              Start Reading Practice
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

function WritingSection() {
  return (
    <div className="space-y-6">
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-primary-600 flex items-center justify-center text-white">
              ✍️
            </div>
            <div>
              <CardTitle>Expression écrite</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">3 tasks · 60 minutes · Written production</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
            Write texts in French: from everyday correspondence to argumentative essays. 
            Our AI evaluates grammar, vocabulary, structure, and coherence.
          </p>
          <div className="space-y-3 mb-6">
            {[
              { task: "Task 1", desc: "Write an email or message (60–120 words)", weight: "25%" },
              { task: "Task 2", desc: "Write an article or report (120–200 words)", weight: "35%" },
              { task: "Task 3", desc: "Write an argumentative essay (200–300 words)", weight: "40%" },
            ].map((item) => (
              <div key={item.task} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.task}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <Badge variant="outline" size="sm">{item.weight}</Badge>
              </div>
            ))}
          </div>
          <Link href="/tests">
            <Button variant="primary" size="lg">
              Start Writing Practice
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

function SpeakingSection() {
  return (
    <div className="space-y-6">
      <Card glass>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-accent-500 flex items-center justify-center text-white">
              🎤
            </div>
            <div>
              <CardTitle>Expression orale</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">3 tasks · 15 minutes · Recorded responses</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
            Record your spoken responses to prompts. Our AI analyzes pronunciation, 
            fluency, grammar, and vocabulary usage with detailed feedback.
          </p>
          <div className="space-y-3 mb-6">
            {[
              { task: "Task 1", desc: "Guided interview (2 min preparation + 2 min response)", weight: "30%" },
              { task: "Task 2", desc: "Interactive conversation simulation (3 min)", weight: "35%" },
              { task: "Task 3", desc: "Express an opinion on a topic (3 min)", weight: "35%" },
            ].map((item) => (
              <div key={item.task} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.task}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <Badge variant="outline" size="sm">{item.weight}</Badge>
              </div>
            ))}
          </div>
          <Link href="/tests">
            <Button variant="primary" size="lg">
              Start Speaking Practice
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}