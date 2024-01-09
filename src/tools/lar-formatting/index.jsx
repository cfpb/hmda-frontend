import React from 'react'
import AppIntro from './AppIntro.jsx'

const App = () => {
  return [
    <div key={1} className='grid' id='main-content'>
      <div className='usa-width-one-whole'>
        <AppIntro />
      </div>
    </div>,
  ]
}

export default App
