import { useState } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound, CheckCircle } from 'lucide-react'
import { useAuth, getAuthErrorMessage } from '../context/AuthContext'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const { resetPassword } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await resetPassword(email)
      setSent(true)
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">

        {sent ? (
          /* 寄送成功畫面 */
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">信件已寄出！</h1>
            <p className="text-gray-400 mb-2">
              密碼重設連結已寄到：
            </p>
            <p className="text-white font-semibold mb-6">{email}</p>
            <p className="text-gray-500 text-sm mb-8">
              請檢查你的信箱（包含垃圾信件），點擊信中連結即可重設密碼。連結有效時間為 1 小時。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="w-full py-3 bg-gray-800 text-gray-300 rounded-xl border-0 cursor-pointer hover:bg-gray-700 font-semibold"
              >
                重新輸入信箱
              </button>
              <Link
                to="/login"
                className="block w-full py-3 bg-orange-500 text-white rounded-xl no-underline font-semibold hover:bg-orange-600 text-center"
              >
                返回登入
              </Link>
            </div>
          </div>
        ) : (
          /* 輸入信箱畫面 */
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-500/20 mb-4">
                <KeyRound size={28} className="text-orange-500" />
              </div>
              <h1 className="text-2xl font-bold">忘記密碼</h1>
              <p className="text-gray-400 text-sm mt-1">
                輸入你的信箱，我們會寄送重設連結
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">電子信箱</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 outline-none focus:border-orange-500"
                  placeholder="you@example.com"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-orange-500 text-white rounded-xl border-0 cursor-pointer hover:bg-orange-600 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '寄送中...' : '寄送重設信件'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              想起來了？{' '}
              <Link to="/login" className="text-orange-400 no-underline hover:underline">
                返回登入
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
