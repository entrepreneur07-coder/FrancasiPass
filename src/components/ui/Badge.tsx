"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { HTMLAttributes } from "react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300",
        primary: "bg-primary-600 text-white dark:bg-primary-500 dark:text-white",
        accent: "bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300",
        success: "bg-success-light text-success dark:bg-success-dark/50 dark:text-success-light",
        warning: "bg-warning-light text-warning dark:bg-warning-dark/50 dark:text-warning-light",
        error: "bg-error-light text-error dark:bg-error-dark/50 dark:text-error-light",
        outline: "border border-primary-200 text-primary-700 dark:border-primary-700 dark:text-primary-300",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  )
}