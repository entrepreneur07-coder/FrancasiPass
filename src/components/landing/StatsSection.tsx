"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "50,000+", label: "Practice Tests Completed", description: "By candidates just like you" },
  { value: "CLB 7+", label: "Average Score", description: "Achieved within 30 days" },
  { value: "92%", label: "Success Rate", description: "First-time target score achieved" },
  { value: "4.9/5", label: "User Rating", description: "From verified candidates" },
]

export function StatsSection() {
  return (
    <section className="py-section-sm bg-primary-900 dark:bg-primary-950">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-display font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-primary-200 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-primary-300/70">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}