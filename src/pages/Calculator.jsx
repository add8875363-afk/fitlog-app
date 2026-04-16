import { useState } from 'react'
import { Calculator as CalcIcon } from 'lucide-react'

// Epley formula
function calc1RM(weight, reps) {
  if (reps === 1) return weight
  return Math.round(weight * (1 + reps / 30))
}

function calcBMI(weight, height) {
  const h = height / 100
  return (weight / (h * h)).toFixed(1)
}

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: '體重過輕', color: 'text-blue-400' }
  if (bmi < 24) return { label: '正常體重', color: 'text-green-400' }
  if (bmi < 27) return { label: '體重過重', color: 'text-yellow-400' }
  if (bmi < 30) return { label: '輕度肥胖', color: 'text-orange-400' }
  return { label: '中重度肥胖', color: 'text-red-400' }
}

const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60]

export default function Calculator() {
  const [tab, setTab] = useState('1rm')
  // 1RM
  const [weight, setWeight] = useState('')
  const [reps, setReps] = useState('')
  // BMI
  const [bmiWeight, setBmiWeight] = useState('')
  const [bmiHeight, setBmiHeight] = useState('')

  const oneRM = weight && reps && Number(weight) > 0 && Number(reps) >= 1 && Number(reps) <= 30
    ? calc1RM(Number(weight), Number(reps))
    : null
  const bmi = bmiWeight && bmiHeight && Number(bmiWeight) > 0 && Number(bmiHeight) > 0
    ? calcBMI(Number(bmiWeight), Number(bmiHeight))
    : null
  const bmiInfo = bmi ? bmiCategory(Number(bmi)) : null

  return (
    <div className="max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <CalcIcon size={28} className="text-orange-400" />
        <h1 className="text-3xl font-bold">健身計算機</h1>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-gray-900 rounded-xl p-1 mb-6 border border-gray-800">
        <button
          onClick={() => setTab('1rm')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer transition-colors ${
            tab === '1rm' ? 'bg-orange-500 text-white' : 'bg-transparent text-gray-400 hover:text-white'
          }`}
        >
          1RM 最大力量
        </button>
        <button
          onClick={() => setTab('bmi')}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer transition-colors ${
            tab === 'bmi' ? 'bg-orange-500 text-white' : 'bg-transparent text-gray-400 hover:text-white'
          }`}
        >
          BMI 計算
        </button>
      </div>

      {tab === '1rm' ? (
        <div>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-4">
            <p className="text-gray-400 text-sm mb-4">輸入你做某個動作的重量和次數，估算你的理論最大重量（1RM）</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">重量 (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl outline-none focus:border-orange-500"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">次數 (reps)</label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl outline-none focus:border-orange-500"
                  placeholder="0"
                  min="1"
                  max="30"
                />
              </div>
            </div>
            {oneRM && (
              <div className="text-center bg-orange-500/10 border border-orange-500/30 rounded-xl py-4">
                <p className="text-gray-400 text-sm">預估最大力量 (1RM)</p>
                <p className="text-5xl font-bold text-orange-400 mt-1">{oneRM} <span className="text-2xl">kg</span></p>
                <p className="text-gray-500 text-xs mt-1">Epley 公式</p>
              </div>
            )}
          </div>

          {oneRM && (
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">訓練百分比參考</h3>
              <div className="space-y-2">
                {percentages.map((pct) => {
                  const w = Math.round((oneRM * pct) / 100 / 2.5) * 2.5
                  const repsGuide =
                    pct >= 95 ? '1-2 次' :
                    pct >= 90 ? '2-3 次' :
                    pct >= 85 ? '3-5 次' :
                    pct >= 80 ? '4-6 次' :
                    pct >= 75 ? '6-8 次' :
                    pct >= 70 ? '8-10 次' :
                    pct >= 65 ? '10-12 次' : '12-15 次'
                  return (
                    <div key={pct} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-semibold w-12 ${pct >= 90 ? 'text-red-400' : pct >= 80 ? 'text-orange-400' : pct >= 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {pct}%
                        </span>
                        <span className="text-white font-bold">{w} kg</span>
                      </div>
                      <span className="text-gray-500 text-sm">{repsGuide}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-4">
            <p className="text-gray-400 text-sm mb-4">計算你的身體質量指數（BMI）</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">體重 (kg)</label>
                <input
                  type="number"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl outline-none focus:border-orange-500"
                  placeholder="70"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">身高 (cm)</label>
                <input
                  type="number"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-center text-xl outline-none focus:border-orange-500"
                  placeholder="170"
                />
              </div>
            </div>
            {bmi && bmiInfo && (
              <div className="text-center bg-orange-500/10 border border-orange-500/30 rounded-xl py-4">
                <p className="text-gray-400 text-sm">你的 BMI</p>
                <p className={`text-5xl font-bold mt-1 ${bmiInfo.color}`}>{bmi}</p>
                <p className={`text-lg font-semibold mt-1 ${bmiInfo.color}`}>{bmiInfo.label}</p>
              </div>
            )}
          </div>

          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">BMI 分類標準（亞洲標準）</h3>
            <div className="space-y-2">
              {[
                { range: '< 18.5', label: '體重過輕', color: 'text-blue-400' },
                { range: '18.5 – 23.9', label: '正常體重', color: 'text-green-400' },
                { range: '24 – 26.9', label: '體重過重', color: 'text-yellow-400' },
                { range: '27 – 29.9', label: '輕度肥胖', color: 'text-orange-400' },
                { range: '≥ 30', label: '中重度肥胖', color: 'text-red-400' },
              ].map((item) => (
                <div key={item.range} className="flex justify-between py-1.5 border-b border-gray-800 last:border-0">
                  <span className="text-gray-400 text-sm">{item.range}</span>
                  <span className={`text-sm font-semibold ${item.color}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
