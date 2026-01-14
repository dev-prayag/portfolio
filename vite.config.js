import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: [
      'all',
      '.replit.dev',
      'ecd83201-215b-4725-8ce8-809eb76e0e8-1pnndwsrcjgy9.pike.replit.dev'
      ]
  }
})
