import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://e-store-m5zq.onrender.com
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      BACKEND_URL: "https://e-store-m5zq.onrender.com"
    }
  }
})
