import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = forwardRef(({
  className,
  variant = "primary",
  size = "default",
  icon,
  iconPosition = "left",
  loading = false,
  children,
  ...props
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:scale-105 shadow-lg hover:shadow-xl",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary bg-white",
    ghost: "text-gray-700 hover:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg",
  }
  
  const sizes = {
    sm: "px-3 py-2 text-sm gap-2",
    default: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3",
  }

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />}
      {icon && iconPosition === "left" && !loading && <ApperIcon name={icon} className="h-5 w-5" />}
      {children}
      {icon && iconPosition === "right" && !loading && <ApperIcon name={icon} className="h-5 w-5" />}
    </button>
  )
})

Button.displayName = "Button"

export default Button