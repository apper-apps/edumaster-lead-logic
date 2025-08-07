import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "홈", path: "/" },
    { name: "멤버십", path: "/membership" },
    { name: "마스터", path: "/master" },
    { name: "인사이트", path: "/insights" },
    { name: "도전후기", path: "/testimonials" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-primary p-2 rounded-xl group-hover:scale-105 transition-transform">
              <ApperIcon name="GraduationCap" className="h-8 w-8 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold gradient-text">EduMaster</h1>
              <p className="text-xs text-gray-500">온라인 학습 플랫폼</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/admin"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
            >
              관리자
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
          >
            <ApperIcon 
              name={mobileMenuOpen ? "X" : "Menu"} 
              className="h-6 w-6" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-primary bg-primary/5"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-colors border-t border-gray-100 mt-2 pt-4"
            >
              관리자
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Header