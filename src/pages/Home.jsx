import { Link } from 'react-router-dom'
import { Dumbbell, BookOpen, ClipboardList, Timer, BarChart3, UserPlus, Code2, Heart, Mail, ExternalLink } from 'lucide-react'

const features = [
  { icon: BookOpen, title: '動作資料庫', desc: '44 種訓練動作，含複合動作與伸展恢復', to: '/exercises', color: 'bg-blue-500/20 text-blue-400' },
  { icon: ClipboardList, title: '訓練課表', desc: '預設與自訂課表，規劃你的訓練', to: '/plans', color: 'bg-green-500/20 text-green-400' },
  { icon: Dumbbell, title: '訓練紀錄', desc: '記錄每次訓練的重量與組數', to: '/log', color: 'bg-purple-500/20 text-purple-400' },
  { icon: Timer, title: '休息計時器', desc: '精準控制組間休息時間', to: '/timer', color: 'bg-yellow-500/20 text-yellow-400' },
  { icon: BarChart3, title: '進步統計', desc: '視覺化圖表追蹤你的成長', to: '/stats', color: 'bg-red-500/20 text-red-400' },
  { icon: UserPlus, title: '個人帳號', desc: '註冊帳號，保存你的訓練數據', to: '/register', color: 'bg-cyan-500/20 text-cyan-400' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-500/20 mb-6">
          <Dumbbell size={40} className="text-orange-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          你的專屬<span className="text-orange-500">健身夥伴</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          FitLog 幫助你規劃訓練、記錄進步、追蹤成長。無論你是新手還是老手，這裡都是你的健身基地。
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/exercises"
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold no-underline hover:bg-orange-600 transition-colors"
          >
            開始探索
          </Link>
          <Link
            to="/plans"
            className="px-6 py-3 bg-gray-800 text-gray-200 rounded-xl font-semibold no-underline hover:bg-gray-700 transition-colors"
          >
            查看課表
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
        {features.map((f) => (
          <Link
            key={f.title}
            to={f.to}
            className="block p-6 bg-gray-900 rounded-2xl border border-gray-800 no-underline hover:border-gray-700 transition-colors group"
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.color} mb-4`}>
              <f.icon size={24} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-orange-400 transition-colors">
              {f.title}
            </h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </Link>
        ))}
      </section>

      {/* About 創作者自介 — TODO: 替換成你自己的內容 */}
      <section className="pb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm mb-3">
            <Heart size={14} />
            <span>關於創作者</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">嗨,我是阿楫</h2>
          <p className="text-gray-400">這個網站背後的人</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 故事 */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 mb-4">
              <Heart size={24} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">為什麼做這個網站</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {/* TODO: 替換成你的創作動機 */}
              身為健身愛好者,我想要一個簡單好用、不會有煩人廣告的訓練紀錄工具。
              市面上的 App 不是太複雜就是要付費,所以我決定自己動手做一個。
            </p>
          </div>

          {/* 技能 */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 mb-4">
              <Code2 size={24} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">技術背景</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              {/* TODO: 替換成你的技術背景 */}
              程式新手,正在學習網頁開發。這個專案是我練習的成果。
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Vite', 'Tailwind', 'Firebase'].map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-md bg-gray-800 text-gray-300 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 聯絡 */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/20 text-green-400 mb-4">
              <Mail size={24} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">聯絡我</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {/* TODO: 替換成你的聯絡方式說明 */}
              有任何建議或想法,歡迎透過以下方式聯絡我。
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:add8875363@example.com" /* TODO: 替換成你的 Email */
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-orange-400 no-underline transition-colors"
              >
                <Mail size={16} />
                <span>add8875363@example.com</span>
              </a>
              <a
                href="https://www.instagram.com/jiji.F1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-orange-400 no-underline transition-colors"
              >
                <ExternalLink size={16} />
                <span>instagram.com/jiji.F1</span>
              </a>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
         專為 <Heart size={12} className="inline text-orange-500" /> 重訓愛好者打造
        </p>
      </section>
    </div>
  )
}
