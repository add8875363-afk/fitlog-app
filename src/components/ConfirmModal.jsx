import { AlertTriangle } from 'lucide-react'

/**
 * 通用確認對話框
 * Props:
 *   title       — 標題文字
 *   message     — 說明文字
 *   confirmText — 確認按鈕文字（預設「確認」）
 *   danger      — true = 確認鈕為紅色（刪除等危險操作）
 *   onConfirm   — 確認回呼
 *   onCancel    — 取消回呼
 */
export default function ConfirmModal({
  title,
  message,
  confirmText = '確認',
  danger = true,
  onConfirm,
  onCancel,
}) {
  return (
    // 半透明遮罩，點擊遮罩同等取消
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
      onClick={onCancel}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-2">
          {danger && <AlertTriangle size={22} className="text-red-400 shrink-0" />}
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 bg-gray-800 text-gray-300 rounded-xl border-0
              cursor-pointer hover:bg-gray-700 font-medium transition-colors"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl border-0 cursor-pointer font-semibold
              text-white transition-colors
              ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-500 hover:bg-orange-600'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
