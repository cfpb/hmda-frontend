import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import { ReadableStream, WritableStream } from 'web-streams-ponyfill'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

// StreamSaver support for Firefox/IE
window.WritableStream = WritableStream
window.ReadableStream = ReadableStream

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <BrowserRouter basename='/'>
    <App />
  </BrowserRouter>,
)
