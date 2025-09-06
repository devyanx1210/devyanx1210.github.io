// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // correct for root GitHub Pages deployment
  plugins: [react()],
})
