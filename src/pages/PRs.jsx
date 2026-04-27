import { useMemo, useState } from 'react'
import { Trophy, Dumbbell, User, Pencil, TrendingUp } from 'lucide-react'
import { useWorkout } from '../context/WorkoutContext'
import { exercises } from '../data/exercises'
import { PRsSkeleton } from '../components/Skeleton'
import { useUserProfile } from '../hooks/useUserProfile'
import { calculateLevel } from '../utils/strengthLevel'
import { EXERCISE_TO_STANDARD } from '../data/strengthStandards'

export default function PRs() {
  const { state } = useWorkout()
  const [profile, setProfile] = useUserProfile()
  const [editingProfile, setEditingProfile] = useState(false)

  const prList = useMemo(() => {
    return Object.entries(state.prs)
      .map(([exerciseId, pr]) => {
        const exercise = exercises.find((e) => e.id === Number(exerciseId))
        return exercise ? { exercise, pr } : null
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.pr.date) - new Date(a.pr.date))
  }, [state.prs])

  // 有對照表的 PR 數
  const ratedCount = useMemo(
    () => prList.filter(({ exercise }) => EXERCISE_TO_STANDARD[exercise.id]).length,
    [prList]
  )

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Trophy size={28} className="text-yellow-400" />
        <h1 className="text-3xl font-bold">個人最佳紀錄</h1>
      </div>

      {/* 個人資料卡(影響力量等級計算) */}
      {!state.dataLoading && (
        <ProfileCard
          profile={profile}
          setProfile={setProfile}
          editing={editingProfile}
          setEditing={setEditingProfile}
          ratedCount={ratedCount}
        />
      )}

      {state.dataLoading ? (
        <PRsSkeleton />
      ) : prList.length === 0 ? (
        <div className="text-center py-20">
          <Dumbbell size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">還沒有 PR 紀錄</p>
          <p className="text-gray-600 text-sm mt-1">完成一次訓練後,PR 會自動記錄下來!</p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 text-sm mb-4">共 {prList.length} 個動作的個人最佳紀錄,完成訓練後自動更新</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prList.map(({ exercise, pr }) => {
              const result = profile ? calculateLevel(exercise.id, pr, profile) : null
              return (
                <div
                  key={exercise.id}
                  className="p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                      <Trophy size={22} className="text-yellow-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{exercise.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-gray-400 text-sm">{exercise.muscle === 'compound' ? '複合動作' : exercise.muscle}</p>
                        {result && (
                          <span
                            className={`inline-flex items-center text-xs px-2 py-0.5 rounded-md border ${result.level.bg} ${result.level.color} ${result.level.border}`}
                            title={`預估 1RM: ${result.oneRm.toFixed(1)} kg · 體重比 ${result.ratio.toFixed(2)}`}
                          >
                            {result.level.name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-yellow-400 font-bold text-xl">{pr.weight} kg</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {pr.reps} 次 · {new Date(pr.date).toLocaleDateString('zh-TW')}
                      </p>
                    </div>
                  </div>
                  {result && <LevelProgress result={result} />}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// ─── 力量等級進度條 ────────────────────────────────────
function LevelProgress({ result }) {
  // 已是菁英 → 沒有下個等級
  if (!result.nextThreshold) {
    return (
      <div className="mt-3">
        <div className="h-1.5 w-full rounded-full bg-amber-500/40" />
        <p className="text-xs text-amber-400/90 mt-1.5">已達最高段位</p>
      </div>
    )
  }

  const remainingKg = result.nextThreshold.weight - result.oneRm
  return (
    <div className="mt-3">
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full ${result.level.fill} transition-all duration-500`}
          style={{ width: `${result.progress * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1.5">
        距離{' '}
        <span className={`font-medium ${result.nextThreshold.level.color}`}>
          {result.nextThreshold.level.name}
        </span>{' '}
        還差 {remainingKg.toFixed(1)} kg
      </p>
    </div>
  )
}

// ─── 個人資料卡 ─────────────────────────────────────────
function ProfileCard({ profile, setProfile, editing, setEditing, ratedCount }) {
  // 沒設定 + 有可比對的 PR → 顯示設定提示
  if (!profile && ratedCount > 0 && !editing) {
    return (
      <div className="mb-5 p-4 rounded-xl border border-orange-500/30 bg-orange-500/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/15 flex items-center justify-center shrink-0">
            <TrendingUp size={20} className="text-orange-400" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold">想知道你的力量等級嗎?</p>
            <p className="text-gray-400 text-sm mt-0.5">
              填一下體重和性別,系統會跟全球常模比對,告訴你「臥推屬於中階」之類的等級。
            </p>
            <button
              onClick={() => setEditing(true)}
              className="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              設定個人資料
            </button>
          </div>
        </div>
      </div>
    )
  }

  // 編輯中
  if (editing) {
    return <ProfileForm initial={profile} onSave={(p) => { setProfile(p); setEditing(false) }} onCancel={() => setEditing(false)} />
  }

  // 已設定 → 顯示摘要
  if (profile) {
    return (
      <div className="mb-5 p-3 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
          <User size={18} className="text-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm">
            <span className="text-gray-400">力量等級依據:</span>{' '}
            {profile.sex === 'male' ? '男' : '女'} · {profile.bodyweight} kg
          </p>
        </div>
        <button
          onClick={() => setEditing(true)}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          title="修改個人資料"
        >
          <Pencil size={16} />
        </button>
      </div>
    )
  }

  return null
}

// ─── 個人資料表單 ───────────────────────────────────────
function ProfileForm({ initial, onSave, onCancel }) {
  const [sex, setSex] = useState(initial?.sex || 'male')
  const [bodyweight, setBodyweight] = useState(initial?.bodyweight?.toString() || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const w = Number(bodyweight)
    if (!w || w < 30 || w > 250) {
      setError('請輸入合理的體重(30-250 kg)')
      return
    }
    onSave({ sex, bodyweight: w })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-5 p-4 rounded-xl bg-gray-900 border border-gray-800 space-y-4"
    >
      <div>
        <p className="text-white font-semibold mb-1">設定個人資料</p>
        <p className="text-gray-500 text-xs">資料只儲存在這個瀏覽器,用來計算你的力量等級</p>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">性別</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setSex('male')}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
              sex === 'male'
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
            }`}
          >
            男
          </button>
          <button
            type="button"
            onClick={() => setSex('female')}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors ${
              sex === 'female'
                ? 'bg-orange-500 border-orange-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
            }`}
          >
            女
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">體重 (kg)</label>
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          min="30"
          max="250"
          value={bodyweight}
          onChange={(e) => { setBodyweight(e.target.value); setError('') }}
          placeholder="例:70"
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-orange-500 focus:outline-none"
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors"
        >
          儲存
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors"
        >
          取消
        </button>
      </div>
    </form>
  )
}
