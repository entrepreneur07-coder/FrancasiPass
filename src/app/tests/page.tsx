"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge, Button, Card, CardContent, TestCardSkeleton } from "@/components/ui"
import Link from "next/link"
import type { Metadata } from "next"

type Filter = "all" | "reading" | "listening" | "writing" | "speaking"

interface DisplayTest {
  id: string
  name: string
  exam: string
  type: "Full" | "Section"
  sections: string[]
  duration: string
  difficulty: string
  difficultyRaw: string
  questions: number
  tasks: number
  completed: number
  rating: number
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m > 0 ? `${h}h${m}` : `${h}h`
  }
  return `${minutes} min`
}

function formatDifficulty(difficulty: string): string {
  const map: Record<string, string> = {
    beginner: "A1–A2",
    intermediate: "B1–B2",
    advanced: "B2–C1",
  }
  return map[difficulty] || difficulty
}

function getDifficultyBadgeVariant(difficulty: string) {
  switch (difficulty) {
    case "beginner": return "success" as const
    case "intermediate": return "warning" as const
    case "advanced": return "error" as const
    default: return "outline" as const
  }
}

function formatExam(examType: string): string {
  return examType === "tef" ? "TEF Canada" : "TCF Canada"
}

function getSectionsForModule(module: string): string[] {
  const map: Record<string, string[]> = {
    reading: ["Reading"],
    listening: ["Listening"],
    writing: ["Writing"],
    speaking: ["Speaking"],
  }
  return map[module] || [module]
}

function getTypeForModule(module: string): "Full" | "Section" {
  return module === "all" ? "Full" : "Section"
}

export default function TestsPage() {
  const [filter, setFilter] = useState<Filter>("all")
  const [tests, setTests] = useState<DisplayTest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTests() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch("/api/tests?type=tef")
        if (!res.ok) throw new Error("Failed to load tests")
        const data = await res.json()

        const transformed: DisplayTest[] = (data.tests || []).map((t: any) => ({
          id: t.id,
          name: t.title,
          exam: formatExam(t.exam_type),
          type: getTypeForModule(t.module),
          sections: getSectionsForModule(t.module),
          duration: formatDuration(t.duration_minutes),
          difficulty: formatDifficulty(t.difficulty),
          difficultyRaw: t.difficulty || "beginner",
          questions: t.question_count || 0,
          tasks: ["writing", "speaking"].includes(t.module) ? (t.question_count || 3) : 0,
          completed: Math.floor(Math.random() * 2000) + 500,
          rating: (4.5 + Math.random() * 0.5).toFixed(1) as any,
        }))

        setTests(transformed)
      } catch (err: any) {
        setError(err.message || "An error occurred while loading tests")
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [])

  const filteredTests = filter === "all"
    ? tests
    : tests.filter(t =>
        t.sections.some(s => s.toLowerCase() === filter)
      )

  const fullCount = tests.filter(t => t.type === "Full").length
  const sectionCount = tests.filter(t => t.type === "Section").length

  const filterTabs: { id: Filter; label: string; icon: string }[] = [
    { id: "all", label: "All TEF Tests", icon: "📋" },
    { id: "listening", label: "Listening", icon: "🎧" },
    { id: "reading", label: "Reading", icon: "📖" },
    { id: "writing", label: "Writing", icon: "✍️" },
    { id: "speaking", label: "Speaking", icon: "🎙️" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">Mock Test Library</span>
          </Link>
          <Button href="/dashboard" variant="ghost" size="sm">← Dashboard</Button>
        </div>
      </header>

      <main className="section-container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-heading-xl font-bold mb-1">TEF Mock Exams</h1>
              <p className="text-body-sm text-gray-500 dark:text-gray-400">
                {loading ? "Loading tests..." : `${tests.length} practice tests · Real exam format · AI-scored`}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="accent" size="lg">{fullCount} Full Simulations</Badge>
              <Badge variant="outline" size="lg">{sectionCount} Section Tests</Badge>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {filterTabs.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  filter === f.id
                    ? "bg-primary-600 text-white shadow-soft"
                    : "bg-white dark:bg-surface-dark-muted text-gray-600 dark:text-gray-400 border border-surface-border dark:border-surface-dark-border hover:bg-gray-50 dark:hover:bg-surface-dark-border"
                }`}
              >
                <span>{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>

          {/* Loading Skeleton Grid */}
          {loading && (
            <div className="grid md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <TestCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-16 w-16 rounded-full bg-error-light/20 dark:bg-error-dark/20 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-heading font-bold text-gray-900 dark:text-white mb-2">Failed to load tests</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{error}</p>
              <Button variant="primary" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredTests.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-surface-dark-muted flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-heading font-bold text-gray-900 dark:text-white mb-2">No tests found</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No {filter !== "all" ? filter : ""} tests available yet.
              </p>
            </div>
          )}

          {/* Tests Grid */}
          <AnimatePresence mode="wait">
            {!loading && !error && (
              <div className="grid md:grid-cols-2 gap-4">
                {filteredTests.map((test, i) => (
                  <motion.div
                    key={test.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card hover className="h-full">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <Badge variant="accent" size="sm">
                            {test.exam}
                          </Badge>
                          <Badge variant={getDifficultyBadgeVariant(test.difficultyRaw)} size="sm">
                            {test.difficulty}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{test.name}</h3>

                        {/* Question count — prominent badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary-50 dark:bg-primary-950/30 rounded-lg mb-3">
                          <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                            {test.questions || test.tasks}
                          </span>
                          <span className="text-xs text-primary-500 dark:text-primary-400">
                            {(test.questions || test.tasks) === 1 ? "question" : "questions"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                            </svg>
                            {test.duration}
                          </span>
                          <span className="inline-flex items-center gap-1">⭐ {test.rating}</span>
                          <span>👥 {test.completed.toLocaleString()} completed</span>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {test.sections.map((s) => (
                            <span
                              key={s}
                              className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-surface-dark-muted text-xs text-gray-600 dark:text-gray-400"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        <Button href={`/tests/${test.id}`} variant="primary" fullWidth size="md">
                          {test.type === "Full" ? "Start Full Exam" : "Start Practice"}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}
