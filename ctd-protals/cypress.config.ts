import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'a8ovo9',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:9001',
    env: {
      serverUrl: 'http://10.105.21.63:8080',
    },
  },
})
