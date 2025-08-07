import React from "react"
import { cn } from "@/utils/cn"

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-700",
    free: "bg-gray-100 text-gray-700",
    member: "bg-blue-100 text-blue-700",
    master: "bg-purple-100 text-purple-700",
    both: "bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700",
    admin: "bg-red-100 text-red-700",
    primary: "bg-primary/10 text-primary",
    success: "bg-green-100 text-green-700",
  }

  return (
    <span className={cn("role-badge", variants[variant], className)}>
      {children}
    </span>
  )
}

export default Badge