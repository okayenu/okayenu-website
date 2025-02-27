import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './scripts',
  timeout: 60000,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'off',
  },
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 30000,
    reuseExistingServer: true,
  },
})
