# Firebase 設定指引

## 為什麼要做這個？
原本的登入是把密碼（加密過但不安全）存在瀏覽器 localStorage，任何人打開瀏覽器開發者工具都能看到 / 繞過。Firebase Auth 會幫你：
- 安全儲存密碼（在 Google 伺服器）
- 自動記住登入狀態（重新整理不會登出）
- 支援忘記密碼、email 驗證等進階功能
- 未來要多裝置同步紀錄更容易

---

## 步驟 1：建立 Firebase 專案

1. 前往 https://console.firebase.google.com/
2. 用你的 Google 帳號登入
3. 點 **「新增專案」**
4. 專案名稱輸入 `fitlog`（或任何你喜歡的）
5. 關閉 Google Analytics（健身網站不需要）→ 建立專案

## 步驟 2：啟用 Email/Password 登入

1. 在左側選單點 **「建構 → Authentication」**
2. 點 **「開始使用」**
3. 選 **「電子郵件/密碼」**供應商
4. 把第一個開關打開（「電子郵件/密碼」）→ 儲存
   - 第二個「電子郵件連結」可以不用開

## 步驟 2b：啟用 Google 一鍵登入（建議開啟）

> 讓用戶不用填帳號密碼，直接用 Google 帳號登入。

1. 在 Authentication → 「Sign-in method」頁面
2. 找到 **「Google」** 供應商，點進去
3. 把右上角開關切換為 **「啟用」**
4. 「專案公開名稱」填 `FitLog`（用戶看到授權視窗時會顯示這個名稱）
5. 「專案支援電子郵件」選你的 Gmail
6. 點 **「儲存」**

完成後，登入頁的「使用 Google 繼續」按鈕就可以正常使用了。

---

## 步驟 3：註冊 Web 應用程式

1. 回到專案首頁（點左上齒輪旁的 FitLog）
2. 在「開始使用，只要新增您的第一個應用程式」下面，點 **`</>`**（Web 圖示）
3. 應用程式暱稱輸入 `FitLog Web`
4. **不要**勾選「Firebase 主機」→ 點註冊應用程式
5. 你會看到一段設定值，長這樣：

```js
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "fitlog-xxxxx.firebaseapp.com",
  projectId: "fitlog-xxxxx",
  storageBucket: "fitlog-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

**把這個視窗保持開著**，下一步要用。

## 步驟 4：建立 .env 檔

1. 在專案根目錄（跟 `package.json` 同一層）建立一個新檔案，叫 `.env`
2. 複製下面這段內容貼進去：

```
VITE_FIREBASE_API_KEY=貼上你的apiKey值
VITE_FIREBASE_AUTH_DOMAIN=貼上你的authDomain值
VITE_FIREBASE_PROJECT_ID=貼上你的projectId值
VITE_FIREBASE_STORAGE_BUCKET=貼上你的storageBucket值
VITE_FIREBASE_MESSAGING_SENDER_ID=貼上你的messagingSenderId值
VITE_FIREBASE_APP_ID=貼上你的appId值
```

3. 把步驟 3 裡的每個值填進去（不要加雙引號，直接貼值就好）

範例（假值，你要用自己的）：
```
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=fitlog-xxxxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=fitlog-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=fitlog-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

## 步驟 5：重啟開發伺服器

**重要**：Vite 只會在啟動時讀 `.env`，所以一定要重啟！

```bash
# 停掉現有的 npm run dev（Ctrl+C）
# 然後再開一次
npm run dev
```

## 步驟 6：測試

1. 打開網站 → 點「登入」右邊的註冊
2. 隨便輸入一個 email 跟至少 6 字元的密碼
3. 註冊成功會跳回首頁，右上角會顯示「嗨,你的名字」
4. 登出後再登入，應該會成功
5. 打開 Firebase Console → Authentication → 使用者，會看到你剛註冊的帳號

---

## 常見問題

### Q: 註冊時跳「發生錯誤，請再試一次」
- 檢查 Firebase Console → Authentication → 「電子郵件/密碼」是否已啟用
- 檢查 `.env` 的值是否正確（沒有多餘空格或引號）
- 檢查是否重啟過 `npm run dev`

### Q: .env 值要用引號嗎？
不用，直接 `KEY=VALUE` 就好。

### Q: 會不會被偷 API Key？
Firebase 的 apiKey **本來就是公開**的，它只是識別你的專案，不是密碼。真正的安全來自 Firebase Security Rules（之後串 Firestore 儲存訓練資料時會設定）。

### Q: 舊的 localStorage 帳號怎麼辦？
舊的 `fitlog-users`、`fitlog-user` 已經用不到了，新的登入系統不會讀這些。你可以手動清掉：打開 F12 → Application → Local Storage → 刪除那兩個 key。或直接無視它們，反正不影響。

---

---

## 步驟 7：啟用 Firestore 資料庫

> 訓練紀錄、課表、PR 現在都存在 Firestore，需要先啟用才能用。

1. 在 Firebase Console 左側選單點 **「建構 → Firestore Database」**
2. 點 **「建立資料庫」**
3. 選 **「以正式環境模式開始」**（之後我們會設定安全規則）
4. 選一個靠近台灣的地區：`asia-east1`（台灣）或 `asia-southeast1`（新加坡）→ 完成

### 設定 Security Rules（重要！）

Security Rules 控制「誰可以讀寫哪些資料」，必須設定，否則資料庫是空的或完全開放的。

1. 在 Firestore Database 頁面，點頂部的 **「規則」** 分頁
2. 把裡面的內容全部換成下面這段：

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 每個用戶只能讀寫自己的資料
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

3. 點 **「發布」**

這段規則的意思：登入的用戶（`request.auth != null`）只能存取屬於自己 uid 的資料（`request.auth.uid == uid`），別人的資料完全看不到也改不了。

### 測試 Firestore 是否正常

1. 登入網站後，進入「課表」頁面，建立一個自訂課表
2. 回到 Firebase Console → Firestore Database → 資料
3. 你應該會看到：`users → {你的uid} → plans → {課表id}`
4. 開始一次訓練並完成，回到「紀錄」頁，確認資料出現
5. 換一台電腦或手機，用同一個帳號登入 → 看到同樣的資料 ✅

---

## 常見問題

### Q: 進入「紀錄」頁但看不到資料，之前 localStorage 的怎麼辦？
舊資料存在瀏覽器本地，無法自動遷移到 Firestore。可以手動重新輸入，或接受重新開始。打開 F12 → Application → Local Storage → 清掉 `fitlog-logs`、`fitlog-prs`、`fitlog-plans`。

### Q: 課表操作後沒反應（建立/刪除沒更新）
- 確認 Firestore Security Rules 已設定並「發布」
- 確認你是登入狀態（右上角有顯示名字）
- 打開 F12 → Console，看有沒有紅色錯誤訊息

### Q: 錯誤訊息是 `permission-denied`
Security Rules 沒設定正確，重新照上面的步驟設定並發布。

### Q: 註冊時跳「發生錯誤，請再試一次」
- 檢查 Firebase Console → Authentication → 「電子郵件/密碼」是否已啟用
- 檢查 `.env` 的值是否正確（沒有多餘空格或引號）
- 檢查是否重啟過 `npm run dev`

### Q: .env 值要用引號嗎？
不用，直接 `KEY=VALUE` 就好。

### Q: 會不會被偷 API Key？
Firebase 的 apiKey **本來就是公開**的，它只是識別你的專案，不是密碼。真正的安全來自 Firestore Security Rules（已設定）。

### Q: 舊的 localStorage 帳號怎麼辦？
舊的 `fitlog-users`、`fitlog-user` 已經用不到了。打開 F12 → Application → Local Storage → 刪除那些 key。

---

## 現在完成了

✅ **安全的登入/註冊**（Firebase Auth 電子郵件/密碼）
✅ **Google 一鍵登入**（signInWithPopup）
✅ **忘記密碼**（sendPasswordResetEmail）
✅ **多裝置同步**（Firestore 資料庫）
✅ **資料安全隔離**（每個用戶只看得到自己的資料）
✅ **Error Boundary**（避免崩潰白屏）
✅ **Skeleton 骨架屏**（載入時的佔位動畫）
