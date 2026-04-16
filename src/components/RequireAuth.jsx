import { Link } from 'react-router-dom'
import { LogIn, UserPlus, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// 未登入時顯示的引導畫面
function LoginRequired() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-orange-500/10 flex items-center justify-center mb-6">
        <Lock size={36} className="text-orange-500" />
      </div>
      <h2 className="text-2xl font-bold mb-2">請先登入</h2>
      <p className="text-gray-400 mb-8 max-w-xs">
        登入後才能使用這個功能，你的訓練資料也會安全備份在雲端。
      </p>
      <div className="flex gap-3">
        <Link
          to="/login"
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl no-underline font-semibold hover:bg-orange-600 transition-colors"
        >
          <LogIn size={18} />
          登入
        </Link>
        <Link
          to="/register"
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-200 rounded-xl no-underline font-semibold hover:bg-gray-700 transition-colors"
        >
          <UserPlus size={18} />
          免費註冊
        </Link>
      </div>
    </div>
  )
}

// 套在需要登入的 Route 上
// 用法：<Route path="/log" element={<RequireAuth><WorkoutLog /></RequireAuth>} />
export default function RequireAuth({ children }) {
  const { user, loading } = useAuth()

  // Firebase 還在確認登入狀態時，顯示空白（避免閃爍）
  if (loading) return null

  if (!user) return <LoginRequired />

  return children
}
