import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Textarea = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <textarea
      className={cn(
        "form-textarea",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export default Textarea