import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/help': {
        target: 'https://chatbase.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/help/, '/OBi1rNp7vL0reEIicNKzw/help')
      },
      '/__cb': {
        target: 'https://chatbase.co',
        changeOrigin: true,
        secure: false,
      },
      '/api/chat/OBi1rNp7vL0reEIicNKzw': {
        target: 'https://chatbase.co',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
