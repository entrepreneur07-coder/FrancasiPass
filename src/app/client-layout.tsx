"use client"

import { useEffect } from "react"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = stored === "dark" || (!stored && prefersDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  return <div className="min-h-screen bg-white dark:bg-surface-dark">{children}</div>
}