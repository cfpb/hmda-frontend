import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './common/Header'
import NotFound from './common/NotFound'
import Footer from './common/Footer'
import Beta from './common/Beta'
import Homepage from './homepage'
import DataBrowser from './data-browser'
import Documentation from './documentation'
import Tools from './tools'
import DataPublication from './data-publication'

import './app.css'

const App = () => {
  const isBeta = !!window.location.host.match('beta')
  return (
    <>
      <Header pathname={window.location.pathname}/>
      {isBeta ? <Beta/> : null}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path = "/data-browser" component={DataBrowser} />
        <Route path = "/documentation" component={Documentation} />
        <Route path = "/tools" component={Tools} />
        <Route path = "/data-publication" component={DataPublication} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  )
}

export default App
