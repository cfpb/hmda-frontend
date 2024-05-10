import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import istanbul from 'vite-plugin-istanbul'
import dns from 'dns'

dotenv.config()
dns.setDefaultResultOrder('verbatim')

export default () => {
  return defineConfig({
    plugins: [
      react(),
      svgr(),
      nodePolyfills(),
      istanbul({
        cypress: true,
        requireEnv: true,
        exclude: ['node_modules', 'cypress', 'dist'],
        forceBuildInstrument: true,
      }),
    ],
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
        },
        '/v2/public/institutions': {
          // Verifies user domain and associated institutions endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
        },
        '/hmda-auth/users': {
          // Update LEIs associated with users account (Profile Page)
          target: process.env.DEV_URL,
          changeOrigin: true,
        },
        '/v2/reporting': {
          // Modified LAR endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
        },
        '/v2/filing': {
          // Fetch all filings
          target: process.env.DEV_URL,
          changeOrigin: true,
        },
        '/v2/admin/institutions': {
          // HMDA Help endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
        },
        '/v2/admin/receipt/': {
          // HMDA Help Submissions file download endpoint
          target: process.env.DEV_URL,
          changeOrigin: true,
        },
        '/v2/data-browser-api': {
          // Data Browser API
          target: process.env.DEV_URL,
          changeOrigin: true,
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
