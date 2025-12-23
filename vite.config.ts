import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/retirement-savings-simulator/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
})




