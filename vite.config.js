import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import dns from "dns"

dns.setDefaultResultOrder("verbatim")

export default () => {
  return defineConfig({
    plugins: [react(), svgr()],
    server: {
      port: "3000",
      proxy: {
        "/": {
          target: "", // Enter the domain to proxy to, this is Vite's way of proxing to DEV or PROD
          changeOrigin: true,
          cookiePathRewrite: {
            "*": "/",
          },
        },
      },
    },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     // Node.js global to browser globalThis
    //     define: {
    //       global: "globalThis",
    //     },
    //     // Enable esbuild polyfill plugins
    //     plugins: [
    //       NodeGlobalsPolyfillPlugin({
    //         buffer: true,
    //       }),
    //     ],
    //   },
    // },
  })
}
