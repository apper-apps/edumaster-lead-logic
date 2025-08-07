import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { testimonialService } from "@/services/api/testimonialService"
import TestimonialCard from "@/components/molecules/TestimonialCard"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Badge from "@/components/atoms/Badge"

const AdminPage = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("testimonials")
  const [stats, setStats] = useState({
    total: 0,
    visible: 0,
    hidden: 0,
    thisWeek: 0
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  useEffect(() => {
    calculateStats()
  }, [testimonials])

  const loadTestimonials = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await testimonialService.getAll()
      setTestimonials(data)
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = () => {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    setStats({
      total: testimonials.length,
      visible: testimonials.filter(t => !t.isHidden).length,
      hidden: testimonials.filter(t => t.isHidden).length,
      thisWeek: testimonials.filter(t => new Date(t.createdAt) >= weekAgo).length
    })
  }

  const handleToggleVisibility = async (testimonialId) => {
    try {
      const testimonial = testimonials.find(t => t.Id === testimonialId)
      const updatedData = { ...testimonial, isHidden: !testimonial.isHidden }
      await testimonialService.update(testimonialId, updatedData)
      await loadTestimonials()
      toast.success(testimonial.isHidden ? "후기가 표시되었습니다" : "후기가 숨겨졌습니다")
    } catch (error) {
      toast.error("상태 변경 중 오류가 발생했습니다")
    }
  }

  const handleDeleteTestimonial = async (testimonialId) => {
    try {
      await testimonialService.delete(testimonialId)
      await loadTestimonials()
      toast.success("후기가 삭제되었습니다")
    } catch (error) {
      toast.error("삭제 중 오류가 발생했습니다")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={loadTestimonials} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">관리자 대시보드</h1>
          <p className="text-gray-600 text-lg">
            플랫폼 전체를 관리하고 모니터링합니다
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="card-premium p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="MessageSquare" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.total}</h3>
            <p className="text-gray-600">총 후기 수</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-green-500/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Eye" className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.visible}</h3>
            <p className="text-gray-600">표시된 후기</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-red-500/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="EyeOff" className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.hidden}</h3>
            <p className="text-gray-600">숨겨진 후기</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Calendar" className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.thisWeek}</h3>
            <p className="text-gray-600">이번 주 후기</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("testimonials")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "testimonials"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                도전 후기 관리
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "users"
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                회원 관리
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {activeTab === "testimonials" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">도전 후기 관리</h2>
                <div className="flex gap-2">
                  <Badge variant="success">{stats.visible} 표시</Badge>
                  <Badge variant="danger">{stats.hidden} 숨김</Badge>
                </div>
              </div>

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
                        onToggleVisibility={handleToggleVisibility}
                        onDelete={handleDeleteTestimonial}
                        showActions={true}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <Empty
                  title="도전 후기가 없습니다"
                  description="아직 등록된 후기가 없습니다"
                  icon="MessageCircle"
                />
              )}
            </div>
          )}

          {activeTab === "users" && (
            <div className="text-center py-12">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <ApperIcon name="Users" className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">회원 관리</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                회원 관리 기능은 현재 개발 중입니다.<br />
                곧 사용할 수 있도록 준비하고 있습니다.
              </p>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">사용자 등급 설정</span>
                    <Badge variant="free">개발 중</Badge>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">권한 관리</span>
                    <Badge variant="free">개발 중</Badge>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">회원 통계</span>
                    <Badge variant="free">개발 중</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AdminPage