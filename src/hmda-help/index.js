import 'react-app-polyfill/ie11' // For IE 11 support
import 'react-app-polyfill/stable' // For fancy JS

import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
