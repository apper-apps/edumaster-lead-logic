import React, { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Checkbox = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <input
      type="checkbox"
      className={cn(
        "form-checkbox",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox