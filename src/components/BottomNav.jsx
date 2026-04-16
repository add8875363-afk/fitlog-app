import { Link, useLocation } from 'react-router-dom'
import { Home, Dumbbell, LayoutList, ClipboardList, TrendingUp } from 'lucide-react'

/**
 * 行動裝置底部導覽列（md 以上隱藏）
 * 中間的「課表」按鈕特別放大突出，是主要行動入口
 */
const items = [
  { to: '/',          Icon: Home,          label: '首頁' },
  { to: '/exercises', Icon: Dumbbell,      label: '動作' },
  { to: '/plans',     Icon: LayoutList,    label: '課表', primary: true },
  { to: '/log',       Icon: ClipboardList, label: '紀錄' },
  { to: '/stats',     Icon: TrendingUp,    label: '統計' },
]

export default function BottomNav() {
  const { pathname } = useLocation()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50
        bg-gray-900/95 backdrop-blur-md border-t border-gray-800
        flex items-end justify-around px-1"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {items.map(({ to, Icon, label, primary }) => {
        // 判斷是否 active（首頁精確匹配，其他前綴匹配）
        const active = to === '/' ? pathname === '/' : pathname.startsWith(to)

        if (primary) {
          // 中間主按鈕：橙色圓形，向上突出
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center pb-2"
              style={{ marginTop: '-20px' }}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center
                  shadow-lg shadow-orange-500/40 transition-transform active:scale-95
                  ${active ? 'bg-orange-600' : 'bg-orange-500'}`}
              >
                <Icon size={26} className="text-white" strokeWidth={2} />
              </div>
              <span className={`text-[10px] mt-1 font-medium
                ${active ? 'text-orange-400' : 'text-gray-400'}`}
              >
                {label}
              </span>
            </Link>
          )
        }

        // 一般按鈕
        return (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-0.5 py-2.5 px-4 active:opacity-70 transition-opacity"
          >
            <Icon
              size={22}
              strokeWidth={active ? 2.5 : 1.75}
              className={`transition-colors ${active ? 'text-orange-400' : 'text-gray-500'}`}
            />
            <span className={`text-[10px] font-medium transition-colors
              ${active ? 'text-orange-400' : 'text-gray-500'}`}
            >
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
