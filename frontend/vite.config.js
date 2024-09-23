import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 3000,  // Use dynamic port provided by Render or default to 3000
    host: '0.0.0.0',  // Bind to all interfaces for external access
  }
})