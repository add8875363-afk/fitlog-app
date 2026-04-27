// 力量標準對照表
// 數值為「1RM ÷ 體重」的比例(例:bench 男性 1.25 = 體重的 1.25 倍)
// 5 個閾值對應 6 個等級:起步 / 未訓練 / 新手 / 中階 / 進階 / 菁英
// 資料參考 Strength Level (strengthlevel.com) 公開常模

export const LEVELS = [
  { id: 'beginner',     name: '起步',   color: 'text-gray-400',    bg: 'bg-gray-500/10',    border: 'border-gray-500/30',    fill: 'bg-gray-500' },
  { id: 'untrained',    name: '未訓練', color: 'text-stone-300',   bg: 'bg-stone-500/10',   border: 'border-stone-500/30',   fill: 'bg-stone-500' },
  { id: 'novice',       name: '新手',   color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', fill: 'bg-emerald-500' },
  { id: 'intermediate', name: '中階',   color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/30',     fill: 'bg-sky-500' },
  { id: 'advanced',     name: '進階',   color: 'text-purple-400',  bg: 'bg-purple-500/10',  border: 'border-purple-500/30',  fill: 'bg-purple-500' },
  { id: 'elite',        name: '菁英',   color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/30',   fill: 'bg-amber-500' },
]

// 男性 1RM/體重 閾值 [未訓練, 新手, 中階, 進階, 菁英]
const MALE = {
  bench:        [0.5,  0.75, 1.25, 1.75, 2.25], // 槓鈴臥推
  squat:        [0.75, 1.25, 1.75, 2.5,  3.25], // 槓鈴深蹲
  deadlift:     [1.0,  1.5,  2.25, 3.0,  3.75], // 硬舉
  ohp:          [0.35, 0.55, 0.85, 1.2,  1.6 ], // 過頭推舉
  row:          [0.5,  0.75, 1.25, 1.75, 2.25], // 槓鈴划船
  front_squat:  [0.5,  0.85, 1.35, 1.95, 2.6 ], // 前蹲舉
  trap_dl:      [1.0,  1.5,  2.25, 3.0,  3.75], // 六角槓硬舉
  curl:         [0.3,  0.45, 0.7,  0.95, 1.25], // 槓鈴彎舉
  rdl:          [0.75, 1.25, 1.75, 2.5,  3.0 ], // 羅馬尼亞硬舉
}

// 女性 1RM/體重 閾值
const FEMALE = {
  bench:        [0.25, 0.5,  0.75, 1.25, 1.75],
  squat:        [0.5,  0.75, 1.25, 1.75, 2.25],
  deadlift:     [0.5,  1.0,  1.5,  2.25, 2.75],
  ohp:          [0.2,  0.35, 0.55, 0.85, 1.2 ],
  row:          [0.25, 0.5,  0.75, 1.25, 1.75],
  front_squat:  [0.35, 0.6,  0.95, 1.45, 1.85],
  trap_dl:      [0.5,  1.0,  1.5,  2.25, 2.75],
  curl:         [0.2,  0.3,  0.45, 0.7,  0.95],
  rdl:          [0.5,  0.85, 1.25, 1.75, 2.25],
}

export const STANDARDS = { male: MALE, female: FEMALE }

// 動作 ID 對應到力量標準的 key(只列有公開常模的動作)
export const EXERCISE_TO_STANDARD = {
  1:  'bench',       // 槓鈴臥推
  7:  'row',         // 槓鈴划船
  14: 'curl',        // 槓鈴彎舉
  18: 'squat',       // 槓鈴深蹲
  21: 'rdl',         // 羅馬尼亞硬舉
  28: 'deadlift',    // 槓鈴硬舉
  29: 'ohp',         // 過頭推舉
  31: 'front_squat', // 前蹲舉
  36: 'trap_dl',     // 六角槓硬舉
}
