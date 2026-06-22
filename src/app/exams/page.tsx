"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Button } from "@/components/ui"
import Link from "next/link"

const examTypes = [
  {
    id: "tcf",
    name: "TCF Canada",
    fullName: "Test de connaissance du français pour le Canada",
    description: "IRCC-approved French proficiency test for Express Entry and citizenship. Recognized by Citizenship and Immigration Canada.",
    sections: [
      { name: "Compréhension orale", duration: "35 min", questions: 39 },
      { name: "Compréhension écrite", duration: "60 min", questions: 39 },
      { name: "Expression écrite", duration: "60 min", tasks: 3 },
      { name: "Expression orale", duration: "15 min", tasks: 3 },
    ],
    accent: "from-primary-500 to-primary-700",
    badge: "Popular",
    href: "/exams/tcf",
  },
  {
    id: "tef",
    name: "TEF Canada",
    fullName: "Test d'évaluation de français pour le Canada",
    description: "IRCC-designated French assessment for Express Entry, PNP, and Canadian citizenship applications.",
    sections: [
      { name: "Compréhension orale", duration: "40 min", questions: 60 },
      { name: "Compréhension écrite", duration: "60 min", questions: 50 },
      { name: "Expression écrite", duration: "60 min", tasks: 2 },
      { name: "Expression orale", duration: "15 min", tasks: 2 },
    ],
    accent: "from-accent-500 to-teal-600",
    badge: "New",
    href: "/exams/tef",
  },
]

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">Exam Modules</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">← Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="section-container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-display font-bold mb-4">
              Choose Your <span className="gradient-text">Exam Module</span>
            </h1>
            <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Both TCF Canada and TEF Canada are accepted by IRCC for Express Entry, 
              PNP, and citizenship applications. Pick the one that matches your 
              preparation strategy.
            </p>
          </div>

          {/* Exam Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {examTypes.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${exam.accent} text-white text-xl`}>
                        🇫🇷
                      </div>
                      <Badge variant={exam.badge === "Popular" ? "primary" : "accent"}>{exam.badge}</Badge>
                    </div>
                    <CardTitle className="text-xl">{exam.name}</CardTitle>
                    <CardDescription className="text-sm">{exam.fullName}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-6">
                      {exam.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {exam.sections.map((section) => (
                        <div
                          key={section.name}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-surface-dark-muted rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{section.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {section.duration} · {section.questions ? `${section.questions} questions` : `${section.tasks} tasks`}
                            </p>
                          </div>
                          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      ))}
                    </div>

                    <Link href={exam.href} className="block w-full">
                      <Button variant={exam.id === "tcf" ? "primary" : "secondary"} fullWidth size="lg">
                        Start {exam.name} Practice
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card glass>
              <CardHeader>
                <CardTitle>Which exam should you take?</CardTitle>
                <CardDescription>
                  Both are accepted by IRCC. Here&apos;s how they compare.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-surface-border dark:border-surface-dark-border">
                        <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                        <th className="text-left py-3 px-4 font-semibold text-primary-600 dark:text-primary-400">TCF Canada</th>
                        <th className="text-left py-3 pl-4 font-semibold text-accent-600 dark:text-accent-400">TEF Canada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-border dark:divide-surface-dark-border">
                      {[
                        { feature: "Valid for Express Entry", tcf: "✓", tef: "✓" },
                        { feature: "Valid for Citizenship", tcf: "✓", tef: "✓" },
                        { feature: "Listening questions", tcf: "39", tef: "60" },
                        { feature: "Reading questions", tcf: "39", tef: "50" },
                        { feature: "Total duration", tcf: "~2h50", tef: "~2h55" },
                        { feature: "Score scale", tcf: "CLB 1–12", tef: "CLB 1–12" },
                        { feature: "Results time", tcf: "5–7 days", tef: "4–6 weeks" },
                      ].map((row) => (
                        <tr key={row.feature}>
                          <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">{row.feature}</td>
                          <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.tcf}</td>
                          <td className="py-3 pl-4 text-gray-700 dark:text-gray-300">{row.tef}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-xs text-gray-400 dark:text-gray-500 mt-8"
          >
            FrancaisPass is not affiliated with TEF, TCF, CCI Paris, or IRCC. 
            Exam formats and durations are inspired by official public guidelines. 
            All practice questions are original educational content created by FrancaisPass.
          </motion.p>
        </motion.div>
      </main>
    </div>
  )
}