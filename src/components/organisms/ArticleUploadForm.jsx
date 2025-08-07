import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import FormField from "@/components/molecules/FormField"
import RoleCheckboxGroup from "@/components/molecules/RoleCheckboxGroup"
import Button from "@/components/atoms/Button"

const ArticleUploadForm = ({ article, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnailUrl: "",
    allowedRoles: ["free", "member", "master", "both"]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHtmlEditor, setShowHtmlEditor] = useState(false)

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        thumbnailUrl: article.thumbnailUrl || "",
        allowedRoles: article.allowedRoles || ["free", "member", "master", "both"]
      })
    }
  }, [article])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.title.trim()) {
        toast.error("제목을 입력해주세요")
        return
      }

      if (!formData.content.trim()) {
        toast.error("내용을 입력해주세요")
        return
      }

      const articleData = {
        ...formData,
        thumbnailUrl: formData.thumbnailUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        createdAt: article?.createdAt || new Date().toISOString()
      }

      await onSave(articleData)
      toast.success(article ? "아티클이 수정되었습니다" : "아티클이 등록되었습니다")
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
            {article ? "아티클 수정" : "새 아티클 작성"}
          </h2>
          <p className="text-gray-600 mt-1">
            인사이트를 공유해보세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormField
            label="제목"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="아티클 제목을 입력하세요"
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
              <label className="form-label">내용</label>
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
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="HTML 코드를 입력하세요..."
                className="form-textarea font-mono text-sm"
                rows={15}
              />
            ) : (
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="아티클 내용을 입력하세요. HTML 태그와 임베드 링크를 사용할 수 있습니다."
                className="form-textarea"
                rows={12}
              />
            )}
            <p className="text-sm text-gray-500 mt-2">
              노션 스타일의 리치 텍스트와 임베드 링크를 지원합니다
            </p>
          </div>

          <RoleCheckboxGroup
            selectedRoles={formData.allowedRoles}
            onChange={(roles) => handleInputChange("allowedRoles", roles)}
          />

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
              icon={article ? "Save" : "Plus"}
            >
              {article ? "수정하기" : "작성하기"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default ArticleUploadForm