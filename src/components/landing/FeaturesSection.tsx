"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"

const features = [
  {
    title: "AI-Powered Mock Exams",
    description: "The largest library of realistic TEF Canada & TCF Canada practice tests. Adaptive AI analyzes your performance and predicts your CLB score with precision.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5-4 8-10 10C6 20 2 17 2 12 2 6.5 6 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    gradient: "from-primary-500 to-primary-600",
  },
  {
    title: "CRS Score Maximizer",
    description: "Every point matters. Our system identifies your weakest areas and creates a targeted plan to push your French CLB from 5 to 7+ — unlocking those crucial Express Entry points.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    gradient: "from-accent-500 to-accent-600",
  },
  {
    title: "Speaking & Writing AI Tutor",
    description: "Get instant, detailed feedback on your spoken and written French. Our advanced AI evaluates your pronunciation, grammar, and coherence — just like the real exam.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01" />
        <path d="M12 10h.01" />
        <path d="M16 10h.01" />
      </svg>
    ),
    gradient: "from-primary-400 to-accent-400",
  },
  {
    title: "Personalized Study Plans",
    description: "AI-generated study plans adapt to your schedule, current level, and target score. Smart spaced repetition ensures you retain what you learn and make rapid progress.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    gradient: "from-accent-500 to-teal-500",
  },
  {
    title: "Full Exam Simulations",
    description: "Experience the real test conditions with timed mock exams that mirror the exact format, timing, and scoring of TEF Canada and TCF Canada.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    gradient: "from-primary-500 to-primary-700",
  },
  {
    title: "Progress Analytics Dashboard",
    description: "Track your improvement with detailed analytics. See your predicted CLB score, weak areas, and exactly how many CRS points you're unlocking.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 4-6" />
      </svg>
    ),
    gradient: "from-accent-500 to-blue-500",
  },
]

export function FeaturesSection() {
  // Feature icons rendering with color coding
  return (
    <section id="features" className="py-section">
      <div className="section-container">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-display font-bold mb-4">
            Everything You Need to <span className="gradient-text">Maximize Your Score</span>
          </h2>
          <p className="text-body-lg text-gray-600 dark:text-gray-400">
            Built for Canadian immigration success. Our platform targets every skill 
            tested in TEF Canada and TCF Canada — because your CLB score determines your future.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-3`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}