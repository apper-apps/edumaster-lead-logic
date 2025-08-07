import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { articleService } from "@/services/api/articleService"
import ArticleGrid from "@/components/organisms/ArticleGrid"
import ArticleUploadForm from "@/components/organisms/ArticleUploadForm"
import SearchBar from "@/components/molecules/SearchBar"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const InsightsPage = () => {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadArticles()
  }, [])

  useEffect(() => {
    // 검색어 필터링
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredArticles(filtered)
  }, [articles, searchTerm])

  const loadArticles = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await articleService.getAll()
      setArticles(data)
    } catch (err) {
      setError("아티클을 불러오는 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const handleArticleClick = (article) => {
    navigate(`/article/${article.Id}`, { state: { article, showEdit: true } })
  }

  const handleSaveArticle = async (articleData) => {
    try {
      if (editingArticle) {
        await articleService.update(editingArticle.Id, articleData)
      } else {
        await articleService.create(articleData)
      }
      await loadArticles()
      setShowUploadForm(false)
      setEditingArticle(null)
    } catch (error) {
      console.error("Error saving article:", error)
      throw error
    }
  }

  const handleEditArticle = (article) => {
    setEditingArticle(article)
    setShowUploadForm(true)
  }

  const handleDeleteArticle = async (articleId) => {
    try {
      await articleService.delete(articleId)
      await loadArticles()
      toast.success("아티클이 삭제되었습니다")
    } catch (error) {
      toast.error("아티클 삭제 중 오류가 발생했습니다")
    }
  }

  const closeForm = () => {
    setShowUploadForm(false)
    setEditingArticle(null)
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
              <h1 className="text-4xl font-bold gradient-text mb-2">인사이트</h1>
              <p className="text-gray-600 text-lg">
                전문가들의 깊이 있는 통찰과 지식을 공유합니다
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="아티클 검색..."
                className="w-full sm:w-80"
              />
              <Button
                onClick={() => setShowUploadForm(true)}
                icon="Plus"
                className="flex-shrink-0"
              >
                아티클 작성
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
              <ApperIcon name="FileText" className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{articles.length}</h3>
            <p className="text-gray-600">총 아티클 수</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-secondary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Calendar" className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {articles.filter(a => {
                const today = new Date()
                const articleDate = new Date(a.createdAt)
                const diffTime = Math.abs(today - articleDate)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
                return diffDays <= 7
              }).length}
            </h3>
            <p className="text-gray-600">이번 주 게시</p>
          </div>
          
          <div className="card-premium p-6 text-center">
            <div className="bg-accent/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <ApperIcon name="Eye" className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {articles.reduce((total, article) => {
                const wordCount = article.content.split(" ").length
                return total + Math.ceil(wordCount / 200) // 대략적인 읽기 시간 (분)
              }, 0)}
            </h3>
            <p className="text-gray-600">총 읽기 시간 (분)</p>
          </div>
        </motion.div>

        {/* Article Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ArticleGrid
            articles={filteredArticles}
            loading={loading}
            error={error}
            onArticleClick={handleArticleClick}
            onRetry={loadArticles}
            showEdit={true}
            onEdit={handleEditArticle}
            onDelete={handleDeleteArticle}
            onAddNew={() => setShowUploadForm(true)}
          />
        </motion.div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <ArticleUploadForm
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={closeForm}
          />
        )}
      </div>
    </div>
  )
}

export default InsightsPage