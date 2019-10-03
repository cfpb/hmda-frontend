import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Geography from './geo/Geography.jsx'
import NotFound from '../common/NotFound'

const DataBrowser = () => {
  return (
    <Switch>
      <Route exact path="/data-browser" component={Home} />
      <Route path="/data-browser/data/:year?" component={Geography} />
    {/*
      <Route
        path="/maps-graphs/:year?"
        component={MapsGraphs}
      />
    */}
      <Route component={NotFound} />
    </Switch>
  )
}

export default DataBrowser
