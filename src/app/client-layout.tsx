"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = stored === "dark" || (!stored && prefersDark)
    document.documentElement.classList.toggle("dark", isDark)
  }, [])

  // Prevent flash of incorrect theme
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-surface-dark">
        {children}
      </div>
    )
  }

  return <>{children}</>
}