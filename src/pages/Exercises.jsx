import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { exercises, muscleGroups } from '../data/exercises'
import { useExerciseGif } from '../hooks/useExerciseGif'

// Thumbnail: only fetch GIF when card is in view to save API quota
function ExerciseThumbnail({ ex, muscle }) {
  const { gifUrl } = useExerciseGif(ex.englishName)

  return (
    <div className="w-14 h-14 rounded-lg bg-gray-800 flex items-center justify-center text-2xl shrink-0 overflow-hidden">
      {gifUrl
        ? <img src={gifUrl} alt={ex.name} className="w-full h-full object-cover" />
        : <span>{muscle?.icon}</span>
      }
    </div>
  )
}

export default function Exercises() {
  const [search, setSearch] = useState('')
  const [selectedMuscle, setSelectedMuscle] = useState('all')

  const filtered = exercises.filter((e) => {
    const matchSearch = e.name.includes(search) || e.equipment.includes(search)
    const matchMuscle = selectedMuscle === 'all' || e.muscle === selectedMuscle
    return matchSearch && matchMuscle
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">訓練動作庫</h1>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="搜尋動作名稱或器材..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 outline-none focus:border-orange-500"
        />
      </div>

      {/* Muscle filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setSelectedMuscle('all')}
          className={`px-3 py-1.5 rounded-lg text-sm border-0 cursor-pointer transition-colors ${
            selectedMuscle === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          全部
        </button>
        {muscleGroups.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMuscle(m.id)}
            className={`px-3 py-1.5 rounded-lg text-sm border-0 cursor-pointer transition-colors ${
              selectedMuscle === m.id
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {m.icon} {m.name}
          </button>
        ))}
      </div>

      {/* Exercise list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((ex) => {
          const muscle = muscleGroups.find((m) => m.id === ex.muscle)
          return (
            <Link
              key={ex.id}
              to={`/exercises/${ex.id}`}
              className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800 no-underline hover:border-orange-500/50 transition-colors"
            >
              <ExerciseThumbnail ex={ex} muscle={muscle} />
              <div className="min-w-0">
                <h3 className="text-white font-semibold truncate">{ex.name}</h3>
                <div className="flex gap-2 mt-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-400">{muscle?.name}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-800 rounded text-gray-400">{ex.equipment}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    ex.difficulty === '簡單' ? 'bg-green-500/20 text-green-400' :
                    ex.difficulty === '中等' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {ex.difficulty}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-12">找不到符合條件的動作</p>
      )}
    </div>
  )
}
