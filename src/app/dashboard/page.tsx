"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, Badge, StatCardSkeleton, Button } from "@/components/ui"
import Link from "next/link"

interface DashboardStats {
  predictedCLB: number
  streak: number
  testsCompleted: number
  studyHours: number
}

interface RecentActivity {
  type: "test"
  name: string
  score: string
  date: string
  testId: string
  attemptId: string
}

interface SkillProgress {
  skill: string
  level: number
  target: number
  color: string
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    predictedCLB: 0,
    streak: 0,
    testsCompleted: 0,
    studyHours: 0,
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [skills, setSkills] = useState<SkillProgress[]>([
    { skill: "Reading", level: 0, target: 9, color: "bg-primary-500" },
    { skill: "Writing", level: 0, target: 9, color: "bg-accent-500" },
    { skill: "Listening", level: 0, target: 9, color: "bg-blue-500" },
    { skill: "Speaking", level: 0, target: 9, color: "bg-emerald-500" },
  ])

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true)
      setError(null)
      try {
        // Try to load from API first
        const res = await fetch("/api/tests?type=tef")
        if (!res.ok) throw new Error("Failed to fetch test data")
        const data = await res.json()

        // Collect recent activity from localStorage
        const activity: RecentActivity[] = []
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (key?.startsWith("test_result_")) {
            try {
              const cached = JSON.parse(localStorage.getItem(key)!)
              activity.push({
                type: "test" as const,
                name: cached.title || "Practice Test",
                score: cached.score ? `${cached.score}/${cached.max_score}` : "—",
                date: new Date().toLocaleDateString("en-CA", { month: "short", day: "numeric" }),
                testId: cached.test_id,
                attemptId: key.replace("test_result_", ""),
              })
            } catch {}
          }
        }

        // Compute stats from localStorage data
        const completedTests = activity.length
        const clbScores = activity
          .map(a => {
            try {
              const cached = JSON.parse(localStorage.getItem(`test_result_${a.attemptId}`)!)
              return cached.clb || 0
            } catch { return 0 }
          })
          .filter((c: number) => c > 0)
        const predictedCLB = clbScores.length > 0
          ? Math.round(clbScores.reduce((a: number, b: number) => a + b, 0) / clbScores.length)
          : 0

        setStats({
          predictedCLB,
          streak: Math.min(completedTests, 7), // simulated streak
          testsCompleted: completedTests,
          studyHours: completedTests * 1.5,
        })

        // Per-module skill levels from cached results
        const moduleLevels: Record<string, number[]> = {}
        for (const a of activity) {
          try {
            const cached = JSON.parse(localStorage.getItem(`test_result_${a.attemptId}`)!)
            const mod = cached.module || ""
            if (cached.clb) {
              if (!moduleLevels[mod]) moduleLevels[mod] = []
              moduleLevels[mod].push(cached.clb)
            }
          } catch {}
        }

        setSkills([
          { skill: "Reading", level: moduleLevels["reading"] ? Math.round(moduleLevels["reading"].reduce((a,b) => a+b,0) / moduleLevels["reading"].length) : 0, target: 9, color: "bg-primary-500" },
          { skill: "Writing", level: moduleLevels["writing"] ? Math.round(moduleLevels["writing"].reduce((a,b) => a+b,0) / moduleLevels["writing"].length) : 0, target: 9, color: "bg-accent-500" },
          { skill: "Listening", level: moduleLevels["listening"] ? Math.round(moduleLevels["listening"].reduce((a,b) => a+b,0) / moduleLevels["listening"].length) : 0, target: 9, color: "bg-blue-500" },
          { skill: "Speaking", level: moduleLevels["speaking"] ? Math.round(moduleLevels["speaking"].reduce((a,b) => a+b,0) / moduleLevels["speaking"].length) : 0, target: 9, color: "bg-emerald-500" },
        ])

        setRecentActivity(activity.slice(0, 8))
      } catch (err: any) {
        setError(err.message || "Failed to load dashboard")
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  // CRS points estimate: each CLB level above 5 in each skill adds points
  const maxCrsBoost = 50
  const totalSkillLevel = skills.reduce((sum, s) => sum + s.level, 0)
  const crsBoost = Math.round((totalSkillLevel / (skills.length * 9)) * maxCrsBoost)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark">
      {/* Top Bar */}
      <header className="glass sticky top-0 z-40 border-b border-surface-border dark:border-surface-dark-border">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">Dashboard</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1 text-body-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex h-2 w-2 rounded-full bg-success"></span>
              CLB {stats.predictedCLB} · {stats.streak}-day streak
            </div>
            <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-sm font-semibold text-primary-700 dark:text-primary-300">
              FP
            </div>
          </div>
        </div>
      </header>

      <main className="section-container py-8">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-heading-xl font-bold mb-2">
            {stats.testsCompleted > 0 ? "Welcome back!" : "Welcome to FrancaisPass"}
          </h1>
          <p className="text-body-sm text-gray-500 dark:text-gray-400">
            {stats.testsCompleted > 0
              ? `You've completed ${stats.testsCompleted} test${stats.testsCompleted !== 1 ? "s" : ""}. Keep going — every point counts toward your Canadian dream.`
              : "Start your journey to Canadian immigration success. Take a mock exam or practice with the AI tutor."}
          </p>
        </motion.div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1,2,3,4].map(i => <StatCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Predicted CLB", value: stats.predictedCLB, unit: "/12", icon: "📊", trend: stats.predictedCLB >= 5 ? "up" : "neutral" },
              { label: "Day Streak", value: stats.streak, unit: " days", icon: "🔥", trend: stats.streak >= 3 ? "up" : "neutral" },
              { label: "Tests Completed", value: stats.testsCompleted, unit: "", icon: "📝", trend: stats.testsCompleted > 0 ? "up" : "neutral" },
              { label: "Study Hours", value: stats.studyHours, unit: "h", icon: "⏱️", trend: stats.studyHours > 2 ? "up" : "neutral" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{stat.icon}</span>
                      <Badge variant={stat.trend === "up" ? "success" : "default"} size="sm">
                        {stat.trend === "up" ? "↑" : "—"}
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-display font-bold">{stat.value}</span>
                      <span className="text-body-sm text-gray-500 dark:text-gray-400">{stat.unit}</span>
                    </div>
                    <p className="text-body-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* CLB Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle>CLB Progression</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-5">
                    {[1,2,3,4].map(i => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="h-4 w-20 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded" />
                          <div className="h-4 w-16 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded" />
                        </div>
                        <div className="h-2.5 bg-gray-100 dark:bg-surface-dark-muted rounded-full overflow-hidden" />
                        <div className="h-3 w-32 bg-gray-100 dark:bg-surface-dark-muted animate-pulse rounded mt-1" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-5">
                    {skills.map((skill) => (
                      <div key={skill.skill}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.skill}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            CLB {skill.level}
                            <span className="text-gray-300 dark:text-gray-600"> / {skill.target}</span>
                          </span>
                        </div>
                        <div className="h-2.5 bg-gray-100 dark:bg-surface-dark-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.target > 0 ? (skill.level / skill.target) * 100 : 0}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full ${skill.color}`}
                          />
                        </div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {skill.level > 0
                            ? `${Math.max(0, Math.round(((skill.target - skill.level) / skill.target) * 50))} more CRS points possible`
                            : "Take a mock test to establish your baseline"}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* CRS Points Preview */}
                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-950/50 rounded-xl border border-primary-100 dark:border-primary-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-800 dark:text-primary-200">Estimated CRS Boost</p>
                      <p className="text-xs text-primary-600 dark:text-primary-400">With target CLB 9 in all skills</p>
                    </div>
                    <div className="text-right">
                      <span className="text-display font-bold text-primary-600 dark:text-primary-400">{crsBoost}</span>
                      <span className="text-sm text-primary-500 dark:text-primary-500"> / {maxCrsBoost} pts</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-primary-200 dark:bg-primary-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: `${(crsBoost / maxCrsBoost) * 100}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="h-full bg-primary-500 rounded-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity & Focus Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Focus Areas — computed from skills */}
            <Card>
              <CardHeader>
                <CardTitle>Focus Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-12 bg-gray-100 dark:bg-surface-dark-muted animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : skills.filter(s => s.level > 0 && s.level < 7).length > 0 ? (
                  <>
                    {skills.filter(s => s.level > 0 && s.level < 7).map((area) => (
                      <div key={area.skill} className="flex items-center justify-between p-3 bg-error-light/50 dark:bg-error-dark/20 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{area.skill}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">CLB {area.level}</span>
                        </div>
                        <Link href={`/tests?filter=${area.skill.toLowerCase()}`} className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                          Practice →
                        </Link>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                    {stats.testsCompleted > 0
                      ? "Great progress! Take more tests to identify weak areas."
                      : "Complete a mock test to identify your focus areas"}
                  </p>
                )}
                <Link href="/exams" className="block text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline pt-2">
                  View all exam modules →
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {loading ? (
                  <div className="space-y-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-surface-border dark:border-surface-dark-border last:border-0 last:pb-0">
                        <div className="h-2 w-2 rounded-full bg-gray-200 dark:bg-surface-dark-border animate-pulse mt-0.5" />
                        <div className="flex-1">
                          <div className="h-4 w-32 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded mb-1" />
                          <div className="h-3 w-20 bg-gray-100 dark:bg-surface-dark-muted animate-pulse rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : recentActivity.length > 0 ? (
                  <>
                    {recentActivity.map((activity, i) => (
                      <div key={i} className="flex items-start gap-3 pb-3 border-b border-surface-border dark:border-surface-dark-border last:border-0 last:pb-0">
                        <div className="mt-0.5 h-2 w-2 rounded-full bg-primary-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{activity.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
                            <Badge variant="outline" size="sm">{activity.score}</Badge>
                          </div>
                        </div>
                        {activity.attemptId && (
                          <Link href={`/results/${activity.attemptId}?testId=${activity.testId}`} className="text-xs text-primary-600 dark:text-primary-400 hover:underline shrink-0">
                            View →
                          </Link>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                    No activity yet. Start a mock test to see your progress here.
                  </p>
                )}
                <Link href="/tests" className="block text-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline pt-2">
                  See all test results →
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-heading font-bold mb-4">Continue Learning</h2>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="rounded-2xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted p-5 space-y-3">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded-xl" />
                  <div className="h-5 w-24 bg-gray-200 dark:bg-surface-dark-border animate-pulse rounded" />
                  <div className="h-4 w-32 bg-gray-100 dark:bg-surface-dark-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: "TCF Canada", desc: "Full-length mock exam", href: "/exams/tcf", icon: "🇫🇷", color: "from-primary-500 to-primary-600" },
                { title: "TEF Canada", desc: "Comprehension & expression", href: "/exams/tef", icon: "🇫🇷", color: "from-accent-500 to-accent-600" },
                { title: "AI Tutor", desc: "Get instant feedback", href: "/tutor", icon: "🤖", color: "from-purple-500 to-primary-500" },
                { title: "Vocabulary", desc: "Spaced repetition", href: "/vocabulary", icon: "📚", color: "from-emerald-500 to-accent-500" },
              ].map((item) => (
                <Link key={item.title} href={item.href}>
                  <Card hover className="h-full cursor-pointer">
                    <CardContent className="p-5">
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white mb-3`}>
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                      <p className="text-body-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
