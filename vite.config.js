import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    build: {
      outDir: 'docs',
    },
  }

  if (command === 'build') {
    config.base = '/business-model-canvas'
  }

  return config
})