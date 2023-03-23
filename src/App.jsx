import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from './common/Header'
import NotFound from './common/NotFound'
import Footer from './common/Footer'
import Beta, { isBeta } from './common/Beta'
import makeAsyncComponent from './common/makeAsyncComponent.js'
import { useEnvironmentConfig } from './common/useEnvironmentConfig'
import { betaLinks, defaultLinks, updateFilingLink } from './common/constants/links'
import { AppContext } from './common/appContextHOC'

import './app.css'

const Homepage = makeAsyncComponent(() => import('./homepage'),
  'HMDA - Home Mortgage Disclosure Act', 'Explore filing, data publication, and documentation resources for the Home Mortgage Disclosure Act')
const DataBrowser = makeAsyncComponent(() => import('./data-browser'),
  'HMDA Data Browser', 'Filter, analyze, and download HMDA datasets and visualize HMDA data through charts, graphs, and maps')
const Documentation = makeAsyncComponent(() => import('./documentation'),
  'HMDA Documentation', 'Documentation for HMDA filing, tools, and data publication platforms')
const Tools = makeAsyncComponent(() => import('./tools'),
  'HMDA Platform Tools', 'A collection of tools to ensure correct formatting and accuracy of HMDA data')
const DataPublication = makeAsyncComponent(() => import('./data-publication'),
  'HMDA Data Publication', 'HMDA data and reports are the most comprehensive publicly available information on mortgage market activity')
const Filing = makeAsyncComponent(() => import('./filing'),
  'HMDA Filing Platform', 'Use the HMDA Filing Platform to upload loan/application registers, review edits, and certify the accuracy and completeness of your HMDA data')
const HmdaHelp = makeAsyncComponent(() => import('./hmda-help'),
  'HMDA Help', 'Use HMDA Help to manage your HMDA Institutions and Publications')
const UpdatesNotes = makeAsyncComponent(
  () => import('./updates-notes'),
  'HMDA Updates and Notes',
  "Tracking releases, updates, and corrections to HMDA's publications, data products, documentation, and tools."
)
  

const App = () => {
  const config = useEnvironmentConfig(window.location.hostname)

  const isFiling = !!window.location.pathname.match(/^\/filing/)
  const isHelp = !!window.location.pathname.match(/^\/hmda-help/)

  const showCommonHeader = !isHelp
  const showFooter = !isHelp
  const showBetaBanner = isBeta() && !isFiling

  const headerLinks = isBeta()
    ? betaLinks
    : updateFilingLink(config, defaultLinks)

  return (
    <AppContext.Provider value={{ config }}>
      {showCommonHeader && (
        <Route
          path='/'
          render={props => <Header links={headerLinks} {...props} />}
        />
      )}
      {showBetaBanner && <Beta />}
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/data-browser' component={DataBrowser} />
        <Route path='/documentation' component={Documentation} />
        <Route path='/tools' component={Tools} />
        <Route path='/data-publication' component={DataPublication} />
        <Route path='/filing' component={Filing} />
        <Route path='/hmda-help' component={HmdaHelp} />
        <Route path='/updates-notes' component={UpdatesNotes} />
        <Route component={NotFound} />
      </Switch>
      {showFooter && <Footer config={config} />}
    </AppContext.Provider>
  )
}

export default App
