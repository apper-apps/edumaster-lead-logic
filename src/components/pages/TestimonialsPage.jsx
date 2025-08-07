import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { testimonialService } from "@/services/api/testimonialService"
import TestimonialCard from "@/components/molecules/TestimonialCard"
import TestimonialForm from "@/components/organisms/TestimonialForm"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editingTestimonial, setEditingTestimonial] = useState(null)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await testimonialService.getAll()
      // 숨겨지지 않은 후기만 표시 (일반 사용자 시각에서)
      setTestimonials(data.filter(t => !t.isHidden))
    } catch (err) {
      setError("도전 후기를 불러오는 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const handleSaveTestimonial = async (testimonialData) => {
    try {
      if (editingTestimonial) {
        await testimonialService.update(editingTestimonial.Id, testimonialData)
      } else {
        await testimonialService.create(testimonialData)
      }
      await loadTestimonials()
      setEditingTestimonial(null)
    } catch (error) {
      console.error("Error saving testimonial:", error)
      throw error
    }
  }

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial)
  }

  const closeForm = () => {
    setEditingTestimonial(null)
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={loadTestimonials} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">도전 후기</h1>
          <p className="text-gray-600 text-lg">
            학습자들의 생생한 도전 경험을 공유해보세요
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="card-premium p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="MessageCircle" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{testimonials.length}</h3>
            <p className="text-gray-600">총 후기 수</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Heart" className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {testimonials.filter(t => {
                const today = new Date()
                const testimonialDate = new Date(t.createdAt)
                const diffTime = Math.abs(today - testimonialDate)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return diffDays <= 7
              }).length}
            </h3>
            <p className="text-gray-600">이번 주 후기</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="TrendingUp" className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {testimonials.reduce((total, t) => total + t.content.length, 0)}
            </h3>
            <p className="text-gray-600">총 작성 글자 수</p>
          </div>
        </motion.div>

        {/* Testimonial Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <TestimonialForm
            onSave={handleSaveTestimonial}
          />
        </motion.div>

        {/* Testimonials List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {testimonials.length > 0 ? (
            <div className="space-y-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.Id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    onEdit={handleEditTestimonial}
                    showActions={true}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <Empty
              title="도전 후기가 없습니다"
              description="첫 번째 도전 후기를 작성해보세요"
              icon="MessageCircle"
            />
          )}
        </motion.div>

        {/* Edit Form Modal */}
        {editingTestimonial && (
          <TestimonialForm
            testimonial={editingTestimonial}
            onSave={handleSaveTestimonial}
            onCancel={closeForm}
          />
        )}
      </div>
    </div>
  )
}

export default TestimonialsPage