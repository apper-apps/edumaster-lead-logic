import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const CurriculumSidebar = ({ course, currentVideoIndex, onVideoChange, className = "" }) => {
  if (!course || !course.curriculumVideos || course.curriculumVideos.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <ApperIcon name="List" className="h-5 w-5 text-primary" />
          커리큘럼
        </h3>
        <p className="text-gray-500 text-center py-8">
          커리큘럼이 없습니다
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <ApperIcon name="List" className="h-5 w-5 text-primary" />
          커리큘럼
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          총 {course.curriculumVideos.length}개 강의
        </p>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {course.curriculumVideos.map((video, index) => (
          <motion.div
            key={video.Id || index}
            whileHover={{ backgroundColor: "#f8fafc" }}
            className={`curriculum-item cursor-pointer transition-all ${
              index === currentVideoIndex ? "active" : ""
            }`}
            onClick={() => onVideoChange(index)}
          >
            <div className="flex items-center gap-4 p-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index === currentVideoIndex
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-medium truncate ${
                  index === currentVideoIndex ? "text-primary" : "text-gray-900"
                }`}>
                  {video.title}
                </h4>
                {video.duration && (
                  <p className="text-sm text-gray-500">
                    {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}
                  </p>
                )}
              </div>

              <ApperIcon 
                name={index === currentVideoIndex ? "Pause" : "Play"} 
                className={`h-4 w-4 ${
                  index === currentVideoIndex ? "text-primary" : "text-gray-400"
                }`} 
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CurriculumSidebar