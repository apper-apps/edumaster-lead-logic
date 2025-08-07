import React from "react"
import { motion } from "framer-motion"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const VideoThumbnail = ({ 
  course, 
  onClick, 
  showEdit = false, 
  onEdit, 
  onDelete,
  isPinned = false 
}) => {
  const handleClick = (e) => {
    e.preventDefault()
    onClick(course)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(course)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(course.Id)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="card-premium overflow-hidden cursor-pointer relative group"
      onClick={handleClick}
    >
      {isPinned && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-accent text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
          <ApperIcon name="Pin" className="h-3 w-3" />
          고정
        </div>
      )}
      
      {showEdit && (
        <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-primary hover:bg-primary hover:text-white transition-all shadow-lg"
          >
            <ApperIcon name="Edit" className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img
          src={course.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <ApperIcon name="Play" className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:gradient-text transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {course.allowedRoles?.map((role) => (
            <Badge key={role} variant={role}>
              {role}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <ApperIcon name="PlayCircle" className="h-4 w-4" />
            {course.curriculumVideos?.length || 0}개 강의
          </span>
          <span className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="h-4 w-4" />
            {new Date(course.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default VideoThumbnail