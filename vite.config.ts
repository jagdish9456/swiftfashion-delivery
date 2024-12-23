import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

export default defineConfig({
  root: 'web-application',
  publicDir: 'web-application/public',
  plugins: [react()],
  build: {
    outDir: 'web-application/dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./web-application/src"),
    },
  },
})