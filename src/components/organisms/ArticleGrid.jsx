import React from "react"
import { motion } from "framer-motion"
import ArticleThumbnail from "@/components/molecules/ArticleThumbnail"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

const ArticleGrid = ({ 
  articles, 
  loading, 
  error, 
  onArticleClick, 
  onRetry,
  showEdit = false,
  onEdit,
  onDelete,
  onAddNew
}) => {
  if (loading) return <Loading />
  if (error) return <Error error={error} onRetry={onRetry} />
  if (!articles || articles.length === 0) {
    return (
      <Empty
        title="아티클이 없습니다"
        description="새로운 인사이트를 공유해보세요"
        action={onAddNew}
        actionLabel="아티클 작성"
        icon="FileText"
      />
    )
  }

  const sortedArticles = [...articles].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedArticles.map((article, index) => (
        <motion.div
          key={article.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ArticleThumbnail
            article={article}
            onClick={onArticleClick}
            showEdit={showEdit}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default ArticleGrid