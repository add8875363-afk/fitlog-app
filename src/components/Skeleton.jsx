// 通用骨架屏元件：載入資料時顯示的灰色佔位動畫
// 用法：<Skeleton className="h-6 w-40 rounded-lg" />

export function Skeleton({ className = '' }) {
  return (
    <div className={`bg-gray-800 animate-pulse rounded-lg ${className}`} />
  )
}

// 訓練紀錄列表的骨架（顯示 3 張卡片）
export function WorkoutLogSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <div className="flex gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-4/5" />
          </div>
          <div className="mt-3 pt-3 border-t border-gray-800 flex gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      ))}
    </div>
  )
}

// PR 列表的骨架（顯示 6 張卡片）
export function PRsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-gray-900 rounded-xl border border-gray-800">
          <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="text-right space-y-1">
            <Skeleton className="h-7 w-20 ml-auto" />
            <Skeleton className="h-3 w-24 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}

// 訓練日曆骨架
export function CalendarSkeleton() {
  return (
    <div className="max-w-lg mx-auto">
      {/* Streak banner */}
      <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3 mb-6">
        <span className="text-2xl">🔥</span>
        <div className="space-y-1.5">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      {/* Calendar card */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-2 gap-1">
          {[1,2,3,4,5,6,7].map((i) => (
            <Skeleton key={i} className="h-4 rounded mx-auto w-4" />
          ))}
        </div>
        {/* Day cells — 5 rows × 7 cols */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-lg" />
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-3 px-1">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  )
}

// 統計頁骨架
export function StatsSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex flex-col items-center gap-2">
            <Skeleton className="w-6 h-6 rounded" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 mb-6">
        <Skeleton className="h-5 w-24 mb-4" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        <Skeleton className="h-5 w-32 mb-4" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  )
}
