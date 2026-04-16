# CLAUDE.md

給未來 Claude Code 看的專案指南。本檔案描述 FitLog 健身網站的技術棧、目錄結構與開發慣例。

## 專案概述

**FitLog** — JEFIT 風格的健身追蹤網站,提供動作資料庫、課表規劃、訓練紀錄、PR 追蹤、統計圖表、休息計時器等功能。使用者為**程式新手**,所有解釋與程式碼註解請保持淺顯易懂。

## 技術棧

- **React 19** + **Vite 8** (含 HMR)
- **Tailwind CSS v4** (`@tailwindcss/vite`,**不需要** `tailwind.config.js`)
- **React Router v7** (BrowserRouter)
- **Firebase 12** (Auth + Firestore)
- **Recharts** (統計圖表)
- **lucide-react** (icon)
- **vite-plugin-pwa** (Service Worker + Web App Manifest,可加入主畫面)

## 開發指令

```bash
npm run dev      # 啟動開發伺服器 (預設 port 5173)
npm run build    # 生產環境打包
npm run lint     # ESLint 檢查
npm run preview  # 預覽 build 後的版本
```

## 環境變數

複製 `.env.example` 為 `.env`,填入 Firebase 設定。詳細步驟見 [FIREBASE_SETUP.md](FIREBASE_SETUP.md)。

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

`.env`、`.env.local` 都已被 `.gitignore` 排除,**絕對不可** commit。

## 目錄結構

```
src/
├── App.jsx              # 路由總表 + Provider 包裝
├── main.jsx             # React 進入點
├── firebase.js          # Firebase 初始化(未設定時優雅降級)
├── index.css            # 全域樣式 + Tailwind import
├── context/
│   ├── AuthContext.jsx     # 登入狀態(Email/Google)、錯誤碼中文化
│   ├── WorkoutContext.jsx  # 訓練紀錄、課表、PR(從 Firestore 即時同步)
│   └── ToastContext.jsx    # 全站 Toast 通知
├── components/
│   ├── Navbar.jsx              # 桌面版頂部導覽
│   ├── BottomNav.jsx           # 手機版底部導覽
│   ├── RequireAuth.jsx         # 需登入路由的守衛
│   ├── ErrorBoundary.jsx       # 全站錯誤捕捉
│   ├── FirebaseSetupBanner.jsx # 未設定 Firebase 時的提示橫幅
│   ├── ConfirmModal.jsx        # 通用確認彈窗
│   └── Skeleton.jsx            # 載入骨架(WorkoutLog/PRs/Calendar/Stats)
├── pages/
│   ├── Home.jsx, Knowledge.jsx, Calculator.jsx, Timer.jsx
│   ├── Exercises.jsx, ExerciseDetail.jsx
│   ├── Plans.jsx, StartWorkout.jsx
│   ├── WorkoutLog.jsx, Stats.jsx, PRs.jsx, Calendar.jsx
│   └── Login.jsx, Register.jsx, ForgotPassword.jsx
├── hooks/
│   └── useExerciseGif.js   # 從 wger.de 抓動作示範圖
└── data/
    └── exercises.js        # 內建 44 個訓練動作 + 肌群分類
```

## 路由分類

| 公開頁(免登入)                                                                                     | 需登入頁                                                       |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `/` `/exercises` `/exercises/:id` `/plans` `/timer` `/calculator` `/knowledge` `/login` `/register` `/forgot-password` | `/log` `/start/:planId` `/stats` `/prs` `/calendar` |

需登入頁全部用 `<RequireAuth>` 包覆。

## Firestore 資料結構

```
users/{uid}/logs/{logId}    # 訓練紀錄(date, entries[])
users/{uid}/plans/{planId}  # 自訂課表
users/{uid}/prs/{exerciseId} # 個人最佳紀錄
```

刪除 log 時會用 [WorkoutContext.jsx](src/context/WorkoutContext.jsx) 的 `computePRsFromLogs` 重新計算 PR。

## 重要慣例

- **Firebase 未設定**:`firebase.js` 匯出 `isFirebaseConfigured`,所有需要 Firebase 的功能都應檢查此值並優雅降級(顯示 banner、disable 按鈕、顯示提示),**不可讓 app 崩潰**。
- **錯誤訊息**:Firebase 錯誤碼必須用 [`getAuthErrorMessage`](src/context/AuthContext.jsx) 翻成中文再顯示給使用者。
- **空狀態**:列表頁面(訓練紀錄、PR、統計、日曆)資料為空時,要顯示友善的空狀態訊息,**不要**只是空白畫面。
- **Loading**:資料載入中要用 `Skeleton.jsx` 中對應的骨架元件,**避免**只顯示 spinner 或空白。
- **響應式**:採 Mobile-first。手機用 `<BottomNav>`,桌面用 `<Navbar>`,以 Tailwind `md:` 斷點切換。
- **顏色**:主色橘 `#f97316` (orange-500),背景 `bg-gray-950`,卡片 `bg-gray-900` + `border-gray-800`。

## PWA

- 可「加入主畫面」當作原生 App 使用
- Service Worker 自動更新 (`registerType: 'autoUpdate'`)
- Manifest 設定見 [vite.config.js](vite.config.js)
