import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/RECETAS/',
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/components/setupTests.js',
  }
})
