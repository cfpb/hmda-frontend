import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './common/Header'
import NotFound from './common/NotFound'
import Footer from './common/Footer'
import Beta from './common/Beta'
import Homepage from './homepage'

import './app.css'

const App = () => {
  const isBeta = !!window.location.host.match('beta')
  return (
    <>
      <Header pathname={window.location.pathname}/>
      {isBeta ? <Beta/> : null}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
