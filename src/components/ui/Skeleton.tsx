"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gray-200 dark:bg-surface-dark-border",
        className
      )}
    />
  )
}

/** Pre-composed skeleton for test cards in the test library */
export function TestCardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <div className="flex gap-3">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-10" />
      </div>
      <div className="flex gap-1.5">
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  )
}

/** Pre-composed skeleton for stat cards on the dashboard */
export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-border dark:border-surface-dark-border bg-white dark:bg-surface-dark-muted p-5 space-y-3">
      <div className="flex items-start justify-between">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-4 w-20" />
    </div>
  )
}

/** Pre-composed skeleton for the answer review items */
export function AnswerReviewSkeleton() {
  return (
    <div className="rounded-xl border border-surface-border dark:border-surface-dark-border p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="h-6 w-6 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
