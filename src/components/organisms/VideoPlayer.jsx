import React, { useState } from "react"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"

const VideoPlayer = ({ course, currentVideoIndex, onVideoChange, onEdit, showEdit = false }) => {
  const [activeTab, setActiveTab] = useState("description")
  
  if (!course) return null

  const currentVideo = course.curriculumVideos?.[currentVideoIndex] || course.curriculumVideos?.[0]
  const videoUrl = currentVideo?.videoUrl || course.videoUrl || ""
  
  // YouTube URL을 embed URL로 변환
  const getEmbedUrl = (url) => {
    if (!url) return ""
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
  }

  const handleEdit = () => {
    if (onEdit) onEdit(course)
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative">
        <div className="video-responsive">
          <iframe
            src={getEmbedUrl(videoUrl)}
            title={currentVideo?.title || course.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-2xl"
          />
        </div>
        
        {showEdit && (
          <Button
            variant="secondary"
            onClick={handleEdit}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border-0 shadow-lg"
            icon="Edit"
          >
            수정
          </Button>
        )}
      </div>

      {/* Video Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentVideo?.title || course.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {course.allowedRoles?.map((role) => (
                <Badge key={role} variant={role}>
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "description"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              강의 설명
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "curriculum"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              커리큘럼
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <div
                className="rich-editor"
                dangerouslySetInnerHTML={{ __html: course.description }}
              />
            </div>
          )}

          {activeTab === "curriculum" && (
            <div className="space-y-3">
              {course.curriculumVideos?.map((video, index) => (
                <motion.div
                  key={video.Id || index}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    index === currentVideoIndex
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50 bg-white"
                  }`}
                  onClick={() => onVideoChange(index)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index === currentVideoIndex
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{video.title}</h4>
                      {video.duration && (
                        <p className="text-sm text-gray-500">
                          {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, "0")}
                        </p>
                      )}
                    </div>
                    <ApperIcon name="Play" className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer