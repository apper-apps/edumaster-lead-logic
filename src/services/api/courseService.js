import membershipCoursesData from "@/services/mockData/membershipCourses.json"
import masterCoursesData from "@/services/mockData/masterCourses.json"

class CourseService {
  constructor() {
    this.membershipCourses = [...membershipCoursesData]
    this.masterCourses = [...masterCoursesData]
  }

  async getAll(type) {
    // 200-500ms 지연
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const courses = type === "membership" ? [...this.membershipCourses] : [...this.masterCourses]
    return courses
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const allCourses = [...this.membershipCourses, ...this.masterCourses]
    const course = allCourses.find(c => c.Id === id)
    
    if (!course) {
      throw new Error("Course not found")
    }
    
    return { ...course }
  }

  async create(courseData) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const courses = courseData.type === "membership" ? this.membershipCourses : this.masterCourses
    const maxId = courses.length > 0 ? Math.max(...courses.map(c => c.Id)) : 0
    const newCourse = {
      ...courseData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    
    courses.push(newCourse)
    return { ...newCourse }
  }

  async update(id, courseData) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const allCourses = [this.membershipCourses, this.masterCourses]
    
    for (const courses of allCourses) {
      const index = courses.findIndex(c => c.Id === id)
      if (index !== -1) {
        courses[index] = { ...courses[index], ...courseData }
        return { ...courses[index] }
      }
    }
    
    throw new Error("Course not found")
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
    
    const allCourses = [this.membershipCourses, this.masterCourses]
    
    for (const courses of allCourses) {
      const index = courses.findIndex(c => c.Id === id)
      if (index !== -1) {
        courses.splice(index, 1)
        return true
      }
    }
    
    throw new Error("Course not found")
  }
}

export const courseService = new CourseService()