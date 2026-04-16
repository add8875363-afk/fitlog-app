// 認證 Context：集中管理登入狀態
import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase'

const AuthContext = createContext()

// Firebase 未設定時專用的錯誤
const notConfiguredError = () => {
  const err = new Error('Firebase 尚未設定,請參考 FIREBASE_SETUP.md')
  err.code = 'auth/not-configured'
  return err
}

const googleProvider = new GoogleAuthProvider()

// 從 Firebase user 物件提取我們需要的欄位
const formatUser = (firebaseUser) => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
  photoURL: firebaseUser.photoURL || null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? formatUser(firebaseUser) : null)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Email + 密碼登入
  const login = async (email, password) => {
    if (!isFirebaseConfigured) throw notConfiguredError()
    await signInWithEmailAndPassword(auth, email, password)
  }

  // Email + 密碼註冊
  const register = async (email, password, name) => {
    if (!isFirebaseConfigured) throw notConfiguredError()
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) {
      await updateProfile(cred.user, { displayName: name })
      setUser({ ...formatUser(cred.user), name })
    }
  }

  // Google 一鍵登入（Popup 視窗）
  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured) throw notConfiguredError()
    await signInWithPopup(auth, googleProvider)
    // onAuthStateChanged 會自動更新 user state
  }

  // 寄送密碼重設信
  const resetPassword = async (email) => {
    if (!isFirebaseConfigured) throw notConfiguredError()
    await sendPasswordResetEmail(auth, email)
  }

  const logout = () => {
    if (!isFirebaseConfigured) return Promise.resolve()
    return signOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginWithGoogle, resetPassword, logout, isFirebaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// Firebase 錯誤代碼翻成中文
export function getAuthErrorMessage(error) {
  const code = error?.code || ''
  const map = {
    'auth/not-configured':      'Firebase 尚未設定，請先建立 .env 檔（詳見 FIREBASE_SETUP.md）',
    'auth/invalid-email':        '電子信箱格式錯誤',
    'auth/user-disabled':        '此帳號已被停用',
    'auth/user-not-found':       '找不到此帳號',
    'auth/wrong-password':       '密碼錯誤',
    'auth/invalid-credential':   '帳號或密碼錯誤',
    'auth/email-already-in-use': '此信箱已被註冊',
    'auth/weak-password':        '密碼強度不足（至少 6 字元）',
    'auth/too-many-requests':    '嘗試次數過多，請稍後再試',
    'auth/network-request-failed': '網路連線失敗，請檢查網路',
    'auth/popup-closed-by-user': '登入視窗已關閉，請重試',
    'auth/cancelled-popup-request': '登入已取消',
    'auth/popup-blocked':        '瀏覽器封鎖了登入視窗，請允許彈出視窗後重試',
  }
  return map[code] || '發生錯誤，請再試一次'
}
