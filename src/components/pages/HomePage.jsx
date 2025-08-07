import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { courseService } from "@/services/api/courseService"
import { articleService } from "@/services/api/articleService"
import Button from "@/components/atoms/Button"
import VideoThumbnail from "@/components/molecules/VideoThumbnail"
import ArticleThumbnail from "@/components/molecules/ArticleThumbnail"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"

const HomePage = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    membershipCourses: [],
    masterCourses: [],
    articles: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [membershipCourses, masterCourses, articles] = await Promise.all([
        courseService.getAll("membership"),
        courseService.getAll("master"),
        articleService.getAll()
      ])

      setData({
        membershipCourses: membershipCourses.slice(0, 3),
        masterCourses: masterCourses.slice(0, 3),
        articles: articles.slice(0, 3)
      })
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = (course) => {
    navigate(`/video/${course.Id}`, { state: { course } })
  }

  const handleArticleClick = (article) => {
    navigate(`/article/${article.Id}`, { state: { article } })
  }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">EduMaster</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              전문가와 함께하는 온라인 학습 플랫폼<br />
              체계적인 커리큘럼으로 성장하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate("/membership")}
                size="lg"
                icon="Play"
              >
                멤버십 강의 시작하기
              </Button>
              <Button
                onClick={() => navigate("/master")}
                variant="secondary"
                size="lg"
                icon="Star"
              >
                마스터 클래스 보기
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Featured Membership Courses */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">인기 멤버십 강의</h2>
              <p className="text-gray-600">검증된 전문가들의 체계적인 강의</p>
            </div>
            <Button
              onClick={() => navigate("/membership")}
              variant="ghost"
              icon="ArrowRight"
              iconPosition="right"
            >
              전체보기
            </Button>
          </div>

          {data.membershipCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.membershipCourses.map((course, index) => (
                <motion.div
                  key={course.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VideoThumbnail
                    course={course}
                    onClick={handleVideoClick}
                    isPinned={course.isPinned}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ApperIcon name="Play" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">멤버십 강의가 준비 중입니다</p>
            </div>
          )}
        </motion.section>

        {/* Featured Master Courses */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">마스터 클래스</h2>
              <p className="text-gray-600">최고 수준의 전문 교육 과정</p>
            </div>
            <Button
              onClick={() => navigate("/master")}
              variant="ghost"
              icon="ArrowRight"
              iconPosition="right"
            >
              전체보기
            </Button>
          </div>

          {data.masterCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.masterCourses.map((course, index) => (
                <motion.div
                  key={course.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <VideoThumbnail
                    course={course}
                    onClick={handleVideoClick}
                    isPinned={course.isPinned}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ApperIcon name="Star" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">마스터 클래스가 준비 중입니다</p>
            </div>
          )}
        </motion.section>

        {/* Featured Insights */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">최신 인사이트</h2>
              <p className="text-gray-600">전문가들의 깊이 있는 통찰과 지식</p>
            </div>
            <Button
              onClick={() => navigate("/insights")}
              variant="ghost"
              icon="ArrowRight"
              iconPosition="right"
            >
              전체보기
            </Button>
          </div>

          {data.articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.articles.map((article, index) => (
                <motion.div
                  key={article.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ArticleThumbnail
                    article={article}
                    onClick={handleArticleClick}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ApperIcon name="FileText" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">인사이트 아티클이 준비 중입니다</p>
            </div>
          )}
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-primary rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">지금 시작하세요</h2>
          <p className="text-xl mb-8 text-white/90">
            전문가와 함께하는 체계적인 학습 여정을 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/testimonials")}
              variant="secondary"
              size="lg"
              icon="MessageCircle"
            >
              도전후기 보기
            </Button>
            <Button
              onClick={() => navigate("/insights")}
              variant="secondary"
              size="lg"
              icon="BookOpen"
            >
              인사이트 읽기
            </Button>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default HomePage