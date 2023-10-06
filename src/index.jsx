import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable'
import { ReadableStream, WritableStream } from 'web-streams-ponyfill'

// StreamSaver support for Firefox/IE
window.WritableStream = WritableStream
window.ReadableStream = ReadableStream

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

ReactDOM.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
