import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Dumbbell } from 'lucide-react'
import { useWorkout } from '../context/WorkoutContext'
import { CalendarSkeleton } from '../components/Skeleton'

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function Calendar() {
  const { state } = useWorkout()
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState(null)

  // Build a map of date string -> logs
  const logsByDate = useMemo(() => {
    const map = {}
    state.workoutLogs.forEach((log) => {
      const d = new Date(log.date)
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
      if (!map[key]) map[key] = []
      map[key].push(log)
    })
    return map
  }, [state.workoutLogs])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
    setSelected(null)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
    setSelected(null)
  }

  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  const weekDays = ['日','一','二','三','四','五','六']

  const selectedKey = selected ? `${viewYear}-${viewMonth}-${selected}` : null
  const selectedLogs = selectedKey ? (logsByDate[selectedKey] || []) : []

  // Streak calculation
  const streak = useMemo(() => {
    const dates = new Set(
      state.workoutLogs.map((log) => {
        const d = new Date(log.date)
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
      })
    )
    let count = 0
    const cur = new Date()
    cur.setHours(0,0,0,0)
    while (true) {
      const key = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}-${String(cur.getDate()).padStart(2,'0')}`
      if (dates.has(key)) { count++; cur.setDate(cur.getDate() - 1) }
      else break
    }
    return count
  }, [state.workoutLogs])

  if (state.dataLoading) return <CalendarSkeleton />

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-2">訓練日曆</h1>

      {/* Streak */}
      <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3 mb-6">
        <span className="text-2xl">🔥</span>
        <div>
          <p className="text-orange-400 font-bold text-lg">{streak} 天連續訓練</p>
          <p className="text-gray-400 text-sm">保持下去！</p>
        </div>
      </div>

      {/* Calendar header */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 bg-transparent border-0 text-gray-400 cursor-pointer hover:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-semibold">{viewYear} 年 {monthNames[viewMonth]}</h2>
          <button onClick={nextMonth} className="p-2 bg-transparent border-0 text-gray-400 cursor-pointer hover:text-white">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((d) => (
            <div key={d} className="text-center text-xs text-gray-500 py-1">{d}</div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for first day offset */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const key = `${viewYear}-${viewMonth}-${day}`
            const hasLog = !!logsByDate[key]
            const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()
            const isSelected = selected === day

            return (
              <button
                key={day}
                onClick={() => setSelected(isSelected ? null : day)}
                className={`aspect-square rounded-lg text-sm font-medium border-0 cursor-pointer transition-colors relative
                  ${isSelected ? 'bg-orange-500 text-white' :
                    isToday ? 'bg-orange-500/20 text-orange-400' :
                    hasLog ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' :
                    'bg-transparent text-gray-400 hover:bg-gray-800'
                  }`}
              >
                {day}
                {hasLog && !isSelected && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 text-xs text-gray-500 px-1">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/40 inline-block" />有訓練</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-500/40 inline-block" />今天/選取</span>
      </div>

      {/* Selected day logs */}
      {selected && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">
            {viewMonth + 1}/{selected} 的訓練
          </h3>
          {selectedLogs.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-4">這天沒有訓練紀錄</p>
          ) : (
            <div className="space-y-2">
              {selectedLogs.map((log) => (
                <div key={log.id} className="bg-gray-900 rounded-xl border border-gray-800 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell size={16} className="text-orange-400" />
                    <span className="font-semibold">{log.planName}</span>
                    <span className="text-gray-500 text-sm ml-auto">{log.duration} 分鐘</span>
                  </div>
                  <div className="space-y-1">
                    {log.entries.map((entry, i) => (
                      <div key={i} className="flex justify-between text-sm text-gray-400">
                        <span>{entry.exerciseName} 第{entry.set}組</span>
                        <span>{entry.weight}kg × {entry.reps}次</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
