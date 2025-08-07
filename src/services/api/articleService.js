import articlesData from "@/services/mockData/articles.json"

class ArticleService {
  constructor() {
    this.articles = [...articlesData]
  }

  async getAll() {
    // 200-500ms 지연
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    return [...this.articles]
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const article = this.articles.find(a => a.Id === id)
    if (!article) {
      throw new Error("Article not found")
    }
    
    return { ...article }
  }

  async create(articleData) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const maxId = this.articles.length > 0 ? Math.max(...this.articles.map(a => a.Id)) : 0
    const newArticle = {
      ...articleData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    
    this.articles.push(newArticle)
    return { ...newArticle }
  }

  async update(id, articleData) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const index = this.articles.findIndex(a => a.Id === id)
    if (index === -1) {
      throw new Error("Article not found")
    }
    
    this.articles[index] = { ...this.articles[index], ...articleData }
    return { ...this.articles[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const index = this.articles.findIndex(a => a.Id === id)
    if (index === -1) {
      throw new Error("Article not found")
    }
    
    this.articles.splice(index, 1)
    return true
  }
}

export const articleService = new ArticleService()