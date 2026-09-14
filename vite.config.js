import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// This is a user site (mdrayaanpasha.github.io), served from the domain root,
// so the base path is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
      // The shadcn CLI emits `import { cn } from "cn"` in JavaScript (non-TS)
      // mode, so we map the bare `cn` specifier to our utils helper. This lets
      // `npx shadcn add <component>` output work without hand-editing imports.
      cn: path.resolve(dirname, './src/lib/utils.js'),
    },
  },
})
