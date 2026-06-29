"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui"

export function CTASection() {
  return (
    <section className="py-section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),transparent_60%)] -z-10" />
      
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-display font-bold text-white mb-4">
            Your Canadian Dream Starts Here
          </h2>
          <p className="text-body-lg text-primary-200 mb-8 max-w-xl mx-auto">
            Join thousands of candidates who transformed their French score — 
            and their CRS profile. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/register" variant="white" size="xl" className="text-base shadow-lg">
              Start Free Trial
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button href="#features" variant="outline" size="xl" className="text-base border-primary-300 text-primary-100 hover:bg-primary-800/50">
              Learn More
            </Button>
          </div>
          <p className="text-sm text-primary-300 mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  )
}