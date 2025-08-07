import React from "react"
import { motion } from "framer-motion"
import VideoThumbnail from "@/components/molecules/VideoThumbnail"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const VideoGrid = ({ 
  courses, 
  loading, 
  error, 
  onVideoClick, 
  onRetry,
  showEdit = false,
  onEdit,
  onDelete,
  onAddNew,
  emptyTitle = "강의가 없습니다",
  emptyDescription = "새로운 강의를 추가해보세요"
}) => {
  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={onRetry} />
  if (!courses || courses.length === 0) {
    return (
      <Empty
        title={emptyTitle}
        description={emptyDescription}
        action={onAddNew}
        actionLabel="강의 추가"
        icon="Play"
      />
    )
  }

  // 고정된 강의를 맨 앞으로 정렬
  const sortedCourses = [...courses].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedCourses.map((course, index) => (
        <motion.div
          key={course.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <VideoThumbnail
            course={course}
            onClick={onVideoClick}
            showEdit={showEdit}
            onEdit={onEdit}
            onDelete={onDelete}
            isPinned={course.isPinned}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default VideoGrid