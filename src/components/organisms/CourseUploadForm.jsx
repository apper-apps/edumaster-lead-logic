import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import FormField from "@/components/molecules/FormField"
import RoleCheckboxGroup from "@/components/molecules/RoleCheckboxGroup"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const CourseUploadForm = ({ course, onSave, onCancel, type = "membership" }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    allowedRoles: ["free", "member", "master", "both"],
    isPinned: false,
    curriculumVideos: [{ title: "", videoUrl: "", duration: 0 }]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHtmlEditor, setShowHtmlEditor] = useState(false)

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        thumbnailUrl: course.thumbnailUrl || "",
        allowedRoles: course.allowedRoles || ["free", "member", "master", "both"],
        isPinned: course.isPinned || false,
        curriculumVideos: course.curriculumVideos && course.curriculumVideos.length > 0 
          ? course.curriculumVideos 
          : [{ title: "", videoUrl: "", duration: 0 }]
      })
    }
  }, [course])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...formData.curriculumVideos]
    updatedVideos[index] = { ...updatedVideos[index], [field]: value }
    setFormData(prev => ({ ...prev, curriculumVideos: updatedVideos }))
  }

  const addVideo = () => {
    setFormData(prev => ({
      ...prev,
      curriculumVideos: [...prev.curriculumVideos, { title: "", videoUrl: "", duration: 0 }]
    }))
  }

  const removeVideo = (index) => {
    if (formData.curriculumVideos.length > 1) {
      const updatedVideos = formData.curriculumVideos.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, curriculumVideos: updatedVideos }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 유효성 검사
      if (!formData.title.trim()) {
        toast.error("제목을 입력해주세요")
        return
      }

      if (!formData.description.trim()) {
        toast.error("설명을 입력해주세요")
        return
      }

      // 빈 비디오 제거
      const validVideos = formData.curriculumVideos.filter(video => 
        video.title.trim() && video.videoUrl.trim()
      )

      if (validVideos.length === 0) {
        toast.error("최소 하나의 강의 영상을 추가해주세요")
        return
      }

      const courseData = {
        ...formData,
        type,
        thumbnailUrl: formData.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        curriculumVideos: validVideos,
        createdAt: course?.createdAt || new Date().toISOString()
      }

      await onSave(courseData)
      toast.success(course ? "강의가 수정되었습니다" : "강의가 등록되었습니다")
      onCancel()
    } catch (error) {
      toast.error("저장 중 오류가 발생했습니다")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold gradient-text">
            {course ? "강의 수정" : "새 강의 등록"}
          </h2>
          <p className="text-gray-600 mt-1">
            {type === "membership" ? "멤버십" : "마스터"} 강의를 {course ? "수정" : "등록"}합니다
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField
            label="강의 제목"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="강의 제목을 입력하세요"
            required
          />

          <FormField
            label="섬네일 URL"
            value={formData.thumbnailUrl}
            onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
            placeholder="섬네일 이미지 URL (선택사항)"
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="form-label">강의 설명</label>
              <button
                type="button"
                onClick={() => setShowHtmlEditor(!showHtmlEditor)}
                className="text-sm text-primary hover:text-secondary transition-colors"
              >
                {showHtmlEditor ? "일반 에디터" : "HTML 에디터"}
              </button>
            </div>
            
            {showHtmlEditor ? (
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="HTML 코드를 입력하세요..."
                className="form-textarea font-mono text-sm"
                rows={10}
              />
            ) : (
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="강의에 대한 설명을 입력하세요. 임베드 링크도 포함할 수 있습니다."
                className="form-textarea"
                rows={6}
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="form-label">커리큘럼 영상</label>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={addVideo}
                icon="Plus"
              >
                영상 추가
              </Button>
            </div>

            {formData.curriculumVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border-2 border-gray-200 rounded-lg space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">
                    영상 {index + 1}
                  </h4>
                  {formData.curriculumVideos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <ApperIcon name="X" className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    label="영상 제목"
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                    placeholder="영상 제목"
                  />
                  <FormField
                    label="재생 시간 (분)"
                    type="number"
                    value={video.duration}
                    onChange={(e) => handleVideoChange(index, "duration", parseInt(e.target.value) || 0)}
                    placeholder="재생 시간"
                  />
                </div>

                <FormField
                  label="영상 URL"
                  value={video.videoUrl}
                  onChange={(e) => handleVideoChange(index, "videoUrl", e.target.value)}
                  placeholder="YouTube URL 또는 임베드 URL"
                />
              </motion.div>
            ))}
          </div>

          <RoleCheckboxGroup
            selectedRoles={formData.allowedRoles}
            onChange={(roles) => handleInputChange("allowedRoles", roles)}
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPinned"
              checked={formData.isPinned}
              onChange={(e) => handleInputChange("isPinned", e.target.checked)}
              className="form-checkbox"
            />
            <label htmlFor="isPinned" className="text-sm font-medium text-gray-700">
              상단 고정
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              icon={course ? "Save" : "Plus"}
            >
              {course ? "수정하기" : "등록하기"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default CourseUploadForm