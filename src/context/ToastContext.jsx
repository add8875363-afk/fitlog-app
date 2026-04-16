import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: <CheckCircle size={18} className="text-green-400 shrink-0" />,
  error:   <XCircle    size={18} className="text-red-400   shrink-0" />,
  info:    <Info       size={18} className="text-blue-400  shrink-0" />,
}

const COLORS = {
  success: 'bg-gray-800 border-green-500/50',
  error:   'bg-gray-800 border-red-500/50',
  info:    'bg-gray-800 border-blue-500/50',
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast 容器：固定在畫面底部中央 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col-reverse gap-2 items-center pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl
              text-white text-sm font-medium pointer-events-auto toast-in ${COLORS[toast.type]}`}
            style={{ minWidth: 220, maxWidth: 340 }}
          >
            {ICONS[toast.type]}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => dismiss(toast.id)}
              className="bg-transparent border-0 text-gray-500 cursor-pointer hover:text-gray-300 p-0 ml-1"
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
