"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import Link from "next/link"

type Section = "listening" | "reading" | "writing" | "speaking"

const sections: { id: Section; label: string; duration: string; questions: string }[] = [
  { id: "listening", label: "Compréhension orale", duration: "40 min", questions: "60 questions" },
  { id: "reading", label: "Compréhension écrite", duration: "60 min", questions: "50 questions" },
  { id: "writing", label: "Expression écrite", duration: "60 min", questions: "2 tasks" },
  { id: "speaking", label: "Expression orale", duration: "15 min", questions: "2 tasks" },
]

export default function TEFPage() {
  const [activeSection, setActiveSection] = useState<Section>("listening")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">TEF Canada</span>
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant="accent">IRCC Designated</Badge>
            <Link href="/exams">
              <Button variant="ghost" size="sm">← All Exams</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent">IRCC Designated</Badge>
              <Badge variant="default">Express Entry</Badge>
            </div>
            <h1 className="text-heading-xl font-bold mb-2">TEF Canada</h1>
            <p className="text-body-sm text-gray-500 dark:text-gray-400">
              Test d&apos;évaluation de français pour le Canada · ~2h55 total duration
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
                    ? "bg-accent-600 text-white shadow-soft"
                    : "bg-white dark:bg-surface-dark-muted text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-surface-dark-border border border-surface-border dark:border-surface-dark-border"
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{section.label}</div>
                  <div className={`text-xs mt-0.5 ${activeSection === section.id ? "text-accent-200" : "text-gray-400"}`}>
                    {section.duration} · {section.questions}
                  </div>
                </div>
              </button>
            ))}
          </div>

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

function ListeningSection() {
  return (
    <Card glass>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent-500 to-teal-600 flex items-center justify-center text-white">🎧</div>
          <div>
            <CardTitle>Compréhension orale</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">60 questions · 40 minutes · Audio-based</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
          Listen to audio recordings of various situations: conversations, news items, interviews, 
          and public announcements. Answer multiple-choice questions testing comprehension at different levels.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { level: "A1–A2", desc: "Simple everyday conversations", questions: 20, time: "12 min" },
            { level: "B1", desc: "Radio broadcasts, interviews", questions: 20, time: "14 min" },
            { level: "B2–C1", desc: "Complex debates, presentations", questions: 20, time: "14 min" },
          ].map((item) => (
            <div key={item.level} className="p-3 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
              <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">{item.level}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.desc}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.questions} questions · {item.time}</p>
            </div>
          ))}
        </div>
        <Link href="/tests">
          <Button variant="secondary" size="lg">Start Listening Practice</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function ReadingSection() {
  return (
    <Card glass>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-500 to-accent-600 flex items-center justify-center text-white">📖</div>
          <div>
            <CardTitle>Compréhension écrite</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">50 questions · 60 minutes · Text-based</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
          Read and analyze various French documents: administrative texts, press articles, 
          informational flyers, and literary excerpts. Test your understanding of details, 
          structure, and implied meaning.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {[
            { level: "A1–A2", desc: "Notices, forms, short messages", questions: 15, time: "15 min" },
            { level: "B1", desc: "Articles, reports, correspondence", questions: 20, time: "25 min" },
            { level: "B2–C1", desc: "Complex analytical texts", questions: 15, time: "20 min" },
          ].map((item) => (
            <div key={item.level} className="p-3 bg-gray-50 dark:bg-surface-dark-muted rounded-lg">
              <span className="text-xs font-semibold text-accent-600 dark:text-accent-400">{item.level}</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{item.desc}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.questions} questions · {item.time}</p>
            </div>
          ))}
        </div>
        <Link href="/tests">
          <Button variant="secondary" size="lg">Start Reading Practice</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function WritingSection() {
  return (
    <Card glass>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-accent-600 flex items-center justify-center text-white">✍️</div>
          <div>
            <CardTitle>Expression écrite</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">2 tasks · 60 minutes · Written production</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
          Complete two writing tasks: a short text (story, report, or article) and 
          an argumentative piece. AI evaluates vocabulary range, grammatical accuracy, 
          and coherence.
        </p>
        <div className="space-y-3 mb-6">
          {[
            { task: "Section A", desc: "Short text (80–200 words) — news/letter/report", weight: "30%" },
            { task: "Section B", desc: "Argumentative text (200–300 words) — opinion piece", weight: "70%" },
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
          <Button variant="secondary" size="lg">Start Writing Practice</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function SpeakingSection() {
  return (
    <Card glass>
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-accent-600 flex items-center justify-center text-white">🎤</div>
          <div>
            <CardTitle>Expression orale</CardTitle>
            <p className="text-sm text-gray-500 dark:text-gray-400">2 tasks · 15 minutes · Recorded responses</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
          Record spontaneous spoken responses. Our AI analyzes your pronunciation, 
          grammar, vocabulary, and ability to structure your ideas.
        </p>
        <div className="space-y-3 mb-6">
          {[
            { task: "Section A", desc: "Describe a situation + 5-7 questions (10 min)", weight: "50%" },
            { task: "Section B", desc: "Role-play with justification (5 min)", weight: "50%" },
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
          <Button variant="secondary" size="lg">Start Speaking Practice</Button>
        </Link>
      </CardContent>
    </Card>
  )
}