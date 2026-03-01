import type React from "react"
import { cn } from "@/lib/utils"

interface CardWrapperProps {
  children: React.ReactNode
  className?: string
}

export function CardWrapper({ children, className = "" }: CardWrapperProps) {
  return (
    <div className={cn(
      "bg-card rounded-2xl p-6 border-2 border-foreground/8 shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      {children}
    </div>
  )
}
