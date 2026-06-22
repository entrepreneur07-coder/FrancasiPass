"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui"
import Link from "next/link"

type Filter = "all" | "tcf" | "tef" | "listening" | "reading" | "writing" | "speaking"

const mockTests = [
  { id: 1, name: "TCF Canada — Full Simulation", exam: "TCF Canada", type: "Full", sections: ["Listening", "Reading", "Writing", "Speaking"], duration: "2h50", difficulty: "B2–C1", questions: 84, completed: 1243, rating: 4.8 },
  { id: 2, name: "TEF Canada — Full Simulation", exam: "TEF Canada", type: "Full", sections: ["Listening", "Reading", "Writing", "Speaking"], duration: "2h55", difficulty: "B2–C1", questions: 114, completed: 987, rating: 4.7 },
  { id: 3, name: "TCF — Listening Comp. Intensive", exam: "TCF Canada", type: "Section", sections: ["Listening"], duration: "35 min", difficulty: "A2–B2", questions: 39, completed: 2156, rating: 4.9 },
  { id: 4, name: "TEF — Listening Comp. Intensive", exam: "TEF Canada", type: "Section", sections: ["Listening"], duration: "40 min", difficulty: "A2–B2", questions: 60, completed: 1892, rating: 4.8 },
  { id: 5, name: "TCF — Reading Comprehension", exam: "TCF Canada", type: "Section", sections: ["Reading"], duration: "60 min", difficulty: "B1–C1", questions: 39, completed: 1678, rating: 4.7 },
  { id: 6, name: "TEF — Reading Comprehension", exam: "TEF Canada", type: "Section", sections: ["Reading"], duration: "60 min", difficulty: "B1–C1", questions: 50, completed: 1432, rating: 4.6 },
  { id: 7, name: "TCF — Writing Tasks", exam: "TCF Canada", type: "Section", sections: ["Writing"], duration: "60 min", difficulty: "B1–C1", tasks: 3, completed: 1123, rating: 4.5 },
  { id: 8, name: "TEF — Writing Tasks", exam: "TEF Canada", type: "Section", sections: ["Writing"], duration: "60 min", difficulty: "B1–C1", tasks: 2, completed: 1089, rating: 4.6 },
  { id: 9, name: "TCF — Speaking Simulation", exam: "TCF Canada", type: "Section", sections: ["Speaking"], duration: "15 min", difficulty: "A2–C1", tasks: 3, completed: 2341, rating: 4.9 },
  { id: 10, name: "TEF — Speaking Simulation", exam: "TEF Canada", type: "Section", sections: ["Speaking"], duration: "15 min", difficulty: "A2–C1", tasks: 2, completed: 1987, rating: 4.8 },
  { id: 11, name: "TCF — Grammar & Vocabulary", exam: "TCF Canada", type: "Section", sections: ["Reading"], duration: "30 min", difficulty: "A2–B2", questions: 25, completed: 3124, rating: 4.7 },
  { id: 12, name: "TEF — Grammar & Vocabulary", exam: "TEF Canada", type: "Section", sections: ["Reading"], duration: "30 min", difficulty: "A2–B2", questions: 30, completed: 2876, rating: 4.6 },
]

export default function TestsPage() {
  const [filter, setFilter] = useState<Filter>("all")

  const filteredTests = filter === "all"
    ? mockTests
    : mockTests.filter(t => 
        t.exam.toLowerCase().includes(filter) || 
        t.sections.some(s => s.toLowerCase() === filter)
      )

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
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">← Dashboard</Button>
          </Link>
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
              <h1 className="text-heading-xl font-bold mb-1">Mock Exams</h1>
              <p className="text-body-sm text-gray-500 dark:text-gray-400">
                {mockTests.length} practice tests · Real exam format · AI-scored
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="accent" size="lg">Full Simulations</Badge>
              <Badge variant="outline" size="lg">{mockTests.filter(t => t.type === "Section").length} Section Tests</Badge>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {([
              { id: "all", label: "All Tests" },
              { id: "tcf", label: "TCF Canada" },
              { id: "tef", label: "TEF Canada" },
              { id: "listening", label: "Listening" },
              { id: "reading", label: "Reading" },
              { id: "writing", label: "Writing" },
              { id: "speaking", label: "Speaking" },
            ] as { id: Filter; label: string }[]).map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f.id
                    ? "bg-primary-600 text-white"
                    : "bg-white dark:bg-surface-dark-muted text-gray-600 dark:text-gray-400 border border-surface-border dark:border-surface-dark-border hover:bg-gray-50 dark:hover:bg-surface-dark-border"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Tests Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTests.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={test.exam === "TCF Canada" ? "default" : "accent"} size="sm">
                        {test.exam}
                      </Badge>
                      <Badge variant="outline" size="sm">{test.difficulty}</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{test.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span>⏱ {test.duration}</span>
                      <span>📝 {test.questions || test.tasks} items</span>
                      <span>⭐ {test.rating}</span>
                      <span>👥 {test.completed.toLocaleString()} completed</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {test.sections.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-surface-dark-muted text-xs text-gray-600 dark:text-gray-400">
                          {s}
                        </span>
                      ))}
                    </div>
                    <Button variant="primary" fullWidth size="md">
                      {test.type === "Full" ? "Start Full Exam" : "Start Practice"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}