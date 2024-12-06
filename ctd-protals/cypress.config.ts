import { defineConfig } from 'cypress'
import { config } from 'dotenv'
config({ path: './.env.development' })

export default defineConfig({
  projectId: 'a8ovo9',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:9001',
    env: {
      serverType: process.env.VITE_BACK_TYPE,
      serverUrl:
        process.env.VITE_BACK_TYPE === 'java'
          ? process.env.VITE_JAVA_SERVER_URL
          : process.env.VITE_NEST_SERVER_URL,
    },
  },
})
