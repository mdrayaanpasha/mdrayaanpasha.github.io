import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This is a user site (mdrayaanpasha.github.io), served from the domain root,
// so the base path is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
