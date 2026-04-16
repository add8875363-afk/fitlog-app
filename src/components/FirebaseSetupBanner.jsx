import { AlertTriangle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// 當 Firebase 尚未設定時顯示的提示橫幅
export default function FirebaseSetupBanner() {
  const { isFirebaseConfigured } = useAuth()
  if (isFirebaseConfigured) return null

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 text-amber-200 px-4 py-2.5 text-sm">
      <div className="max-w-5xl mx-auto flex items-center gap-2">
        <AlertTriangle size={16} className="shrink-0" />
        <span>
          Firebase 尚未設定,登入功能暫時無法使用。請參考{' '}
          <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">FIREBASE_SETUP.md</code>{' '}
          建立 <code className="bg-amber-500/20 px-1.5 py-0.5 rounded">.env</code> 檔。
        </span>
      </div>
    </div>
  )
}
