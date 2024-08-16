import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'xdvj3n',
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5200'
  }
})
