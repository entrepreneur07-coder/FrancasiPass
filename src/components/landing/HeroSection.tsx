"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient-light dark:bg-none -z-10" />
      <div className="absolute inset-0 dark:bg-hero-gradient opacity-[0.03] -z-10" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-200/40 dark:bg-primary-800/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-accent-200/30 dark:bg-accent-800/20 rounded-full blur-3xl -z-10" />

      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300 border border-primary-200 dark:border-primary-700">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              #1 for TEF/TCF Canada Preparation
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display-xl font-bold text-balance mb-6"
          >
            You&apos;re Not Buying{" "}
            <span className="gradient-text-hero">French Lessons</span>
            <br />
            <span className="text-gray-900 dark:text-white">
              You&apos;re Buying <span className="gradient-text">CRS Points</span> &amp;{" "}
              <span className="gradient-text">PR Approval</span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 text-balance"
          >
            The only platform built for Canadian immigration success. 
            AI-powered TEF/TCF mock exams that maximize your CLB score 
            and unlock those crucial Express Entry points — so you get 
            PR approval faster.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button href="/register" variant="primary" size="xl" className="text-base">
              Start Your Free Trial
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button href="#exams" variant="outline" size="xl" className="text-base">
              View Mock Exams
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 border-2 border-white dark:border-surface-dark flex items-center justify-center text-[10px] font-bold text-white"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900/50 border-2 border-white dark:border-surface-dark flex items-center justify-center text-xs font-medium text-primary-700 dark:text-primary-300">
                +2k
              </div>
            </div>
            <p className="text-body-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-800 dark:text-gray-200">2,000+</span> candidates boosted their CRS score this month
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}