import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const resolveSrc = (relativePath: string) => path.resolve(import.meta.dirname, relativePath)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolveSrc('./src'),
      '@core': resolveSrc('./src/core'),
      '@modules': resolveSrc('./src/modules'),
      '@shared': resolveSrc('./src/shared'),
      '@views': resolveSrc('./src/views'),
      '@store': resolveSrc('./src/store'),
      '@styles': resolveSrc('./src/styles'),
      '@assets': resolveSrc('./src/assets'),
      '@locales': resolveSrc('./src/locales')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@styles/tokens" as *;\n`
      }
    }
  }
})
