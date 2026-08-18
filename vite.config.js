// vite.config.js — Vite 8.2.x canonical configuration (vite8-architect skill)
// Oxc/Rolldown-based: no Babel, no esbuild, LightningCSS bundled.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()], // v6 uses Oxc — no Babel, no extra config

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssMinify: 'lightningcss' // Bundled with Vite 8, no install needed
    // NOTE: Rolldown (Vite 8) rejects Rollup's object-form manualChunks and
    // performs automatic vendor splitting — no manual chunk config needed.
  },

  server: {
    port: 3000,
    host: true,
    forwardConsole: true // NEW in Vite 8 — browser logs in terminal
  },

  // NOTE: Vite 8 transforms with Oxc by default (esbuild is gone).
  // Do NOT add `esbuild: false` (deprecated no-op) or any Babel config.
})
