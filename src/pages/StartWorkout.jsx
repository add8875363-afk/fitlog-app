import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Check, Clock, ChevronRight, Trophy, Minus, Plus } from 'lucide-react'
import { exercises, defaultWorkoutPlans } from '../data/exercises'
import { useWorkout } from '../context/WorkoutContext'
import { useToast } from '../context/ToastContext'

// ─── 步進器元件：帶 +/- 按鈕的數字輸入 ────────────────────
function Stepper({ label, value, onChange, step = 1, min = 0 }) {
  const dec = () => onChange(Math.max(min, +((value - step).toFixed(2))))
  const inc = () => onChange(+((value + step).toFixed(2)))

  return (
    <div>
      <label className="block text-gray-400 text-sm mb-1.5">{label}</label>
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-xl overflow-hidden
        focus-within:border-orange-500 transition-colors">
        <button
          type="button"
          onClick={dec}
          className="flex items-center justify-center w-12 py-3 text-gray-400 hover:text-white
            hover:bg-gray-700 border-0 cursor-pointer transition-colors"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => {
            const v = parseFloat(e.target.value)
            onChange(isNaN(v) ? min : Math.max(min, v))
          }}
          className="flex-1 bg-transparent text-white text-center text-xl font-bold py-3 outline-none"
          min={min}
          step={step}
        />
        <button
          type="button"
          onClick={inc}
          className="flex items-center justify-center w-12 py-3 text-gray-400 hover:text-white
            hover:bg-gray-700 border-0 cursor-pointer transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

// ─── 主頁面 ────────────────────────────────────────────────
export default function StartWorkout() {
  const { planId } = useParams()
  const navigate = useNavigate()
  const { state, addLog } = useWorkout()
  const { showToast } = useToast()

  const allPlans = [...defaultWorkoutPlans, ...state.customPlans]
  const plan = allPlans.find((p) => p.id === planId)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [weight, setWeight] = useState(0)
  const [reps, setReps] = useState(0)
  const [restTime, setRestTime] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [logEntries, setLogEntries] = useState([])
  const [startTime] = useState(new Date())
  const [inputError, setInputError] = useState('')
  const [saving, setSaving] = useState(false)
  const [completedLog, setCompletedLog] = useState(null) // 完成後顯示結算畫面

  const currentPlanExercise = plan?.exercises[currentIndex]
  const currentExercise = currentPlanExercise
    ? exercises.find((e) => e.id === currentPlanExercise.exerciseId)
    : null

  // 上一次做同一動作的紀錄（workoutLogs 已按日期 desc 排序）
  const lastRecord = useMemo(() => {
    const exerciseId = currentPlanExercise?.exerciseId
    if (!exerciseId) return null
    for (const log of state.workoutLogs) {
      const entry = log.entries.find((e) => e.exerciseId === exerciseId)
      if (entry) return entry
    }
    return null
  }, [state.workoutLogs, currentPlanExercise?.exerciseId])

  // 切換動作時重設次數；切換組時保留重量
  useEffect(() => {
    if (currentPlanExercise) {
      setReps(currentPlanExercise.reps)
      setWeight(0)
      setInputError('')
    }
  }, [currentIndex])

  // 組間計時器
  useEffect(() => {
    if (!isResting || restTime <= 0) return
    const timer = setInterval(() => {
      setRestTime((t) => {
        if (t <= 1) { setIsResting(false); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isResting, restTime])

  if (!plan || plan.exercises.length === 0) {
    return (
      <p className="text-center text-gray-400 py-20">
        {!plan ? '找不到此課表' : '此課表沒有動作'}
      </p>
    )
  }

  // ── 訓練完成結算畫面 ─────────────────────────────────────
  if (completedLog) {
    const totalVolume = completedLog.entries.reduce((s, e) => s + e.weight * e.reps, 0)
    return (
      <div className="max-w-lg mx-auto text-center py-10 px-4">
        <div className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy size={48} className="text-orange-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">訓練完成！</h2>
        <p className="text-gray-400 mb-8">很棒，你做到了！繼續保持 💪</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-2xl font-bold text-orange-400">{completedLog.duration}</p>
            <p className="text-gray-400 text-sm mt-0.5">分鐘</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-2xl font-bold text-orange-400">{completedLog.entries.length}</p>
            <p className="text-gray-400 text-sm mt-0.5">總組數</p>
          </div>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
            <p className="text-2xl font-bold text-orange-400">{totalVolume.toLocaleString()}</p>
            <p className="text-gray-400 text-sm mt-0.5">訓練量 kg</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/log')}
          className="w-full py-3 bg-orange-500 text-white rounded-xl border-0 cursor-pointer
            hover:bg-orange-600 font-semibold text-lg transition-colors"
        >
          查看訓練紀錄
        </button>
        <button
          onClick={() => navigate('/')}
          className="w-full py-3 mt-3 bg-gray-800 text-gray-300 rounded-xl border-0 cursor-pointer
            hover:bg-gray-700 font-medium transition-colors"
        >
          回到首頁
        </button>
      </div>
    )
  }

  // ── 完成一組 ─────────────────────────────────────────────
  const handleCompleteSet = async () => {
    if (reps <= 0) {
      setInputError('次數必須大於 0')
      return
    }
    setInputError('')

    const entry = {
      exerciseId: currentPlanExercise.exerciseId,
      exerciseName: currentExercise.name,
      set: currentSet,
      weight: Math.max(0, weight),
      reps,
    }

    const isLastSet = currentSet === currentPlanExercise.sets
    const isLastExercise = currentIndex === plan.exercises.length - 1

    if (!isLastSet) {
      // 還有下一組
      setLogEntries((prev) => [...prev, entry])
      setCurrentSet((s) => s + 1)
      setRestTime(currentPlanExercise.rest)
      setIsResting(true)
    } else if (!isLastExercise) {
      // 下一個動作
      setLogEntries((prev) => [...prev, entry])
      setCurrentIndex((i) => i + 1)
      setCurrentSet(1)
      setRestTime(currentPlanExercise.rest)
      setIsResting(true)
    } else {
      // 全部完成 → 儲存並顯示結算
      setSaving(true)
      const allEntries = [...logEntries, entry]
      const log = {
        id: `log-${Date.now()}`,
        planName: plan.name,
        date: startTime.toISOString(),
        duration: Math.max(1, Math.round((new Date() - startTime) / 60000)),
        entries: allEntries,
      }
      try {
        await addLog(log)
        setCompletedLog(log)
      } catch {
        showToast('紀錄儲存失敗，請再試一次', 'error')
      } finally {
        setSaving(false)
      }
    }
  }

  // 進度計算
  const totalSets = plan.exercises.reduce((sum, e) => sum + e.sets, 0)
  const completedSets =
    plan.exercises.slice(0, currentIndex).reduce((sum, e) => sum + e.sets, 0) + (currentSet - 1)
  const progress = totalSets > 0 ? (completedSets / totalSets) * 100 : 0
  const isLastSet = currentSet === currentPlanExercise.sets && currentIndex === plan.exercises.length - 1

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-2">{plan.name}</h1>

      {/* 進度條 */}
      <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
        <div
          className="bg-orange-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 組間休息倒數 */}
      {isResting ? (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
          <Clock size={48} className="text-orange-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">組間休息</p>
          <p className="text-6xl font-bold text-orange-500 mb-6 tabular-nums">{restTime}s</p>
          <button
            onClick={() => { setIsResting(false); setRestTime(0) }}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg border-0 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            跳過休息
          </button>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          {/* 動作標題 */}
          <div className="text-center mb-5">
            <p className="text-gray-500 text-sm">動作 {currentIndex + 1} / {plan.exercises.length}</p>
            <h2 className="text-2xl font-bold mt-1">{currentExercise?.name}</h2>
            <p className="text-orange-400 mt-1">第 {currentSet} 組 / 共 {currentPlanExercise.sets} 組</p>
            {/* 上次紀錄提示 */}
            {lastRecord && (
              <p className="text-gray-600 text-xs mt-1.5">
                上次：{lastRecord.weight} kg × {lastRecord.reps} 次
              </p>
            )}
          </div>

          {/* 重量 / 次數步進器 */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <Stepper
              label="重量 (kg)"
              value={weight}
              onChange={setWeight}
              step={2.5}
              min={0}
            />
            <Stepper
              label="次數"
              value={reps}
              onChange={(v) => { setReps(v); setInputError('') }}
              step={1}
              min={1}
            />
          </div>

          {inputError && <p className="text-red-400 text-sm mt-1 mb-1">{inputError}</p>}

          <button
            onClick={handleCompleteSet}
            disabled={saving}
            className="w-full py-3 mt-4 bg-orange-500 text-white rounded-xl border-0 cursor-pointer
              hover:bg-orange-600 font-semibold text-lg flex items-center justify-center gap-2
              disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? '儲存中…' : isLastSet ? (
              <>完成訓練 <Check size={20} /></>
            ) : (
              <>完成此組 <ChevronRight size={20} /></>
            )}
          </button>
        </div>
      )}

      {/* 已完成的組 */}
      {logEntries.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-500 mb-2">已完成</h3>
          <div className="space-y-1">
            {logEntries.map((entry, i) => (
              <div key={i} className="flex justify-between text-sm bg-gray-900/50 rounded-lg px-3 py-2">
                <span className="text-gray-400">{entry.exerciseName} - 第{entry.set}組</span>
                <span className="text-gray-600">{entry.weight}kg × {entry.reps}次</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
