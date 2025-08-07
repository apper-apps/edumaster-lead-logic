import React from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const TestimonialCard = ({ testimonial, onEdit, onDelete, onToggleVisibility, showActions = false }) => {
  const handleEdit = () => onEdit(testimonial)
  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(testimonial.Id)
    }
  }
  const handleToggleVisibility = () => onToggleVisibility(testimonial.Id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`testimonial-card ${testimonial.isHidden ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="bg-gradient-primary rounded-full p-3 flex-shrink-0">
          <ApperIcon name="User" className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-gray-800">사용자</span>
            <span className="text-gray-500 text-sm">
              {new Date(testimonial.createdAt).toLocaleDateString("ko-KR")}
            </span>
            {testimonial.isHidden && (
              <span className="text-red-500 text-xs bg-red-50 px-2 py-1 rounded-full">
                숨김
              </span>
            )}
          </div>
          
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
            {testimonial.content}
          </p>

          {showActions && (
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={handleEdit}
                className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
              >
                <ApperIcon name="Edit" className="h-4 w-4" />
                수정
              </button>
              <button
                onClick={handleToggleVisibility}
                className="text-gray-500 hover:text-yellow-600 transition-colors flex items-center gap-1"
              >
                <ApperIcon name={testimonial.isHidden ? "Eye" : "EyeOff"} className="h-4 w-4" />
                {testimonial.isHidden ? "표시" : "숨김"}
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard