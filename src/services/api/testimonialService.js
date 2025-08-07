import testimonialsData from "@/services/mockData/testimonials.json"

class TestimonialService {
  constructor() {
    this.testimonials = [...testimonialsData]
  }

  async getAll() {
    // 200-500ms 지연
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    return [...this.testimonials].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const testimonial = this.testimonials.find(t => t.Id === id)
    if (!testimonial) {
      throw new Error("Testimonial not found")
    }
    
    return { ...testimonial }
  }

  async create(testimonialData) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const maxId = this.testimonials.length > 0 ? Math.max(...this.testimonials.map(t => t.Id)) : 0
    const newTestimonial = {
      ...testimonialData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    
    this.testimonials.push(newTestimonial)
    return { ...newTestimonial }
  }

  async update(id, testimonialData) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const index = this.testimonials.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error("Testimonial not found")
    }
    
    this.testimonials[index] = { ...this.testimonials[index], ...testimonialData }
    return { ...this.testimonials[index] }
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const index = this.testimonials.findIndex(t => t.Id === id)
    if (index === -1) {
      throw new Error("Testimonial not found")
    }
    
    this.testimonials.splice(index, 1)
    return true
  }
}

export const testimonialService = new TestimonialService()