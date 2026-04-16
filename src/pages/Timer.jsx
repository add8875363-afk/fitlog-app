import { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'

const presets = [30, 60, 90, 120, 180]

export default function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(60)
  const [remaining, setRemaining] = useState(60)
  const [running, setRunning] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    if (!running || remaining <= 0) {
      if (remaining <= 0 && running) {
        setRunning(false)
        // Play beep sound
        try {
          const AudioCtx = window.AudioContext || window.webkitAudioContext
          const ctx = new AudioCtx()
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.value = 800
          gain.gain.value = 0.3
          osc.start()
          setTimeout(() => { osc.stop(); ctx.close() }, 500)
        } catch {}
      }
      return
    }
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000)
    return () => clearInterval(timer)
  }, [running, remaining])

  const handlePreset = (sec) => {
    setTotalSeconds(sec)
    setRemaining(sec)
    setRunning(false)
  }

  const handleReset = () => {
    setRemaining(totalSeconds)
    setRunning(false)
  }

  const toggleRun = () => {
    if (remaining <= 0) {
      setRemaining(totalSeconds)
    }
    setRunning(!running)
  }

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60
  const progress = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0
  const circumference = 2 * Math.PI * 120

  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8">休息計時器</h1>

      {/* Circular timer */}
      <div className="relative inline-flex items-center justify-center mb-8">
        <svg width="280" height="280" className="-rotate-90">
          <circle cx="140" cy="140" r="120" fill="none" stroke="#1f2937" strokeWidth="8" />
          <circle
            cx="140"
            cy="140"
            r="120"
            fill="none"
            stroke={remaining <= 0 ? '#ef4444' : '#f97316'}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-6xl font-bold tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-gray-500 text-sm mt-1">
            {remaining <= 0 ? '時間到！' : running ? '計時中...' : '已暫停'}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={handleReset}
          className="w-14 h-14 rounded-full bg-gray-800 border-0 text-gray-300 cursor-pointer hover:bg-gray-700 flex items-center justify-center"
        >
          <RotateCcw size={22} />
        </button>
        <button
          onClick={toggleRun}
          className={`w-20 h-20 rounded-full border-0 cursor-pointer flex items-center justify-center ${
            running
              ? 'bg-yellow-500 text-white hover:bg-yellow-600'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          {running ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
        </button>
        <div className="w-14 h-14" /> {/* spacer */}
      </div>

      {/* Presets */}
      <div>
        <p className="text-gray-400 text-sm mb-3">快速設定</p>
        <div className="flex gap-2 justify-center flex-wrap">
          {presets.map((sec) => (
            <button
              key={sec}
              onClick={() => handlePreset(sec)}
              className={`px-4 py-2 rounded-xl border-0 cursor-pointer text-sm font-semibold transition-colors ${
                totalSeconds === sec && !running
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {sec >= 60 ? `${sec / 60}分鐘` : `${sec}秒`}
            </button>
          ))}
        </div>
      </div>

      {/* Custom time */}
      <div className="mt-6">
        <p className="text-gray-400 text-sm mb-2">自訂時間（秒）</p>
        <input
          type="number"
          value={totalSeconds}
          onChange={(e) => {
            const v = Math.max(1, Number(e.target.value))
            setTotalSeconds(v)
            if (!running) setRemaining(v)
          }}
          className="w-32 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white text-center outline-none focus:border-orange-500"
          min="1"
        />
      </div>
    </div>
  )
}
