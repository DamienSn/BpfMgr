import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

const options = {
  mode: process.env.VITE_PWA_MODE,
  base: '/',
  includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png'],
  strategies: 'injectManifest',
  manifest: {
    name: 'BpfMgr',
    short_name: 'Gestionnaire de BPF et BCN',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'logo192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'logo512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'logo512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      }
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(options)]
})
