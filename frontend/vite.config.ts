import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://e-store-m5zq.onrender.com
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      BACKEND_URL: "http://localhost:5100"
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5100",
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
    port: 5173
  },
})
