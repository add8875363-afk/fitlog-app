// 使用者個人資料(體重、性別),用來計算力量等級
// 暫時用 localStorage,未來可遷移到 Firestore 與帳號綁定
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'fitlog_user_profile'

// profile shape: { bodyweight: number(kg), sex: 'male' | 'female' }
export function useUserProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed?.bodyweight || !parsed?.sex) return null
      return parsed
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [profile])

  return [profile, setProfile]
}
