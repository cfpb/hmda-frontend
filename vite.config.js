import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'


export default () => {
  return defineConfig({
    plugins: [react(), svgr()],
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
  })
}
