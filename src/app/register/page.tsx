"use client"

import { useState, FormEvent } from "react"
import { Button } from "@/components/ui"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [target, setTarget] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, targetCLB: target || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Registration failed")
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-surface-dark px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              FP
            </div>
            <span className="font-semibold text-lg text-gray-900 dark:text-white">
              Francais<span className="text-primary-600 dark:text-primary-400">Pass</span>
            </span>
          </Link>
          <h1 className="text-heading-xl font-bold mb-2">Start your journey</h1>
          <p className="text-body-sm text-gray-500 dark:text-gray-400">
            Your Canadian immigration success starts here — for free
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                required
                className="w-full h-10 px-3 rounded-lg border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                required
                className="w-full h-10 px-3 rounded-lg border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full h-10 px-3 rounded-lg border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              className="w-full h-10 px-3 rounded-lg border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Target CLB Score
            </label>
            <select
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select your target</option>
              <option value="5">CLB 5 (Basic)</option>
              <option value="7">CLB 7 (Intermediate)</option>
              <option value="9">CLB 9 (Advanced)</option>
              <option value="10">CLB 10+ (Expert)</option>
            </select>
          </div>
          <Button type="submit" fullWidth size="lg" loading={loading}>
            Create Free Account
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <a href="#" className="underline">Terms</a> and{" "}
          <a href="#" className="underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}