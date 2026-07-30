"use client"

import { useEffect } from "react"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme")
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      const isDark = stored === "dark" || (!stored && prefersDark)
      document.documentElement.classList.toggle("dark", isDark)
    } catch (e) {
      // localStorage unavailable (private browsing, storage full, SSR)
      // Fall back to system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", prefersDark)
    }
  }, [])

  return <div className="min-h-screen bg-white dark:bg-surface-dark">{children}</div>
}