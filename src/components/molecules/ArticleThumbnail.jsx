import React from "react"
import { motion } from "framer-motion"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const ArticleThumbnail = ({ 
  article, 
  onClick, 
  showEdit = false, 
  onEdit, 
  onDelete 
}) => {
  const handleClick = (e) => {
    e.preventDefault()
    onClick(article)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit(article)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      onDelete(article.Id)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="card-premium overflow-hidden cursor-pointer relative group"
      onClick={handleClick}
    >
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
          src={article.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg">
            {article.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {article.allowedRoles?.map((role) => (
            <Badge key={role} variant={role}>
              {role}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <ApperIcon name="FileText" className="h-4 w-4" />
            아티클
          </span>
          <span className="flex items-center gap-1">
            <ApperIcon name="Calendar" className="h-4 w-4" />
            {new Date(article.createdAt).toLocaleDateString("ko-KR")}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default ArticleThumbnail