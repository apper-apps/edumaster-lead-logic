import React from "react"

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card-premium p-6">
            <div className="aspect-video bg-gray-200 rounded-lg mb-4 loading-shimmer" />
            <div className="h-6 bg-gray-200 rounded mb-3 loading-shimmer" />
            <div className="h-4 bg-gray-200 rounded mb-2 loading-shimmer" />
            <div className="h-4 bg-gray-200 rounded w-3/4 loading-shimmer" />
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-16 bg-gray-200 rounded-full loading-shimmer" />
              <div className="h-6 w-20 bg-gray-200 rounded-full loading-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading