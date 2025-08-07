import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "콘텐츠가 없습니다", 
  description = "새로운 콘텐츠를 추가해보세요",
  action,
  actionLabel = "추가하기",
  icon = "FolderOpen",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full p-8 mb-6">
        <ApperIcon name={icon} className="h-20 w-20 gradient-text" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {action && (
        <button onClick={action} className="btn-primary flex items-center gap-2">
          <ApperIcon name="Plus" className="h-5 w-5" />
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default Empty