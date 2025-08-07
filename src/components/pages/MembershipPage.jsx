import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { courseService } from "@/services/api/courseService"
import VideoGrid from "@/components/organisms/VideoGrid"
import CourseUploadForm from "@/components/organisms/CourseUploadForm"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const MembershipPage = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])
  const [filteredCourses, setFilteredCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadCourses()
  }, [])

  useEffect(() => {
    // 검색어 필터링
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCourses(filtered)
  }, [courses, searchTerm])

  const loadCourses = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await courseService.getAll("membership")
      setCourses(data)
    } catch (err) {
      setError("멤버십 강의를 불러오는 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = (course) => {
    navigate(`/video/${course.Id}`, { state: { course, showEdit: true } })
  }

  const handleSaveCourse = async (courseData) => {
    try {
      if (editingCourse) {
        await courseService.update(editingCourse.Id, courseData)
      } else {
        await courseService.create(courseData)
      }
      await loadCourses()
      setShowUploadForm(false)
      setEditingCourse(null)
    } catch (error) {
      console.error("Error saving course:", error)
      throw error
    }
  }

  const handleEditCourse = (course) => {
    setEditingCourse(course)
    setShowUploadForm(true)
  }

  const handleDeleteCourse = async (courseId) => {
    try {
      await courseService.delete(courseId)
      await loadCourses()
      toast.success("강의가 삭제되었습니다")
    } catch (error) {
      toast.error("강의 삭제 중 오류가 발생했습니다")
    }
  }

  const closeForm = () => {
    setShowUploadForm(false)
    setEditingCourse(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">멤버십 강의</h1>
              <p className="text-gray-600 text-lg">
                체계적인 커리큘럼으로 전문성을 키워보세요
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="강의 검색..."
                className="w-full sm:w-80"
              />
              <Button
                onClick={() => setShowUploadForm(true)}
                icon="Plus"
                className="flex-shrink-0"
              >
                강의 업로드
              </Button>
            </div>
          </div>
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
              <ApperIcon name="Play" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{courses.length}</h3>
            <p className="text-gray-600">총 강의 수</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Users" className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {courses.filter(c => c.isPinned).length}
            </h3>
            <p className="text-gray-600">고정된 강의</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Clock" className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {courses.reduce((total, course) => 
                total + (course.curriculumVideos?.length || 0), 0
              )}
            </h3>
            <p className="text-gray-600">총 레슨 수</p>
          </div>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <VideoGrid
            courses={filteredCourses}
            loading={loading}
            error={error}
            onVideoClick={handleVideoClick}
            onRetry={loadCourses}
            showEdit={true}
            onEdit={handleEditCourse}
            onDelete={handleDeleteCourse}
            onAddNew={() => setShowUploadForm(true)}
            emptyTitle="멤버십 강의가 없습니다"
            emptyDescription="첫 번째 멤버십 강의를 업로드해보세요"
          />
        </motion.div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <CourseUploadForm
            course={editingCourse}
            onSave={handleSaveCourse}
            onCancel={closeForm}
            type="membership"
          />
        )}
      </div>
    </div>
  )
}

export default MembershipPage