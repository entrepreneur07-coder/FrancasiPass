"use client"

import { motion } from "framer-motion"
import { Button, Badge, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui"
import { cn } from "@/lib/utils"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Get started with essential practice tools",
    features: [
      { text: "5 mock tests", included: true },
      { text: "Limited daily practice", included: true },
      { text: "Basic AI tutor", included: true },
      { text: "Community forum access", included: true },
      { text: "Advanced writing correction", included: false },
      { text: "Speaking analysis", included: false },
      { text: "Personalized study plan", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started Free",
    variant: "outline" as const,
    featured: false,
  },
  {
    name: "Premium",
    price: "$29",
    period: "/month",
    description: "For serious candidates targeting CLB 7+",
    features: [
      { text: "Unlimited mock tests (400+)", included: true },
      { text: "Full TEF/TCF exam library", included: true },
      { text: "Advanced AI tutor", included: true },
      { text: "Writing correction & feedback", included: true },
      { text: "Speaking analysis & scoring", included: true },
      { text: "Personalized study plan", included: true },
      { text: "Detailed progress analytics", included: true },
      { text: "Email support", included: true },
    ],
    cta: "Start Premium",
    variant: "primary" as const,
    featured: true,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "Maximum support for guaranteed results",
    features: [
      { text: "Everything in Premium", included: true },
      { text: "Unlimited AI evaluations", included: true },
      { text: "1-on-1 priority support", included: true },
      { text: "Weekly performance reports", included: true },
      { text: "Personal coach matching", included: true },
      { text: "Score guarantee program", included: true },
      { text: "Early access to new features", included: true },
      { text: "Priority exam booking", included: true },
    ],
    cta: "Go Pro",
    variant: "secondary" as const,
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-section">
      <div className="section-container">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="accent" size="lg" className="mb-4">Pricing</Badge>
          <h2 className="text-display font-bold mb-4">
            Invest in Your <span className="gradient-text">Canadian Future</span>
          </h2>
          <p className="text-body-lg text-gray-600 dark:text-gray-400">
            Every dollar you spend here earns you CRS points toward PR. 
            Choose the plan that matches your ambition.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative",
                plan.featured && "md:-mt-4 md:mb-4"
              )}
            >
              <Card
                glass={plan.featured}
                hover
                className={cn(
                  "h-full flex flex-col",
                  plan.featured && "ring-2 ring-primary-500 dark:ring-primary-400"
                )}
              >
                {plan.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Badge variant="primary" size="lg">Most Popular</Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-3">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3 text-sm">
                        {feature.included ? (
                          <svg className="h-5 w-5 text-success shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-gray-300 dark:text-gray-600 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        )}
                        <span className={cn(
                          "text-gray-600 dark:text-gray-400",
                          !feature.included && "text-gray-400 dark:text-gray-600"
                        )}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link href={plan.name === "Free" ? "/register" : "/register?plan=" + plan.name.toLowerCase()} className="w-full">
                    <Button variant={plan.variant} fullWidth size="lg">
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-body-sm text-gray-500 dark:text-gray-400 mt-8">
          All plans include a 7-day free trial. Cancel anytime. 
          No long-term commitment required.
        </p>
      </div>
    </section>
  )
}