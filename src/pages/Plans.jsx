import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Play, Trash2 } from 'lucide-react'
import { exercises, defaultWorkoutPlans } from '../data/exercises'
import { useWorkout } from '../context/WorkoutContext'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../context/ToastContext'

export default function Plans() {
  const { state, addPlan, deletePlan } = useWorkout()
  const { showToast } = useToast()

  const [showCreate, setShowCreate] = useState(false)
  const [newPlan, setNewPlan] = useState({ name: '', description: '', exercises: [] })
  const [selectedExercise, setSelectedExercise] = useState('')
  const [saving, setSaving] = useState(false)

  // 刪除確認
  const [confirmPlanId, setConfirmPlanId] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const allPlans = [...defaultWorkoutPlans, ...state.customPlans]

  const handleAddExercise = () => {
    if (!selectedExercise) return
    setNewPlan((prev) => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        { exerciseId: Number(selectedExercise), sets: 3, reps: 10, rest: 60 },
      ],
    }))
    setSelectedExercise('')
  }

  const handleCreatePlan = async () => {
    if (!newPlan.name.trim() || newPlan.exercises.length === 0) return
    setSaving(true)
    try {
      await addPlan({ ...newPlan, id: `custom-${Date.now()}` })
      setNewPlan({ name: '', description: '', exercises: [] })
      setShowCreate(false)
      showToast('課表建立成功 🎉')
    } catch {
      showToast('建立失敗，請再試一次', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteConfirm = async () => {
    setDeleting(true)
    try {
      await deletePlan(confirmPlanId)
      showToast('課表已刪除')
    } catch {
      showToast('刪除失敗，請再試一次', 'error')
    } finally {
      setConfirmPlanId(null)
      setDeleting(false)
    }
  }

  return (
    <div>
      {/* 刪除確認 Modal */}
      {confirmPlanId && (
        <ConfirmModal
          title="刪除課表"
          message="刪除後無法復原，確定要刪除這個課表嗎？"
          confirmText={deleting ? '刪除中…' : '刪除'}
          onConfirm={handleDeleteConfirm}
          onCancel={() => !deleting && setConfirmPlanId(null)}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">訓練課表</h1>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-xl border-0 cursor-pointer hover:bg-orange-600 text-sm font-semibold transition-colors"
        >
          <Plus size={18} />
          建立課表
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">建立新課表</h2>
          <input
            type="text"
            placeholder="課表名稱（必填）"
            value={newPlan.name}
            onChange={(e) => setNewPlan((p) => ({ ...p, name: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none focus:border-orange-500 mb-3 transition-colors"
          />
          <input
            type="text"
            placeholder="課表描述（選填）"
            value={newPlan.description}
            onChange={(e) => setNewPlan((p) => ({ ...p, description: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 outline-none focus:border-orange-500 mb-4 transition-colors"
          />

          <div className="flex gap-2 mb-4">
            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white outline-none"
            >
              <option value="">選擇動作...</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
            <button
              onClick={handleAddExercise}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg border-0 cursor-pointer hover:bg-gray-600 transition-colors"
            >
              加入
            </button>
          </div>

          {newPlan.exercises.length > 0 && (
            <div className="space-y-2 mb-4">
              {newPlan.exercises.map((item, i) => {
                const ex = exercises.find((e) => e.id === item.exerciseId)
                return (
                  <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <span className="text-sm text-gray-300">{ex?.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={item.sets}
                        onChange={(e) => {
                          const updated = [...newPlan.exercises]
                          updated[i] = { ...updated[i], sets: Number(e.target.value) }
                          setNewPlan((p) => ({ ...p, exercises: updated }))
                        }}
                        className="w-14 px-2 py-1 bg-gray-700 border-0 rounded text-white text-center text-sm"
                        min="1"
                      />
                      <span className="text-gray-500 text-xs">組</span>
                      <input
                        type="number"
                        value={item.reps}
                        onChange={(e) => {
                          const updated = [...newPlan.exercises]
                          updated[i] = { ...updated[i], reps: Number(e.target.value) }
                          setNewPlan((p) => ({ ...p, exercises: updated }))
                        }}
                        className="w-14 px-2 py-1 bg-gray-700 border-0 rounded text-white text-center text-sm"
                        min="1"
                      />
                      <span className="text-gray-500 text-xs">次</span>
                      <button
                        onClick={() =>
                          setNewPlan((p) => ({
                            ...p,
                            exercises: p.exercises.filter((_, idx) => idx !== i),
                          }))
                        }
                        className="text-red-400 bg-transparent border-0 cursor-pointer p-1 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <button
            onClick={handleCreatePlan}
            disabled={saving || !newPlan.name.trim() || newPlan.exercises.length === 0}
            className="w-full py-2.5 bg-orange-500 text-white rounded-lg border-0 cursor-pointer
              hover:bg-orange-600 font-semibold transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '建立中…' : '建立課表'}
          </button>
        </div>
      )}

      {/* Plan list */}
      <div className="space-y-4">
        {allPlans.map((plan) => (
          <div key={plan.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="text-xl font-semibold">{plan.name}</h2>
                <p className="text-gray-400 text-sm mt-1">{plan.description}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  to={`/start/${plan.id}`}
                  className="flex items-center gap-1 px-3 py-1.5 bg-orange-500 text-white rounded-lg no-underline text-sm hover:bg-orange-600 transition-colors"
                >
                  <Play size={14} />
                  開始
                </Link>
                {plan.id.startsWith('custom-') && (
                  <button
                    onClick={() => setConfirmPlanId(plan.id)}
                    className="p-1.5 bg-transparent border-0 text-red-400 cursor-pointer hover:text-red-300 transition-colors"
                    title="刪除課表"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              {plan.exercises.map((item, i) => {
                const ex = exercises.find((e) => e.id === item.exerciseId)
                return (
                  <div key={i} className="flex items-center justify-between text-sm bg-gray-800/50 rounded-lg px-3 py-2">
                    <span className="text-gray-300">{ex?.name}</span>
                    <span className="text-gray-500">{item.sets} 組 x {item.reps} 次 | 休息 {item.rest}s</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
