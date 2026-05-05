'use client'
import { useTheme } from '../context/ThemeContext'

export default function Header({ count }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="
      fixed top-0 left-0 w-full z-50
      flex justify-between items-center
      px-6 py-4

      bg-white shadow-md
      dark:bg-[#0f172a] dark:border-b dark:border-white/10
    ">

      {/* LEFT */}
      <h1 className="text-xl font-bold flex items-center gap-2">
        📄 Ghi Chú Cá Nhân
      </h1>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <span className="
          bg-purple-100 text-purple-600 
          dark:bg-purple-500/30 dark:text-purple-300 
          px-3 py-1 rounded-full text-sm
        ">
          {count} ghi chú
        </span>

        <button
          onClick={toggleTheme}
          className="
            w-10 h-10 flex items-center justify-center rounded-full 
            bg-gray-100 dark:bg-white/10 
            border dark:border-white/20 
            hover:scale-110 transition
          "
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>

    </div>
  )
}