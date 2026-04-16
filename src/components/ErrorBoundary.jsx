import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'

// ErrorBoundary 必須是 class component（React 限制）
// 功能：任何子元件崩潰時，顯示友善的錯誤畫面，而不是整個白屏
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // 可以在這裡把錯誤送到 Sentry 等監控服務
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={36} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">頁面發生錯誤</h1>
            <p className="text-gray-400 mb-8">
              很抱歉，這個頁面遇到了一些問題。你可以試試重新整理，或回到首頁繼續使用。
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl border-0 cursor-pointer font-semibold hover:bg-orange-600"
              >
                重新整理
              </button>
              <a
                href="/"
                className="px-6 py-3 bg-gray-800 text-gray-200 rounded-xl no-underline font-semibold hover:bg-gray-700"
              >
                回到首頁
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
