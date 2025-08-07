import React, { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { articleService } from "@/services/api/articleService"
import ArticleUploadForm from "@/components/organisms/ArticleUploadForm"
import ArticleThumbnail from "@/components/molecules/ArticleThumbnail"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"

const ArticlePage = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [article, setArticle] = useState(location.state?.article || null)
  const [relatedArticles, setRelatedArticles] = useState([])
  const [loading, setLoading] = useState(!article)
  const [error, setError] = useState("")
  const [showEditForm, setShowEditForm] = useState(false)

  const showEdit = location.state?.showEdit || false

  useEffect(() => {
    if (!article && id) {
      loadArticle()
    } else if (article) {
      loadRelatedArticles()
    }
  }, [id, article])

  const loadArticle = async () => {
    try {
      setError("")
      setLoading(true)
      const articleData = await articleService.getById(parseInt(id))
      setArticle(articleData)
      await loadRelatedArticles()
    } catch (err) {
      setError("아티클을 불러오는 중 오류가 발생했습니다")
    } finally {
      setLoading(false)
    }
  }

  const loadRelatedArticles = async () => {
    try {
      const allArticles = await articleService.getAll()
      const related = allArticles
        .filter(a => a.Id !== parseInt(id))
        .slice(0, 3)
      setRelatedArticles(related)
    } catch (error) {
      console.error("Error loading related articles:", error)
    }
  }

  const handleEditArticle = () => {
    setShowEditForm(true)
  }

  const handleSaveArticle = async (articleData) => {
    try {
      await articleService.update(article.Id, articleData)
      const updatedArticle = await articleService.getById(article.Id)
      setArticle(updatedArticle)
      setShowEditForm(false)
    } catch (error) {
      console.error("Error updating article:", error)
      throw error
    }
  }

  const handleRelatedArticleClick = (relatedArticle) => {
    navigate(`/article/${relatedArticle.Id}`, { 
      state: { article: relatedArticle, showEdit } 
    })
  }

  const handleGoBack = () => {
    navigate("/insights")
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={loadArticle} />
  if (!article) return <Error error="아티클을 찾을 수 없습니다" />

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface via-white to-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            인사이트로 돌아가기
          </Button>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <ApperIcon name="Calendar" className="h-4 w-4" />
                  {new Date(article.createdAt).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <ApperIcon name="Clock" className="h-4 w-4" />
                  {Math.ceil(article.content.split(" ").length / 200)}분 읽기
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {article.allowedRoles?.map((role) => (
                  <Badge key={role} variant={role}>
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            {showEdit && (
              <Button
                onClick={handleEditArticle}
                variant="secondary"
                icon="Edit"
              >
                수정
              </Button>
            )}
          </div>

          {/* Featured Image */}
          {article.thumbnailUrl && (
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-8">
              <img
                src={article.thumbnailUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none mb-12"
        >
          <div
            className="rich-editor"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="border-t border-gray-200 pt-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <ApperIcon name="BookOpen" className="h-6 w-6 text-primary" />
              관련 아티클
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle, index) => (
                <motion.div
                  key={relatedArticle.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ArticleThumbnail
                    article={relatedArticle}
                    onClick={handleRelatedArticleClick}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Edit Form Modal */}
        {showEditForm && (
          <ArticleUploadForm
            article={article}
            onSave={handleSaveArticle}
            onCancel={() => setShowEditForm(false)}
          />
        )}
      </div>
    </div>
  )
}

export default ArticlePage