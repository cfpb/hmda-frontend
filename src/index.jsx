import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import { ReadableStream, WritableStream } from 'web-streams-ponyfill'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { NonceProvider } from 'react-select'

import App from './App'

// StreamSaver support for Firefox/IE
window.WritableStream = WritableStream
window.ReadableStream = ReadableStream

const container = document.getElementById('root')
const root = createRoot(container)
const nonce = window.__CSP_NONCE__ || undefined
// Certain environments (GitHub Pages) don't support SPA routing so
// hash routing is used when necessary
const useHashRouter = import.meta.env.VITE_USE_HASH_ROUTER === 'true'
// BASE_URL defaults to `/`, see https://vite.dev/config/shared-options#base
// Can be changed with `--base` flag when building
const routerBasename =
  import.meta.env.BASE_URL === '/' ? '/' : import.meta.env.BASE_URL.replace(/\/$/, '')
const Router = useHashRouter ? HashRouter : BrowserRouter
const routerProps = useHashRouter ? {} : { basename: routerBasename }

root.render(
  <NonceProvider nonce={nonce} cacheKey="hmda">
    <Router {...routerProps}>
      <App />
    </Router>
  </NonceProvider>,
)
