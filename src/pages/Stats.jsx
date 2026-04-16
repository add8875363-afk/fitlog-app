import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { TrendingUp, Calendar, Dumbbell, Flame } from 'lucide-react'
import { useWorkout } from '../context/WorkoutContext'
import { StatsSkeleton } from '../components/Skeleton'

export default function Stats() {
  const { state } = useWorkout()
  const logs = state.workoutLogs

  const stats = useMemo(() => {
    if (logs.length === 0) return null

    const totalWorkouts = logs.length
    const totalDuration = logs.reduce((sum, l) => sum + (l.duration || 0), 0)
    const totalVolume = logs.reduce(
      (sum, l) => sum + l.entries.reduce((s, e) => s + e.weight * e.reps, 0),
      0
    )
    const totalSets = logs.reduce((sum, l) => sum + l.entries.length, 0)

    // Volume over time chart data
    const volumeByDate = {}
    logs.forEach((log) => {
      const date = new Date(log.date).toLocaleDateString('zh-TW')
      const vol = log.entries.reduce((s, e) => s + e.weight * e.reps, 0)
      volumeByDate[date] = (volumeByDate[date] || 0) + vol
    })
    const volumeChart = Object.entries(volumeByDate)
      .map(([date, volume]) => ({ date, volume }))
      .reverse()

    // Exercise frequency
    const exFreq = {}
    logs.forEach((log) => {
      log.entries.forEach((e) => {
        exFreq[e.exerciseName] = (exFreq[e.exerciseName] || 0) + 1
      })
    })
    const freqChart = Object.entries(exFreq)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    return { totalWorkouts, totalDuration, totalVolume, totalSets, volumeChart, freqChart }
  }, [logs])

  if (state.dataLoading) return <StatsSkeleton />

  if (!stats) {
    return (
      <div className="text-center py-20">
        <TrendingUp size={48} className="text-gray-700 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">還沒有統計數據</p>
        <p className="text-gray-600 text-sm mt-1">完成幾次訓練後就能看到你的進步曲線了！</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">訓練統計</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
          <Calendar size={24} className="text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{stats.totalWorkouts}</p>
          <p className="text-gray-400 text-sm">訓練次數</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
          <Flame size={24} className="text-orange-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{stats.totalDuration}</p>
          <p className="text-gray-400 text-sm">總分鐘數</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
          <Dumbbell size={24} className="text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{stats.totalSets}</p>
          <p className="text-gray-400 text-sm">總組數</p>
        </div>
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 text-center">
          <TrendingUp size={24} className="text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold">{stats.totalVolume.toLocaleString()}</p>
          <p className="text-gray-400 text-sm">總訓練量 (kg)</p>
        </div>
      </div>

      {/* Volume chart */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">訓練量趨勢</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.volumeChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
            />
            <Line type="monotone" dataKey="volume" stroke="#f97316" strokeWidth={2} dot={{ fill: '#f97316' }} name="訓練量 (kg)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Exercise frequency */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold mb-4">最常訓練的動作</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.freqChart} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis type="number" stroke="#6b7280" fontSize={12} />
            <YAxis type="category" dataKey="name" stroke="#6b7280" fontSize={12} width={100} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px', color: '#fff' }}
            />
            <Bar dataKey="count" fill="#f97316" radius={[0, 4, 4, 0]} name="次數" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
