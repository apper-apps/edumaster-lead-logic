import React, { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { courseService } from "@/services/api/courseService"
import VideoPlayer from "@/components/organisms/VideoPlayer"
import CurriculumSidebar from "@/components/organisms/CurriculumSidebar"
import CourseUploadForm from "@/components/organisms/CourseUploadForm"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const VideoPlayerPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [course, setCourse] = useState(location.state?.course || null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [loading, setLoading] = useState(!course)
  const [error, setError] = useState("")
  const [showEditForm, setShowEditForm] = useState(false)

  const showEdit = location.state?.showEdit || false

  useEffect(() => {
    if (!course && id) {
      loadCourse()
    }
  }, [id, course])

  const loadCourse = async () => {
    try {
      setError("")
      setLoading(true)
      const courseData = await courseService.getById(parseInt(id))
      setCourse(courseData)
    } catch (err) {
      setError("강의를 불러오는 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const handleVideoChange = (index) => {
    setCurrentVideoIndex(index)
  }

  const handleEditCourse = () => {
    setShowEditForm(true)
  }

  const handleSaveCourse = async (courseData) => {
    try {
      await courseService.update(course.Id, courseData)
      const updatedCourse = await courseService.getById(course.Id)
      setCourse(updatedCourse)
      setShowEditForm(false)
    } catch (error) {
      console.error("Error updating course:", error)
      throw error
    }
  }

  const handleGoBack = () => {
    if (course?.type === "master") {
      navigate("/master")
    } else {
      navigate("/membership")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={loadCourse} />
  if (!course) return <Error error="강의를 찾을 수 없습니다" />

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            onClick={handleGoBack}
            variant="ghost"
            icon="ArrowLeft"
            className="text-gray-600 hover:text-primary"
          >
            {course.type === "master" ? "마스터 클래스로 돌아가기" : "멤버십 강의로 돌아가기"}
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3"
          >
            <VideoPlayer
              course={course}
              currentVideoIndex={currentVideoIndex}
              onVideoChange={handleVideoChange}
              onEdit={handleEditCourse}
              showEdit={showEdit}
            />
          </motion.div>

          {/* Curriculum Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8">
              <CurriculumSidebar
                course={course}
                currentVideoIndex={currentVideoIndex}
                onVideoChange={handleVideoChange}
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile Curriculum - Below Video */}
        <div className="lg:hidden mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CurriculumSidebar
              course={course}
              currentVideoIndex={currentVideoIndex}
              onVideoChange={handleVideoChange}
            />
          </motion.div>
        </div>

        {/* Edit Form Modal */}
        {showEditForm && (
          <CourseUploadForm
            course={course}
            onSave={handleSaveCourse}
            onCancel={() => setShowEditForm(false)}
            type={course.type}
          />
        )}
      </div>
    </div>
  )
}

export default VideoPlayerPage