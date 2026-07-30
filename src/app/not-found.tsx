import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 | Page not found — FrancaisPass",
  robots: { index: false },
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-surface-dark flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/40 dark:to-accent-900/40 flex items-center justify-center mx-auto mb-6">
          <svg className="h-12 w-12 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
        </div>

        <h1 className="text-display font-bold text-gray-900 dark:text-white mb-2">404</h1>
        <h2 className="text-heading font-semibold text-gray-700 dark:text-gray-300 mb-3">Page not found</h2>
        <p className="text-body-sm text-gray-500 dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let&apos;s get you back on track toward your Canadian immigration goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tests"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 transition-colors"
          >
            Browse Mock Tests
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-surface-border dark:border-surface-dark-border text-gray-700 dark:text-gray-300 font-medium text-sm hover:bg-gray-50 dark:hover:bg-surface-dark-muted transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-8">
          FrancaisPass is not affiliated with TEF, TCF, CCI Paris, or IRCC.
        </p>
      </div>
    </div>
  )
}
