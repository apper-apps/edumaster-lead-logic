import React from "react"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import { cn } from "@/utils/cn"

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  required, 
  children,
  className = "",
  ...props 
}) => {
  const renderInput = () => {
    if (children) return children
    
    switch (type) {
      case "textarea":
        return <Textarea {...props} />
      case "select":
        return <Select {...props} />
      default:
        return <Input type={type} {...props} />
    }
  }

  return (
    <div className={cn("form-group", className)}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField