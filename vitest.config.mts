import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.js',
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*config.ts', '**/*schema.ts', '**/*types.ts '],
      thresholds: {
        //   lines: 70,
        //   functions: 70,
        //   branches: 70,
        //   statements: 70,
      },
    },
  },
})
