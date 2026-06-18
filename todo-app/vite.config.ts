import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Projekt-To-Do-List/',
  server: {
    port: 3000,
    host: true,
    hmr: {
      host: '192.168.0.129'
    }
  },
})