"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/ui"
import Link from "next/link"

// Mock data — will be replaced with real API calls
const mockStats = {
  predictedCLB: 7,
  streak: 12,
  testsCompleted: 34,
  studyHours: 28.5,
  weakAreas: ["Listening", "Speaking"],
  recentActivity: [
    { type: "test", name: "TCF Canada — Compréhension orale", score: "B2", date: "2 hours ago" },
    { type: "test", name: "TEF Canada — Expression écrite", score: "C1", date: "Yesterday" },
    { type: "lesson", name: "Vocabulary: Immigration Vocabulary", progress: "80%", date: "2 days ago" },
    { type: "test", name: "TCF Canada — Structures de la langue", score: "B1", date: "3 days ago" },
  ],
}

export default function DashboardPage() {
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
              CLB {mockStats.predictedCLB} · {mockStats.streak}-day streak
            </div>
            <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-sm font-semibold text-primary-700 dark:text-primary-300">
              JD
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
          <h1 className="text-heading-xl font-bold mb-2">Welcome back, John</h1>
          <p className="text-body-sm text-gray-500 dark:text-gray-400">
            You&apos;re <span className="text-primary-600 dark:text-primary-400 font-semibold">{mockStats.predictedCLB} CLB</span> — just{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">2 more points</span> to unlock{" "}
            <span className="font-semibold text-accent-600 dark:text-accent-400">50 extra CRS points</span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Predicted CLB", value: mockStats.predictedCLB, unit: "/12", icon: "📊", trend: "up" },
            { label: "Day Streak", value: mockStats.streak, unit: " days", icon: "🔥", trend: "up" },
            { label: "Tests Completed", value: mockStats.testsCompleted, unit: "", icon: "📝", trend: "up" },
            { label: "Study Hours", value: mockStats.studyHours, unit: "h", icon: "⏱️", trend: "up" },
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
                      {stat.trend === "up" ? "↑" : "↓"}
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
                <div className="space-y-5">
                  {[
                    { skill: "Reading", level: 7, target: 9, color: "bg-primary-500" },
                    { skill: "Writing", level: 6, target: 9, color: "bg-accent-500" },
                    { skill: "Listening", level: 6, target: 9, color: "bg-blue-500" },
                    { skill: "Speaking", level: 8, target: 9, color: "bg-emerald-500" },
                  ].map((skill) => (
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
                          animate={{ width: `${(skill.level / skill.target) * 100}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full rounded-full ${skill.color}`}
                        />
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {skill.level < skill.target
                          ? `${((skill.target - skill.level) / 2) * 10} more CRS points possible`
                          : "Target reached!"}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CRS Points Preview */}
                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-950/50 rounded-xl border border-primary-100 dark:border-primary-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary-800 dark:text-primary-200">Estimated CRS Boost</p>
                      <p className="text-xs text-primary-600 dark:text-primary-400">With target CLB 9 in all skills</p>
                    </div>
                    <div className="text-right">
                      <span className="text-display font-bold text-primary-600 dark:text-primary-400">+67</span>
                      <span className="text-sm text-primary-500 dark:text-primary-500"> points</span>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-primary-200 dark:bg-primary-800 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-primary-500 rounded-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity & Weak Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Weak Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Focus Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockStats.weakAreas.map((area) => (
                  <div key={area} className="flex items-center justify-between p-3 bg-error-light/50 dark:bg-error-dark/20 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{area}</span>
                    <Link href={`/exams/tcf`} className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline">
                      Practice →
                    </Link>
                  </div>
                ))}
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
                {mockStats.recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-surface-border dark:border-surface-dark-border last:border-0 last:pb-0">
                    <div className={`mt-0.5 h-2 w-2 rounded-full ${activity.type === "test" ? "bg-primary-500" : "bg-accent-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{activity.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</span>
                        {"score" in activity && (
                          <Badge variant="outline" size="sm">{activity.score}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "TCF Canada", desc: "Full-length mock exam", href: "/exams/tcf", icon: "🇫🇷", color: "from-primary-500 to-primary-600" },
              { title: "TEF Canada", desc: "Comprehension & expression", href: "/exams/tef", icon: "🇫🇷", color: "from-accent-500 to-accent-600" },
              { title: "AI Tutor", desc: "Get instant feedback", href: "/tutor", icon: "🤖", color: "from-purple-500 to-primary-500" },
              { title: "Vocabulary", desc: "Spaced repetition", href: "#", icon: "📚", color: "from-emerald-500 to-accent-500" },
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
        </motion.div>
      </main>
    </div>
  )
}