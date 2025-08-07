import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Header from "@/components/organisms/Header"
import HomePage from "@/components/pages/HomePage"
import MembershipPage from "@/components/pages/MembershipPage"
import MasterPage from "@/components/pages/MasterPage"
import InsightsPage from "@/components/pages/InsightsPage"
import TestimonialsPage from "@/components/pages/TestimonialsPage"
import VideoPlayerPage from "@/components/pages/VideoPlayerPage"
import ArticlePage from "@/components/pages/ArticlePage"
import AdminPage from "@/components/pages/AdminPage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/master" element={<MasterPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/video/:id" element={<VideoPlayerPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="mt-16"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App