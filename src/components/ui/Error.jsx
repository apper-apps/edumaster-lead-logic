import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ error = "오류가 발생했습니다", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
      <div className="bg-red-50 rounded-full p-6 mb-6">
        <ApperIcon name="AlertCircle" className="h-16 w-16 text-red-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">문제가 발생했습니다</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" className="h-5 w-5" />
          다시 시도
        </button>
      )}
    </div>
  )
}

export default Error