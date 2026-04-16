import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, PlayCircle } from 'lucide-react'
import Model from 'react-body-highlighter'
import { exercises, muscleGroups } from '../data/exercises'

// Map our muscle group IDs → react-body-highlighter muscle names
const MUSCLE_MAP = {
  chest:    { anterior: ['chest', 'front-deltoids', 'triceps'],           posterior: [] },
  back:     { anterior: [],                                                posterior: ['upper-back', 'lower-back', 'trapezius', 'back-deltoids'] },
  shoulders:{ anterior: ['front-deltoids'],                               posterior: ['back-deltoids', 'trapezius'] },
  biceps:   { anterior: ['biceps', 'forearm'],                            posterior: [] },
  triceps:  { anterior: ['triceps'],                                      posterior: [] },
  legs:     { anterior: ['quadriceps', 'adductor'],                       posterior: ['hamstring', 'calves', 'gluteal'] },
  abs:      { anterior: ['abs', 'obliques'],                              posterior: [] },
  glutes:   { anterior: ['adductor'],                                     posterior: ['gluteal', 'hamstring'] },
  compound: { anterior: ['chest', 'front-deltoids', 'abs', 'quadriceps'], posterior: ['upper-back', 'trapezius', 'gluteal', 'hamstring'] },
  stretch:  { anterior: ['quadriceps', 'abs'],                            posterior: ['hamstring', 'calves', 'lower-back'] },
}

function MuscleModel({ muscleId, exerciseName }) {
  const map = MUSCLE_MAP[muscleId] || { anterior: [], posterior: [] }
  const anteriorData = map.anterior.length > 0
    ? [{ name: exerciseName, muscles: map.anterior }]
    : []
  const posteriorData = map.posterior.length > 0
    ? [{ name: exerciseName, muscles: map.posterior }]
    : []

  return (
    <div className="flex justify-center gap-2">
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 mb-1">前側</span>
        <Model
          type="anterior"
          data={anteriorData}
          bodyColor="#2d2d2d"
          highlightedColors={['#f97316', '#ef4444']}
          style={{ width: 120, height: 240 }}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 mb-1">後側</span>
        <Model
          type="posterior"
          data={posteriorData}
          bodyColor="#2d2d2d"
          highlightedColors={['#f97316', '#ef4444']}
          style={{ width: 120, height: 240 }}
        />
      </div>
    </div>
  )
}


export default function ExerciseDetail() {
  const { id } = useParams()
  const exercise = exercises.find((e) => e.id === Number(id))

  if (!exercise) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">找不到此動作</p>
        <Link to="/exercises" className="text-orange-400 no-underline mt-4 inline-block">返回動作庫</Link>
      </div>
    )
  }

  const muscle = muscleGroups.find((m) => m.id === exercise.muscle)
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + ' 動作示範教學')}`

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/exercises" className="inline-flex items-center gap-2 text-gray-400 no-underline hover:text-white mb-6">
        <ArrowLeft size={18} />
        返回動作庫
      </Link>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500/20 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-800 flex items-center justify-center text-3xl shrink-0">
              {muscle?.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{exercise.name}</h1>
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">{muscle?.name}</span>
                <span className="text-xs px-2 py-1 bg-gray-800 rounded text-gray-300">{exercise.equipment}</span>
                <span className={`text-xs px-2 py-1 rounded ${
                  exercise.difficulty === '簡單' ? 'bg-green-500/20 text-green-400' :
                  exercise.difficulty === '中等' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Muscle Anatomy */}
        <div className="px-6 pt-5 pb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-orange-400">主要肌群</h2>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 no-underline transition-colors"
            >
              <PlayCircle size={14} />
              觀看影片教學
            </a>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-4">
            <MuscleModel muscleId={exercise.muscle} exerciseName={exercise.name} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-orange-400 mb-2">動作說明</h2>
            <p className="text-gray-300 leading-relaxed">{exercise.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-orange-400 mb-2">動作要點</h2>
            <p className="text-gray-300 leading-relaxed">{exercise.tips}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
