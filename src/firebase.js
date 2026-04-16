// Firebase 初始化
// 匯出 auth（認證）和 db（Firestore 資料庫）給其他檔案使用
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// 沒設定 .env 時，讓 app 優雅降級而不是整個崩潰
export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey)

let app = null
let auth = null
let db = null

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig)
  auth = getAuth(app)
  db = getFirestore(app)
} else {
  // eslint-disable-next-line no-console
  console.warn(
    '⚠️ Firebase 尚未設定\n請在專案根目錄建立 .env 檔並填入 Firebase 設定\n詳見 FIREBASE_SETUP.md'
  )
}

export { auth, db }
export default app
