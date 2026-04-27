// 力量等級計算
// 1. 用 Epley 公式把「實際重量 × 次數」換算成預估 1RM
// 2. 用 1RM ÷ 體重得到「相對力量」
// 3. 跟力量標準對照表比對,得出等級
import { LEVELS, STANDARDS, EXERCISE_TO_STANDARD } from '../data/strengthStandards'

// Epley 公式:1RM ≈ weight × (1 + reps/30)
// 例:80kg × 5 次 ≈ 80 × (1 + 5/30) = 93.3kg 的 1RM
export function estimateOneRepMax(weight, reps) {
  if (!weight || !reps || reps < 1) return 0
  if (reps === 1) return weight
  return weight * (1 + reps / 30)
}

// 從實際 PR 算出力量等級
// pr: { weight, reps }
// profile: { bodyweight, sex: 'male' | 'female' }
// 回傳:{ level, oneRm, ratio, nextThreshold } 或 null(若沒對照表)
export function calculateLevel(exerciseId, pr, profile) {
  const standardKey = EXERCISE_TO_STANDARD[exerciseId]
  if (!standardKey || !profile?.bodyweight || !profile?.sex) return null

  const thresholds = STANDARDS[profile.sex]?.[standardKey]
  if (!thresholds) return null

  const oneRm = estimateOneRepMax(pr.weight, pr.reps)
  const ratio = oneRm / profile.bodyweight

  // 找出落在哪一段(thresholds 是 5 個閾值,對應 6 個等級)
  // ratio < thresholds[0] → LEVELS[0] (起步)
  // ratio >= thresholds[4] → LEVELS[5] (菁英)
  let levelIndex = 0
  for (let i = 0; i < thresholds.length; i++) {
    if (ratio >= thresholds[i]) levelIndex = i + 1
  }

  const level = LEVELS[levelIndex]
  // 當前等級的下界(起步時為 0)
  const currentRatio = levelIndex === 0 ? 0 : thresholds[levelIndex - 1]
  // 下個等級的進入點(已是菁英時為 null)
  const nextRatio = levelIndex < thresholds.length ? thresholds[levelIndex] : null

  const currentThreshold = { ratio: currentRatio, weight: currentRatio * profile.bodyweight }
  const nextThreshold = nextRatio !== null
    ? { ratio: nextRatio, weight: nextRatio * profile.bodyweight, level: LEVELS[levelIndex + 1] }
    : null

  // 在當前等級內的進度(0~1),菁英時為 1
  const progress = nextRatio !== null
    ? Math.min(1, Math.max(0, (ratio - currentRatio) / (nextRatio - currentRatio)))
    : 1

  return { level, oneRm, ratio, currentThreshold, nextThreshold, progress }
}
