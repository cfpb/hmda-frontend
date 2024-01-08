import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import dns from 'dns'

dotenv.config()

dns.setDefaultResultOrder('verbatim')

export default () => {
  return defineConfig({
    plugins: [react(), svgr(), nodePolyfills()],
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
