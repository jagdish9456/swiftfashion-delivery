import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { componentTagger } from "lovable-tagger"

export default defineConfig(({ mode }) => ({
  root: path.resolve(__dirname, 'web-application'),
  publicDir: path.resolve(__dirname, 'web-application/public'),
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: path.resolve(__dirname, 'web-application/dist'),
    emptyOutDir: true,
  },
  server: {
    host: "::",
    port: 8080,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "web-application/src"),
    },
  },
}));