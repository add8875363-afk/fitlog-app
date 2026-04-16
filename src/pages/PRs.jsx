import { useMemo } from 'react'
import { Trophy, Dumbbell } from 'lucide-react'
import { useWorkout } from '../context/WorkoutContext'
import { exercises } from '../data/exercises'
import { PRsSkeleton } from '../components/Skeleton'

export default function PRs() {
  const { state } = useWorkout()

  const prList = useMemo(() => {
    return Object.entries(state.prs)
      .map(([exerciseId, pr]) => {
        const exercise = exercises.find((e) => e.id === Number(exerciseId))
        return exercise ? { exercise, pr } : null
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.pr.date) - new Date(a.pr.date))
  }, [state.prs])

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Trophy size={28} className="text-yellow-400" />
        <h1 className="text-3xl font-bold">個人最佳紀錄</h1>
      </div>

      {state.dataLoading ? (
        <PRsSkeleton />
      ) : prList.length === 0 ? (
        <div className="text-center py-20">
          <Dumbbell size={48} className="text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">還沒有 PR 紀錄</p>
          <p className="text-gray-600 text-sm mt-1">完成一次訓練後，PR 會自動記錄下來！</p>
        </div>
      ) : (
        <>
          <p className="text-gray-400 text-sm mb-4">共 {prList.length} 個動作的個人最佳紀錄，完成訓練後自動更新</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prList.map(({ exercise, pr }) => (
              <div
                key={exercise.id}
                className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800 hover:border-yellow-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <Trophy size={22} className="text-yellow-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{exercise.name}</p>
                  <p className="text-gray-400 text-sm mt-0.5">{exercise.muscle === 'compound' ? '複合動作' : exercise.muscle}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-yellow-400 font-bold text-xl">{pr.weight} kg</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {pr.reps} 次 · {new Date(pr.date).toLocaleDateString('zh-TW')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
