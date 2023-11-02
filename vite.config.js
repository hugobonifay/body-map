import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/body-map/',
  plugins: [
    react(), 
    eslint({ 
      failOnWarning: false, 
      failOnError: false 
    }),
    VitePWA({ 
      registerType: 'autoUpdate', // default is 'prompt'
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,pdf}']
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'React Body Map',
        short_name: 'React Body Map',
        description: 'Simple interactive body map made with React & Vite',
        theme_color: '#000',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
})
