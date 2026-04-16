// WorkoutContext：管理訓練紀錄、課表、PR
// 資料來源：Firestore（登入時）
// 資料結構：users/{uid}/logs、users/{uid}/plans、users/{uid}/prs
import { createContext, useContext, useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db, isFirebaseConfigured } from '../firebase'
import { useAuth } from './AuthContext'

const WorkoutContext = createContext()

// 從 logs 重新計算所有 PR（刪除 log 時用）
function computePRsFromLogs(logs) {
  const prs = {}
  ;[...logs].reverse().forEach((log) => {
    ;(log.entries || []).forEach((entry) => {
      const key = String(entry.exerciseId)
      if (!prs[key] || entry.weight > prs[key].weight) {
        prs[key] = { weight: entry.weight, reps: entry.reps, date: log.date }
      }
    })
  })
  return prs
}

export function WorkoutProvider({ children }) {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [workoutLogs, setWorkoutLogs] = useState([])
  const [customPlans, setCustomPlans] = useState([])
  const [prs, setPrs] = useState({})
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    // 未登入或 Firebase 未設定時，清空資料
    if (!user || !isFirebaseConfigured) {
      setWorkoutLogs([])
      setCustomPlans([])
      setPrs({})
      setDataLoading(false)
      return
    }

    setDataLoading(true)
    let loadedCount = 0
    const markLoaded = () => { loadedCount++; if (loadedCount >= 3) setDataLoading(false) }

    // 即時監聽訓練紀錄（按日期新→舊排序）
    const logsQ = query(
      collection(db, 'users', user.uid, 'logs'),
      orderBy('date', 'desc')
    )
    const unsubLogs = onSnapshot(logsQ, (snap) => {
      setWorkoutLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      markLoaded()
    })

    // 即時監聽自訂課表
    const unsubPlans = onSnapshot(
      collection(db, 'users', user.uid, 'plans'),
      (snap) => {
        setCustomPlans(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
        markLoaded()
      }
    )

    // 即時監聽 PR
    const unsubPrs = onSnapshot(
      collection(db, 'users', user.uid, 'prs'),
      (snap) => {
        const obj = {}
        snap.docs.forEach((d) => { obj[d.id] = d.data() })
        setPrs(obj)
        markLoaded()
      }
    )

    return () => { unsubLogs(); unsubPlans(); unsubPrs() }
  }, [user])

  // 未登入保護：跳轉到登入頁
  const requireLogin = () => {
    if (!user) { navigate('/login'); return false }
    return true
  }

  // ─── 訓練紀錄操作 ────────────────────────────────────
  const addLog = async (log) => {
    if (!requireLogin()) return
    const { id: _id, ...logData } = log
    // 寫入訓練紀錄
    await addDoc(collection(db, 'users', user.uid, 'logs'), logData)
    // 比對並更新 PR
    const prsRef = collection(db, 'users', user.uid, 'prs')
    await Promise.all(
      log.entries.map(async (entry) => {
        const key = String(entry.exerciseId)
        const current = prs[key]
        if (!current || entry.weight > current.weight) {
          await setDoc(doc(prsRef, key), {
            weight: entry.weight,
            reps: entry.reps,
            date: log.date,
          })
        }
      })
    )
  }

  const deleteLog = async (logId) => {
    if (!requireLogin()) return
    await deleteDoc(doc(db, 'users', user.uid, 'logs', logId))
    // 刪除後，用剩餘的 logs 重新計算所有 PR
    const remaining = workoutLogs.filter((l) => l.id !== logId)
    const newPrs = computePRsFromLogs(remaining)
    const prsRef = collection(db, 'users', user.uid, 'prs')
    // 先清掉現有 PR，再重寫
    const existingPrDocs = await getDocs(prsRef)
    await Promise.all(existingPrDocs.docs.map((d) => deleteDoc(d.ref)))
    await Promise.all(
      Object.entries(newPrs).map(([key, pr]) =>
        setDoc(doc(prsRef, key), pr)
      )
    )
  }

  // ─── 課表操作 ─────────────────────────────────────────
  const addPlan = async (plan) => {
    if (!requireLogin()) return
    const { id: _id, ...planData } = plan
    await addDoc(collection(db, 'users', user.uid, 'plans'), planData)
  }

  const deletePlan = async (planId) => {
    if (!requireLogin()) return
    await deleteDoc(doc(db, 'users', user.uid, 'plans', planId))
  }

  return (
    <WorkoutContext.Provider
      value={{
        state: { workoutLogs, customPlans, prs, dataLoading },
        addLog,
        deleteLog,
        addPlan,
        deletePlan,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  )
}

export function useWorkout() {
  const context = useContext(WorkoutContext)
  if (!context) throw new Error('useWorkout must be used within WorkoutProvider')
  return context
}
