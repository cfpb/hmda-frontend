import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './common/Header'
import NotFound from './common/NotFound'
import Footer from './common/Footer'
import Beta, { isBeta } from './common/Beta'
import makeAsyncComponent from './common/makeAsyncComponent.js'
import { useEnvironmentConfig } from './common/useEnvironmentConfig'
import { betaLinks, defaultLinks } from './common/constants/links'
import { AppContext } from './common/appContextHOC'

import './app.css'

const Homepage = makeAsyncComponent(() => import('./homepage'))
const DataBrowser = makeAsyncComponent(() => import('./data-browser'))
const Documentation = makeAsyncComponent(() => import('./documentation'))
const Tools = makeAsyncComponent(() => import('./tools'))
const DataPublication = makeAsyncComponent(() => import('./data-publication'))
const Filing = makeAsyncComponent(() => import('./filing'))

const App = () => {
  const isFiling = !!window.location.pathname.match(/^\/filing/)
  const config = useEnvironmentConfig(window.location.hostname)

  return (
    <AppContext.Provider value={{ config }}>
      {isFiling ? null : <Route path="/" render={props => {
        return (
          <Header
            links={isBeta() ? betaLinks : defaultLinks}
            {...props}
          />
        )
      }}/>}
      {isBeta() && !isFiling ? <Beta/> : null}
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path = "/data-browser" component={DataBrowser} />
        <Route path = "/documentation" component={Documentation} />
        <Route path = "/tools" component={Tools} />
        <Route path = "/data-publication" component={DataPublication} />
        <Route path = "/filing" component={Filing} />
        <Route component={NotFound} />
      </Switch>
      {isFiling ? null : <Footer />}
    </AppContext.Provider>
  )
}

export default App
