import { useState } from 'react'
import { Trash2, Calendar, Clock, Dumbbell } from 'lucide-react'
import { useWorkout } from '../context/WorkoutContext'
import { WorkoutLogSkeleton } from '../components/Skeleton'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../context/ToastContext'

export default function WorkoutLog() {
  const { state, deleteLog } = useWorkout()
  const { showToast } = useToast()
  const [confirmId, setConfirmId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const handleDeleteConfirm = async () => {
    setDeleting(true)
    try {
      await deleteLog(confirmId)
      showToast('訓練紀錄已刪除')
    } catch {
      showToast('刪除失敗，請再試一次', 'error')
    } finally {
      setConfirmId(null)
      setDeleting(false)
    }
  }

  return (
    <div>
      {/* 刪除確認 Modal */}
      {confirmId && (
        <ConfirmModal
          title="刪除訓練紀錄"
          message="刪除後無法復原，同時會重新計算個人最佳紀錄 (PR)。確定要刪除嗎？"
          confirmText={deleting ? '刪除中…' : '刪除'}
          onConfirm={handleDeleteConfirm}
          onCancel={() => !deleting && setConfirmId(null)}
        />
      )}

      <h1 className="text-3xl font-bold mb-6">訓練紀錄</h1>

      {state.dataLoading ? (
        <WorkoutLogSkeleton />
      ) : state.workoutLogs.length === 0 ? (
        <div className="text-center py-20">
          <Dumbbell size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">還沒有訓練紀錄</p>
          <p className="text-gray-600 text-sm mt-1">開始一個訓練課表來記錄你的訓練吧！</p>
        </div>
      ) : (
        <div className="space-y-4">
          {state.workoutLogs.map((log) => (
            <div key={log.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{log.planName}</h2>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(log.date).toLocaleDateString('zh-TW')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {log.duration} 分鐘
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setConfirmId(log.id)}
                  className="p-2 bg-transparent border-0 text-red-400 cursor-pointer hover:text-red-300 transition-colors"
                  title="刪除此紀錄"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="space-y-1">
                {log.entries.map((entry, i) => (
                  <div key={i} className="flex items-center justify-between text-sm bg-gray-800/50 rounded-lg px-3 py-2">
                    <span className="text-gray-300">{entry.exerciseName} - 第{entry.set}組</span>
                    <span className="text-gray-400">{entry.weight}kg x {entry.reps}次</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-gray-800 flex gap-4 text-sm">
                <span className="text-gray-400">
                  總組數: <span className="text-white font-semibold">{log.entries.length}</span>
                </span>
                <span className="text-gray-400">
                  總訓練量:{' '}
                  <span className="text-orange-400 font-semibold">
                    {log.entries.reduce((sum, e) => sum + e.weight * e.reps, 0).toLocaleString()} kg
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
