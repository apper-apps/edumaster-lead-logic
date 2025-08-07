import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import Textarea from "@/components/atoms/Textarea"

const TestimonialForm = ({ testimonial, onSave, onCancel }) => {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (testimonial) {
      setContent(testimonial.content || "")
    }
  }, [testimonial])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!content.trim()) {
        toast.error("내용을 입력해주세요")
        return
      }

      if (content.length > 500) {
        toast.error("500자 이내로 작성해주세요")
        return
      }

      const testimonialData = {
        content: content.trim(),
        isHidden: testimonial?.isHidden || false,
        userId: testimonial?.userId || "user",
        createdAt: testimonial?.createdAt || new Date().toISOString()
      }

      await onSave(testimonialData)
      toast.success(testimonial ? "후기가 수정되었습니다" : "후기가 등록되었습니다")
      
      if (!testimonial) {
        setContent("")
      }
      
      if (onCancel) {
        onCancel()
      }
    } catch (error) {
      toast.error("저장 중 오류가 발생했습니다")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={testimonial ? { opacity: 0 } : { opacity: 1 }}
      animate={{ opacity: 1 }}
      className={testimonial ? "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" : ""}
    >
      {testimonial ? (
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-lg"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold gradient-text">후기 수정</h2>
          </div>
          <div className="p-6 space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="도전 후기를 작성해보세요... (500자 이내)"
              maxLength={500}
              rows={4}
              className="resize-none"
            />
            <div className="text-right text-sm text-gray-500">
              {content.length}/500
            </div>
            <div className="flex justify-end gap-3">
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
                icon="Save"
              >
                수정하기
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="도전 후기를 작성해보세요... (500자 이내)"
              maxLength={500}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {content.length}/500
              </div>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={!content.trim() || content.length > 500}
                icon="Send"
              >
                작성하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.form>
  )
}

export default TestimonialForm