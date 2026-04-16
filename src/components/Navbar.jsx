import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Dumbbell, Menu, X, ChevronDown } from 'lucide-react'

const mainLinks = [
  { to: '/', label: '🏠 首頁' },
  { to: '/exercises', label: '💪 動作庫' },
  { to: '/plans', label: '📋 課表' },
  { to: '/log', label: '📝 紀錄' },
  { to: '/prs', label: '🏆 PR' },
]

const moreLinks = [
  { to: '/calendar', label: '📅 訓練日曆' },
  { to: '/timer', label: '⏱️ 計時器' },
  { to: '/stats', label: '📊 統計' },
  { to: '/calculator', label: '🧮 計算機' },
]

const knowledgeLinks = [
  { to: '/knowledge', label: '📖 訓練知識' },
]

const allLinks = [...mainLinks, ...moreLinks]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  const moreRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isMoreActive = moreLinks.some((l) => l.to === location.pathname)

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-orange-500 font-bold text-xl no-underline">
          <Dumbbell size={28} />
          <span>FitLog</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {mainLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm no-underline transition-colors ${
                location.pathname === link.to
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* More dropdown */}
          <div ref={moreRef} className="relative">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm border-0 cursor-pointer transition-colors ${
                isMoreActive ? 'bg-orange-500/20 text-orange-400' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              更多 <ChevronDown size={14} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden">
                {moreLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMoreOpen(false)}
                    className={`block px-4 py-2.5 text-sm no-underline transition-colors ${
                      location.pathname === link.to
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t border-gray-700/60 my-0.5" />
                {knowledgeLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMoreOpen(false)}
                    className={`block px-4 py-2.5 text-sm no-underline transition-colors ${
                      location.pathname === link.to
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-2 ml-1">
              <span className="text-sm text-gray-400 hidden lg:inline">
                嗨,{user.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-2 rounded-lg text-sm bg-gray-800 text-gray-300 hover:text-white border-0 cursor-pointer"
              >
                登出
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-1 px-4 py-2 rounded-lg text-sm bg-orange-500 text-white no-underline hover:bg-orange-600"
            >
              登入
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden bg-transparent border-0 text-gray-300 cursor-pointer"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-4 grid grid-cols-2 gap-1 pt-2">
          {allLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm no-underline ${
                location.pathname === link.to
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {knowledgeLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm no-underline ${
                location.pathname === link.to
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="col-span-2 mt-1">
            {user ? (
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-400">嗨,{user.name}</span>
                <button
                  onClick={() => { logout(); setOpen(false) }}
                  className="text-sm text-gray-300 bg-transparent border-0 cursor-pointer"
                >
                  登出
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm text-orange-400 no-underline"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
