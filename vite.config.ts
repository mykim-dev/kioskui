import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  /**
   * GitHub Pages(project pages) needs a non-root base: "/<repo>/"
   * - In CI we set BASE_PATH="/${repoName}/"
   * - In local dev we keep "/" so you can open http://localhost:5173/
   */
  base: mode === 'production' ? (process.env.BASE_PATH ?? '/') : '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}))
