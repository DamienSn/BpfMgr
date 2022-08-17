import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

const options = {
  mode: process.env.VITE_PWA_MODE,
  base: '/',
  includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png'],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(options)]
})
