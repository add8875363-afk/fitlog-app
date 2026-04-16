import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // 強制預打包 react-is（recharts 的依賴）
  optimizeDeps: {
    include: ['react-is'],
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],

      // Web App Manifest：讓手機可以「加入主畫面」
      manifest: {
        name: 'FitLog — 你的健身夥伴',
        short_name: 'FitLog',
        description: '追蹤訓練、記錄進步、達成健身目標',
        theme_color: '#f97316',
        background_color: '#030712',
        display: 'standalone',       // 隱藏瀏覽器 UI，像原生 App
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },

      // Service Worker：快取靜態資源，讓應用更快
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],
})
