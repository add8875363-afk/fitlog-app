export default function Knowledge() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500/20 to-transparent p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📖</span>
            <span className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded-lg">訓練知識</span>
          </div>
          <h1 className="text-2xl font-bold leading-snug">
            居家訓練，怎麼練才有效？<br />
            搞懂「肌耐力、肌肥大、肌力」的真正差別
          </h1>
          <p className="text-gray-400 text-sm mt-2">資料來源：WCoachLife</p>
        </div>
      </div>

      {/* Intro */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-orange-400 mb-3">不同的訓練次數，「效果」也不一樣</h2>
        <p className="text-gray-300 leading-relaxed">
          很多人在居家訓練時，不知道該做幾下才「有效」。其實訓練的次數範圍，會直接影響身體的適應方向——
          同樣是深蹲，做 15 下跟做 5 下，對身體帶來的刺激是完全不同的。
        </p>
      </div>

      {/* Three training types */}
      <div className="grid gap-4">
        {/* 肌耐力 */}
        <div className="bg-gray-900 rounded-2xl border border-green-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-xl">🟢</div>
            <div>
              <h3 className="font-bold text-white text-lg">肌耐力訓練</h3>
              <span className="text-xs text-green-400">適合初學者</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-400">10–15</p>
              <p className="text-xs text-gray-400 mt-1">每組次數</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-green-400">2–3</p>
              <p className="text-xs text-gray-400 mt-1">建議組數</p>
            </div>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-green-400">✓</span>使用自體重量或輕重量</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span>受傷風險低，容易建立習慣</li>
            <li className="flex gap-2"><span className="text-green-400">✓</span>適合剛開始健身、維持體能的人</li>
          </ul>
        </div>

        {/* 肌肥大 */}
        <div className="bg-gray-900 rounded-2xl border border-orange-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-xl">🟠</div>
            <div>
              <h3 className="font-bold text-white text-lg">肌肥大訓練</h3>
              <span className="text-xs text-orange-400">增肌首選</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">6–12</p>
              <p className="text-xs text-gray-400 mt-1">每組次數</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-orange-400">10–20</p>
              <p className="text-xs text-gray-400 mt-1">每週每肌群有效組數</p>
            </div>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-orange-400">✓</span>使用中到重重量，訓練至接近力竭</li>
            <li className="flex gap-2"><span className="text-orange-400">✓</span>每週每肌群 10–20 組有效訓練量</li>
            <li className="flex gap-2"><span className="text-orange-400">✓</span>每週可訓練 2–3 次，效果顯著</li>
            <li className="flex gap-2"><span className="text-orange-400">⚠️</span>關鍵是「做到接近力竭」，而非只是輕重量高次數</li>
          </ul>
        </div>

        {/* 肌力 */}
        <div className="bg-gray-900 rounded-2xl border border-red-500/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-xl">🔴</div>
            <div>
              <h3 className="font-bold text-white text-lg">肌力訓練</h3>
              <span className="text-xs text-red-400">進階強化</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-400">1–6</p>
              <p className="text-xs text-gray-400 mt-1">每組次數</p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-400">高強度</p>
              <p className="text-xs text-gray-400 mt-1">重量設定</p>
            </div>
          </div>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex gap-2"><span className="text-red-400">✓</span>次數少、強度極高，需要良好的動作控制</li>
            <li className="flex gap-2"><span className="text-red-400">✓</span>顯著提升最大肌力</li>
            <li className="flex gap-2"><span className="text-red-400">⚠️</span>建議有一定訓練基礎後再採用</li>
          </ul>
        </div>
      </div>

      {/* Comparison table */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-orange-400 mb-4">三種訓練快速對比</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 pr-4 text-gray-400 font-medium">訓練類型</th>
                <th className="text-center py-2 px-4 text-gray-400 font-medium">每組次數</th>
                <th className="text-left py-2 pl-4 text-gray-400 font-medium">特點</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              <tr>
                <td className="py-3 pr-4 text-green-400 font-medium">🟢 肌耐力</td>
                <td className="py-3 px-4 text-center text-white">10–15</td>
                <td className="py-3 pl-4 text-gray-300">自體重量或輕重量，適合初學者</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-orange-400 font-medium">🟠 肌肥大</td>
                <td className="py-3 px-4 text-center text-white">6–12</td>
                <td className="py-3 pl-4 text-gray-300">較重重量，需要疲勞感</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-red-400 font-medium">🔴 肌力</td>
                <td className="py-3 px-4 text-center text-white">1–6</td>
                <td className="py-3 pl-4 text-gray-300">極重重量，少次數高強度</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Key insights */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-orange-400 mb-4">做肌力訓練，也會提升肌耐力？</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          根據 ACSM（美國運動醫學學院）指南，這三種訓練類型其實是一個「連續光譜」，
          並非完全分開的類別。做肌力訓練也會附帶提升肌耐力，反之亦然。
        </p>
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
          <p className="text-orange-300 text-sm font-medium mb-1">💡 居家訓練該怎麼選？</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            沒有器材的居家訓練，通常落在「肌耐力」或「肌肥大」的次數範圍。
            建議初學者從 10–15 下開始建立習慣，再逐步增加強度朝 6–12 下邁進。
            三種訓練類型都值得嘗試！
          </p>
        </div>
      </div>

    </div>
  )
}
