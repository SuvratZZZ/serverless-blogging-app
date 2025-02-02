import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port: 8000,
    proxy: {
      // Ensure the path starts with a forward slash
      '/api': {
        target: 'https://backend.singhsubrat35.workers.dev/', // Backend URL
        changeOrigin: true, // Handle cross-origin requests
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: remove '/api' prefix if not needed
        
      },
  },
},
  plugins: [react()],
})
