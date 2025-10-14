import react from '@vitejs/plugin-react'
import dns from 'dns'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import svgr from 'vite-plugin-svgr'

dotenv.config()

if (!process.env.MAPBOX_ACCESS_TOKEN) {
  throw new Error(
    `
 __   __  _______  __   __    _______  _______  ______    _______  _______  _______
|  | |  ||       ||  | |  |  |       ||       ||    _ |  |       ||       ||       |
|  |_|  ||   _   ||  | |  |  |    ___||   _   ||   | ||  |    ___||   _   ||_     _|
|       ||  | |  ||  |_|  |  |   |___ |  | |  ||   |_||_ |   | __ |  | |  |  |   |
|_     _||  |_|  ||       |  |    ___||  |_|  ||    __  ||   ||  ||  |_|  |  |   |
  |   |  |       ||       |  |   |    |       ||   |  | ||   |_| ||       |  |   |
  |___|  |_______||_______|  |___|    |_______||___|  |_||_______||_______|  |___|
 _______  _______  __   __  _______  _______  __   __  ___   __    _  _______
|       ||       ||  |_|  ||       ||       ||  | |  ||   | |  |  | ||       |
|  _____||   _   ||       ||    ___||_     _||  |_|  ||   | |   |_| ||    ___|
| |_____ |  | |  ||       ||   |___   |   |  |       ||   | |       ||   | __
|_____  ||  |_|  ||       ||    ___|  |   |  |       ||   | |  _    ||   ||  |
 _____| ||       || ||_|| ||   |___   |   |  |   _   ||   | | | |   ||   |_| |
|_______||_______||_|   |_||_______|  |___|  |__| |__||___| |_|  |__||_______|

👉 MAPBOX_ACCESS_TOKEN environment variable is not defined. Please set it in your .env file. 👈
`,
  )
}

dns.setDefaultResultOrder('verbatim')

export default () => {
  return defineConfig({
    plugins: [react(), svgr(), nodePolyfills()],
    define: {
      'import.meta.env.MAPBOX_ACCESS_TOKEN': JSON.stringify(
        process.env.MAPBOX_ACCESS_TOKEN,
      ),
    },
    css: {
      preprocessorOptions: {
        scss: {
          includePaths: ['./node_modules/@uswds/uswds/packages'],
        },
      },
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      port: '3000',
      proxy: {
        // Enter the endpoint that needs to be proxied, this is Vite's way of proxing
        '/quarterly-data/graphs': {
          // Quarterly graphs endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/v2/public/institutions': {
          // Verifies user domain and associated institutions endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/hmda-auth/users': {
          // Update LEIs associated with users account (Profile Page)
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/v2/reporting': {
          // Modified LAR endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/v2/filing': {
          // Fetch all filings
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/v2/admin/institutions': {
          // HMDA Help endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/v2/admin/receipt/': {
          // HMDA Help Submissions file download endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/v2/data-browser-api': {
          // Data Browser API
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
        '/v2/public/hmda/parse': {
          // File Format Verification Tool API
          target: process.env.DEV_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    },
  })
}
