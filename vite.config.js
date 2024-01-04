import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import dns from "dns"

dns.setDefaultResultOrder("verbatim")

export default () => {
  return defineConfig({
    plugins: [react(), svgr(), nodePolyfills()],
    server: {
      port: "3000",
      proxy: {
        "/quarterly-data/graphs": {
          target: "https://ffiec.cfpb.gov", // Enter the domain to proxy to, this is Vite's way of proxing to DEV or PROD
          changeOrigin: true,
          cookiePathRewrite: {
            "*": "/",
          },
        },
        '/v2/public': {
          target: "https://ffiec.cfpb.gov",
          changeOrigin: true,
          cookiePathRewrite: {
            "*": "/",
          },
        }
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx',
        },
      },
    }
  })
}
