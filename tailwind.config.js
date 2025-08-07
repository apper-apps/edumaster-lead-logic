/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#7C3AED",
        accent: "#EC4899",
        surface: "#F8FAFC",
        background: "#FFFFFF",
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        'gradient-accent': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        'gradient-surface': 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
      },
    },
  },
  plugins: [],
}